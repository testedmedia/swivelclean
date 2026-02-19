import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyReferrerToken, SESSION_COOKIE_NAME } from '@/lib/referral'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyReferrerToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
    }

    const referrer = await prisma.referrer.findUnique({
      where: { id: payload.referrerId },
      include: {
        conversions: { orderBy: { createdAt: 'desc' }, take: 50 },
        payouts: { orderBy: { requestedAt: 'desc' }, take: 20 },
      },
    })

    if (!referrer) {
      return NextResponse.json({ error: 'Referrer not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: referrer.id,
      name: referrer.name,
      email: referrer.email,
      code: referrer.code,
      balance: referrer.balance,
      totalEarned: referrer.totalEarned,
      payoutMethod: referrer.payoutMethod,
      payoutHandle: referrer.payoutHandle,
      status: referrer.status,
      conversions: referrer.conversions.map((c) => ({
        id: c.id,
        service: c.service,
        commissionAmount: c.commissionAmount,
        status: c.status,
        createdAt: c.createdAt,
      })),
      payouts: referrer.payouts.map((p) => ({
        id: p.id,
        amount: p.amount,
        method: p.method,
        status: p.status,
        requestedAt: p.requestedAt,
        paidAt: p.paidAt,
      })),
    })
  } catch (err) {
    console.error('Dashboard fetch error:', err)
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 })
  }
}
