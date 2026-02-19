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

export async function GET() {
  try {
    const user = await requireAuth()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const cleaners = await prisma.cleaner.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { bookings: true } } },
    })

    return NextResponse.json(cleaners)
  } catch (error) {
    console.error('Error fetching cleaners:', error)
    return NextResponse.json({ error: 'Failed to fetch cleaners' }, { status: 500 })
  } finally {
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { name, phone, email, hourlyRate, notes } = body

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Name, phone, and email are required' }, { status: 400 })
    }

    const cleaner = await prisma.cleaner.create({
      data: {
        name,
        phone,
        email,
        hourlyRate: parseFloat(hourlyRate) || 18,
        notes: notes || null,
      },
      include: { _count: { select: { bookings: true } } },
    })

    return NextResponse.json(cleaner, { status: 201 })
  } catch (error) {
    console.error('Error creating cleaner:', error)
    return NextResponse.json({ error: 'Failed to create cleaner' }, { status: 500 })
  } finally {
  }
}
