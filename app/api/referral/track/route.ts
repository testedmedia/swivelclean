import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { REF_COOKIE_NAME, COOKIE_DAYS } from '@/lib/referral'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Verify the code exists
  const referrer = await prisma.referrer.findUnique({ where: { code } })

  const response = NextResponse.redirect(new URL('/', req.url))

  if (referrer && referrer.status === 'active') {
    response.cookies.set(REF_COOKIE_NAME, code, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_DAYS * 24 * 60 * 60,
      path: '/',
    })
  }

  return response
}
