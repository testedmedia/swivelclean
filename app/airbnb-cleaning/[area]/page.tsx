'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { MapPin, Shield, Camera, Clock, Star, ChevronRight, CheckCircle } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatsBar } from '@/components/seo/stats-bar'
import { NEIGHBORHOODS } from '@/lib/seo-data'
import { notFound } from 'next/navigation'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

export default function NeighborhoodPage() {
  const params = useParams()
  const area = params?.area as string
  const data = NEIGHBORHOODS.find((n) => n.slug === area)

  if (!data) return notFound()

  const revenueLost = Math.round(parseFloat(data.avgNightlyRate.replace('$', '')) * 3)

  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">
            <MapPin className="w-3 h-3 mr-1" />
            {data.name}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {data.description}
          </p>

          <div className="inline-flex items-center gap-3 bg-background/80 backdrop-blur-xl border border-primary/20 rounded-2xl px-8 py-5 shadow-depth-2 mb-10">
            <span className="text-4xl font-extrabold text-primary">{data.heroStat}</span>
            <span className="text-sm text-muted-foreground text-left">{data.heroStatLabel}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-1 hover:bg-primary/90 transition-all">
              Book a Cleaning
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/services" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              View Pricing
            </a>
          </div>
        </div>
      </Section>

      {/* Market Stats */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <h2 className="text-2xl font-bold text-center mb-10">{data.name} Short-Term Rental Market</h2>
          <StatsBar stats={[
            { value: data.listings, label: 'Active listings' },
            { value: data.avgNightlyRate, label: 'Avg nightly rate' },
            { value: data.avgOccupancy, label: 'Avg occupancy' },
            { value: `$${revenueLost}+`, label: 'Lost per bad review' },
          ]} />
        </AnimateOnScroll>
      </Section>

      {/* The Real Cost of Bad Cleaning */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">The Real Cost of Bad Cleaning in {data.name}</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {data.localContext}
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Without Us */}
            <AnimateOnScroll>
              <Card depth={1} className="p-8 border-red-200 bg-red-50/30">
                <h3 className="text-lg font-bold text-red-700 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold">✕</span>
                  Without Professional Cleaning
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Average rating', value: '4.2 stars', sub: 'Inconsistent cleaning shows' },
                    { label: 'Monthly bookings', value: '12-15', sub: 'Lower rating = fewer clicks' },
                    { label: 'Revenue per month', value: `$${Math.round(parseFloat(data.avgNightlyRate.replace('$', '')) * 13)}`, sub: 'Based on avg rate × bookings' },
                    { label: 'Cleaning gaps/year', value: '6-10', sub: 'Cancellations, no-shows, emergencies' },
                    { label: 'Time spent cleaning', value: '20+ hrs/month', sub: 'Your time, not theirs' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-start py-2 border-b border-red-100 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <p className="text-xs text-red-500">{item.sub}</p>
                      </div>
                      <span className="text-sm font-bold text-red-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>

            {/* With Us */}
            <AnimateOnScroll>
              <Card depth={2} className="p-8 border-primary/30 bg-primary/5">
                <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">✓</span>
                  With Ready Rental Cleaning
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Average rating', value: '4.8+ stars', sub: '47-point checklist, every time' },
                    { label: 'Monthly bookings', value: '18-22', sub: 'Higher rating = 30% more bookings' },
                    { label: 'Revenue per month', value: `$${Math.round(parseFloat(data.avgNightlyRate.replace('$', '')) * 20)}`, sub: 'Based on avg rate × bookings' },
                    { label: 'Cleaning gaps/year', value: '0', sub: 'Full team backup, guaranteed' },
                    { label: 'Time spent on cleaning', value: '0 hrs/month', sub: 'You book. We clean. That\'s it.' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-start py-2 border-b border-primary/10 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <p className="text-xs text-primary">{item.sub}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>
          </div>

          {/* Net Savings Callout */}
          <AnimateOnScroll>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
              <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2">Net Monthly Gain</p>
              <p className="text-4xl font-extrabold text-emerald-700 mb-2">
                +${Math.round(parseFloat(data.avgNightlyRate.replace('$', '')) * 7 - 1440)}/month
              </p>
              <p className="text-sm text-emerald-600">
                More bookings from higher ratings minus cleaning cost ($1,440/mo for 8 turnovers)
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Common Pain Points */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">{data.name} Hosting Challenges</h2>
            <p className="text-muted-foreground text-center mb-12">Problems specific to {data.name} properties that we solve.</p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {data.painPoints.map((point, i) => (
              <AnimateOnScroll key={i}>
                <Card depth={1} className="p-6 h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{point}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Property Types */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Properties We Clean in {data.name}</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {data.topPropertyTypes.map((type) => (
                <div key={type} className="flex items-center gap-3 bg-secondary rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{type}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* What You Get */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">What Every {data.name} Host Gets</h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: '3-4 Hour Turnovers', desc: 'Fast enough for same-day check-in/out' },
              { icon: Camera, title: 'Before/After Photos', desc: 'Photo proof of every clean, sent automatically' },
              { icon: Shield, title: '$2M Insurance', desc: 'Full liability coverage on every job' },
              { icon: Star, title: '100% Guarantee', desc: 'Not perfect? Free re-clean, no questions asked' },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title}>
                <Card depth={1} className="p-6 text-center h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Nearby Areas */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-6">Also Serving Nearby Areas</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.nearbyAreas.map((area) => {
              const slug = area.toLowerCase().replace(/\s+/g, '-')
              const exists = NEIGHBORHOODS.find((n) => n.slug === slug)
              return exists ? (
                <a key={area} href={`/airbnb-cleaning/${slug}`} className="px-4 py-2 bg-secondary text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
                  {area}
                </a>
              ) : (
                <span key={area} className="px-4 py-2 bg-secondary text-muted-foreground rounded-full text-sm font-medium">
                  {area}
                </span>
              )
            })}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="hero" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Ready to Dominate {data.name} Reviews?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            $180 per turnover. Same-day available. 100% guarantee. Book in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book Your First Cleaning
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              Get a Custom Quote
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
