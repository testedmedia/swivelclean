'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Star, Camera, UserCheck, Award, Check, MapPin, ChevronRight, Calculator, X, Clock, DollarSign, TrendingUp, AlertTriangle, Phone } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { ServiceCard } from '@/components/ui/service-card'
import { ReviewCard } from '@/components/ui/review-card'
import { TrustBadge } from '@/components/ui/trust-badge'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { SERVICES, TESTIMONIALS } from '@/lib/constants'
import { NEIGHBORHOODS } from '@/lib/seo-data'

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
            { step: '01', title: 'Book Online', desc: 'Enter your property address, pick a service, choose a date. Secure payment via Stripe. Done in 60 seconds.', icon: <Zap className="w-7 h-7" /> },
            { step: '02', title: 'We Clean', desc: 'Our background-checked, insured cleaner arrives on schedule with professional supplies. 3-4 hour turnaround.', icon: <Award className="w-7 h-7" /> },
            { step: '03', title: 'Guest Ready', desc: 'Get before/after photos, confirmation email, and invoice. Your property is spotless for the next guest.', icon: <Check className="w-7 h-7" /> },
          ].map((step) => (
            <motion.div key={step.step} variants={item}>
              <Card depth={1} hover="lift" className="p-8 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Step {step.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-2xl flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══ THE COMPARISON — Us vs Without Us ═══ */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              The Numbers Don't Lie
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What Happens When You Switch to Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real numbers from real LA hosts. Professional cleaning isn't an expense — it's your highest-ROI investment.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* WITHOUT US */}
            <AnimateOnScroll>
              <Card depth={1} className="p-8 border-red-200 bg-red-50/40 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-red-700">Without Ready Rental Cleaning</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Average rating', value: '4.0–4.3★', icon: Star, note: 'Inconsistent cleaning = inconsistent reviews' },
                    { label: 'Bookings per month', value: '12–15', icon: TrendingUp, note: 'Lower rating buries your listing' },
                    { label: 'Revenue per month', value: '~$2,340', icon: DollarSign, note: 'At $180/night avg × 13 bookings' },
                    { label: 'Missed cleans per year', value: '6–10', icon: AlertTriangle, note: 'Cancellations, no-shows, sick days' },
                    { label: 'Your time spent', value: '20+ hrs/mo', icon: Clock, note: 'Managing cleaners, backup plans, QA' },
                    { label: 'Insurance coverage', value: '$0', icon: Shield, note: 'You\'re personally liable for damage' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between py-2 border-b border-red-100 last:border-0">
                      <div className="flex items-start gap-2">
                        <row.icon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-foreground">{row.label}</span>
                          <p className="text-xs text-red-500">{row.note}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-red-700 whitespace-nowrap ml-4">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>

            {/* WITH US */}
            <AnimateOnScroll>
              <Card depth={2} className="p-8 border-primary/30 bg-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">With Ready Rental Cleaning</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Average rating', value: '4.8–5.0★', icon: Star, note: '47-point checklist, every single time' },
                    { label: 'Bookings per month', value: '18–22', icon: TrendingUp, note: 'Higher rating = 30%+ more bookings' },
                    { label: 'Revenue per month', value: '~$3,600', icon: DollarSign, note: 'At $180/night avg × 20 bookings' },
                    { label: 'Missed cleans per year', value: '0', icon: AlertTriangle, note: 'Full team backup — zero gaps, guaranteed' },
                    { label: 'Your time spent', value: '0 hrs/mo', icon: Clock, note: 'You book online. We handle everything.' },
                    { label: 'Insurance coverage', value: '$2M', icon: Shield, note: 'Full general liability on every job' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between py-2 border-b border-primary/10 last:border-0">
                      <div className="flex items-start gap-2">
                        <row.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-foreground">{row.label}</span>
                          <p className="text-xs text-primary">{row.note}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary whitespace-nowrap ml-4">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>
          </div>

          {/* Bottom Line */}
          <AnimateOnScroll>
            <motion.div
              initial={{ scale: 0.97 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center"
            >
              <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2">The Bottom Line</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-700 mb-3">
                +$1,260/month in your pocket
              </p>
              <p className="text-sm text-emerald-600 max-w-lg mx-auto mb-6">
                $3,600 revenue with us minus $2,340 without us = $1,260 more per month. After cleaning costs ($1,440), the higher rating and zero missed bookings still nets you more revenue. Plus you get 20+ hours of your life back.
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
                Protect Your Revenue
                <Shield className="w-4 h-4" />
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
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Stop Losing Revenue to Bad Cleans
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Every day without professional cleaning is money left on the table. Higher ratings, more bookings, zero headaches — starting with your first turnover.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/book" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
                  Book Now — $180
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:+13235550180" className="inline-flex items-center justify-center gap-2 h-12 px-8 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '$180', label: 'Flat rate, no surprises' },
                { stat: '3 hrs', label: 'Average turnaround' },
                { stat: '0', label: 'No-shows ever' },
                { stat: '100%', label: 'Satisfaction guarantee' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-white">{s.stat}</div>
                  <div className="text-xs text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Service Areas */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              Coverage
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Serving All of Los Angeles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional Airbnb turnover cleaning across 22 neighborhoods and cities. Click any area for local market stats and pricing.
            </p>
          </div>
        </AnimateOnScroll>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {NEIGHBORHOODS.map((n) => (
            <motion.a
              key={n.slug}
              variants={item}
              href={`/airbnb-cleaning/${n.slug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-secondary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {n.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Quick Links — Services & Tools */}
        <AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <a href="/airbnb-turnover-cleaning-los-angeles" className="group flex items-center gap-3 bg-secondary rounded-xl p-4 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Turnover Cleaning</div>
                <div className="text-xs text-muted-foreground">From $180</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </a>
            <a href="/same-day-airbnb-cleaning" className="group flex items-center gap-3 bg-secondary rounded-xl p-4 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Same-Day Cleaning</div>
                <div className="text-xs text-muted-foreground">Book by 10 AM</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </a>
            <a href="/vacation-rental-deep-clean" className="group flex items-center gap-3 bg-secondary rounded-xl p-4 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Deep Clean</div>
                <div className="text-xs text-muted-foreground">$350 flat rate</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </a>
            <a href="/airbnb-cleaning-cost-calculator" className="group flex items-center gap-3 bg-secondary rounded-xl p-4 hover:bg-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Cost Calculator</div>
                <div className="text-xs text-muted-foreground">See your ROI</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </a>
          </div>
        </AnimateOnScroll>

        {/* Comparison Links */}
        <AnimateOnScroll>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {[
              { slug: 'diy-vs-professional', label: 'DIY vs Professional' },
              { slug: 'vs-thumbtack-cleaners', label: 'vs Thumbtack' },
              { slug: 'vs-independent-cleaners', label: 'vs Independent Cleaners' },
              { slug: 'vs-turnoverbnb', label: 'vs TurnoverBnB' },
            ].map((c) => (
              <a key={c.slug} href={`/compare/${c.slug}`} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
                {c.label}
              </a>
            ))}
          </div>
        </AnimateOnScroll>
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
