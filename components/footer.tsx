export function Footer() {
  return (
    <footer className="bg-[var(--burgundy)] text-[var(--cream)] py-16 sm:py-20 border-t-4 border-[var(--gold)]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-normal mb-6 text-[var(--gold)] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Golden Triangle
            </h3>
            <p className="text-[var(--cream)]/80 text-sm sm:text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              A boutique company crafting handcrafted luxury journeys across India, from iconic landmarks to carefully
              guarded hidden gems.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-6 text-[var(--gold)] text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-inter)' }}>Quick Links</h4>
            <ul className="space-y-4 text-sm text-[var(--cream)]/70 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              <li>
                <a href="#destinations" className="hover:text-[var(--gold)] transition-colors duration-200 inline-block">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-[var(--gold)] transition-colors duration-200 inline-block">
                  Tours
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[var(--gold)] transition-colors duration-200 inline-block">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-6 text-[var(--gold)] text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-inter)' }}>Company</h4>
            <ul className="space-y-4 text-sm text-[var(--cream)]/70 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              <li>
                <a href="#home" className="hover:text-[var(--gold)] transition-colors duration-200 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--gold)] transition-colors duration-200 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 border-t border-white/10 md:border-0 pt-8 md:pt-0">
            <h4 className="font-medium mb-6 text-[var(--gold)] text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-inter)' }}>Visit Us</h4>
            <div className="space-y-3 text-[var(--cream)]/70 text-sm sm:text-base font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              <p className="hover:text-[var(--gold)] transition-colors cursor-pointer">+91-956-7890</p>
              <p className="hover:text-[var(--gold)] transition-colors cursor-pointer">hello@thegoldentriangle.com</p>
              <p>123 Anywhere St., Any City</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs sm:text-sm text-[var(--cream)]/50 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
          <p>&copy; 2025 The Golden Triangle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
