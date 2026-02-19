'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, UserCheck, ClipboardCheck, Star } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { SERVICE_AREAS } from '@/lib/constants'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
}

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

export default function About() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-6">About Us</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              We Keep LA Properties <span className="text-primary">Guest-Ready</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
              Ready Rental Cleaning was built for one reason: Airbnb hosts deserve a cleaning service that is as reliable as they are. Fast turnarounds, professional quality, zero hassle.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop" alt="Modern clean apartment" className="rounded-2xl shadow-depth-3 w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </Section>

      {/* Property Photo Mosaic */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop', span: '' },
              { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop', span: '' },
              { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', span: 'md:col-span-2 md:row-span-2' },
              { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', span: '' },
              { src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop', span: '' },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`overflow-hidden rounded-xl ${photo.span}`}
              >
                <img src={photo.src} alt="Cleaned property" className="w-full h-full min-h-[180px] object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Section variant="default" padding="default">
        <AnimateOnScroll className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            Every guest checkout is a moment of truth for Airbnb hosts. A bad cleaning means bad reviews, lost bookings, and revenue down the drain. We exist to eliminate that risk. Our cleaners arrive on time, clean to hotel standards, and document everything with photos — so you never have to worry about your property again.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { value: 200, suffix: '+', label: 'LA Hosts Trust Us', desc: 'From individual owners to property managers with 20+ units' },
            { value: 1200, suffix: '+', label: 'Cleanings Completed', desc: 'Turnover, deep cleans, move-in/out — we handle it all' },
            { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1, desc: 'Consistently rated 5 stars by hosts across LA' },
          ].map((stat) => (
            <Card key={stat.label} depth={1} className="p-8 text-center">
              <StatCard value={stat.value} suffix={stat.suffix} label={stat.label} decimals={'decimals' in stat ? stat.decimals : 0} />
              <p className="text-sm text-muted-foreground mt-2">{stat.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">What Makes Us Different</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We are not just another cleaning service. We are built specifically for short-term rental hosts.</p>
          </div>
        </AnimateOnScroll>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Built for Airbnb', desc: 'We understand the unique needs of short-term rental turnovers — tight timelines, specific guest expectations, and the importance of every detail.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop' },
            { title: 'Photo Documentation', desc: 'Every cleaning includes before/after photos sent directly to you. Verify your property remotely and have proof if any guest damage claims arise.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop' },
            { title: 'Dedicated Cleaners', desc: 'Get assigned a dedicated cleaner who learns your property. Consistency means better quality and faster turnarounds every time.', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&h=300&fit=crop' },
            { title: 'Instant Online Booking', desc: 'Book and pay in 60 seconds from your phone. Get instant confirmation, 24h reminders, and completion notifications automatically.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop' },
          ].map((feat) => (
            <motion.div key={feat.title} variants={item}>
              <Card depth={1} hover="lift" className="overflow-hidden">
                <img src={feat.image} alt={feat.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section variant="default" padding="default">
        <AnimateOnScroll className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Our Service Area</h2>
            <p className="text-lg text-muted-foreground">We cover the top Airbnb neighborhoods in Los Angeles.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((a) => (
              <Card key={a.area} depth={1} className="p-4 text-center">
                <span className="font-medium text-foreground text-sm">{a.area}</span>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Not listed? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a> — we are expanding every month.
          </p>
        </AnimateOnScroll>
      </Section>

      <Section variant="muted" padding="default">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Your Property Is Protected</h2>
        </AnimateOnScroll>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid md:grid-cols-4 gap-6">
          {[
            { title: '$2M Insurance', desc: 'General liability coverage on every job', icon: Shield },
            { title: 'Background Checked', desc: 'Every cleaner verified before joining', icon: UserCheck },
            { title: 'Bonded & Licensed', desc: 'Fully compliant with CA regulations', icon: ClipboardCheck },
            { title: 'Satisfaction Guarantee', desc: 'Not happy? Free re-clean, no questions', icon: Star },
          ].map((trust) => (
            <motion.div key={trust.title} variants={item}>
              <Card depth={1} className="p-6 text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-muted rounded-xl mx-auto mb-3 border border-border">
                  <trust.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1 text-sm">{trust.title}</h3>
                <p className="text-xs text-muted-foreground">{trust.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section variant="cta" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Work with the Best?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">Join 200+ LA hosts who trust Ready Rental Cleaning for every turnover.</p>
          <a href="/book" className="inline-flex items-center justify-center h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
            Book Your First Cleaning
          </a>
        </div>
      </Section>
    </div>
  )
}
