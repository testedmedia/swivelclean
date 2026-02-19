export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-extrabold text-primary-foreground tracking-tight">RR</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight">Ready Rental Cleaning</span>
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
              <li><a href="/airbnb-turnover-cleaning-los-angeles" className="hover:text-background transition-colors">Turnover Cleaning</a></li>
              <li><a href="/vacation-rental-deep-clean" className="hover:text-background transition-colors">Deep Clean</a></li>
              <li><a href="/same-day-airbnb-cleaning" className="hover:text-background transition-colors">Same-Day Cleaning</a></li>
              <li><a href="/airbnb-cleaning-cost-calculator" className="hover:text-background transition-colors">Cost Calculator</a></li>
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
              <li><a href="/compare/diy-vs-professional" className="hover:text-background transition-colors">DIY vs Professional</a></li>
              <li><a href="/referral" className="hover:text-background transition-colors">Earn $25 — Refer a Host</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-background/70 mb-4">
              LA Neighborhoods
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="/airbnb-cleaning/west-hollywood" className="hover:text-background transition-colors">West Hollywood</a></li>
              <li><a href="/airbnb-cleaning/venice" className="hover:text-background transition-colors">Venice</a></li>
              <li><a href="/airbnb-cleaning/santa-monica" className="hover:text-background transition-colors">Santa Monica</a></li>
              <li><a href="/airbnb-cleaning/hollywood" className="hover:text-background transition-colors">Hollywood</a></li>
              <li><a href="/airbnb-cleaning/silver-lake" className="hover:text-background transition-colors">Silver Lake</a></li>
              <li><a href="/airbnb-cleaning/downtown-la" className="hover:text-background transition-colors">Downtown LA</a></li>
              <li><a href="/airbnb-cleaning/beverly-hills" className="hover:text-background transition-colors">Beverly Hills</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-background/70 mb-4">
              More Cities
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="/airbnb-cleaning/culver-city" className="hover:text-background transition-colors">Culver City</a></li>
              <li><a href="/airbnb-cleaning/pasadena" className="hover:text-background transition-colors">Pasadena</a></li>
              <li><a href="/airbnb-cleaning/long-beach" className="hover:text-background transition-colors">Long Beach</a></li>
              <li><a href="/airbnb-cleaning/burbank" className="hover:text-background transition-colors">Burbank</a></li>
              <li><a href="/airbnb-cleaning/manhattan-beach" className="hover:text-background transition-colors">Manhattan Beach</a></li>
              <li><a href="/airbnb-cleaning/marina-del-rey" className="hover:text-background transition-colors">Marina del Rey</a></li>
              <li><a href="/airbnb-cleaning/koreatown" className="hover:text-background transition-colors">Koreatown</a></li>
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
