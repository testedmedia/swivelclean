export default function Services() {
  return (
    <div className="bg-white">
      <section className="cro-section bg-gradient-to-br from-teal-50 to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            Simple, transparent pricing. Premium quality guaranteed.
          </p>
        </div>
      </section>

      <section className="cro-section max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'Standard Turnover',
              price: '$180',
              time: '3-4 hours',
              best: false,
              features: [
                'Change all bed linens',
                'Clean & disinfect bathrooms',
                'Wipe down kitchen',
                'Vacuum & mop all floors',
                'Empty & replace trash liners',
                'Quick walkthrough'
              ]
            },
            {
              title: 'Premium Turnover',
              price: '$220',
              time: '4-5 hours',
              best: true,
              features: [
                'All standard services',
                'Extra bedrooms & bathrooms',
                'Dust all surfaces',
                'Baseboards wiped',
                'Windows cleaned',
                'Pre-guest quality check'
              ]
            },
            {
              title: 'Deep Clean',
              price: '$350',
              time: '5-6 hours',
              best: false,
              features: [
                'Everything from turnover',
                'Deep wall cleaning',
                'Appliance detailing',
                'Vent & blinds cleaning',
                'Baseboards scrubbed',
                'Monthly maintenance'
              ]
            }
          ].map((service, i) => (
            <div key={i} className={`rounded-xl border transition-all ${
              service.best
                ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:shadow-md'
            } p-8`}>
              {service.best && (
                <div className="text-center mb-4">
                  <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <div className="text-4xl font-bold text-teal-600 mb-2">{service.price}</div>
              <p className="text-gray-600 text-sm mb-6">{service.time}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <span className="text-teal-600 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <a href="/book" className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                service.best
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
              }`}>
                Book Now
              </a>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-12 border border-blue-200">
          <h2 className="text-3xl font-bold mb-6 text-center">What's Included in Every Cleaning?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Cleaning Standards</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="text-blue-600">•</span> Hospital-grade disinfectant</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> HEPA-certified vacuum</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> Microfiber cleaning cloths</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> Eco-friendly products (pet-safe)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Your Guarantee</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="text-blue-600">•</span> Property-ready in 4 hours max</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> 100% satisfaction or we re-clean free</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> Before/after photos included</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> Fully insured & bonded</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cro-section bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">FAQ</h2>
          <div className="space-y-4 text-left">
            {[
              {
                q: 'How do I book a cleaning?',
                a: "Go to our Book page, enter your address, select service type & time, and pay securely. Takes 60 seconds. You'll get confirmation instantly."
              },
              {
                q: 'Can you do same-day cleaning?',
                a: 'Yes! If you book before 10 AM, we can often get a cleaner out the same day. Weekend emergency cleans available by request.'
              },
              {
                q: "What if I'm not happy with the cleaning?",
                a: "We offer a 100% satisfaction guarantee. If there's any issue, we'll re-clean for free, no questions asked."
              },
              {
                q: 'Are you insured?',
                a: 'Yes! We carry $2M general liability insurance and are fully bonded. Your property is protected.'
              },
              {
                q: 'How do you access the property?',
                a: 'We work with your existing access (lockbox, keypad, smart lock). You can provide access codes securely through our system.'
              },
            ].map((item, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
                <summary className="font-bold text-gray-900">{item.q}</summary>
                <p className="mt-3 text-gray-700 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
