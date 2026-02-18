export default function Reviews() {
  const testimonials = [
    { name: 'Sarah M.', rating: 5, text: 'Absolute lifesaver! Had a turnover in 3 hours with SwivelClean. Property looked amazing for the next guest.', area: 'West Hollywood' },
    { name: 'David K.', rating: 5, text: 'Professional, reliable, and affordable. We use them for all 5 properties. Highly recommended!', area: 'Venice' },
    { name: 'Maria L.', rating: 5, text: 'The best cleaning service I\'ve found for Airbnb turnovers. Fast, thorough, and they document everything with photos.', area: 'Silver Lake' },
    { name: 'James T.', rating: 5, text: 'No more stress about last-minute cleanings. SwivelClean handles it all. Worth every penny!', area: 'Santa Monica' },
  ]

  return (
    <div className="bg-white">
      <section className="cro-section bg-gradient-to-br from-teal-50 to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Trusted by LA Hosts</h1>
          <p className="text-xl text-gray-600 mb-8">
            200+ happy Airbnb hosts. 1,200+ cleanings. 4.9★ average rating.
          </p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
            <span className="text-2xl">★★★★★</span>
            <span className="text-gray-700 font-semibold">4.9 out of 5</span>
          </div>
        </div>
      </section>

      <section className="cro-section max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Hosts Are Saying</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((review, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  {review.name.split(' ')[0][0]}{review.name.split(' ')[1][0]}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.area}</div>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-teal-600">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700 italic">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Join 200+ Happy Hosts</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Stop coordinating cleanings. Stop worrying about quality. Let us handle it so you can focus on your guests.
          </p>
          <a href="/book" className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700">
            Book Your First Cleaning
          </a>
        </div>
      </section>

      <section className="cro-section bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Earn Your Trust</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🛡</div>
              <h3 className="font-bold text-lg mb-2">Fully Insured</h3>
              <p className="text-gray-600 text-sm">$2M general liability coverage protects your property</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2">Background Checked</h3>
              <p className="text-gray-600 text-sm">All cleaners pass thorough background verification</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="font-bold text-lg mb-2">Photo Documented</h3>
              <p className="text-gray-600 text-sm">Before/after photos with every cleaning</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
