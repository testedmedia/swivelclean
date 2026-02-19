import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const settings = await prisma.adminSettings.findUnique({
      where: { id: 'singleton' },
      select: {
        googleAccessToken: true,
        googleTokenExpiry: true,
      },
    })

    return NextResponse.json(settings ?? {})
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  } finally {
  }
}
