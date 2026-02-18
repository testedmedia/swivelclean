import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-4xl font-bold mb-4">Cleaning Booked!</h1>
          <p className="text-xl text-gray-600">
            Confirmation email sent. Your cleaner will arrive on schedule.
          </p>
        </div>

        <div className="bg-teal-50 border-2 border-teal-600 rounded-xl p-8 mb-8 text-left">
          <h2 className="font-bold text-lg mb-4">What Happens Next?</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">1.</span>
              <span>We'll send a confirmation text 24 hours before your scheduled cleaning</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">2.</span>
              <span>Your cleaner will arrive on time with supplies and insurance</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">3.</span>
              <span>After cleaning, you'll receive photos and a completion confirmation</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">4.</span>
              <span>We'll send you a review request (Google & Airbnb link)</span>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <p className="font-semibold text-gray-900 mb-2">Questions or Need to Reschedule?</p>
          <p className="text-gray-700 mb-4">
            Reply to your confirmation email or call/text us immediately. We're here to help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700">
            Back to Home
          </Link>
          <Link href="/book" className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50">
            Book Another
          </Link>
        </div>
      </div>
    </div>
  )
}
