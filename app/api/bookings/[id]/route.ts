import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { status, cleanerId } = body

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status
    if (cleanerId !== undefined) updateData.cleanerId = cleanerId || null

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: { cleaner: { select: { id: true, name: true } } },
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  } finally {
  }
}
