'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const categories = [
  {
    title: 'Booking & Scheduling',
    questions: [
      { q: 'How do I book a cleaning?', a: 'Go to our Book page, enter your property address, select a service type, pick a date and time, enter your contact info, and pay securely via Stripe. The entire process takes about 60 seconds. You will receive an instant confirmation email.' },
      { q: 'Can I book a same-day cleaning?', a: 'Yes! If you book before 10 AM, we can often have a cleaner out the same day. A $50 rush fee applies for same-day bookings. Call us directly for the fastest response on emergency turnovers.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking 24-48 hours in advance for best availability. However, we frequently accommodate same-day and next-day requests, especially for existing clients with dedicated cleaners assigned.' },
      { q: 'Can I set up recurring cleanings?', a: 'Absolutely. We offer weekly, bi-weekly, and monthly recurring schedules. Recurring clients get priority booking, a dedicated cleaner who learns your property, and locked-in pricing.' },
      { q: 'How do I modify or cancel a booking?', a: 'Contact us at least 24 hours before your scheduled cleaning to reschedule or cancel at no charge. Cancellations within 24 hours are subject to a 50% cancellation fee.' },
    ],
  },
  {
    title: 'Service & Quality',
    questions: [
      { q: 'What is included in a standard turnover?', a: 'A standard turnover includes: changing all bed linens, cleaning and disinfecting all bathrooms, wiping down kitchen surfaces and appliances, vacuuming and mopping all floors, emptying trash and replacing liners, restocking essentials, and a walkthrough inspection. Before/after photos are included.' },
      { q: 'What is the difference between a turnover and a deep clean?', a: 'A turnover ($180-$220) is designed for quick guest turnarounds — making the property guest-ready. A deep clean ($350) is a thorough, top-to-bottom cleaning that includes wall washing, appliance detailing, vent cleaning, grout treatment, and areas not covered in a regular turnover. We recommend a deep clean monthly.' },
      { q: 'Do you provide cleaning supplies?', a: 'Yes. We bring everything: hospital-grade disinfectants, HEPA-certified vacuums, microfiber cloths, and eco-friendly products. All products are pet-safe and guest-safe. If you have specific product preferences, let us know.' },
      { q: 'What if I am not satisfied with the cleaning?', a: 'We offer a 100% satisfaction guarantee. If anything is not up to your standards, contact us within 24 hours and we will send a cleaner back to re-clean at no additional cost. No questions asked.' },
      { q: 'Do you send before/after photos?', a: 'Yes, every cleaning includes before/after photo documentation emailed directly to you upon completion. This lets you verify the cleaning remotely and provides proof in case of any guest damage claims.' },
    ],
  },
  {
    title: 'Pricing & Payment',
    questions: [
      { q: 'How much does a cleaning cost?', a: 'Standard Turnover (1-2 BR): $180. Premium Turnover (3+ BR): $220. Deep Clean: $350. Add-ons available: laundry service (+$40), fridge restock (+$30), patio clean (+$50), pet hair removal (+$35), carpet steam (+$75), same-day rush (+$50).' },
      { q: 'How do I pay?', a: 'We accept all major credit cards via Stripe. Payment is collected at the time of booking. You will receive a digital invoice and receipt via email automatically.' },
      { q: 'Do you offer volume discounts?', a: 'Yes. Property managers with 5+ units qualify for volume pricing. Contact us to discuss a custom package with dedicated cleaners and priority scheduling.' },
      { q: 'Are there any hidden fees?', a: 'No hidden fees, ever. The price you see is the price you pay. Add-ons are clearly listed and optional. Same-day rush is the only surcharge and it is always disclosed upfront.' },
    ],
  },
  {
    title: 'Trust & Safety',
    questions: [
      { q: 'Are your cleaners insured?', a: 'Yes. We carry $2M general liability insurance covering every job. All cleaners are fully bonded. Your property is protected against any incident or damage.' },
      { q: 'Are your cleaners background checked?', a: 'Yes. Every cleaner on our team passes a thorough background verification before joining. We also conduct reference checks and a probationary period with supervised cleanings.' },
      { q: 'How do you access my property?', a: 'We work with your existing access method — lockbox, smart lock, keypad, or key exchange. Access codes are kept confidential, used only for the scheduled cleaning, and never shared.' },
      { q: 'What areas do you serve?', a: 'We currently serve greater Los Angeles including West Hollywood, Venice, Santa Monica, Silver Lake, Los Feliz, Downtown LA, Beverly Hills, Hollywood, Koreatown, Echo Park, Mar Vista, and Culver City. We are expanding monthly — contact us if your area is not listed.' },
    ],
  },
]

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

function FaqCategory({ title, questions }: { title: string; questions: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border text-foreground">{title}</h2>
      <div className="space-y-3">
        {questions.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>{faq.q}</span>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed border-t border-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">FAQ</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Ready Rental Cleaning. Cannot find your answer?{' '}
            <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a>.
          </p>
        </div>
      </Section>

      <Section variant="default" padding="default">
        <div className="max-w-4xl mx-auto space-y-16">
          {categories.map((category) => (
            <AnimateOnScroll key={category.title}>
              <FaqCategory title={category.title} questions={category.questions} />
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      <Section variant="muted" padding="default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">Our team responds within 2 hours during business hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center h-11 px-6 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-depth-1 hover:bg-primary/90 transition-colors">Contact Us</a>
            <a href="/book" className="inline-flex items-center justify-center h-11 px-6 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">Book a Cleaning</a>
          </div>
        </div>
      </Section>
    </div>
  )
}
