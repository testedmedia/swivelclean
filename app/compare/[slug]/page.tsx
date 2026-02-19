'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, ChevronRight, Shield, Check, X } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ComparisonTable } from '@/components/seo/comparison-table'
import { COMPARISONS } from '@/lib/seo-data'
import { notFound } from 'next/navigation'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

export default function ComparePage() {
  const params = useParams()
  const slug = params?.slug as string
  const data = COMPARISONS.find((c) => c.slug === slug)

  if (!data) return notFound()

  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Comparison</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {data.description}
          </p>

          {/* Hero Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-2xl px-8 py-5 shadow-depth-2"
          >
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="text-lg font-bold text-red-700">{data.heroLine}</span>
          </motion.div>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section variant="default" padding="default">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">Side-by-Side Comparison</h2>
            <p className="text-muted-foreground text-center mb-10">Real numbers. No fluff. See exactly what you get.</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <Card depth={1} className="overflow-hidden">
              <ComparisonTable rows={data.stats} competitorName={data.competitor} />
            </Card>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Risk Factors */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">Hidden Risks of {data.competitor}</h2>
            <p className="text-muted-foreground text-center mb-10">What the price tag doesn't tell you.</p>
          </AnimateOnScroll>

          <div className="space-y-4">
            {data.risks.map((risk, i) => (
              <AnimateOnScroll key={i}>
                <div className="flex items-start gap-4 bg-background rounded-xl p-5 border border-red-200/60 shadow-sm">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{risk}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* What You Get Instead */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">What Ready Rental Cleaning Delivers</h2>
            <p className="text-muted-foreground text-center mb-10">Every cleaning. Every property. Guaranteed.</p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '$180 Flat Rate', desc: 'No hidden fees, no surge pricing, no platform markup. The price you see is the price you pay.' },
              { title: '47-Point Checklist', desc: 'Every room, every surface, every detail — checked and verified before we leave.' },
              { title: '$2M Insurance', desc: 'Full general liability on every job. Your property is protected, period.' },
              { title: 'Before/After Photos', desc: 'Automatic photo documentation sent to you within 30 minutes of completion.' },
              { title: 'Same-Day Available', desc: 'Book before 10 AM and we\'re at your door by afternoon. Emergency turnovers covered.' },
              { title: '100% Guarantee', desc: 'Not perfect? We come back and re-clean for free. No questions asked, no hassle.' },
            ].map((item) => (
              <AnimateOnScroll key={item.title}>
                <Card depth={1} className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Verdict */}
      <Section variant="muted" padding="default">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <Card depth={2} className="p-8 sm:p-10 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">The Verdict</h2>
              </div>
              <p className="text-foreground leading-relaxed">{data.verdict}</p>
            </Card>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="hero" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Stop Gambling. Start Guaranteeing.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            $180 per turnover. Dedicated team. Before/after photos. 100% satisfaction guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book Your First Cleaning
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              Talk to Us First
            </a>
          </div>
        </div>
      </Section>

      {/* Other Comparisons */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-6">Other Comparisons</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {COMPARISONS.filter((c) => c.slug !== slug).map((c) => (
              <a key={c.slug} href={`/compare/${c.slug}`} className="px-5 py-2.5 bg-secondary text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
                vs. {c.competitor}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
