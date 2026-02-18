export default function Contact() {
  return (
    <div className="bg-white">
      <section className="cro-section bg-gradient-to-br from-teal-50 to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help. Response time: under 2 hours.
          </p>
        </div>
      </section>

      <section className="cro-section max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">(213) XXX-XXXX</p>
                <p className="text-sm text-gray-500">Available 7am - 8pm, 7 days</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-gray-600">(213) XXX-XXXX</p>
                <p className="text-sm text-gray-500">Fastest way to reach us</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600">hello@swivelclean.la</p>
                <p className="text-sm text-gray-500">We reply within 2 hours</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Service Area</h3>
                <p className="text-gray-600">West Hollywood, Venice, Santa Monica, Silver Lake, Downtown LA</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-teal-50 border border-teal-200 rounded-lg">
              <h3 className="font-bold text-teal-700 mb-3">Response Time SLA</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>☐ 9am - 6pm: 30 minute response time</li>
                <li>☐ 6pm - 9am: Next business day by 9am</li>
                <li>☐ Emergency: Call for same-day service</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone (optional)</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent h-32"></textarea>
              </div>
              <button type="submit" className="w-full cro-button-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section className="cro-section bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What if I need an emergency cleaning?", a: "Call us immediately. We often have same-day availability for rush jobs. Premium emergency rate applies." },
              { q: "Can I modify my booking?", a: "Yes! Contact us at least 48 hours before your scheduled cleaning to reschedule or change the service type." },
              { q: "What's your cancellation policy?", a: "Free cancellation up to 48 hours before. Within 48 hours, a 50% cancellation fee applies." },
              { q: "Do you provide cleaning supplies?", a: "Yes, all supplies are included. We bring everything needed. Guest requests honored (pet-safe products, etc.)" },
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
