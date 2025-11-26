export function Footer() {
  return (
    <footer className="bg-[var(--burgundy-dark)] text-[var(--cream)] py-16 border-t-4 border-[var(--gold)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-normal mb-6 text-[var(--gold)] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Golden Triangle
            </h3>
            <p className="text-[var(--text-light)] text-sm leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              A boutique company crafting handcrafted luxury journeys across India, from iconic landmarks to carefully
              guarded hidden gems.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-5 text-[var(--gold)] text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Quick Links</h4>
            <ul className="space-y-3 text-sm text-[var(--text-light)] font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              <li>
                <a href="#destinations" className="hover:text-[var(--gold)] transition-colors duration-200">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-[var(--gold)] transition-colors duration-200">
                  Tours
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[var(--gold)] transition-colors duration-200">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-5 text-[var(--gold)] text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Company</h4>
            <ul className="space-y-3 text-sm text-[var(--text-light)] font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              <li>
                <a href="#home" className="hover:text-[var(--gold)] transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--gold)] transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[var(--gold)] transition-colors duration-200">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-5 text-[var(--gold)] text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Visit Us</h4>
            <p className="text-[var(--text-light)] text-sm mb-3 font-light" style={{ fontFamily: 'var(--font-inter)' }}>+91-956-7890</p>
            <p className="text-[var(--text-light)] text-sm mb-3 font-light" style={{ fontFamily: 'var(--font-inter)' }}>hello@reallygreasite.com</p>
            <p className="text-[var(--text-light)] text-sm font-light" style={{ fontFamily: 'var(--font-inter)' }}>123 Anywhere St., Any City</p>
          </div>
        </div>
        <div className="border-t border-[var(--gold)]/20 pt-8 text-center text-sm text-[var(--text-light)] font-light" style={{ fontFamily: 'var(--font-inter)' }}>
          <p>&copy; 2025 The Golden Triangle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
