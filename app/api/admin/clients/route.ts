import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@/lib/supabase-server'


export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, email, phone, address, notes } = await req.json()
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 })
    }

    const existing = await prisma.client.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'A client with that email already exists' }, { status: 409 })
    }

    const client = await prisma.client.create({
      data: { name, email, phone, address: address || '', notes: notes || null },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  } finally {
  }
}

export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        bookings: {
          orderBy: { scheduledDate: 'desc' },
          select: {
            id: true,
            service: true,
            scheduledDate: true,
            status: true,
            price: true,
          },
        },
      },
    })

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  } finally {
  }
}
