'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, ChevronRight, CheckCircle } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatsBar } from '@/components/seo/stats-bar'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

export default function DeepCleanPage() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            Deep Clean
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Vacation Rental Deep Cleaning<br />
            <span className="text-primary">Los Angeles</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The reset button for your rental property. Top-to-bottom, every surface, every corner. $350 flat rate. Before/after photos. $2M insured.
          </p>
          <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
            Book a Deep Clean
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </Section>

      <Section variant="muted" padding="default">
        <StatsBar stats={[
          { value: '$350', label: 'Flat rate deep clean' },
          { value: '5-6 hrs', label: 'Thorough top-to-bottom' },
          { value: '60+', label: 'Point inspection checklist' },
          { value: '100%', label: 'Satisfaction guarantee' },
        ]} />
      </Section>

      {/* Deep Clean vs Turnover */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Turnover vs. Deep Clean</h2>
            <p className="text-muted-foreground text-center mb-12">Different jobs for different situations. Here's when you need each.</p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimateOnScroll>
              <Card depth={1} className="p-8 h-full">
                <h3 className="text-lg font-bold text-foreground mb-2">Standard Turnover — $180</h3>
                <p className="text-sm text-muted-foreground mb-4">Guest-ready in 3-4 hours. For regular check-in/check-out.</p>
                <ul className="space-y-2">
                  {['Linens, bathrooms, kitchen, floors', 'Surface-level clean', 'Perfect for between every guest'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <Card depth={2} className="p-8 h-full border-primary/30">
                <h3 className="text-lg font-bold text-primary mb-2">Deep Clean — $350</h3>
                <p className="text-sm text-muted-foreground mb-4">Like-new condition in 5-6 hours. Monthly reset recommended.</p>
                <ul className="space-y-2">
                  {['Everything in a turnover PLUS:', 'Inside appliances, vents, light fixtures', 'Wall washing, grout treatment, baseboards', 'Under/behind all furniture', 'Cabinet interiors, window tracks'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* ROI of Monthly Deep Cleans */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">The ROI of Monthly Deep Cleans</h2>
            <p className="text-muted-foreground text-center mb-12">Properties that deep clean monthly earn measurably more.</p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '+0.3★',
                label: 'Rating improvement',
                desc: 'Properties with monthly deep cleans average 0.3 stars higher than turnover-only properties. In LA\'s competitive market, that\'s the difference between page 1 and page 3.',
              },
              {
                stat: '$2,400/yr',
                label: 'Additional revenue',
                desc: 'Higher ratings drive more bookings. At LA rates, the 0.3-star improvement translates to $200/month in additional bookings — $2,400/year from $4,200 invested.',
              },
              {
                stat: '3x longer',
                label: 'Fixture lifespan',
                desc: 'Regular deep cleaning extends the life of grout, appliances, flooring, and fixtures. A $350 monthly deep clean prevents $1,000+ replacements down the road.',
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

      {/* Full Checklist */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Complete Deep Clean Checklist</h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'All standard turnover items',
              'Wall washing (all rooms)',
              'Baseboard detailing',
              'Inside oven cleaning',
              'Inside refrigerator + shelves',
              'Dishwasher interior',
              'Microwave deep clean',
              'Vent and fan blade cleaning',
              'Grout treatment (bathrooms)',
              'Window interior cleaning',
              'Window track cleaning',
              'Under all furniture',
              'Behind all furniture',
              'Cabinet interior wipe-down',
              'Light fixture cleaning',
              'Door and doorframe wiping',
              'Switch plate sanitization',
              'Closet shelf dusting',
              'Full before/after photo report',
              'Quality inspection walkthrough',
            ].map((item) => (
              <AnimateOnScroll key={item}>
                <div className="flex items-center gap-3 bg-secondary rounded-lg p-3">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* When to Book */}
      <Section variant="muted" padding="default">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">When to Book a Deep Clean</h2>
          </AnimateOnScroll>

          <div className="space-y-4">
            {[
              { when: 'Monthly', desc: 'Recommended for active listings with 10+ turnovers/month. Keeps everything in like-new condition.' },
              { when: 'Before a new listing goes live', desc: 'First impressions define your rating. Start with a deep clean for 5-star photos and reviews from day one.' },
              { when: 'After a long-term guest', desc: 'Guests staying 7+ days leave deeper wear. A turnover won\'t catch what accumulates over a week.' },
              { when: 'Post-renovation', desc: 'Construction dust gets everywhere — inside cabinets, vents, behind appliances. We clean what builders don\'t.' },
              { when: 'Seasonal reset (spring/fall)', desc: 'At minimum, twice a year. Catches the buildup that turnovers miss over months.' },
            ].map((item) => (
              <AnimateOnScroll key={item.when}>
                <Card depth={0} className="p-5 bg-background border border-border">
                  <h3 className="font-bold text-primary mb-1 text-sm">{item.when}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
            Give Your Property the Reset It Deserves
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            $350 flat rate. 5-6 hours. Every surface, every corner. Before/after photos included.
          </p>
          <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
            Book a Deep Clean
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </Section>
    </div>
  )
}
