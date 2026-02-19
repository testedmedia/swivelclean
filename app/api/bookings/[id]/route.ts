import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status } = body

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
