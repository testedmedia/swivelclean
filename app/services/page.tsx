'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Shield, Camera, Star } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ServiceCard } from '@/components/ui/service-card'
import { SERVICES, ADDONS } from '@/lib/constants'
import FaqAccordion from './FaqAccordion'

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

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No surprises. Every cleaning includes supplies, insurance coverage,
            and before/after photo documentation.
          </p>
        </div>
      </Section>

      {/* Pricing Cards */}
      <Section variant="default" padding="default">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.value} variants={item}>
              <ServiceCard
                title={service.title}
                price={service.priceLabel}
                time={service.time}
                desc={service.desc}
                image={service.image}
                features={service.features}
                popular={service.popular}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* What's Included */}
        <AnimateOnScroll>
          <div className="bg-muted rounded-3xl p-10 sm:p-14 border border-border mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
              Included with Every Cleaning
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Professional Supplies', desc: 'Hospital-grade disinfectant, HEPA vacuums, microfiber cloths, eco-friendly products.', icon: Sparkles },
                { title: 'Full Insurance', desc: '$2M general liability. Your property is protected against any incident or damage.', icon: Shield },
                { title: 'Photo Documentation', desc: 'Before/after photos emailed to you after every cleaning for remote verification.', icon: Camera },
                { title: 'Satisfaction Guarantee', desc: 'Not happy? We re-clean for free. No questions asked. 100% money-back guarantee.', icon: Star },
              ].map((feat) => (
                <div key={feat.title} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-background rounded-2xl mx-auto mb-4 border border-border shadow-sm">
                    <feat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Add-Ons */}
        <AnimateOnScroll className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
            Available Add-Ons
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ADDONS.map((addon) => (
              <Card key={addon.name} depth={1} className="p-6 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground mb-1">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground">{addon.desc}</p>
                </div>
                <div className="text-primary font-bold text-lg whitespace-nowrap ml-4">
                  {addon.price}
                </div>
              </Card>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Property Showcase */}
        <AnimateOnScroll className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-center">
            Properties We've Cleaned Across LA
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            From studio apartments to luxury hillside homes — we handle every property type with the same attention to detail.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=300&fit=crop',
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="overflow-hidden rounded-xl aspect-square group"
              >
                <img src={src} alt="Cleaned LA property" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* FAQ */}
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <FaqAccordion />
          </div>
        </AnimateOnScroll>
      </Section>

      {/* CTA */}
      <Section variant="cta" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Your Property Deserves the Best</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Book in 60 seconds. Your next guest will thank you.
          </p>
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all"
          >
            Book a Cleaning Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </Section>
    </div>
  )
}
