import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  generateOTP,
  hashOTP,
  signReferrerToken,
  SESSION_COOKIE_NAME,
  SESSION_DAYS,
  OTP_EXPIRY_MINUTES,
} from '@/lib/referral'
import { sendReferralOTP } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, otp, action } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const referrer = await prisma.referrer.findUnique({ where: { email: normalizedEmail } })

    if (!referrer) {
      return NextResponse.json({ error: 'No referral account found with this email. Please sign up first.' }, { status: 404 })
    }

    // Step 1: Send OTP
    if (action === 'send-otp') {
      const code = generateOTP()
      const hash = await hashOTP(code)
      const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

      await prisma.referrer.update({
        where: { id: referrer.id },
        data: { otpHash: hash, otpExpiresAt: expiresAt },
      })

      try {
        await sendReferralOTP({ email: referrer.email, name: referrer.name, otp: code })
      } catch (err) {
        console.error('Failed to send OTP email:', err)
        return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 })
      }

      return NextResponse.json({ sent: true })
    }

    // Step 2: Verify OTP
    if (action === 'verify-otp') {
      if (!otp) {
        return NextResponse.json({ error: 'Verification code is required' }, { status: 400 })
      }

      if (!referrer.otpHash || !referrer.otpExpiresAt) {
        return NextResponse.json({ error: 'No verification code was sent. Please request a new one.' }, { status: 400 })
      }

      if (new Date() > referrer.otpExpiresAt) {
        return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 })
      }

      const inputHash = await hashOTP(otp)
      if (inputHash !== referrer.otpHash) {
        return NextResponse.json({ error: 'Invalid code. Please try again.' }, { status: 400 })
      }

      // Clear OTP
      await prisma.referrer.update({
        where: { id: referrer.id },
        data: { otpHash: null, otpExpiresAt: null },
      })

      // Sign JWT and set session cookie
      const token = await signReferrerToken({ referrerId: referrer.id, email: referrer.email })

      const response = NextResponse.json({
        success: true,
        referrer: { id: referrer.id, name: referrer.name, code: referrer.code },
      })

      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DAYS * 24 * 60 * 60,
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid action. Use send-otp or verify-otp.' }, { status: 400 })
  } catch (err) {
    console.error('Referrer auth error:', err)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
