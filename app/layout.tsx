'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import './globals.css'

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
      {children}
    </a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: ReactNode; onClick: () => void }) {
  return (
    <a href={href} onClick={onClick} className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors">
      {children}
    </a>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <title>SwivelClean — Premium Airbnb Turnover Cleaning in LA</title>
        <meta name="description" content="Professional turnover and deep cleaning for Airbnb & short-term rental hosts in Los Angeles. Book in 60 seconds. Guaranteed spotless." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SwivelClean — Premium Airbnb Turnover Cleaning" />
        <meta property="og:description" content="Professional turnover and deep cleaning for LA Airbnb hosts. Fast, reliable, trusted by 200+ hosts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swivelclean.com" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Swivel<span className="text-teal-600">Clean</span></span>
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/reviews">Reviews</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <a href="/book" className="btn-primary !py-2.5 !px-6 !text-sm">
                  Book Now
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="px-4 py-4 space-y-1">
                <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                <MobileNavLink href="/services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
                <MobileNavLink href="/reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</MobileNavLink>
                <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
                <div className="pt-2">
                  <a href="/book" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full !text-center">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SC</span>
                  </div>
                  <span className="text-lg font-bold">SwivelClean</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Premium Airbnb turnover cleaning for Los Angeles hosts. Fast, reliable, guaranteed spotless.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Services</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="/services" className="hover:text-white transition-colors">Turnover Cleaning</a></li>
                  <li><a href="/services" className="hover:text-white transition-colors">Deep Clean</a></li>
                  <li><a href="/services" className="hover:text-white transition-colors">Move-In/Out</a></li>
                  <li><a href="/book" className="hover:text-white transition-colors">Book Online</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Company</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
                  <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Service Areas</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>West Hollywood</li>
                  <li>Venice & Santa Monica</li>
                  <li>Silver Lake & Los Feliz</li>
                  <li>Downtown LA</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SwivelClean. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                <a href="/contact" className="hover:text-white transition-colors">Support</a>
                <a href="mailto:hello@swivelclean.com" className="hover:text-white transition-colors">hello@swivelclean.com</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
