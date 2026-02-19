import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateReferralCode } from '@/lib/referral'
import { SIGNUP_BONUS } from '@/lib/referral-constants'
import { sendReferrerWelcome } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, name, payoutMethod, payoutHandle } = await req.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const existing = await prisma.referrer.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists. Please log in instead.' }, { status: 409 })
    }

    // Generate unique code with retry
    let code = generateReferralCode()
    let attempts = 0
    while (attempts < 5) {
      const taken = await prisma.referrer.findUnique({ where: { code } })
      if (!taken) break
      code = generateReferralCode()
      attempts++
    }

    const referrer = await prisma.referrer.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        code,
        balance: SIGNUP_BONUS,
        totalEarned: SIGNUP_BONUS,
        payoutMethod: payoutMethod || 'venmo',
        payoutHandle: payoutHandle || '',
      },
    })

    // Send welcome email (non-blocking)
    try {
      await sendReferrerWelcome({ email: referrer.email, name: referrer.name, code: referrer.code })
    } catch (err) {
      console.error('Failed to send referrer welcome email:', err)
    }

    return NextResponse.json({
      id: referrer.id,
      code: referrer.code,
      email: referrer.email,
      name: referrer.name,
    })
  } catch (err) {
    console.error('Referral signup error:', err)
    return NextResponse.json({ error: 'Failed to create referral account' }, { status: 500 })
  }
}
