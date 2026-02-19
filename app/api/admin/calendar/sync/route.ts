import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

const SERVICE_HOURS: Record<string, number> = {
  standard: 3.5,
  premium: 4.5,
  deep: 5.5,
}

async function getOAuth2Client() {
  const settings = await prisma.adminSettings.findUnique({ where: { id: 'singleton' } })

  if (!settings?.googleAccessToken || !settings.googleRefreshToken) {
    throw new Error('Google Calendar not connected. Go to Settings to connect.')
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )

  oauth2Client.setCredentials({
    access_token: settings.googleAccessToken,
    refresh_token: settings.googleRefreshToken,
    expiry_date: settings.googleTokenExpiry?.getTime(),
  })

  // Auto-refresh token if expired
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      await prisma.adminSettings.update({
        where: { id: 'singleton' },
        data: {
          googleAccessToken: tokens.access_token,
          googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
        },
      })
    }
  })

  return oauth2Client
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { bookingId } = await req.json()
    if (!bookingId) return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { client: true, cleaner: true },
    })

    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

    const oauth2Client = await getOAuth2Client()
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Parse scheduled date + time
    const dateStr = booking.scheduledDate.toISOString().split('T')[0]
    const [time, period] = booking.scheduledTime.split(' ')
    const [hourStr, minStr] = time.split(':')
    let hour = parseInt(hourStr)
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    const startISO = `${dateStr}T${String(hour).padStart(2, '0')}:${minStr ?? '00'}:00`
    const durationHours = SERVICE_HOURS[booking.service] ?? 4
    const endDate = new Date(new Date(startISO).getTime() + durationHours * 60 * 60 * 1000)
    const endISO = endDate.toISOString().replace('Z', '')

    const description = [
      `Client: ${booking.client.name}`,
      `Phone: ${booking.client.phone}`,
      `Email: ${booking.client.email}`,
      `Service: ${SERVICE_LABELS[booking.service] ?? booking.service}`,
      `Price: $${booking.price}`,
      booking.cleaner ? `Cleaner: ${booking.cleaner.name}` : '',
      booking.notes ? `Notes: ${booking.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `Ready Rental Cleaning: ${SERVICE_LABELS[booking.service] ?? booking.service} @ ${booking.address}`,
        description,
        location: booking.address,
        start: { dateTime: startISO, timeZone: 'America/Los_Angeles' },
        end: { dateTime: endISO, timeZone: 'America/Los_Angeles' },
        colorId: '2', // Sage green
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },
            { method: 'email', minutes: 1440 }, // 24h
          ],
        },
      },
    })

    return NextResponse.json({
      success: true,
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to sync to calendar'
    console.error('Calendar sync error:', error)
    return NextResponse.json({ error: msg }, { status: 500 })
  } finally {
  }
}
