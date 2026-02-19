import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


async function requireAuth() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { name, phone, email, hourlyRate, active, notes } = body

    const cleaner = await prisma.cleaner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(hourlyRate !== undefined && { hourlyRate: parseFloat(hourlyRate) }),
        ...(active !== undefined && { active }),
        ...(notes !== undefined && { notes }),
      },
    })

    return NextResponse.json(cleaner)
  } catch (error) {
    console.error('Error updating cleaner:', error)
    return NextResponse.json({ error: 'Failed to update cleaner' }, { status: 500 })
  } finally {
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params

    // Soft delete — set active=false
    const cleaner = await prisma.cleaner.update({
      where: { id },
      data: { active: false },
    })

    return NextResponse.json(cleaner)
  } catch (error) {
    console.error('Error deleting cleaner:', error)
    return NextResponse.json({ error: 'Failed to delete cleaner' }, { status: 500 })
  } finally {
  }
}
