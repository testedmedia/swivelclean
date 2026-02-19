import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateReferralCode } from '@/lib/referral'

export async function POST() {
  try {
    // Generate unique code with retry
    let code = generateReferralCode()
    let attempts = 0
    while (attempts < 5) {
      const taken = await prisma.referrer.findUnique({ where: { code } })
      if (!taken) break
      code = generateReferralCode()
      attempts++
    }

    // Create referrer with no email (unclaimed)
    const referrer = await prisma.referrer.create({
      data: {
        email: `unclaimed-${code.toLowerCase()}@pending.local`,
        name: 'Unclaimed',
        code,
        status: 'unclaimed',
      },
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://readyrentalcleaning.com'

    return NextResponse.json({
      code: referrer.code,
      url: `${appUrl}/api/referral/track?code=${referrer.code}`,
    })
  } catch (err) {
    console.error('Referral generate error:', err)
    return NextResponse.json({ error: 'Failed to generate referral link' }, { status: 500 })
  }
}
