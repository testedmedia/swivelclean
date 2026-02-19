export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">Pricing</div>
          <h1 className="heading-xl mb-6">Simple, Transparent Pricing</h1>
          <p className="subtext max-w-2xl mx-auto">
            No hidden fees. No surprises. Every cleaning includes supplies, insurance coverage, and before/after photo documentation.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: 'Standard Turnover',
                price: '$180',
                time: '3–4 hours',
                desc: 'Perfect for 1-2 bedroom apartments and condos between guest checkouts.',
                popular: false,
                image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&h=300&fit=crop',
                features: [
                  'Change all bed linens & make beds',
                  'Clean & disinfect all bathrooms',
                  'Wipe down kitchen surfaces & appliances',
                  'Vacuum & mop all floors',
                  'Empty trash & replace liners',
                  'Restock essentials (soap, paper goods)',
                  'Quick walkthrough inspection',
                  'Before/after photos sent to you',
                ],
              },
              {
                title: 'Premium Turnover',
                price: '$220',
                time: '4–5 hours',
                desc: 'For 3+ bedroom properties or hosts who want the extra detail.',
                popular: true,
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop',
                features: [
                  'Everything in Standard Turnover',
                  'Additional bedrooms & bathrooms',
                  'Dust all surfaces & shelves',
                  'Wipe down baseboards',
                  'Clean interior windows',
                  'Pre-guest quality checklist',
                  'Priority scheduling',
                  'Dedicated cleaner assignment',
                ],
              },
              {
                title: 'Deep Clean',
                price: '$350',
                time: '5–6 hours',
                desc: 'Monthly deep maintenance to keep your property in top condition.',
                popular: false,
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop',
                features: [
                  'Everything in Premium Turnover',
                  'Deep clean walls & ceilings',
                  'Appliance detailing (oven, fridge)',
                  'Vent & blinds cleaning',
                  'Baseboards deep scrub',
                  'Grout & tile treatment',
                  'Cabinet interior cleaning',
                  'Detailed inspection report',
                ],
              },
            ].map((service, i) => (
              <div key={i} className={`card-elevated overflow-hidden ${service.popular ? 'ring-2 ring-teal-500 relative md:scale-105' : ''}`}>
                {service.popular && (
                  <div className="bg-teal-600 text-white text-center py-2 text-xs font-bold tracking-wider uppercase">
                    Most Popular — Best Value
                  </div>
                )}
                <img src={service.image} alt={service.title} className="w-full h-52 object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{service.time}</p>
                  <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                  <div className="text-5xl font-extrabold text-teal-600 mb-6">{service.price}</div>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/book" className={service.popular ? 'btn-primary w-full !text-center' : 'btn-secondary w-full !text-center'}>
                    Book {service.title}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* What's Included */}
          <div className="bg-teal-50 rounded-3xl p-10 sm:p-14 border border-teal-100 mb-20">
            <h2 className="heading-lg mb-8 text-center">Included with Every Cleaning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Professional Supplies',
                  desc: 'Hospital-grade disinfectant, HEPA vacuums, microfiber cloths, eco-friendly products.',
                  icon: <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                },
                {
                  title: 'Full Insurance',
                  desc: '$2M general liability. Your property is protected against any incident or damage.',
                  icon: <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                },
                {
                  title: 'Photo Documentation',
                  desc: 'Before/after photos emailed to you after every cleaning for remote verification.',
                  icon: <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                },
                {
                  title: 'Satisfaction Guarantee',
                  desc: 'Not happy? We re-clean for free. No questions asked. 100% money-back guarantee.',
                  icon: <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-teal-50 rounded-2xl mx-auto mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add-Ons */}
          <div className="mb-20">
            <h2 className="heading-lg mb-8 text-center">Available Add-Ons</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Laundry Service', price: '+$40', desc: 'We wash, dry, and fold all guest linens' },
                { name: 'Refrigerator Restock', price: '+$30', desc: 'Water bottles, snacks, and welcome essentials' },
                { name: 'Patio/Balcony Clean', price: '+$50', desc: 'Outdoor furniture wipe-down, sweep, and organize' },
                { name: 'Pet Hair Removal', price: '+$35', desc: 'Extra attention to upholstery and hard-to-reach areas' },
                { name: 'Carpet Steam Clean', price: '+$75', desc: 'Professional steam cleaning for carpeted areas' },
                { name: 'Same-Day Rush', price: '+$50', desc: 'Book before 10am for same-day cleaning service' },
              ].map((addon, i) => (
                <div key={i} className="card p-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{addon.name}</h3>
                    <p className="text-sm text-gray-500">{addon.desc}</p>
                  </div>
                  <div className="text-teal-600 font-bold text-lg whitespace-nowrap ml-4">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: 'How fast can you get here?', a: 'Standard scheduling is 24-48 hours. Same-day service is available if booked before 10 AM (rush fee applies). Weekend and holiday availability.' },
                { q: 'Do I need to provide cleaning supplies?', a: 'No. We bring everything — hospital-grade disinfectants, HEPA vacuums, microfiber cloths, and eco-friendly products. All pet-safe.' },
                { q: 'What if I am not satisfied with the cleaning?', a: 'We offer a 100% satisfaction guarantee. If anything is not up to standard, we come back and re-clean for free within 24 hours.' },
                { q: 'Are your cleaners insured?', a: 'Yes. We carry $2M general liability insurance and all cleaners are fully bonded. Your property is protected.' },
                { q: 'How do you access the property?', a: 'We work with your existing access method — lockbox, smart lock, keypad, or key exchange. Access codes are kept confidential and deleted after each job.' },
                { q: 'Can I book recurring cleanings?', a: 'Yes! We offer weekly, bi-weekly, and monthly recurring schedules with priority booking and dedicated cleaner assignment.' },
              ].map((item, i) => (
                <details key={i} className="group card px-6 py-5 cursor-pointer">
                  <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                    {item.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-cta text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Your Property Deserves the Best</h2>
          <p className="text-lg text-teal-100 mb-8">Book in 60 seconds. Your next guest will thank you.</p>
          <a href="/book" className="btn-white">
            Book a Cleaning Now
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </div>
  )
}
