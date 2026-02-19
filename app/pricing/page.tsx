'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ChevronRight, ArrowRight, Calculator, Star, Shield, Zap, Award, Minus, Plus } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ADDONS } from '@/lib/constants'

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

const FLAT_RATES = [
  { type: 'Studio / 1BR', turnover: 150, deep: 280, popular: false },
  { type: '2 Bedroom', turnover: 180, deep: 350, popular: true },
  { type: '3 Bedroom', turnover: 220, deep: 420, popular: false },
  { type: '4 Bedroom', turnover: 280, deep: 520, popular: false },
  { type: '5+ Bedroom', turnover: null, deep: null, popular: false },
]

const VOLUME_TIERS = [
  { range: '1–5 cleans/mo', discount: '0%', label: 'Standard rate', color: 'text-foreground' },
  { range: '6–10 cleans/mo', discount: '10% off', label: 'Growing host', color: 'text-primary' },
  { range: '11–20 cleans/mo', discount: '15% off', label: 'Power host', color: 'text-primary' },
  { range: '20+ cleans/mo', discount: 'Custom', label: 'Property manager', color: 'text-primary' },
]

export default function PricingPage() {
  const [bedrooms, setBedrooms] = useState(2)
  const [turnoversPerMonth, setTurnoversPerMonth] = useState(8)

  const basePrice = bedrooms <= 1 ? 150 : bedrooms === 2 ? 180 : bedrooms === 3 ? 220 : bedrooms === 4 ? 280 : 320
  const discount = turnoversPerMonth >= 20 ? 0.18 : turnoversPerMonth >= 11 ? 0.15 : turnoversPerMonth >= 6 ? 0.10 : 0
  const discountedPrice = Math.round(basePrice * (1 - discount))
  const monthlyCost = discountedPrice * turnoversPerMonth
  const annualSavings = Math.round(basePrice * turnoversPerMonth * 12 * discount)

  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Transparent Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Flat-Rate Pricing.<br />
            <span className="text-primary">No Surprises. Ever.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Every price includes supplies, insurance, before/after photos, and our 100% satisfaction guarantee. What you see is what you pay.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> All supplies included</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> $2M insurance</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Before/after photos</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> 47-point checklist</span>
          </div>
        </div>
      </Section>

      {/* Flat Rate Grid */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Flat Rate by Property Size</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">One price per clean. No hourly billing, no hidden fees, no surprises on your invoice.</p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-0 mb-2 px-6">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Property Size</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Turnover Clean</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Deep Clean</div>
            <div />
          </div>

          {/* Table Rows */}
          {FLAT_RATES.map((rate) => (
            <AnimateOnScroll key={rate.type}>
              <div className={`grid sm:grid-cols-4 gap-4 items-center p-6 rounded-xl mb-2 ${rate.popular ? 'bg-primary/5 border-2 border-primary/20 relative' : 'bg-muted/30 border border-border/40'}`}>
                {rate.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge>Most Common</Badge>
                  </div>
                )}
                <div className="font-bold text-foreground">{rate.type}</div>
                <div className="text-center">
                  {rate.turnover ? (
                    <span className="text-2xl font-extrabold text-foreground">${rate.turnover}</span>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">Custom quote</span>
                  )}
                  <div className="text-xs text-muted-foreground">per turnover</div>
                </div>
                <div className="text-center">
                  {rate.deep ? (
                    <span className="text-2xl font-extrabold text-foreground">${rate.deep}</span>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">Custom quote</span>
                  )}
                  <div className="text-xs text-muted-foreground">deep clean</div>
                </div>
                <div className="text-center">
                  <a href="/book" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Book Now <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* Instant Quote Calculator */}
      <Section variant="muted" padding="default">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <Calculator className="w-3 h-3 mr-1" />
                Instant Quote
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Calculate Your Monthly Cost</h2>
              <p className="text-muted-foreground">Adjust bedrooms and turnovers to see your exact pricing. Volume discounts apply automatically.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <Card depth={2} className="p-8">
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Bedrooms</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-3xl font-extrabold text-foreground w-12 text-center">{bedrooms}</span>
                    <button onClick={() => setBedrooms(Math.min(6, bedrooms + 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Turnovers per month */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Turnovers per month</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setTurnoversPerMonth(Math.max(1, turnoversPerMonth - 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-3xl font-extrabold text-foreground w-12 text-center">{turnoversPerMonth}</span>
                    <button onClick={() => setTurnoversPerMonth(Math.min(30, turnoversPerMonth + 1))} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base price per clean</span>
                  <span className="text-sm font-medium">${basePrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary font-medium">Volume discount ({Math.round(discount * 100)}% off)</span>
                    <span className="text-sm font-medium text-primary">-${basePrice - discountedPrice}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your price per clean</span>
                  <span className="text-lg font-bold text-foreground">${discountedPrice}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Monthly total ({turnoversPerMonth} cleans)</span>
                  <span className="text-3xl font-extrabold text-primary">${monthlyCost.toLocaleString()}</span>
                </div>
                {annualSavings > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary">Annual savings with volume discount</span>
                    <span className="text-sm font-bold text-primary">${annualSavings.toLocaleString()}/year</span>
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <a href="/book" className="inline-flex items-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                  Book at This Price
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Volume Discounts */}
      <Section variant="default" padding="default">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Volume Discounts</h2>
              <p className="text-muted-foreground">The more you book, the more you save. Discounts apply automatically.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VOLUME_TIERS.map((tier) => (
              <AnimateOnScroll key={tier.range}>
                <Card depth={1} className="p-6 text-center h-full">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{tier.label}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{tier.range}</div>
                  <div className={`text-2xl font-extrabold ${tier.color}`}>{tier.discount}</div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Managing 20+ properties? <a href="/property-managers" className="text-primary font-semibold hover:text-primary/80">Get custom enterprise pricing →</a>
            </p>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Add-Ons */}
      <Section variant="muted" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Optional Add-Ons</h2>
              <p className="text-muted-foreground">Customize your cleaning with these extras. Add any to your booking.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((addon) => (
              <AnimateOnScroll key={addon.name}>
                <div className="flex items-center justify-between bg-background rounded-xl p-4 border border-border/60">
                  <div>
                    <div className="text-sm font-bold text-foreground">{addon.name}</div>
                    <p className="text-xs text-muted-foreground">{addon.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-primary whitespace-nowrap ml-4">{addon.price}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Every Clean Includes</h2>
              <p className="text-muted-foreground">No hidden fees. All of this is standard with every booking.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: '$2M Insurance', desc: 'Full general liability coverage on every job' },
              { icon: Star, title: '47-Point Checklist', desc: 'Every room verified before we leave' },
              { icon: Zap, title: 'Before/After Photos', desc: 'Photo proof sent within 30 minutes' },
              { icon: Award, title: '100% Guarantee', desc: 'Not satisfied? Free re-clean, no questions' },
            ].map((f) => (
              <AnimateOnScroll key={f.title}>
                <div className="text-center p-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-foreground mb-1">{f.title}</div>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="cta" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Ready to Book?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            60 seconds to book. 3 hours to spotless. 100% guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
              Book a Cleaning
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/guarantee" className="inline-flex items-center justify-center h-14 px-8 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
              See Our Guarantees
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
