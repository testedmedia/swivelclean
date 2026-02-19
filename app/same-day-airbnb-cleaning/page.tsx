'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Clock, Phone, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react'
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

export default function SameDayCleaning() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">
            <Zap className="w-3 h-3 mr-1" />
            Same-Day Service
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Same-Day Airbnb Cleaning<br />
            <span className="text-primary">Los Angeles</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Guest checking in tonight? Cleaner cancelled? Book before 10 AM — we're at your door by 2 PM. Never lose a booking to a cleaning gap.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-4 bg-amber-50 border-2 border-amber-200 rounded-2xl px-8 py-5 shadow-depth-2 mb-10"
          >
            <Clock className="w-8 h-8 text-amber-600" />
            <div className="text-left">
              <p className="text-2xl font-extrabold text-amber-700">Book by 10 AM → There by 2 PM</p>
              <p className="text-sm text-amber-600">$230 flat rate · No hidden fees · Guaranteed arrival</p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book Same-Day Now
              <Zap className="w-4 h-4 ml-1" />
            </a>
            <a href="tel:+13235550180" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              <Phone className="w-4 h-4 mr-2" />
              Call (323) 555-0180
            </a>
          </div>
        </div>
      </Section>

      <Section variant="muted" padding="default">
        <StatsBar stats={[
          { value: '2 hrs', label: 'Avg response time' },
          { value: '$230', label: 'Same-day flat rate' },
          { value: '100%', label: 'Arrival guaranteed' },
          { value: '0', label: 'Missed bookings' },
        ]} />
      </Section>

      {/* The Cost of a Missed Turnover */}
      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">The Cost of a Missed Turnover</h2>
            <p className="text-muted-foreground text-center mb-12">When your cleaner cancels, the dominoes fall fast.</p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <Card depth={1} className="p-8 border-red-200 bg-red-50/30 mb-8">
              <h3 className="text-lg font-bold text-red-700 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                One Missed Cleaning Costs You:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { cost: '$200+', desc: 'Lost booking (cancelled or bad review)' },
                  { cost: '$100+', desc: 'Last-minute scramble costs (TaskRabbit, begging friends)' },
                  { cost: '3-5 hours', desc: 'Your time managing the crisis' },
                  { cost: '0.2 stars', desc: 'Average rating drop from one dirty check-in' },
                  { cost: '$600+', desc: 'Downstream revenue loss from lower rating (next 3 months)' },
                  { cost: 'Priceless', desc: 'Your stress and reputation damage' },
                ].map((item) => (
                  <div key={item.desc} className="flex items-start gap-3 py-2">
                    <span className="text-lg font-extrabold text-red-700 whitespace-nowrap">{item.cost}</span>
                    <span className="text-sm text-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-red-200 text-center">
                <p className="text-xl font-extrabold text-red-700">Total damage: $900+ per incident</p>
                <p className="text-sm text-red-600 mt-1">vs. $230 for same-day professional cleaning</p>
              </div>
            </Card>
          </AnimateOnScroll>

          {/* How It Works */}
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">How Same-Day Works</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Book Online', desc: 'Book before 10 AM through our website. Takes 60 seconds.', time: '10:00 AM' },
              { step: '2', title: 'Confirmation', desc: 'We confirm your arrival window within 15 minutes via text.', time: '10:15 AM' },
              { step: '3', title: 'Cleaner Arrives', desc: 'Background-checked, insured cleaner arrives with all supplies.', time: '1:00 PM' },
              { step: '4', title: 'Photos Sent', desc: 'Before/after photos sent within 30 minutes of completion.', time: '4:30 PM' },
            ].map((item) => (
              <AnimateOnScroll key={item.step}>
                <Card depth={1} className="p-6 text-center h-full">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-3">{item.step}</div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  <span className="text-xs font-bold text-primary">{item.time}</span>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="muted" padding="default">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Same-Day FAQ</h2>
          </AnimateOnScroll>

          <div className="space-y-4">
            {[
              { q: 'What\'s the cutoff for same-day?', a: 'Book before 10 AM for guaranteed same-day. After 10 AM, call us — we can often still make it happen.' },
              { q: 'Is there an extra fee?', a: '$230 vs $180 standard. The $50 covers priority scheduling and guaranteed arrival. Still cheaper than one lost booking.' },
              { q: 'What if I need it RIGHT NOW?', a: 'Call (323) 555-0180. We\'ll do everything possible to get someone there ASAP. Emergency turnovers are our specialty.' },
              { q: 'Is same-day quality the same?', a: 'Identical. Same 47-point checklist, same supplies, same before/after photos. Speed doesn\'t mean shortcuts.' },
            ].map((item) => (
              <AnimateOnScroll key={item.q}>
                <Card depth={0} className="p-6 bg-background border border-border">
                  <h3 className="font-bold text-foreground mb-2 text-sm">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
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
            Don't Lose a Booking. Call Now.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            $230 today saves $900 in lost revenue. Book online or call for immediate help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book Same-Day
              <Zap className="w-4 h-4 ml-1" />
            </a>
            <a href="tel:+13235550180" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              <Phone className="w-4 h-4 mr-2" />
              (323) 555-0180
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
