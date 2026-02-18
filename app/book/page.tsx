'use client'

import { useState } from 'react'

export default function Book() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    address: '',
    service: 'standard',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Submit booking
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          window.location.href = '/thank-you'
        }
      } catch (error) {
        console.error('Booking error:', error)
      }
    }
  }

  const serviceOptions = [
    { value: 'standard', label: 'Standard Turnover', price: '$180' },
    { value: 'premium', label: 'Premium Turnover (3+ BR)', price: '$220' },
    { value: 'deep', label: 'Deep Clean', price: '$350' },
  ]

  const selectedService = serviceOptions.find(s => s.value === formData.service)

  return (
    <div className="bg-white">
      <section className="cro-section bg-gradient-to-br from-teal-50 to-blue-50 pt-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Book a Cleaning in 60 Seconds</h1>
          <p className="text-gray-600 mb-8">Fast, easy, secure. Your property will be ready.</p>
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                s === step ? 'bg-teal-600 text-white' : s < step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {s < step ? '✓' : s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cro-section max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {/* Step 1: Property & Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Property & Service</h2>

              <div>
                <label className="block text-sm font-semibold mb-2">Property Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main St, West Hollywood, CA"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Service Type</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} — {opt.price}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-2">Price: <span className="font-bold text-teal-600">{selectedService?.price}</span></p>
              </div>

              <button
                type="submit"
                className="w-full cro-button-primary"
              >
                Next: Date & Time
              </button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">When Do You Need Us?</h2>

              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = 8 + i
                    const ampm = hour < 12 ? 'AM' : 'PM'
                    const displayHour = hour > 12 ? hour - 12 : hour
                    return (
                      <option key={hour} value={`${displayHour}:00 ${ampm}`}>
                        {displayHour}:00 {ampm}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 cro-button-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 cro-button-primary"
                >
                  Next: Your Info
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Information</h2>

              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-teal-700 mb-2">Order Summary</div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{selectedService?.label}</span>
                  <span className="font-bold">{selectedService?.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 cro-button-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 cro-button-primary"
                >
                  Complete Booking
                </button>
              </div>
            </div>
          )}
        </form>
      </section>

      <section className="cro-section bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Trust SpotlessLA?</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">✓</div>
            <div className="font-bold">100% Satisfaction Guaranteed</div>
            <p className="text-sm text-gray-600 mt-2">Not happy? We re-clean for free.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🛡</div>
            <div className="font-bold">Fully Insured & Bonded</div>
            <p className="text-sm text-gray-600 mt-2">$2M liability coverage. Your property is protected.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-bold">Fast & Reliable</div>
            <p className="text-sm text-gray-600 mt-2">4-hour max turnaround. Same-day available.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
