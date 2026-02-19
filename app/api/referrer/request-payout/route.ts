import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyReferrerToken, SESSION_COOKIE_NAME, PAYOUT_THRESHOLD } from '@/lib/referral'
import { sendPayoutRequest, sendAdminPayoutNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyReferrerToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
    }

    const referrer = await prisma.referrer.findUnique({ where: { id: payload.referrerId } })
    if (!referrer) {
      return NextResponse.json({ error: 'Referrer not found' }, { status: 404 })
    }

    if (referrer.balance < PAYOUT_THRESHOLD) {
      return NextResponse.json(
        { error: `Minimum balance of $${PAYOUT_THRESHOLD} required. Current balance: $${referrer.balance.toFixed(2)}` },
        { status: 400 }
      )
    }

    const amount = referrer.balance

    // Create payout and deduct balance in a transaction
    await prisma.$transaction([
      prisma.payout.create({
        data: {
          referrerId: referrer.id,
          amount,
          method: referrer.payoutMethod,
          status: 'pending',
        },
      }),
      prisma.referrer.update({
        where: { id: referrer.id },
        data: { balance: 0 },
      }),
    ])

    // Send notification emails (non-blocking)
    try {
      await Promise.all([
        sendPayoutRequest({
          email: referrer.email,
          name: referrer.name,
          amount,
          method: referrer.payoutMethod,
        }),
        sendAdminPayoutNotification({
          referrerName: referrer.name,
          referrerEmail: referrer.email,
          amount,
          method: referrer.payoutMethod,
          payoutHandle: referrer.payoutHandle,
        }),
      ])
    } catch (err) {
      console.error('Payout notification email error:', err)
    }

    return NextResponse.json({ success: true, amount, method: referrer.payoutMethod })
  } catch (err) {
    console.error('Payout request error:', err)
    return NextResponse.json({ error: 'Failed to process payout request' }, { status: 500 })
  }
}
