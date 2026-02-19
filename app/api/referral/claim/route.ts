import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signReferrerToken, SESSION_COOKIE_NAME, SESSION_DAYS } from '@/lib/referral'
import { SIGNUP_BONUS } from '@/lib/referral-constants'
import { sendReferrerWelcome } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { code, email, name, payoutMethod, payoutHandle } = await req.json()

    if (!code || !email) {
      return NextResponse.json({ error: 'Code and email are required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email is already taken by another referrer
    const existingEmail = await prisma.referrer.findUnique({ where: { email: normalizedEmail } })
    if (existingEmail && existingEmail.code !== code) {
      return NextResponse.json({ error: 'This email is already linked to another referral account.' }, { status: 409 })
    }

    const referrer = await prisma.referrer.findUnique({ where: { code } })
    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }

    // Claim the account — give $25 signup bonus if not already claimed
    const isFirstClaim = referrer.status === 'unclaimed'
    const updated = await prisma.referrer.update({
      where: { code },
      data: {
        email: normalizedEmail,
        name: name?.trim() || referrer.name,
        payoutMethod: payoutMethod || referrer.payoutMethod,
        payoutHandle: payoutHandle || referrer.payoutHandle,
        status: 'active',
        ...(isFirstClaim ? { balance: { increment: SIGNUP_BONUS }, totalEarned: { increment: SIGNUP_BONUS } } : {}),
      },
    })

    // Send welcome email
    try {
      await sendReferrerWelcome({ email: updated.email, name: updated.name, code: updated.code })
    } catch (err) {
      console.error('Failed to send referrer welcome email:', err)
    }

    // Set session cookie
    const token = await signReferrerToken({ referrerId: updated.id, email: updated.email })
    const response = NextResponse.json({
      success: true,
      referrer: { id: updated.id, name: updated.name, code: updated.code, email: updated.email },
    })

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DAYS * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Referral claim error:', err)
    return NextResponse.json({ error: 'Failed to claim account' }, { status: 500 })
  }
}
