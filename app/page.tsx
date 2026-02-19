export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero section-padding-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="badge-green mb-6">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Trusted by 200+ LA Airbnb Hosts
              </div>

              <h1 className="heading-xl mb-6">
                Your Airbnb Ready in{' '}
                <span className="text-teal-600">3 Hours</span>
                <br />
                <span className="text-gray-400 text-3xl sm:text-4xl lg:text-5xl font-bold">Every Time. Guaranteed.</span>
              </h1>

              <p className="subtext mb-8 max-w-lg">
                Professional turnover &amp; deep cleaning for LA short-term rental hosts.
                West Hollywood to Venice. Book in 60 seconds, pay online, we handle the rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="/book" className="btn-primary">
                  Book a Cleaning
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="/services" className="btn-secondary">
                  View Pricing
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Fully Insured
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Same-Day Available
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  4.9 ★ Rating
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="animate-fade-in animate-delay-200 hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=500&fit=crop"
                    alt="Professional cleaning service"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 glass p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">1,200+</div>
                      <div className="text-xs text-gray-500">Cleanings Completed</div>
                    </div>
                  </div>
                </div>
                {/* Floating rating */}
                <div className="absolute -top-4 -right-4 glass p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">4.9</div>
                    <div className="text-yellow-500 text-sm">★★★★★</div>
                    <div className="text-xs text-gray-500 mt-1">200+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="stat-number">200+</div>
              <div className="stat-label">Happy Hosts</div>
            </div>
            <div>
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Cleanings Done</div>
            </div>
            <div>
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div>
              <div className="stat-number">3hr</div>
              <div className="stat-label">Avg Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-4">Simple Process</div>
            <h2 className="heading-lg mb-4">Book in 60 Seconds. We Handle Everything.</h2>
            <p className="subtext max-w-2xl mx-auto">From booking to spotless — here is how it works.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Book Online',
                desc: 'Enter your property address, pick a service, choose a date. Secure payment via Stripe. Done in 60 seconds.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                ),
              },
              {
                step: '02',
                title: 'We Clean',
                desc: 'Our background-checked, insured cleaner arrives on schedule with professional supplies. 3-4 hour turnaround.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                ),
              },
              {
                step: '03',
                title: 'Guest Ready',
                desc: 'Get before/after photos, confirmation email, and invoice. Your property is spotless for the next guest.',
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="card-elevated p-8 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Step {item.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-6 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  {item.icon}
                </div>
                <h3 className="heading-md mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-4">Our Services</div>
            <h2 className="heading-lg mb-4">Transparent Pricing. Premium Quality.</h2>
            <p className="subtext max-w-2xl mx-auto">Every cleaning includes supplies, insurance, and before/after photos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Standard Turnover',
                price: '$180',
                time: '3–4 hours',
                popular: false,
                image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=250&fit=crop',
                features: ['Change all linens', 'Bathrooms deep clean', 'Kitchen wipe-down', 'Vacuum & mop floors', 'Trash & restock'],
              },
              {
                title: 'Premium Turnover',
                price: '$220',
                time: '4–5 hours',
                popular: true,
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop',
                features: ['All standard services', 'Extra bedrooms/baths', 'Dust all surfaces', 'Windows & baseboards', 'Pre-guest quality check'],
              },
              {
                title: 'Deep Clean',
                price: '$350',
                time: '5–6 hours',
                popular: false,
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop',
                features: ['Full property deep clean', 'Appliance detailing', 'Wall & ceiling clean', 'Vent & blinds', 'Baseboards scrubbed'],
              },
            ].map((service, i) => (
              <div key={i} className={`card-elevated overflow-hidden ${service.popular ? 'ring-2 ring-teal-500 relative' : ''}`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{service.time}</p>
                  <div className="text-4xl font-extrabold text-teal-600 mb-6">{service.price}</div>
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/book" className={service.popular ? 'btn-primary w-full !text-center' : 'btn-secondary w-full !text-center'}>
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SwivelClean */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge mb-4">Why SwivelClean</div>
              <h2 className="heading-lg mb-6">Built for Airbnb Hosts Who Demand the Best</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Every guest checkout is a revenue event. A missed or bad cleaning means lost bookings, bad reviews, and frustrated guests. We eliminate that risk completely.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Fully Insured & Bonded', desc: '$2M general liability coverage. Your property is protected against any incident.', icon: '🛡' },
                  { title: 'Background-Checked Cleaners', desc: 'Every cleaner passes thorough background verification before joining our team.', icon: '✓' },
                  { title: '100% Satisfaction Guarantee', desc: 'Not happy with the clean? We come back and re-clean for free. No questions asked.', icon: '⭐' },
                  { title: 'Photo Documentation', desc: 'Before/after photos with every cleaning so you can verify remotely.', icon: '📸' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=700&fit=crop"
                alt="Clean modern apartment interior"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 glass p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Average Host Rating</div>
                    <div className="text-2xl font-bold text-gray-900">4.9 out of 5.0</div>
                  </div>
                  <div className="text-yellow-500 text-2xl">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-4">Reviews</div>
            <h2 className="heading-lg mb-4">What LA Hosts Are Saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', area: 'West Hollywood', text: 'Absolute lifesaver. Had a same-day turnover and SwivelClean had the property guest-ready in under 3 hours. My reviews went from 4.2 to 4.8 since I started using them.', rating: 5 },
              { name: 'David K.', area: 'Venice', text: 'I manage 5 properties and SwivelClean handles all of them. Professional, reliable, and their photo documentation gives me peace of mind when I can\'t be there in person.', rating: 5 },
              { name: 'Maria L.', area: 'Silver Lake', text: 'The best cleaning service for Airbnb turnovers. Fast, thorough, and their booking system is so easy. I just click, pay, and forget about it. Worth every penny.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="card p-8">
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/reviews" className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
              Read all reviews →
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-4">Coverage</div>
            <h2 className="heading-lg mb-4">Serving All of Los Angeles</h2>
            <p className="subtext max-w-2xl mx-auto">We cover the top Airbnb neighborhoods in LA with same-day availability.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { area: 'West Hollywood', listings: '2,000+ listings' },
              { area: 'Venice', listings: '1,500+ listings' },
              { area: 'Santa Monica', listings: '1,800+ listings' },
              { area: 'Silver Lake', listings: '1,200+ listings' },
              { area: 'Downtown LA', listings: '1,500+ listings' },
              { area: 'Los Feliz', listings: '800+ listings' },
              { area: 'Beverly Hills', listings: '900+ listings' },
              { area: 'Hollywood', listings: '1,100+ listings' },
            ].map((item, i) => (
              <div key={i} className="card p-5 text-center">
                <div className="font-bold text-gray-900 mb-1">{item.area}</div>
                <div className="text-xs text-gray-500">{item.listings}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-cta text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Ready to Never Worry About Cleanings Again?</h2>
          <p className="text-lg text-teal-100 mb-8 max-w-xl mx-auto">
            Book your first cleaning now. 60 seconds to book, 3 hours to spotless, 100% guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="btn-white">
              Book Your First Cleaning
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
