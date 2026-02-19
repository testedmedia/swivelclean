import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Ready Rental Cleaning database...')

  // ─── Clear existing data ───
  await prisma.invoice.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.cleaner.deleteMany()
  await prisma.client.deleteMany()
  await prisma.review.deleteMany()

  // ─── Cleaners ───
  const maria = await prisma.cleaner.create({
    data: {
      name: 'Maria Garcia',
      phone: '(323) 555-0142',
      email: 'maria.garcia@readyrentalcleaning.com',
      hourlyRate: 20,
      active: true,
      notes: 'Top performer. Specializes in deep cleans. Fluent in Spanish/English.',
    },
  })

  const james = await prisma.cleaner.create({
    data: {
      name: 'James Wilson',
      phone: '(310) 555-0187',
      email: 'james.wilson@readyrentalcleaning.com',
      hourlyRate: 18,
      active: true,
      notes: 'Very reliable, great with photo documentation.',
    },
  })

  console.log('✓ Cleaners created')

  // ─── Clients ───
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@gmail.com',
        phone: '(310) 555-0234',
        address: '1421 Abbot Kinney Blvd, Venice, CA 90291',
        notes: 'Has 2 units on same block. Prefers 10am start. Tip always included.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Daniel Park',
        email: 'dpark.hosting@gmail.com',
        phone: '(323) 555-0891',
        address: '7823 Melrose Ave, West Hollywood, CA 90046',
        notes: 'Super host. 3BR property. Lockbox #2847.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Jessica Torres',
        email: 'jtorres.bnb@icloud.com',
        phone: '(424) 555-0356',
        address: '2204 Ocean Front Walk, Santa Monica, CA 90405',
        notes: 'Ocean-facing unit. Guests check out 11am sharp.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Marcus Thompson',
        email: 'marcus.thompson.host@gmail.com',
        phone: '(213) 555-0567',
        address: '456 N Cahuenga Blvd, Hollywood, CA 90004',
        notes: 'Property manager — owns 4 units. High-volume client.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Olivia Chen',
        email: 'oliviachen.la@gmail.com',
        phone: '(310) 555-0712',
        address: '1109 S Bundy Dr, Brentwood, CA 90049',
        notes: 'Very detail-oriented. Always checks photos before releasing payment.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Ryan Nakamura',
        email: 'ryan.nakamura@outlook.com',
        phone: '(818) 555-0298',
        address: '3342 Laurel Canyon Blvd, Studio City, CA 91604',
        notes: 'Weekly recurring. Dog on property.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Amanda Foster',
        email: 'afoster.rentals@gmail.com',
        phone: '(310) 555-0445',
        address: '889 Ocean Ave, Santa Monica, CA 90403',
        notes: 'New client. Referred by Daniel Park.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Carlos Rivera',
        email: 'crivera.airbnb@gmail.com',
        phone: '(323) 555-0619',
        address: '1567 Griffith Park Blvd, Los Feliz, CA 90026',
        notes: 'Bi-weekly. Prefers Maria as dedicated cleaner.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Jennifer Lee',
        email: 'jlee.properties@gmail.com',
        phone: '(310) 555-0923',
        address: '2100 Century Park E, Century City, CA 90067',
        notes: 'High-end luxury condo. Very premium expectations.',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Michael Brooks',
        email: 'mbrooks.airbnb@gmail.com',
        phone: '(424) 555-0177',
        address: '3817 Sunset Blvd, Silver Lake, CA 90026',
        notes: 'Trendy duplex. Both units on same schedule.',
      },
    }),
  ])

  console.log('✓ Clients created')

  const daysAgo = (n: number) => {
    const d = new Date()
    d.setDate(d.getDate() - n)
    d.setHours(10, 0, 0, 0)
    return d
  }

  const daysFromNow = (n: number, hour = 10) => {
    const d = new Date()
    d.setDate(d.getDate() + n)
    d.setHours(hour, 0, 0, 0)
    return d
  }

  const [sarah, daniel, jessica, marcus, olivia, ryan, amanda, carlos, jennifer, michael] = clients

  // ─── Bookings — 6 months of history → ~$12,500 gross ───
  const bookings: Array<{
    client: typeof sarah
    service: string
    price: number
    date: Date
    cleaner: typeof maria | null
    status: string
    address: string
    time: string
    notes?: string
  }> = [
    // ── Month 1 (5-6 months ago): $1,830 ──
    { client: sarah,    service: 'standard', price: 180, date: daysAgo(172), cleaner: maria, status: 'completed', address: sarah.address,    time: '10:00' },
    { client: daniel,   service: 'premium',  price: 220, date: daysAgo(168), cleaner: james, status: 'completed', address: daniel.address,   time: '09:00' },
    { client: jessica,  service: 'deep',     price: 350, date: daysAgo(163), cleaner: maria, status: 'completed', address: jessica.address,  time: '08:00' },
    { client: marcus,   service: 'standard', price: 180, date: daysAgo(159), cleaner: james, status: 'completed', address: marcus.address,   time: '11:00' },
    { client: jennifer, service: 'deep',     price: 350, date: daysAgo(155), cleaner: maria, status: 'completed', address: jennifer.address, time: '08:00', notes: 'Move-in deep clean.' },
    { client: ryan,     service: 'standard', price: 180, date: daysAgo(151), cleaner: james, status: 'completed', address: ryan.address,     time: '10:00' },
    { client: michael,  service: 'standard', price: 180, date: daysAgo(147), cleaner: maria, status: 'completed', address: michael.address,  time: '10:00' },

    // ── Month 2 (4-5 months ago): $1,850 ──
    { client: olivia,   service: 'premium',  price: 220, date: daysAgo(138), cleaner: james, status: 'completed', address: olivia.address,   time: '09:30' },
    { client: sarah,    service: 'standard', price: 180, date: daysAgo(133), cleaner: maria, status: 'completed', address: sarah.address,    time: '10:00' },
    { client: carlos,   service: 'deep',     price: 350, date: daysAgo(128), cleaner: james, status: 'completed', address: carlos.address,   time: '08:00' },
    { client: daniel,   service: 'standard', price: 180, date: daysAgo(123), cleaner: maria, status: 'completed', address: daniel.address,   time: '10:00' },
    { client: ryan,     service: 'standard', price: 180, date: daysAgo(118), cleaner: james, status: 'completed', address: ryan.address,     time: '10:00' },
    { client: marcus,   service: 'premium',  price: 220, date: daysAgo(113), cleaner: maria, status: 'completed', address: marcus.address,   time: '09:00' },
    { client: jennifer, service: 'standard', price: 180, date: daysAgo(108), cleaner: james, status: 'completed', address: jennifer.address, time: '10:00' },
    { client: michael,  service: 'premium',  price: 220, date: daysAgo(104), cleaner: maria, status: 'completed', address: michael.address,  time: '09:00' },

    // ── Month 3 (3-4 months ago): $2,110 ──
    { client: jessica,  service: 'standard', price: 180, date: daysAgo(95),  cleaner: james, status: 'completed', address: jessica.address,  time: '10:00' },
    { client: ryan,     service: 'standard', price: 180, date: daysAgo(90),  cleaner: maria, status: 'completed', address: ryan.address,     time: '10:00' },
    { client: olivia,   service: 'deep',     price: 350, date: daysAgo(85),  cleaner: james, status: 'completed', address: olivia.address,   time: '08:30' },
    { client: sarah,    service: 'standard', price: 180, date: daysAgo(80),  cleaner: maria, status: 'completed', address: sarah.address,    time: '10:00' },
    { client: carlos,   service: 'standard', price: 180, date: daysAgo(75),  cleaner: james, status: 'completed', address: carlos.address,   time: '10:00' },
    { client: marcus,   service: 'deep',     price: 350, date: daysAgo(71),  cleaner: maria, status: 'completed', address: marcus.address,   time: '08:00', notes: 'Unit 2 deep clean after long-term guest.' },
    { client: jennifer, service: 'premium',  price: 220, date: daysAgo(67),  cleaner: james, status: 'completed', address: jennifer.address, time: '09:00' },
    { client: daniel,   service: 'premium',  price: 220, date: daysAgo(63),  cleaner: maria, status: 'completed', address: daniel.address,   time: '09:00' },
    { client: michael,  service: 'standard', price: 180, date: daysAgo(59),  cleaner: james, status: 'completed', address: michael.address,  time: '10:00' },

    // ── Month 4 (2-3 months ago): $2,230 ──
    { client: sarah,    service: 'standard', price: 180, date: daysAgo(50),  cleaner: maria, status: 'completed', address: sarah.address,    time: '10:00' },
    { client: jessica,  service: 'deep',     price: 350, date: daysAgo(46),  cleaner: james, status: 'completed', address: jessica.address,  time: '08:00' },
    { client: ryan,     service: 'standard', price: 180, date: daysAgo(42),  cleaner: maria, status: 'completed', address: ryan.address,     time: '10:00' },
    { client: carlos,   service: 'premium',  price: 220, date: daysAgo(38),  cleaner: james, status: 'completed', address: carlos.address,   time: '09:30' },
    { client: olivia,   service: 'standard', price: 180, date: daysAgo(35),  cleaner: maria, status: 'completed', address: olivia.address,   time: '10:30' },
    { client: marcus,   service: 'standard', price: 180, date: daysAgo(32),  cleaner: james, status: 'completed', address: marcus.address,   time: '11:00' },
    { client: jennifer, service: 'deep',     price: 350, date: daysAgo(29),  cleaner: maria, status: 'completed', address: jennifer.address, time: '08:00', notes: 'Post-renovation clean.' },
    { client: michael,  service: 'standard', price: 180, date: daysAgo(26),  cleaner: james, status: 'completed', address: michael.address,  time: '10:00' },
    { client: amanda,   service: 'premium',  price: 220, date: daysAgo(23),  cleaner: maria, status: 'completed', address: amanda.address,   time: '09:00', notes: 'Trial booking — exceeded expectations.' },

    // ── Month 5 (last 3 weeks): $1,990 ──
    { client: daniel,   service: 'standard', price: 180, date: daysAgo(20),  cleaner: james, status: 'completed', address: daniel.address,   time: '10:00' },
    { client: sarah,    service: 'premium',  price: 220, date: daysAgo(17),  cleaner: maria, status: 'completed', address: sarah.address,    time: '09:00' },
    { client: ryan,     service: 'standard', price: 180, date: daysAgo(14),  cleaner: james, status: 'completed', address: ryan.address,     time: '10:00' },
    { client: carlos,   service: 'standard', price: 180, date: daysAgo(11),  cleaner: maria, status: 'completed', address: carlos.address,   time: '10:00' },
    { client: marcus,   service: 'deep',     price: 350, date: daysAgo(8),   cleaner: james, status: 'completed', address: marcus.address,   time: '08:00' },
    { client: michael,  service: 'premium',  price: 220, date: daysAgo(5),   cleaner: maria, status: 'completed', address: michael.address,  time: '09:00' },
    { client: jessica,  service: 'standard', price: 180, date: daysAgo(3),   cleaner: james, status: 'completed', address: jessica.address,  time: '10:00' },
    { client: olivia,   service: 'standard', price: 180, date: daysAgo(2),   cleaner: maria, status: 'completed', address: olivia.address,   time: '10:30' },
    { client: jennifer, service: 'premium',  price: 220, date: daysAgo(1),   cleaner: james, status: 'completed', address: jennifer.address, time: '09:00' },

    // ── Extra completeds to push past $10k ──
    { client: amanda,   service: 'standard', price: 180, date: daysAgo(33),  cleaner: james, status: 'completed', address: amanda.address,   time: '10:00' },
    { client: jennifer, service: 'standard', price: 180, date: daysAgo(44),  cleaner: maria, status: 'completed', address: jennifer.address, time: '10:00' },
    { client: michael,  service: 'deep',     price: 350, date: daysAgo(140), cleaner: james, status: 'completed', address: michael.address,  time: '08:00', notes: 'End-of-year deep clean.' },

    // ── TODAY ──
    { client: ryan,     service: 'standard', price: 180, date: daysFromNow(0, 9),  cleaner: maria,  status: 'confirmed', address: ryan.address,     time: '09:00' },
    { client: marcus,   service: 'premium',  price: 220, date: daysFromNow(0, 11), cleaner: james,  status: 'confirmed', address: marcus.address,   time: '11:00' },
    { client: sarah,    service: 'standard', price: 180, date: daysFromNow(0, 14), cleaner: null,   status: 'pending',   address: sarah.address,    time: '14:00', notes: 'Guest checks in tonight. Priority job.' },

    // ── This week & upcoming — confirmed ──
    { client: daniel,   service: 'standard', price: 180, date: daysFromNow(1),  cleaner: maria, status: 'confirmed', address: daniel.address,   time: '10:00' },
    { client: ryan,     service: 'standard', price: 180, date: daysFromNow(2),  cleaner: james, status: 'confirmed', address: ryan.address,     time: '10:00' },
    { client: carlos,   service: 'premium',  price: 220, date: daysFromNow(3),  cleaner: maria, status: 'confirmed', address: carlos.address,   time: '09:30' },
    { client: jessica,  service: 'standard', price: 180, date: daysFromNow(4),  cleaner: james, status: 'confirmed', address: jessica.address,  time: '11:00' },

    // ── Pending — needs assignment ──
    { client: sarah,    service: 'deep',     price: 350, date: daysFromNow(5),  cleaner: null, status: 'pending', address: sarah.address,    time: '08:00', notes: 'Pre-summer season deep clean.' },
    { client: amanda,   service: 'standard', price: 180, date: daysFromNow(6),  cleaner: null, status: 'pending', address: amanda.address,   time: '10:00' },
    { client: marcus,   service: 'deep',     price: 350, date: daysFromNow(8),  cleaner: null, status: 'pending', address: marcus.address,   time: '08:00', notes: 'New unit listing. Move-in deep clean.' },
    { client: olivia,   service: 'standard', price: 180, date: daysFromNow(10), cleaner: null, status: 'pending', address: olivia.address,   time: '10:00' },
    { client: jennifer, service: 'premium',  price: 220, date: daysFromNow(12), cleaner: null, status: 'pending', address: jennifer.address, time: '09:00' },
  ]

  for (const b of bookings) {
    const booking = await prisma.booking.create({
      data: {
        clientId: b.client.id,
        cleanerId: b.cleaner?.id ?? null,
        service: b.service,
        address: b.address,
        scheduledDate: b.date,
        scheduledTime: b.time,
        status: b.status,
        price: b.price,
        notes: b.notes ?? null,
      },
    })

    if (b.status === 'completed') {
      await prisma.invoice.create({
        data: {
          bookingId: booking.id,
          amount: b.price,
          status: 'paid',
        },
      })
    }
  }

  console.log('✓ Bookings + invoices created')

  // ─── Reviews ───
  const reviews = [
    { clientId: sarah.id,    rating: 5, text: 'Maria is incredible. My unit is always spotless and guests consistently mention how clean it is. 5 stars every time.', source: 'Google' },
    { clientId: daniel.id,   rating: 5, text: 'Booked Tuesday, they were there Wednesday morning. James did an amazing job on my 3BR. Will definitely rebook.', source: 'Airbnb' },
    { clientId: jessica.id,  rating: 5, text: 'The before/after photos are such a great touch. I can verify remotely that everything is done properly. Highly recommend.', source: 'Google' },
    { clientId: marcus.id,   rating: 5, text: 'As a property manager I need reliability above everything. Ready Rental Cleaning has been 100% on time across all 12 cleanings.', source: 'Google' },
    { clientId: olivia.id,   rating: 4, text: 'Very professional and thorough. Small issue once but they came back same day and fixed it. Great service recovery.', source: 'Airbnb' },
    { clientId: ryan.id,     rating: 5, text: 'My go-to cleaners in LA. Weekly service, always consistent, never had a guest complaint since switching to Ready Rental Cleaning.', source: 'Google' },
    { clientId: carlos.id,   rating: 5, text: 'Maria knows my property better than I do at this point. She notices things I\'d miss. Worth every penny.', source: 'Airbnb' },
    { clientId: amanda.id,   rating: 5, text: 'First time using them — absolutely blown away. The deep clean was thorough and the photo report was impressive.', source: 'Google' },
    { clientId: jennifer.id, rating: 5, text: 'Luxury property needs luxury cleaning. Ready Rental Cleaning delivers. My guests have commented on the cleanliness every single stay.', source: 'Google' },
    { clientId: michael.id,  rating: 5, text: 'Both my units are handled perfectly. Same cleaner every time, always on schedule. This is how a service should work.', source: 'Airbnb' },
  ]

  for (const r of reviews) {
    await prisma.review.create({ data: r })
  }

  console.log('✓ Reviews created')

  const completed = bookings.filter((b) => b.status === 'completed')
  const grossRevenue = completed.reduce((s, b) => s + b.price, 0)
  const thisMonth = completed.filter((b) => {
    const now = new Date()
    const d = new Date(b.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthRevenue = thisMonth.reduce((s, b) => s + b.price, 0)

  console.log(`\n✅ Seed complete:`)
  console.log(`   ${bookings.length} bookings (${completed.length} completed)`)
  console.log(`   $${grossRevenue.toLocaleString()} gross revenue`)
  console.log(`   $${thisMonthRevenue.toLocaleString()} this month`)
  console.log(`   2 cleaners, ${clients.length} clients, ${reviews.length} reviews`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
