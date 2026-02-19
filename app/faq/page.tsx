export default function FAQ() {
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

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">FAQ</div>
          <h1 className="heading-xl mb-6">Frequently Asked Questions</h1>
          <p className="subtext max-w-2xl mx-auto">
            Everything you need to know about SwivelClean. Cannot find your answer? <a href="/contact" className="text-teal-600 font-semibold hover:underline">Contact us</a>.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          {categories.map((category, i) => (
            <div key={i}>
              <h2 className="heading-md mb-6 pb-4 border-b border-gray-100">{category.title}</h2>
              <div className="space-y-3">
                {category.questions.map((item, j) => (
                  <details key={j} className="group card px-6 py-5 cursor-pointer">
                    <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                      {item.q}
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-4">Still Have Questions?</h2>
          <p className="subtext mb-8">Our team responds within 2 hours during business hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">Contact Us</a>
            <a href="/book" className="btn-secondary">Book a Cleaning</a>
          </div>
        </div>
      </section>
    </div>
  )
}
