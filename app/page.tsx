export default function Home() {
  return (
    <div>
      {/* Hero Section - CRO Optimized */}
      <section className="cro-section bg-gradient-to-br from-teal-50 via-white to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="trust-badge">✓ Trusted by 200+ LA Hosts</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Airbnb Ready in <span className="text-teal-600">3 Hours</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional turnover & deep cleaning for LA Airbnb hosts. From West Hollywood to Venice. One booking, one cleaner, guaranteed spotless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="cro-button-primary">
              Book a Cleaning
            </a>
            <a href="/business-plan" className="cro-button-secondary">
              See Our Plan
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section - Social Proof */}
      <section className="cro-section bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div className="cro-stat">
              <div className="cro-stat-number">200+</div>
              <div className="cro-stat-label">Happy Hosts</div>
            </div>
            <div className="cro-stat">
              <div className="cro-stat-number">1,200+</div>
              <div className="cro-stat-label">Cleanings Complete</div>
            </div>
            <div className="cro-stat">
              <div className="cro-stat-number">4.9★</div>
              <div className="cro-stat-label">Average Rating</div>
            </div>
            <div className="cro-stat">
              <div className="cro-stat-number">$10K</div>
              <div className="cro-stat-label">Month 1 Revenue Target</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="cro-section bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Standard Turnover',
                price: '$180',
                desc: 'Beds, bathrooms, kitchen, floors. 3-4 hours.',
                features: ['Change linens', 'Clean bathrooms', 'Vacuum & mop', 'Kitchen clean'],
              },
              {
                title: 'Premium Turnover',
                price: '$220',
                desc: 'For 3+ bedroom units. Everything included.',
                features: ['All standard services', 'Extra rooms', 'Detailed cleaning', 'Pre-guest check'],
              },
              {
                title: 'Deep Clean',
                price: '$350',
                desc: 'Monthly deep clean. Walls, baseboards, vents.',
                features: ['Full deep clean', 'Windows', 'Baseboards', 'Appliances detail'],
              },
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-teal-600 mb-4">{service.price}</div>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-teal-600">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cro-section bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Keep Your Properties Spotless?</h2>
          <p className="text-lg mb-8 opacity-90">Book your first cleaning now. We'll be there when you need us.</p>
          <a href="/book" className="inline-block px-8 py-4 bg-white text-teal-600 rounded-lg font-bold hover:bg-gray-100">
            Get Started in 60 Seconds
          </a>
        </div>
      </section>
    </div>
  )
}
