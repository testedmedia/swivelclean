'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Check, ArrowRight, Clock, Star, RefreshCw, UserCheck, Phone, AlertTriangle } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
}

export default function GuaranteePage() {
  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="success" className="mb-6">
            <Shield className="w-3.5 h-3.5" />
            Our Promise to You
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Four Guarantees.<br />
            <span className="text-primary">Zero Risk.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We put our money where our mouth is. If we don't deliver, you don't pay. No fine print, no exceptions, no arguments.
          </p>
        </div>
      </Section>

      {/* Guarantee 1: No-Show */}
      <Section variant="default" padding="default" id="no-show">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Never a No-Show Guarantee</h2>
                <p className="text-muted-foreground mb-6">
                  Your cleaner will show up. Period. We maintain a full backup team for every booking. If your assigned cleaner has an emergency, a qualified replacement is dispatched within 60 minutes — or the cleaning is free.
                </p>
                <div className="space-y-3">
                  {[
                    'Full backup team on standby for every booking',
                    'Replacement dispatched within 60 minutes if needed',
                    'If we can\'t get anyone there — your cleaning is 100% free',
                    'You are notified immediately of any changes',
                    'Zero no-shows across 1,200+ cleanings to date',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <Card depth={2} className="p-8 bg-red-50/50 border-red-200/60">
                <div className="text-center">
                  <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-red-700 mb-3">What a No-Show Costs You</h3>
                  <div className="space-y-3 text-left">
                    {[
                      { cost: '$200+', label: 'Lost booking if property isn\'t ready' },
                      { cost: '$150+', label: 'Emergency backup from TaskRabbit' },
                      { cost: '0.2 stars', label: 'Rating drop from one "dirty" review' },
                      { cost: '5+ hours', label: 'Your time scrambling for a fix' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-2 border-b border-red-100 last:border-0">
                        <span className="text-xs text-red-600">{row.label}</span>
                        <span className="text-sm font-bold text-red-700">{row.cost}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-500 mt-4 font-semibold">With us: $0 risk. We guarantee it.</p>
                </div>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* Guarantee 2: Satisfaction / Re-Clean */}
      <Section variant="muted" padding="default" id="satisfaction">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll className="order-2 md:order-1">
              <Card depth={2} className="p-8 bg-primary/5 border-primary/20">
                <div className="text-center">
                  <RefreshCw className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-primary mb-3">How It Works</h3>
                  <div className="space-y-4 text-left">
                    {[
                      { step: '1', title: 'You notice an issue', desc: 'Anything missed, any area not up to standard' },
                      { step: '2', title: 'Contact us within 24 hours', desc: 'Call, text, or email — whatever is easiest' },
                      { step: '3', title: 'We send a crew back', desc: 'Same day or next day, at no additional charge' },
                      { step: '4', title: 'Still not happy? Full refund', desc: 'If re-clean doesn\'t meet your standards, 100% money back' },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-3">
                        <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">{s.title}</div>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll className="order-1 md:order-2">
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">100% Satisfaction Guarantee</h2>
                <p className="text-muted-foreground mb-6">
                  If anything isn't perfect, we come back and re-clean for free. No arguments, no questions, no guilt trips. If you're still not satisfied after the re-clean, you get a full refund. We'd rather lose money than lose your trust.
                </p>
                <div className="space-y-3">
                  {[
                    'Free re-clean within 24 hours of reporting an issue',
                    'Full refund if re-clean still doesn\'t meet your standards',
                    'No paperwork, no hoops to jump through',
                    'Your feedback improves our process for next time',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* Guarantee 3: 5-Star Rating */}
      <Section variant="default" padding="default" id="five-star">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">5-Star Rating Guarantee</h2>
                <p className="text-muted-foreground mb-6">
                  We're so confident in our cleaning quality that we guarantee your Airbnb cleanliness rating will improve. If your average cleanliness rating drops after switching to us, we'll refund your last 3 months of service. That's how much we believe in what we do.
                </p>
                <div className="space-y-3">
                  {[
                    'Your cleanliness rating must improve or stay the same',
                    'Measured over a 90-day period after your first clean',
                    'If it drops, last 3 months of cleaning fees refunded',
                    'We track this proactively and reach out if scores dip',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-4xl font-extrabold text-foreground mb-1">4.9</div>
                <div className="text-sm text-muted-foreground mb-6">Average cleanliness rating across all our clients</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/80 rounded-xl p-3">
                    <div className="text-xl font-extrabold text-primary">93%</div>
                    <div className="text-xs text-muted-foreground">of guests rate 5 stars</div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-3">
                    <div className="text-xl font-extrabold text-primary">0.4</div>
                    <div className="text-xs text-muted-foreground">avg rating increase</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* Guarantee 4: Insurance & Damage */}
      <Section variant="muted" padding="default" id="insurance">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll className="order-2 md:order-1">
              <Card depth={2} className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-4 text-center">Our Coverage</h3>
                <div className="space-y-4">
                  {[
                    { label: 'General Liability', value: '$2,000,000' },
                    { label: 'Per Occurrence', value: '$1,000,000' },
                    { label: 'Property Damage', value: 'Full coverage' },
                    { label: 'Bodily Injury', value: 'Full coverage' },
                    { label: 'Background Checks', value: 'Every cleaner' },
                    { label: 'Bonded', value: 'Yes' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-bold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll className="order-1 md:order-2">
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">$2M Insurance & Damage Protection</h2>
                <p className="text-muted-foreground mb-6">
                  Every cleaner on our team is fully insured and bonded. If anything is damaged during a cleaning — we cover it. No deductibles for you, no finger-pointing, no hassle. Your property is protected from the moment we walk in to the moment we leave.
                </p>
                <div className="space-y-3">
                  {[
                    'Full general liability coverage on every job',
                    'Damage claims processed within 48 hours',
                    'No deductible for the host — ever',
                    'Certificate of insurance available on request',
                    'All cleaners bonded and background-checked',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Your Protection at a Glance</h2>
            </div>
          </AnimateOnScroll>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Clock, title: 'No-Show', desc: 'Backup within 60 min or cleaning is free', color: 'bg-blue-50 border-blue-200' },
              { icon: RefreshCw, title: 'Re-Clean', desc: 'Free re-clean + full refund option', color: 'bg-green-50 border-green-200' },
              { icon: Star, title: '5-Star', desc: 'Rating drops = 3 months refunded', color: 'bg-amber-50 border-amber-200' },
              { icon: Shield, title: '$2M Insured', desc: 'Full coverage, zero deductible for you', color: 'bg-purple-50 border-purple-200' },
            ].map((g) => (
              <motion.div key={g.title} variants={item}>
                <div className={`rounded-2xl border-2 p-6 text-center h-full ${g.color}`}>
                  <g.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-bold text-foreground mb-1">{g.title} Guarantee</div>
                  <p className="text-xs text-muted-foreground">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="cta" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Zero Risk. Book With Confidence.
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            4 guarantees. $2M insurance. 1,200+ cleanings with zero unresolved complaints. Your property is in safe hands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
              Book a Cleaning
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/pricing" className="inline-flex items-center justify-center h-14 px-8 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
              See Pricing
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
