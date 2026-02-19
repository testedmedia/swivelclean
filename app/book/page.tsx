'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Shield, Zap, Star, Check } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrustBadge } from '@/components/ui/trust-badge'
import { StepIndicator } from '@/components/booking/step-indicator'
import { SERVICES, PRICE_MAP, SERVICE_LABEL_MAP } from '@/lib/constants'

const steps = [
  { num: 1, label: 'Property' },
  { num: 2, label: 'Schedule' },
  { num: 3, label: 'Details' },
]

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: 'easeIn' as const } },
}

export default function Book() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    address: '',
    unit: '',
    service: 'standard',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    accessNotes: '',
    specialRequests: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const selectedService = SERVICES.find((s) => s.value === formData.service)
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    'w-full h-11 px-4 bg-muted/50 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors'

  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="none" className="pt-24 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <Badge className="mb-4">Book Online</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Book a Cleaning in 60 Seconds
          </h1>
          <p className="text-muted-foreground mb-8">
            Fast, easy, secure. Your property will be guest-ready.
          </p>
          <StepIndicator steps={steps} currentStep={step} className="mb-4" />
        </div>
      </Section>

      {/* Form */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card depth={1} className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {/* Step 1: Property & Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold mb-1">Property &amp; Service</h2>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your property and what you need.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Property Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="123 Main St, West Hollywood, CA 90069"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Unit/Apt # (optional)
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Service Type *
                      </label>
                      <div className="space-y-3">
                        {SERVICES.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.service === opt.value
                                ? 'border-primary bg-secondary'
                                : 'border-border hover:border-border/80 bg-background'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="service"
                                value={opt.value}
                                checked={formData.service === opt.value}
                                onChange={handleChange}
                                className="accent-[hsl(var(--primary))]"
                              />
                              <div>
                                <div className="font-semibold text-foreground text-sm">
                                  {opt.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {opt.desc.split('.')[0]} · {opt.time}
                                </div>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-primary">{opt.priceLabel}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 rounded-xl">
                      Next: Choose Date &amp; Time
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Schedule */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold mb-1">When Do You Need Us?</h2>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred date and time.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={today}
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select a time</option>
                        {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(
                          (t) => (
                            <option key={t} value={t}>{t}</option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Access Instructions (optional)
                      </label>
                      <textarea
                        name="accessNotes"
                        value={formData.accessNotes}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputClasses} h-auto py-3 resize-none`}
                        placeholder="Lockbox code, smart lock instructions, etc."
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 h-12 rounded-xl">
                        Next: Your Info
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact & Confirm */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold mb-1">Your Information</h2>
                      <p className="text-sm text-muted-foreground">
                        Almost done. Enter your contact details to confirm.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="(323) 555-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Special Requests (optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={2}
                        className={`${inputClasses} h-auto py-3 resize-none`}
                        placeholder="Pet-safe products, specific areas of focus, etc."
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                      <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                        Order Summary
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service</span>
                          <span className="font-semibold">{selectedService?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address</span>
                          <span className="font-semibold text-right max-w-[200px] truncate">
                            {formData.address || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-semibold">{formData.date || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-semibold">{formData.time || '—'}</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between">
                          <span className="font-bold">Total</span>
                          <span className="font-extrabold text-primary text-lg">
                            {selectedService?.priceLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-xl">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1 h-12 rounded-xl disabled:opacity-50">
                        {loading ? 'Processing...' : 'Pay & Complete Booking'}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      By booking, you agree to our service terms. 100% satisfaction guaranteed.
                      Secure payment powered by Stripe.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </form>

          {/* Trust Strip */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <TrustBadge icon={Shield} label="Fully Insured" className="flex-col gap-1 justify-center" />
            <TrustBadge icon={Zap} label="Same-Day Available" className="flex-col gap-1 justify-center" />
            <TrustBadge icon={Star} label="100% Guarantee" className="flex-col gap-1 justify-center" />
          </div>
        </div>
      </section>
    </div>
  )
}
