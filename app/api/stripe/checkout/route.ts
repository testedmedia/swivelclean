import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { REF_COOKIE_NAME } from '@/lib/referral'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const SERVICE_MAP: Record<string, { label: string; price: number }> = {
  standard: { label: 'Standard Turnover Clean', price: 180 },
  premium: { label: 'Premium Turnover Clean (3+ BR)', price: 220 },
  deep: { label: 'Deep Clean', price: 350 },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      service,
      address,
      date,
      time,
      name,
      phone,
      email,
      unit,
      accessNotes,
      specialRequests,
    } = body

    if (!service || !address || !date || !time || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: service, address, date, time, name, phone, email' },
        { status: 400 }
      )
    }

    const serviceInfo = SERVICE_MAP[service]
    if (!serviceInfo) {
      return NextResponse.json(
        { error: `Invalid service type: ${service}. Must be one of: standard, premium, deep` },
        { status: 400 }
      )
    }

    const { label: serviceLabel, price } = serviceInfo
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Check for referral cookie
    const refCode = req.cookies.get(REF_COOKIE_NAME)?.value || ''

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceLabel,
              description: `${address} on ${date} at ${time}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        service,
        address,
        date,
        time,
        name,
        phone,
        email,
        unit: unit || '',
        accessNotes: accessNotes || '',
        specialRequests: specialRequests || '',
        refCode,
      },
      customer_email: email,
      success_url: `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/book`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    const message =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
