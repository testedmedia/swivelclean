'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ChevronRight, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
        toast.success('Message sent!', { description: 'We\'ll respond within 2 hours.' })
      } else {
        toast.error('Failed to send', { description: 'Please try again or email us directly.' })
      }
    } catch {
      toast.error('Network error', { description: 'Please check your connection.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    'w-full h-11 px-4 bg-muted/50 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors'

  return (
    <div>
      {/* Hero */}
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Contact</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Questions about our service? Need a custom quote for multiple properties?
            We respond within 2 hours during business hours.
          </p>
        </div>
      </Section>

      {/* Contact Grid */}
      <Section variant="default" padding="default">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', value: 'hello@readyrentalcleaning.com', href: 'mailto:hello@readyrentalcleaning.com', sub: 'We reply within 2 hours' },
                  { icon: Phone, title: 'Phone & WhatsApp', value: '(323) 555-0180', sub: 'Available 7am – 8pm, 7 days' },
                  { icon: MapPin, title: 'Service Area', value: 'Greater Los Angeles', sub: 'WeHo, Venice, Santa Monica, Silver Lake, DTLA, and more' },
                ].map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{info.title}</h3>
                      {info.href ? (
                        <a href={info.href} className="text-primary hover:underline">{info.value}</a>
                      ) : (
                        <p className="text-foreground text-sm">{info.value}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response SLA */}
            <Card depth={0} className="bg-secondary rounded-2xl p-6 border border-primary/10">
              <h3 className="font-bold text-foreground mb-4 text-sm">Response Time Guarantee</h3>
              <div className="space-y-3">
                {[
                  { label: 'During business hours (7am–8pm)', time: 'Under 2 hours' },
                  { label: 'After hours', time: 'Next morning by 9am' },
                  { label: 'Emergency / same-day', time: 'Call us directly' },
                ].map((sla) => (
                  <div key={sla.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{sla.label}</span>
                    <span className="font-bold text-primary">{sla.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card depth={1} className="p-6">
              <h3 className="font-bold text-foreground mb-4 text-sm">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'Book a cleaning online', href: '/book' },
                  { label: 'View pricing & services', href: '/services' },
                  { label: 'Read FAQ', href: '/faq' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card depth={1} className="p-8 sm:p-10">
              <h2 className="text-xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill out the form below and we will get back to you within 2 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    We will get back to you within 2 hours during business hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input type="text" name="firstName" required className={inputClasses} placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input type="text" name="lastName" required className={inputClasses} placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input type="email" name="email" required className={inputClasses} placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone (optional)</label>
                    <input type="tel" name="phone" className={inputClasses} placeholder="(323) 555-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">How many properties?</label>
                    <select name="properties" className={inputClasses}>
                      <option value="1">1 property</option>
                      <option value="2-5">2–5 properties</option>
                      <option value="6-10">6–10 properties</option>
                      <option value="10+">10+ properties</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea name="message" required rows={4} className={`${inputClasses} h-auto py-3 resize-none`} placeholder="Tell us about your cleaning needs..." />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
