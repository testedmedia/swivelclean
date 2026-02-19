import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReminderEmail } from '@/lib/email'
import { send24hReminderSMS } from '@/lib/sms'


export async function GET(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Calculate tomorrow's date range (in LA timezone)
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const startOfDay = new Date(tomorrow)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(tomorrow)
    endOfDay.setHours(23, 59, 59, 999)

    const tomorrowDate = tomorrow.toISOString().split('T')[0]

    // Find all bookings scheduled for tomorrow
    const bookings = await prisma.booking.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ['confirmed', 'pending'],
        },
      },
      include: {
        client: true,
        cleaner: true,
      },
    })

    let sent = 0

    for (const booking of bookings) {
      const { client, cleaner } = booking

      // Send reminder email
      try {
        await sendReminderEmail({
          email: client.email,
          name: client.name,
          address: booking.address,
          service: booking.service,
          date: tomorrowDate,
          time: booking.scheduledTime,
          cleanerName: cleaner?.name,
        })
      } catch (emailErr) {
        console.error(`Reminder email failed for booking ${booking.id}:`, emailErr)
      }

      // Send reminder SMS
      try {
        if (client.phone) {
          await send24hReminderSMS({
            phone: client.phone,
            name: client.name,
            address: booking.address,
            date: tomorrowDate,
            time: booking.scheduledTime,
            cleanerName: cleaner?.name,
          })
        }
      } catch (smsErr) {
        console.error(`Reminder SMS failed for booking ${booking.id}:`, smsErr)
      }

      sent++
    }

    return NextResponse.json({
      sent,
      date: tomorrowDate,
      total_bookings_found: bookings.length,
    })
  } catch (error) {
    console.error('Cron reminders error:', error)
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    )
  } finally {
  }
}
