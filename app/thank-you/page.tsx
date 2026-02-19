'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-cyan-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <Card depth={2} className="p-10 sm:p-14 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }}
            >
              <Check className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Cleaning Booked!
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Your confirmation email is on its way. Your property will be spotless and guest-ready on schedule.
            </p>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-muted/50 rounded-2xl p-8 text-left mb-10 border border-border"
          >
            <h2 className="font-bold text-foreground mb-6">What Happens Next</h2>
            <div className="space-y-5">
              {[
                { step: '1', title: '24-Hour Reminder', desc: 'You will receive a text and email reminder the day before your cleaning with your cleaner\'s details.' },
                { step: '2', title: 'Cleaner Arrives', desc: 'Your background-checked, insured cleaner arrives on time with all professional supplies.' },
                { step: '3', title: 'Photo Documentation', desc: 'After cleaning, you will receive before/after photos and a completion confirmation via email.' },
                { step: '4', title: 'Quick Review', desc: 'We will send you a review link — your feedback helps us serve LA hosts better.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Help Box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-secondary rounded-2xl p-6 text-left mb-10 border border-primary/10"
          >
            <h3 className="font-bold text-foreground mb-2 text-sm">
              Need to Reschedule or Have Questions?
            </h3>
            <p className="text-sm text-muted-foreground">
              Email us at{' '}
              <a href="mailto:hello@readyrentalcleaning.com" className="text-primary font-semibold hover:underline">
                hello@readyrentalcleaning.com
              </a>{' '}
              or call <span className="font-semibold">(323) 555-0180</span>. We respond within 2 hours.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/"
              className="inline-flex items-center justify-center h-11 px-6 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-depth-1 hover:bg-primary/90 transition-all"
            >
              Back to Home
            </a>
            <a
              href="/book"
              className="inline-flex items-center justify-center h-11 px-6 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-secondary transition-all"
            >
              Book Another Cleaning
            </a>
          </motion.div>
        </Card>
      </div>
    </div>
  )
}
