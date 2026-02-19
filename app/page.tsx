'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Star, Camera, UserCheck, Award, Check } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { ServiceCard } from '@/components/ui/service-card'
import { ReviewCard } from '@/components/ui/review-card'
import { TrustBadge } from '@/components/ui/trust-badge'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { SERVICES, SERVICE_AREAS, TESTIMONIALS } from '@/lib/constants'

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
            <StatCard value={49} prefix="" suffix="★" label="Average Rating" />
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

      {/* Services Preview */}
      <Section variant="muted" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Transparent Pricing. Premium Quality.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every cleaning includes supplies, insurance, and before/after photos.
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
      </Section>

      {/* Why Ready Rental Cleaning */}
      <Section variant="default" padding="default">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <Badge className="mb-4">Why Ready Rental Cleaning</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Built for Airbnb Hosts Who Demand the Best
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Every guest checkout is a revenue event. A missed or bad cleaning means lost bookings,
              bad reviews, and frustrated guests. We eliminate that risk completely.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Fully Insured & Bonded', desc: '$2M general liability coverage. Your property is protected against any incident.', icon: Shield },
                { title: 'Background-Checked Cleaners', desc: 'Every cleaner passes thorough background verification before joining our team.', icon: UserCheck },
                { title: '100% Satisfaction Guarantee', desc: 'Not happy with the clean? We come back and re-clean for free. No questions asked.', icon: Star },
                { title: 'Photo Documentation', desc: 'Before/after photos with every cleaning so you can verify remotely.', icon: Camera },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=700&fit=crop"
                alt="Clean modern apartment interior"
                className="rounded-2xl shadow-depth-3 w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-xl border border-border/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Average Host Rating</div>
                    <div className="text-2xl font-bold text-foreground">4.9 out of 5.0</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* Testimonials */}
      <Section variant="muted" padding="default">
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

      {/* Service Areas */}
      <Section variant="default" padding="default">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4">Coverage</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Serving All of Los Angeles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We cover the top Airbnb neighborhoods in LA with same-day availability.
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
          {SERVICE_AREAS.slice(0, 8).map((area) => (
            <motion.div key={area.area} variants={item}>
              <Card depth={1} className="p-5 text-center">
                <div className="font-bold text-foreground mb-1">{area.area}</div>
                <div className="text-xs text-muted-foreground">{area.listings}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
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
