'use client'

import { useState } from 'react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const serviceOptions = [
    { value: 'standard', label: 'Standard Turnover', price: '$180', time: '3–4 hours', desc: '1-2 bedroom units' },
    { value: 'premium', label: 'Premium Turnover', price: '$220', time: '4–5 hours', desc: '3+ bedroom units' },
    { value: 'deep', label: 'Deep Clean', price: '$350', time: '5–6 hours', desc: 'Monthly maintenance' },
  ]

  const selectedService = serviceOptions.find(s => s.value === formData.service)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        window.location.href = '/thank-you'
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again or contact us directly.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Min date = today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="badge mb-4">Book Online</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Book a Cleaning in 60 Seconds</h1>
          <p className="text-gray-500 mb-8">Fast, easy, secure. Your property will be guest-ready.</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {[
              { num: 1, label: 'Property' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Details' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    s.num === step ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30' :
                    s.num < step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.num < step ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    ) : s.num}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 font-medium">{s.label}</span>
                </div>
                {i < 2 && <div className={`w-12 h-0.5 mb-4 ${s.num < step ? 'bg-teal-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card p-8 sm:p-10">

            {/* Step 1: Property & Service */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="heading-md mb-1">Property &amp; Service</h2>
                  <p className="text-sm text-gray-500">Tell us about your property and what you need.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required
                    className="input-field" placeholder="123 Main St, West Hollywood, CA 90069" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unit/Apt # (optional)</label>
                  <input type="text" name="unit" value={formData.unit} onChange={handleChange}
                    className="input-field" placeholder="Apt 4B" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Service Type *</label>
                  <div className="space-y-3">
                    {serviceOptions.map((opt) => (
                      <label key={opt.value} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.service === opt.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="service" value={opt.value} checked={formData.service === opt.value}
                            onChange={handleChange} className="accent-teal-600" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{opt.label}</div>
                            <div className="text-xs text-gray-500">{opt.desc} · {opt.time}</div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-teal-600">{opt.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Next: Choose Date &amp; Time
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="heading-md mb-1">When Do You Need Us?</h2>
                  <p className="text-sm text-gray-500">Choose your preferred date and time.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required min={today}
                    className="input-field" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                  <select name="time" value={formData.time} onChange={handleChange} required className="input-field">
                    <option value="">Select a time</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Access Instructions (optional)</label>
                  <textarea name="accessNotes" value={formData.accessNotes} onChange={handleChange} rows={3}
                    className="input-field resize-none" placeholder="Lockbox code, smart lock instructions, etc." />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                  <button type="submit" className="btn-primary flex-1">
                    Next: Your Info
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Confirm */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="heading-md mb-1">Your Information</h2>
                  <p className="text-sm text-gray-500">Almost done. Enter your contact details to confirm.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="input-field" placeholder="Jane Smith" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      className="input-field" placeholder="(323) 555-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="input-field" placeholder="jane@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (optional)</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={2}
                    className="input-field resize-none" placeholder="Pet-safe products, specific areas of focus, etc." />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service</span>
                      <span className="font-semibold text-gray-900">{selectedService?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address</span>
                      <span className="font-semibold text-gray-900 text-right max-w-[200px] truncate">{formData.address || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold text-gray-900">{formData.date || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-semibold text-gray-900">{formData.time || '—'}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-extrabold text-teal-600 text-lg">{selectedService?.price}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Booking...' : 'Complete Booking'}
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  By booking, you agree to our service terms. 100% satisfaction guaranteed.
                  Secure payment powered by Stripe.
                </p>
              </div>
            )}
          </form>

          {/* Trust Strip */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-sm">
              <div className="text-teal-600 font-bold mb-1">🛡</div>
              <div className="text-xs text-gray-500">Fully Insured</div>
            </div>
            <div className="text-sm">
              <div className="text-teal-600 font-bold mb-1">⚡</div>
              <div className="text-xs text-gray-500">Same-Day Available</div>
            </div>
            <div className="text-sm">
              <div className="text-teal-600 font-bold mb-1">⭐</div>
              <div className="text-xs text-gray-500">100% Guarantee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
