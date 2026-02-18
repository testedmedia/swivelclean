import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendBookingConfirmation } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { address, service, date, time, name, phone, email } = body

    // Validate input
    if (!address || !service || !date || !time || !name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Determine price based on service type
    const priceMap: Record<string, number> = {
      standard: 180,
      premium: 220,
      deep: 350,
    }

    const price = priceMap[service] || 180

    // Create or get client
    let client = await prisma.client.findUnique({
      where: { email },
    })

    if (!client) {
      client = await prisma.client.create({
        data: {
          email,
          name,
          phone,
          address,
        },
      })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        service,
        address,
        scheduledDate: new Date(date),
        scheduledTime: time,
        price,
        status: 'pending',
      },
    })

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        email,
        name,
        address,
        service: service === 'standard' ? 'Standard Turnover' : service === 'premium' ? 'Premium Turnover' : 'Deep Clean',
        date,
        time,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
        address: booking.address,
        scheduledDate: booking.scheduledDate,
        price: booking.price,
      },
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(req: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        client: true,
      },
      orderBy: {
        scheduledDate: 'desc',
      },
      take: 50,
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
