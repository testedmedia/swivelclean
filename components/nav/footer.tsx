export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RR</span>
              </div>
              <span className="text-lg font-bold">Ready Rental Cleaning</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Premium Airbnb turnover cleaning for Los Angeles hosts. Fast, reliable, guaranteed spotless.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-background/70 mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="/services" className="hover:text-background transition-colors">Turnover Cleaning</a></li>
              <li><a href="/services" className="hover:text-background transition-colors">Deep Clean</a></li>
              <li><a href="/services" className="hover:text-background transition-colors">Move-In/Out</a></li>
              <li><a href="/book" className="hover:text-background transition-colors">Book Online</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-background/70 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="/about" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="/reviews" className="hover:text-background transition-colors">Reviews</a></li>
              <li><a href="/faq" className="hover:text-background transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-background/70 mb-4">
              Service Areas
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>West Hollywood</li>
              <li>Venice &amp; Santa Monica</li>
              <li>Silver Lake &amp; Los Feliz</li>
              <li>Downtown LA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">
            &copy; {new Date().getFullYear()} Ready Rental Cleaning. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/40">
            <a href="/faq" className="hover:text-background transition-colors">FAQ</a>
            <a href="/contact" className="hover:text-background transition-colors">Support</a>
            <a href="mailto:hello@readyrentalcleaning.com" className="hover:text-background transition-colors">
              hello@readyrentalcleaning.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
