import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <div className="card p-10 sm:p-14 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Cleaning Booked!</h1>
          <p className="text-lg text-gray-500 mb-10">
            Your confirmation email is on its way. Your property will be spotless and guest-ready on schedule.
          </p>

          {/* What Happens Next */}
          <div className="bg-gray-50 rounded-2xl p-8 text-left mb-10 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-6">What Happens Next</h2>
            <div className="space-y-5">
              {[
                { step: '1', title: '24-Hour Reminder', desc: 'You will receive a text and email reminder the day before your cleaning with your cleaner\'s details.' },
                { step: '2', title: 'Cleaner Arrives', desc: 'Your background-checked, insured cleaner arrives on time with all professional supplies.' },
                { step: '3', title: 'Photo Documentation', desc: 'After cleaning, you will receive before/after photos and a completion confirmation via email.' },
                { step: '4', title: 'Quick Review', desc: 'We will send you a review link — your feedback helps us serve LA hosts better.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Box */}
          <div className="bg-teal-50 rounded-2xl p-6 text-left mb-10 border border-teal-100">
            <h3 className="font-bold text-teal-800 mb-2 text-sm">Need to Reschedule or Have Questions?</h3>
            <p className="text-sm text-gray-700">
              Email us at <a href="mailto:hello@swivelclean.com" className="text-teal-600 font-semibold hover:underline">hello@swivelclean.com</a> or
              call <span className="font-semibold">(323) 555-0180</span>. We respond within 2 hours.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/book" className="btn-secondary">
              Book Another Cleaning
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
