export default function Reviews() {
  const testimonials = [
    { name: 'Sarah M.', area: 'West Hollywood', properties: '2 units', text: 'Absolute lifesaver. Had a same-day turnover and SwivelClean had the property guest-ready in under 3 hours. My guest reviews went from 4.2 to 4.8 since I started using them. The photo documentation alone is worth it.', rating: 5 },
    { name: 'David K.', area: 'Venice', properties: '5 units', text: 'I manage 5 properties and SwivelClean handles all of them. Professional, reliable, and their booking system is so easy. I just click, pay, and forget about it. They assigned me a dedicated cleaner who knows all my properties now.', rating: 5 },
    { name: 'Maria L.', area: 'Silver Lake', properties: '1 unit', text: 'The best cleaning service I have found for Airbnb turnovers. Fast, thorough, and their before/after photos give me total peace of mind when I cannot be there in person. Worth every penny of the $180.', rating: 5 },
    { name: 'James T.', area: 'Santa Monica', properties: '3 units', text: 'No more stress about last-minute cleanings. SwivelClean handles it all. I had an emergency same-day turnover and they got a cleaner out within 2 hours. That saved me a $400 booking.', rating: 5 },
    { name: 'Lisa R.', area: 'Downtown LA', properties: '4 units', text: 'Finally a cleaning service that understands Airbnb. They know what guests look for — spotless bathrooms, fresh linens, and that "wow" factor when they walk in. My Superhost status is thanks to them.', rating: 5 },
    { name: 'Michael P.', area: 'Los Feliz', properties: '2 units', text: 'The deep clean service is incredible. They got into corners and areas my previous cleaners never touched. My property looks brand new after every monthly deep clean. Highly recommend for any serious host.', rating: 5 },
    { name: 'Jennifer W.', area: 'Hollywood', properties: '6 units', text: 'As a property manager with 6 units, I needed someone who could handle volume. SwivelClean assigns dedicated cleaners, sticks to schedule, and the admin dashboard lets me track everything. Game changer.', rating: 5 },
    { name: 'Carlos D.', area: 'Beverly Hills', properties: '3 units', text: 'Premium service for premium properties. My Beverly Hills listings need to be immaculate and SwivelClean delivers every single time. The insurance and bonding gives my clients confidence too.', rating: 5 },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">Reviews</div>
          <h1 className="heading-xl mb-6">Trusted by LA Hosts</h1>
          <p className="subtext max-w-2xl mx-auto mb-8">
            200+ happy Airbnb hosts. 1,200+ cleanings completed. Here is what they say about SwivelClean.
          </p>
          <div className="inline-flex items-center gap-3 glass px-8 py-4 shadow-lg">
            <span className="text-yellow-500 text-2xl">★★★★★</span>
            <div className="text-left">
              <div className="font-bold text-gray-900">4.9 out of 5.0</div>
              <div className="text-xs text-gray-500">Based on 200+ verified reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-teal-600">98%</div>
              <div className="text-xs text-gray-500 mt-1">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600">4.9★</div>
              <div className="text-xs text-gray-500 mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600">87%</div>
              <div className="text-xs text-gray-500 mt-1">Repeat Clients</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-teal-600">200+</div>
              <div className="text-xs text-gray-500 mt-1">Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((review, i) => (
              <div key={i} className="card p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.area} · {review.properties}</div>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-sm">★★★★★</div>
                </div>
                <p className="text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Before &amp; After</h2>
            <p className="subtext">Real results from real SwivelClean jobs across LA.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Kitchen Turnover — West Hollywood', before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
              { label: 'Bathroom Deep Clean — Venice', before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop' },
              { label: 'Living Room — Silver Lake', before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop' },
            ].map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt="Before" className="h-40 w-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">BEFORE</div>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt="After" className="h-40 w-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">AFTER</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-cta text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Join 200+ Happy LA Hosts</h2>
          <p className="text-lg text-teal-100 mb-8">Your property deserves the same level of care. Book your first cleaning today.</p>
          <a href="/book" className="btn-white">Book Your First Cleaning</a>
        </div>
      </section>
    </div>
  )
}
