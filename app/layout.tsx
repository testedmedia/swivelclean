import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SpotlessLA - Premium Airbnb Turnover Cleaning',
  description: 'Professional turnover and deep cleaning service for LA Airbnb hosts. Fast, reliable, trusted.',
  openGraph: {
    title: 'SpotlessLA - Premium Airbnb Turnover Cleaning',
    description: 'Professional turnover and deep cleaning service for LA Airbnb hosts.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-teal-600">SpotlessLA</a>
            <div className="hidden md:flex gap-8">
              <a href="/" className="text-sm font-medium hover:text-teal-600">Home</a>
              <a href="/services" className="text-sm font-medium hover:text-teal-600">Services</a>
              <a href="/reviews" className="text-sm font-medium hover:text-teal-600">Reviews</a>
              <a href="/business-plan" className="text-sm font-medium hover:text-teal-600">Business Plan</a>
              <a href="/contact" className="text-sm font-medium hover:text-teal-600">Contact</a>
              <a href="/book" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700">Book Now</a>
            </div>
            <button className="md:hidden px-3 py-2 text-sm font-medium">Menu</button>
          </div>
        </nav>

        <main className="pt-16">
          {children}
        </main>

        <footer className="bg-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">SpotlessLA</h3>
                <p className="text-gray-400 text-sm">Professional cleaning for Airbnb hosts in LA.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/services" className="hover:text-white">Turnover Cleaning</a></li>
                  <li><a href="/services" className="hover:text-white">Deep Clean</a></li>
                  <li><a href="/services" className="hover:text-white">Move-In/Out</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/business-plan" className="hover:text-white">Business Plan</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2026 SpotlessLA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
