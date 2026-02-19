export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge mb-6">About Us</div>
              <h1 className="heading-xl mb-6">
                We Keep LA Properties{' '}
                <span className="text-teal-600">Guest-Ready</span>
              </h1>
              <p className="subtext max-w-lg">
                SwivelClean was built for one reason: Airbnb hosts deserve a cleaning service that is as reliable as they are. Fast turnarounds, professional quality, zero hassle.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop"
                alt="Modern clean apartment"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            Every guest checkout is a moment of truth for Airbnb hosts. A bad cleaning means bad reviews, lost bookings, and revenue down the drain.
            We exist to eliminate that risk. Our cleaners arrive on time, clean to hotel standards, and document everything with photos —
            so you never have to worry about your property again.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '200+', label: 'LA Hosts Trust Us', desc: 'From individual owners to property managers with 20+ units' },
              { number: '1,200+', label: 'Cleanings Completed', desc: 'Turnover, deep cleans, move-in/out — we handle it all' },
              { number: '4.9★', label: 'Average Rating', desc: 'Consistently rated 5 stars by hosts across LA' },
            ].map((stat, i) => (
              <div key={i} className="card p-8">
                <div className="stat-number mb-2">{stat.number}</div>
                <div className="font-bold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-sm text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Makes Us Different</h2>
            <p className="subtext max-w-2xl mx-auto">We are not just another cleaning service. We are built specifically for short-term rental hosts.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Built for Airbnb',
                desc: 'We understand the unique needs of short-term rental turnovers — tight timelines, specific guest expectations, and the importance of every detail.',
                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=300&fit=crop',
              },
              {
                title: 'Photo Documentation',
                desc: 'Every cleaning includes before/after photos sent directly to you. Verify your property remotely and have proof if any guest damage claims arise.',
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop',
              },
              {
                title: 'Dedicated Cleaners',
                desc: 'Get assigned a dedicated cleaner who learns your property. Consistency means better quality and faster turnarounds every time.',
                image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=500&h=300&fit=crop',
              },
              {
                title: 'Instant Online Booking',
                desc: 'Book and pay in 60 seconds from your phone. Get instant confirmation, 24h reminders, and completion notifications automatically.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
              },
            ].map((item, i) => (
              <div key={i} className="card-elevated overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Service Area</h2>
            <p className="subtext">We cover the top Airbnb neighborhoods in Los Angeles.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'West Hollywood', 'Venice', 'Santa Monica', 'Silver Lake',
              'Los Feliz', 'Downtown LA', 'Beverly Hills', 'Hollywood',
              'Koreatown', 'Echo Park', 'Mar Vista', 'Culver City',
            ].map((area, i) => (
              <div key={i} className="card p-4 text-center">
                <span className="font-medium text-gray-700 text-sm">{area}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not listed? <a href="/contact" className="text-teal-600 font-semibold hover:underline">Contact us</a> — we are expanding every month.
          </p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Your Property Is Protected</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: '$2M Insurance', desc: 'General liability coverage on every job', icon: '🛡' },
              { title: 'Background Checked', desc: 'Every cleaner verified before joining', icon: '✓' },
              { title: 'Bonded & Licensed', desc: 'Fully compliant with CA regulations', icon: '📋' },
              { title: 'Satisfaction Guarantee', desc: 'Not happy? Free re-clean, no questions', icon: '⭐' },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-cta text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Work with the Best?</h2>
          <p className="text-lg text-teal-100 mb-8">Join 200+ LA hosts who trust SwivelClean for every turnover.</p>
          <a href="/book" className="btn-white">
            Book Your First Cleaning
          </a>
        </div>
      </section>
    </div>
  )
}
