'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Star, Camera, UserCheck, Award, Check, ChevronRight, Calculator, X, Clock, DollarSign, TrendingUp, AlertTriangle, Phone } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { ServiceCard } from '@/components/ui/service-card'
import { ReviewCard } from '@/components/ui/review-card'
import { TrustBadge } from '@/components/ui/trust-badge'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { SERVICES, TESTIMONIALS } from '@/lib/constants'

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Badge variant="success" className="mb-6">
                <Check className="w-3.5 h-3.5" />
                Trusted by 200+ LA Airbnb Hosts
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
                Your Airbnb Ready in{' '}
                <span className="text-primary">3 Hours</span>
                <br />
                <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Every Time. Guaranteed.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Professional turnover &amp; deep cleaning for LA short-term rental hosts.
                West Hollywood to Venice. Book in 60 seconds, pay online, we handle the rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <ShimmerButton href="/book">
                  Book a Cleaning
                  <ArrowRight className="w-5 h-5" />
                </ShimmerButton>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center h-14 px-8 border-2 border-primary bg-white text-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  View Pricing
                </a>
              </div>

              <div className="flex items-center gap-6">
                <TrustBadge icon={Shield} label="Fully Insured" />
                <TrustBadge icon={Zap} label="Same-Day Available" />
                <TrustBadge icon={Star} label="4.9 ★ Rating" />
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-depth-4">
                  <img
                    src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop&q=90"
                    alt="Luxury clean apartment interior"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Floating card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-border/30 rounded-2xl p-4 shadow-depth-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">1,200+</div>
                      <div className="text-xs text-muted-foreground">Cleanings Completed</div>
                    </div>
                  </div>
                </motion.div>
                {/* Floating rating */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute -top-4 -right-4 bg-background/80 backdrop-blur-xl border border-border/30 rounded-2xl p-4 shadow-depth-3"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.9</div>
                    <div className="flex gap-0.5 justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">200+ reviews</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Stats Bar */}
      <section className="bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={200} suffix="+" label="Happy Hosts" />
            <StatCard value={1200} suffix="+" label="Cleanings Done" />
            <StatCard value={4.9} decimals={1} suffix="★" label="Average Rating" />
            <StatCard value={3} suffix="hr" label="Avg Turnaround" />
          </div>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="overflow-hidden py-8 bg-background">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 w-max"
        >
          {[
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=280&fit=crop',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=280&fit=crop',
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Clean LA property"
              className="w-72 h-48 object-cover rounded-xl flex-shrink-0"
            />
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Book in 60 Seconds. We Handle Everything.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From booking to spotless — here is how it works.
            </p>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { step: '01', title: 'Book Online', desc: 'Enter your property address, pick a service, choose a date. Secure payment via Stripe. Done in 60 seconds.', icon: <Zap className="w-7 h-7" />, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=200&fit=crop' },
            { step: '02', title: 'We Clean', desc: 'Our background-checked, insured cleaner arrives on schedule with professional supplies. 3-4 hour turnaround.', icon: <Award className="w-7 h-7" />, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=200&fit=crop' },
            { step: '03', title: 'Guest Ready', desc: 'Get before/after photos, confirmation email, and invoice. Your property is spotless for the next guest.', icon: <Check className="w-7 h-7" />, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=200&fit=crop' },
          ].map((step) => (
            <motion.div key={step.step} variants={item}>
              <Card depth={1} hover="lift" className="overflow-hidden relative">
                <img src={step.image} alt={step.title} className="w-full h-40 object-cover" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-depth-2">
                  Step {step.step}
                </div>
                <div className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══ 3-WAY COMPARISON — DIY vs Maid vs Ready Rental ═══ */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              The Numbers Don't Lie
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Compare Your Options Side-by-Side
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real numbers from real LA hosts. See exactly what you're paying — in money, time, and revenue — for each approach.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-6xl mx-auto">
          {/* Column Headers (Desktop) */}
          <div className="hidden md:grid md:grid-cols-4 gap-0 mb-0">
            <div />
            <AnimateOnScroll>
              <div className="bg-red-50 border border-red-200 border-b-0 rounded-t-2xl p-5 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-sm font-bold text-red-700">DIY Cleaning</h3>
                <p className="text-xs text-red-500 mt-1">You do it yourself</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="bg-amber-50 border border-amber-200 border-b-0 rounded-t-2xl p-5 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-sm font-bold text-amber-700">Maid / Marketplace</h3>
                <p className="text-xs text-amber-500 mt-1">Thumbtack, TaskRabbit, etc.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="bg-primary/5 border-2 border-primary/30 border-b-0 rounded-t-2xl p-5 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Recommended</Badge>
                </div>
                <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-primary">Ready Rental Cleaning</h3>
                <p className="text-xs text-primary/70 mt-1">Purpose-built for Airbnb</p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Comparison Rows */}
          {[
            {
              label: 'Time per turnover',
              diy: { value: '4–6 hours', note: 'Your time cleaning instead of earning' },
              maid: { value: '3–5 hours', note: 'Inconsistent, no Airbnb training' },
              us: { value: '3 hours', note: '47-point checklist, trained for turnovers' },
            },
            {
              label: 'Cost per clean',
              diy: { value: '$0 (your labor)', note: 'But your time is worth $50–100/hr' },
              maid: { value: '$120–200', note: 'Variable pricing, plus booking fees' },
              us: { value: '$180 flat', note: 'All-inclusive — supplies, insurance, photos' },
            },
            {
              label: 'Hourly value of your time',
              diy: { value: '-$150+', note: 'Cleaning instead of managing your business' },
              maid: { value: '-$40/hr', note: 'Time spent vetting, managing, QA-ing' },
              us: { value: '$0', note: 'You book online. We handle everything.' },
            },
            {
              label: 'Quality consistency',
              diy: { value: 'Depends on you', note: 'Burnout = corners cut over time' },
              maid: { value: 'Hit or miss', note: 'Different person every time' },
              us: { value: 'Guaranteed', note: 'Same team, 47-point checklist, photos' },
            },
            {
              label: 'Photo documentation',
              diy: { value: 'None', note: 'No proof if guest claims damage' },
              maid: { value: 'Rarely', note: 'Most don\'t offer it' },
              us: { value: 'Every time', note: 'Before/after photos within 30 min' },
            },
            {
              label: 'Same-day emergency',
              diy: { value: 'Only you', note: 'Drop everything or lose the booking' },
              maid: { value: 'Unlikely', note: '24–72hr booking lead time' },
              us: { value: 'Yes — $230', note: 'Book by 10 AM, done by 2 PM' },
            },
            {
              label: 'Insurance coverage',
              diy: { value: '$0', note: 'You\'re personally liable' },
              maid: { value: '$0–$1M', note: 'Most marketplace cleaners uninsured' },
              us: { value: '$2M', note: 'Full general liability, every job' },
            },
            {
              label: 'No-shows per year',
              diy: { value: '0', note: 'But you can\'t call in sick either' },
              maid: { value: '6–10', note: 'No backup — you scramble' },
              us: { value: '0', note: 'Full team backup, guaranteed' },
            },
            {
              label: 'Expected Airbnb rating',
              diy: { value: '4.3–4.5★', note: 'Good enough but not competitive' },
              maid: { value: '4.0–4.4★', note: 'Inconsistency hurts long-term' },
              us: { value: '4.8–5.0★', note: 'Top 10% listing performance' },
            },
            {
              label: 'Monthly cost (8 turnovers)',
              diy: { value: '$0 cash', note: 'But ~32–48 hrs of your time' },
              maid: { value: '$960–1,600', note: 'Plus your time managing them' },
              us: { value: '$1,440', note: 'Predictable. Zero time investment.' },
            },
          ].map((row, i) => (
            <AnimateOnScroll key={row.label}>
              <div className={`grid grid-cols-1 md:grid-cols-4 gap-0 ${i % 2 === 0 ? '' : ''}`}>
                {/* Row Label */}
                <div className="flex items-center p-4 bg-muted/50 border border-border/40 font-semibold text-sm text-foreground md:border-r-0">
                  {row.label}
                </div>
                {/* DIY */}
                <div className="p-4 bg-red-50/60 border border-red-200/60 md:border-r-0 md:border-l-0">
                  <div className="md:hidden text-xs font-bold text-red-600 mb-1 uppercase tracking-wider">DIY</div>
                  <div className="text-sm font-bold text-red-700">{row.diy.value}</div>
                  <p className="text-xs text-red-500/80 mt-0.5">{row.diy.note}</p>
                </div>
                {/* Maid / Marketplace */}
                <div className="p-4 bg-amber-50/60 border border-amber-200/60 md:border-r-0 md:border-l-0">
                  <div className="md:hidden text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">Maid / Marketplace</div>
                  <div className="text-sm font-bold text-amber-700">{row.maid.value}</div>
                  <p className="text-xs text-amber-500/80 mt-0.5">{row.maid.note}</p>
                </div>
                {/* Ready Rental Cleaning */}
                <div className="p-4 bg-primary/5 border-2 border-primary/20 md:border-l-0">
                  <div className="md:hidden text-xs font-bold text-primary mb-1 uppercase tracking-wider">Ready Rental Cleaning</div>
                  <div className="text-sm font-bold text-primary">{row.us.value}</div>
                  <p className="text-xs text-primary/70 mt-0.5">{row.us.note}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}

          {/* Bottom rounded corners */}
          <div className="hidden md:grid md:grid-cols-4 gap-0">
            <div />
            <div className="h-3 bg-red-50 border border-red-200 border-t-0 rounded-b-2xl" />
            <div className="h-3 bg-amber-50 border border-amber-200 border-t-0 rounded-b-2xl" />
            <div className="h-3 bg-primary/5 border-2 border-primary/20 border-t-0 rounded-b-2xl" />
          </div>

          {/* Bottom Line */}
          <AnimateOnScroll>
            <motion.div
              initial={{ scale: 0.97 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center mt-10"
            >
              <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2">The Bottom Line</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-700 mb-3">
                +$1,260/month in your pocket
              </p>
              <p className="text-sm text-emerald-600 max-w-lg mx-auto mb-6">
                DIY "saves" money but costs 40+ hours. Marketplace cleaners are unreliable and uninsured. Ready Rental Cleaning costs $1,440/mo for 8 turnovers — but higher ratings drive 30%+ more bookings, putting $1,260+ more revenue in your pocket. Plus you get your life back.
              </p>
              <a href="/airbnb-cleaning-cost-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                <Calculator className="w-4 h-4" />
                Calculate your exact ROI
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* ═══ RISK REVERSAL — What a single bad clean costs ═══ */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <AlertTriangle className="w-3 h-3 mr-1" />
                The Real Risk
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                One Bad Clean Costs You $900+
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                It's not about the $180 cleaning fee. It's about what a missed or bad cleaning actually costs your business.
              </p>
            </div>
          </AnimateOnScroll>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {[
              { cost: '$200+', title: 'Lost Booking', desc: 'Guest cancels or you cancel because property isn\'t ready' },
              { cost: '$150+', title: 'Emergency Scramble', desc: 'Last-minute backup cleaner from TaskRabbit or begging friends' },
              { cost: '$180', title: 'Refund/Discount', desc: 'Guest complains, you refund a night to save the review' },
              { cost: '0.2 stars', title: 'Rating Drop', desc: 'One "dirty" review drops your average for months' },
              { cost: '$600+', title: 'Downstream Loss', desc: 'Lower rating = fewer bookings for the next 90 days' },
              { cost: '5+ hrs', title: 'Your Time', desc: 'Managing the crisis, apologizing, finding replacements' },
            ].map((risk) => (
              <motion.div key={risk.title} variants={item}>
                <Card depth={1} className="p-6 h-full border-red-100">
                  <div className="text-2xl font-extrabold text-red-600 mb-2">{risk.cost}</div>
                  <div className="text-sm font-bold text-foreground mb-1">{risk.title}</div>
                  <p className="text-xs text-muted-foreground">{risk.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <AnimateOnScroll>
            <div className="bg-foreground text-background rounded-2xl p-8 text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-background/60 mb-2">Total Cost of One Bad Clean</p>
              <p className="text-4xl font-extrabold mb-3">$900+ per incident</p>
              <p className="text-background/70 text-sm mb-6">vs. $180 for a guaranteed professional turnover</p>
              <a href="/book" className="inline-flex items-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                Book a Cleaning Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Services Preview */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Transparent Pricing. Premium Quality.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every cleaning includes supplies, insurance, and before/after photos. No hidden fees, ever.
            </p>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.value} variants={item}>
              <ServiceCard
                title={service.title}
                price={service.priceLabel}
                time={service.time}
                image={service.image}
                features={service.features.slice(0, 5)}
                popular={service.popular}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Urgency CTA */}
        <AnimateOnScroll>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl px-8 py-5 shadow-depth-1">
              <Zap className="w-6 h-6 text-amber-600" />
              <div className="text-left">
                <p className="text-sm font-bold text-amber-700">Need it today? Same-day available.</p>
                <p className="text-xs text-amber-600">Book before 10 AM and we're at your door by 2 PM — $230 flat rate</p>
              </div>
              <a href="/same-day-airbnb-cleaning" className="ml-4 text-sm font-bold text-amber-700 hover:text-amber-800 whitespace-nowrap">
                Learn more →
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      {/* Why Ready Rental Cleaning — Feature Grid */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything Your Current Cleaner Doesn't Do
            </h2>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { title: '$2M Insurance', desc: 'Full general liability coverage. Your property is protected against any incident — period.', icon: Shield },
            { title: 'Background-Checked', desc: 'Every cleaner passes thorough background verification before setting foot in your property.', icon: UserCheck },
            { title: 'Before/After Photos', desc: 'Automatic photo documentation sent within 30 minutes of every clean. Verify remotely.', icon: Camera },
            { title: '100% Guarantee', desc: 'Not perfect? We come back and re-clean for free. No questions, no arguments, no exceptions.', icon: Star },
            { title: 'Zero No-Shows', desc: 'Full team backup on every booking. If one cleaner is sick, another steps in. You never notice.', icon: Check },
            { title: '3-Hour Turnaround', desc: 'Guest checking in tonight? Your property is guest-ready in 3 hours, guaranteed.', icon: Clock },
            { title: '47-Point Checklist', desc: 'Every room, every surface, every detail — checked and verified before we leave.', icon: Award },
            { title: 'Same-Day Available', desc: 'Book before 10 AM, we\'re at your door by 2 PM. Emergency turnovers are our specialty.', icon: Zap },
          ].map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card depth={1} className="p-6 h-full text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══ PHOTO SHOWCASE — Real Results ═══ */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <Badge className="mb-4">
                <Camera className="w-3 h-3 mr-1" />
                Real Results
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                See the Difference
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real before and after photos from actual Ready Rental Cleaning jobs across Los Angeles.
              </p>
            </div>
          </AnimateOnScroll>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=500&fit=crop', label: 'Living Room — Silver Lake' },
              { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop', label: 'Kitchen — West Hollywood' },
              { src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&h=500&fit=crop', label: 'Bathroom — Venice' },
              { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=500&fit=crop', label: 'Bedroom — Santa Monica' },
              { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=500&fit=crop', label: 'Patio — Marina del Rey' },
              { src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=500&h=500&fit=crop', label: 'Entryway — DTLA' },
              { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=500&fit=crop', label: 'Studio — Hollywood' },
              { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&h=500&fit=crop', label: 'Suite — Beverly Hills' },
            ].map((photo) => (
              <motion.div key={photo.label} variants={item} className="group relative overflow-hidden rounded-xl">
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HIRING STANDARDS — Trust & Safety ═══ */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <Badge className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Your Safety
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Every Cleaner Passes Our 7-Point Hiring Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't hire from marketplaces. Every cleaner is vetted, trained, and insured before they ever enter your property.
            </p>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8"
        >
          {[
            { step: '1', title: 'Background Check', desc: 'Full criminal background verification through a certified screening service' },
            { step: '2', title: 'Reference Check', desc: 'Minimum 2 professional references verified by our hiring team' },
            { step: '3', title: 'Identity Verification', desc: 'Government-issued ID verified and kept on file' },
            { step: '4', title: 'In-Person Interview', desc: 'Face-to-face interview assessing professionalism and attention to detail' },
            { step: '5', title: 'Skills Assessment', desc: 'Hands-on cleaning test at our training property — graded on 47 checklist items' },
            { step: '6', title: 'Airbnb Protocol Training', desc: 'Turnover-specific training: linen standards, photo documentation, guest-ready checklist' },
            { step: '7', title: 'Insurance Enrollment', desc: 'Added to our $2M general liability policy before their first assignment' },
          ].map((s) => (
            <motion.div key={s.step} variants={item}>
              <div className="flex items-start gap-3 bg-background rounded-xl p-4 border border-border/60 h-full">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground mb-1">{s.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimateOnScroll>
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            <span className="font-semibold text-foreground">Only 1 in 8 applicants make it through.</span> We'd rather have fewer cleaners than lower our standards. Your property deserves professionals, not strangers from a marketplace.
          </p>
        </AnimateOnScroll>
      </Section>

      {/* Testimonials */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What LA Hosts Are Saying
            </h2>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.slice(0, 3).map((review) => (
            <motion.div key={review.name} variants={item}>
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <a href="/reviews" className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors">
            Read all reviews &rarr;
          </a>
        </div>
      </Section>

      {/* ═══ MID-PAGE CTA — Conversion Point ═══ */}
      <Section variant="cta" padding="default">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Stop Losing Revenue to Bad Cleans
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Every day without professional cleaning is money left on the table. Higher ratings, more bookings, zero headaches — starting with your first turnover.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="/book" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
                  Book Now — $180
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:+13235550180" className="inline-flex items-center justify-center gap-2 h-12 px-8 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { stat: '$180', label: 'Flat rate, no surprises' },
                  { stat: '3 hrs', label: 'Average turnaround' },
                  { stat: '0', label: 'No-shows ever' },
                  { stat: '100%', label: 'Satisfaction guarantee' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <div className="text-xl font-extrabold text-white">{s.stat}</div>
                    <div className="text-xs text-primary-foreground/70">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden md:block"
            >
              <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop" alt="Clean living room" className="rounded-xl w-full h-40 object-cover" />
                <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" alt="Spotless kitchen" className="rounded-xl w-full h-40 object-cover mt-6" />
                <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop" alt="Pristine bathroom" className="rounded-xl w-full h-40 object-cover -mt-6" />
                <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop" alt="Fresh bedroom" className="rounded-xl w-full h-40 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>


      {/* CTA */}
      <Section variant="cta" padding="default" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to Never Worry About Cleanings Again?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your first cleaning now. 60 seconds to book, 3 hours to spotless, 100% guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all"
            >
              Book Your First Cleaning
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-14 px-8 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
