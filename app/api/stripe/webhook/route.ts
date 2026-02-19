export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'
import { sendBookingConfirmationSMS } from '@/lib/sms'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})


const SERVICE_MAP: Record<string, { label: string; price: number }> = {
  standard: { label: 'Standard Turnover Clean', price: 180 },
  premium: { label: 'Premium Turnover Clean (3+ BR)', price: 220 },
  deep: { label: 'Deep Clean', price: 350 },
}

export async function POST(req: NextRequest) {
  let event: Stripe.Event

  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed'
    console.error('Webhook signature error:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}

    const {
      service = 'standard',
      address = '',
      date = '',
      time = '',
      name = '',
      phone = '',
      email = '',
    } = meta

    const serviceInfo = SERVICE_MAP[service] || SERVICE_MAP.standard
    const price = serviceInfo.price

    try {
      // Upsert client by email
      let client = await prisma.client.findUnique({
        where: { email },
      })

      if (!client) {
        client = await prisma.client.create({
          data: { email, name, phone, address },
        })
      } else {
        // Update name/phone/address if they changed
        client = await prisma.client.update({
          where: { email },
          data: { name, phone, address },
        })
      }

      // Create confirmed booking
      await prisma.booking.create({
        data: {
          clientId: client.id,
          service,
          address,
          scheduledDate: new Date(date),
          scheduledTime: time,
          price,
          status: 'confirmed',
          stripeSessionId: session.id,
          notes: [meta.accessNotes, meta.specialRequests]
            .filter(Boolean)
            .join(' | ') || null,
        },
      })

      // Send email confirmation (non-blocking)
      try {
        await sendBookingConfirmation({
          email,
          name,
          address,
          service: serviceInfo.label,
          date,
          time,
          price,
        })
      } catch (emailErr) {
        console.error('Webhook: email confirmation failed:', emailErr)
      }

      // Send SMS confirmation (non-blocking)
      try {
        if (phone) {
          await sendBookingConfirmationSMS({
            phone,
            name,
            service: serviceInfo.label,
            date,
            time,
            address,
          })
        }
      } catch (smsErr) {
        console.error('Webhook: SMS confirmation failed:', smsErr)
      }
    } catch (dbErr) {
      console.error('Webhook: database error:', dbErr)
      return NextResponse.json(
        { error: 'Failed to process booking' },
        { status: 500 }
      )
    } finally {
    }
  }

  return NextResponse.json({ received: true })
}
