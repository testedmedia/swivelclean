'use client'

import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">Contact</div>
          <h1 className="heading-xl mb-6">Get in Touch</h1>
          <p className="subtext max-w-2xl mx-auto">
            Questions about our service? Need a custom quote for multiple properties? We respond within 2 hours during business hours.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Email</h3>
                      <a href="mailto:hello@swivelclean.com" className="text-teal-600 hover:underline">hello@swivelclean.com</a>
                      <p className="text-xs text-gray-500 mt-1">We reply within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Phone & WhatsApp</h3>
                      <p className="text-gray-700">(323) 555-0180</p>
                      <p className="text-xs text-gray-500 mt-1">Available 7am – 8pm, 7 days</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Service Area</h3>
                      <p className="text-gray-700 text-sm">Greater Los Angeles</p>
                      <p className="text-xs text-gray-500 mt-1">WeHo, Venice, Santa Monica, Silver Lake, DTLA, and more</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response SLA */}
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-teal-800 mb-4 text-sm">Response Time Guarantee</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">During business hours (7am–8pm)</span>
                    <span className="font-bold text-teal-700">Under 2 hours</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">After hours</span>
                    <span className="font-bold text-teal-700">Next morning by 9am</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Emergency / same-day</span>
                    <span className="font-bold text-teal-700">Call us directly</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/book" className="flex items-center justify-between text-sm text-gray-700 hover:text-teal-600 transition-colors py-2">
                    <span>Book a cleaning online</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/services" className="flex items-center justify-between text-sm text-gray-700 hover:text-teal-600 transition-colors py-2">
                    <span>View pricing & services</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                  <a href="/faq" className="flex items-center justify-between text-sm text-gray-700 hover:text-teal-600 transition-colors py-2">
                    <span>Read FAQ</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card p-8 sm:p-10">
                <h2 className="heading-md mb-2">Send Us a Message</h2>
                <p className="text-sm text-gray-500 mb-8">Fill out the form below and we will get back to you within 2 hours.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">We will get back to you within 2 hours during business hours.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input type="text" required className="input-field" placeholder="Jane" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input type="text" required className="input-field" placeholder="Smith" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input type="email" required className="input-field" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
                      <input type="tel" className="input-field" placeholder="(323) 555-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">How many properties?</label>
                      <select className="input-field">
                        <option value="1">1 property</option>
                        <option value="2-5">2–5 properties</option>
                        <option value="6-10">6–10 properties</option>
                        <option value="10+">10+ properties</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea required rows={4} className="input-field resize-none" placeholder="Tell us about your cleaning needs..."></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
