import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(new URL('/admin/settings?error=google_denied', req.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL('/admin/settings?error=no_code', req.url))
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.access_token || !tokens.refresh_token) {
      return NextResponse.redirect(new URL('/admin/settings?error=no_tokens', req.url))
    }

    await prisma.adminSettings.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : new Date(Date.now() + 3600 * 1000),
      },
      update: {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : new Date(Date.now() + 3600 * 1000),
      },
    })

    return NextResponse.redirect(new URL('/admin/settings?connected=true', req.url))
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(new URL('/admin/settings?error=oauth_failed', req.url))
  } finally {
  }
}
