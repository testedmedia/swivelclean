import { NextResponse } from 'next/server'

// Photo upload not yet implemented — requires photos[] column on Booking model
export async function POST() {
  return NextResponse.json({ error: 'Photo upload not yet available' }, { status: 501 })
}
