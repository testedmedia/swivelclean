'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ReviewCard } from '@/components/ui/review-card'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { TESTIMONIALS } from '@/lib/constants'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
}

export default function Reviews() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Reviews</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Trusted by LA Hosts
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            200+ happy Airbnb hosts. 1,200+ cleanings completed. Here is what they say about Ready Rental Cleaning.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-background/80 backdrop-blur-xl border border-border/30 rounded-2xl px-8 py-4 shadow-depth-2"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">4.9 out of 5.0</div>
              <div className="text-xs text-muted-foreground">Based on 200+ verified reviews</div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Stats */}
      <section className="bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { value: 98, suffix: '%', label: 'Would Recommend' },
              { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
              { value: 87, suffix: '%', label: 'Repeat Clients' },
              { value: 200, suffix: '+', label: 'Verified Reviews' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-primary">
                  <NumberTicker value={stat.value} suffix={stat.suffix} decimals={'decimals' in stat ? stat.decimals : 0} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <Section variant="muted" padding="default">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {TESTIMONIALS.map((review) => (
            <motion.div key={review.name} variants={item}>
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Before/After Gallery */}
      <Section variant="default" padding="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Before &amp; After</h2>
          <p className="text-lg text-muted-foreground">Real results from real Ready Rental Cleaning jobs across LA.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Kitchen Turnover — West Hollywood', before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
            { label: 'Bathroom Deep Clean — Venice', before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop' },
            { label: 'Living Room — Silver Lake', before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop' },
          ].map((pair) => (
            <Card key={pair.label} depth={1} className="overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={pair.before} alt="Before" className="h-40 w-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">BEFORE</div>
                </div>
                <div className="relative">
                  <img src={pair.after} alt="After" className="h-40 w-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">AFTER</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">{pair.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="cta" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Join 200+ Happy LA Hosts</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">Your property deserves the same level of care. Book your first cleaning today.</p>
          <a href="/book" className="inline-flex items-center justify-center h-14 px-8 bg-white text-primary rounded-xl font-semibold shadow-depth-2 hover:shadow-depth-3 transition-all">
            Book Your First Cleaning
          </a>
        </div>
      </Section>
    </div>
  )
}
