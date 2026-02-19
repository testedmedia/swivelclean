'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ChevronRight, Clock, Camera, Shield, Star, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatsBar } from '@/components/seo/stats-bar'
import { NEIGHBORHOODS } from '@/lib/seo-data'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

export default function AirbnbTurnoverCleaningLA() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Los Angeles</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Airbnb Turnover Cleaning<br />
            <span className="text-primary">Los Angeles</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Professional turnover cleaning for LA Airbnb hosts. $180 flat rate. 3-4 hours. Before/after photos. Same-day available. 100% satisfaction guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book in 60 Seconds
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/services" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              See Pricing
            </a>
          </div>
        </div>
      </Section>

      <Section variant="muted" padding="default">
        <StatsBar stats={[
          { value: '200+', label: 'LA hosts served' },
          { value: '1,200+', label: 'Cleanings completed' },
          { value: '4.9★', label: 'Average rating' },
          { value: '$180', label: 'Flat rate (1-2BR)' },
        ]} />
      </Section>

      {/* The Numbers That Matter */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">The Numbers That Matter</h2>
            <p className="text-muted-foreground text-center mb-12">Professional cleaning isn't an expense. It's an investment with measurable returns.</p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '+$1,200/year',
                label: 'Additional revenue',
                desc: 'Hosts with 4.8+ ratings earn 30% more bookings than 4.2-rated properties. At LA average rates, that\'s $1,200+/year in additional revenue.',
              },
              {
                stat: '0 cancelled',
                label: 'Bookings from no-shows',
                desc: 'A single cancelled cleaning can cost you a $200+ booking AND a bad review. We guarantee arrival with full team backup — zero no-shows, ever.',
              },
              {
                stat: '47 points',
                label: 'Quality checklist',
                desc: 'Every turnover follows our 47-point checklist: bedrooms, bathrooms, kitchen, living areas, arrival prep, and completion verification with photos.',
              },
            ].map((item) => (
              <AnimateOnScroll key={item.stat}>
                <Card depth={1} className="p-8 text-center h-full">
                  <div className="text-3xl font-extrabold text-primary mb-2">{item.stat}</div>
                  <div className="text-sm font-bold text-foreground mb-3">{item.label}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">What's Included in Every Turnover</h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Full linen change with hotel-style bed making',
              'Bathroom deep clean + disinfection',
              'Kitchen counters, appliances, sink',
              'All floors vacuumed and mopped',
              'Trash removal + liner replacement',
              'Essentials restock check',
              'Before/after photo documentation',
              '47-point quality verification checklist',
              'Dust all surfaces, TV, remotes',
              'Check for guest items left behind',
            ].map((item) => (
              <AnimateOnScroll key={item}>
                <div className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border/60">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Service Areas */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4">We Cover All of LA</h2>
            <p className="text-muted-foreground mb-10">Click any neighborhood for local details and market stats.</p>
          </AnimateOnScroll>

          <div className="flex flex-wrap gap-3 justify-center">
            {NEIGHBORHOODS.map((n) => (
              <a key={n.slug} href={`/airbnb-cleaning/${n.slug}`} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-secondary text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
                <MapPin className="w-3 h-3" />
                {n.name}
              </a>
            ))}
            {['Koreatown', 'Echo Park', 'Mar Vista', 'Culver City', 'Brentwood', 'Century City'].map((area) => (
              <span key={area} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-secondary text-muted-foreground rounded-full text-sm font-medium">
                <MapPin className="w-3 h-3" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Simple, Transparent Pricing</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Standard Turnover', price: '$180', time: '3-4 hrs', desc: '1-2 bedroom · Guest-ready cleaning', popular: false },
              { name: 'Premium Turnover', price: '$220', time: '4-5 hrs', desc: '3+ bedroom · Larger properties', popular: true },
              { name: 'Deep Clean', price: '$350', time: '5-6 hrs', desc: 'Top-to-bottom reset · Monthly recommended', popular: false },
            ].map((plan) => (
              <AnimateOnScroll key={plan.name}>
                <Card depth={plan.popular ? 2 : 1} className={`p-8 text-center h-full ${plan.popular ? 'border-primary/30 relative' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Most Popular</Badge>
                    </div>
                  )}
                  <h3 className="font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-4xl font-extrabold text-primary mb-1">{plan.price}</div>
                  <p className="text-xs text-muted-foreground mb-4">{plan.time} · {plan.desc}</p>
                  <a href="/book" className="inline-flex items-center justify-center w-full h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all">
                    Book Now
                  </a>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="hero" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Your Next Guest Deserves Spotless
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book in 60 seconds. We handle the rest.
          </p>
          <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
            Book a Cleaning
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </Section>
    </div>
  )
}
