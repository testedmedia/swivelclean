import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createServerClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar.events'],
      prompt: 'consent', // Force refresh token even if previously authorized
    })

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.json({ error: 'Failed to initiate Google OAuth' }, { status: 500 })
  }
}
