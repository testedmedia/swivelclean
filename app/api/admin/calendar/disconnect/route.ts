import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


export async function POST() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await prisma.adminSettings.upsert({
      where: { id: 'singleton' },
      create: { id: 'singleton', googleAccessToken: null, googleRefreshToken: null },
      update: { googleAccessToken: null, googleRefreshToken: null, googleTokenExpiry: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error disconnecting Google:', error)
    return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 })
  } finally {
  }
}
