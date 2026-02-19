'use client'

import { useState } from 'react'

const FAQS = [
  { q: 'How fast can you get here?', a: 'Standard scheduling is 24-48 hours. Same-day service is available if booked before 10 AM (rush fee applies). Weekend and holiday availability.' },
  { q: 'Do I need to provide cleaning supplies?', a: 'No. We bring everything — hospital-grade disinfectants, HEPA vacuums, microfiber cloths, and eco-friendly products. All pet-safe.' },
  { q: 'What if I am not satisfied with the cleaning?', a: 'We offer a 100% satisfaction guarantee. If anything is not up to standard, we come back and re-clean for free within 24 hours.' },
  { q: 'Are your cleaners insured?', a: 'Yes. We carry $2M general liability insurance and all cleaners are fully bonded. Your property is protected.' },
  { q: 'How do you access the property?', a: 'We work with your existing access method — lockbox, smart lock, keypad, or key exchange. Access codes are kept confidential and deleted after each job.' },
  { q: 'Can I book recurring cleanings?', a: 'Yes! We offer weekly, bi-weekly, and monthly recurring schedules with priority booking and dedicated cleaner assignment.' },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>{item.q}</span>
            <svg
              className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
