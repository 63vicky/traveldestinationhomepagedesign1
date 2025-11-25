export function Footer() {
  return (
    <footer className="bg-[var(--burgundy-dark)] text-[var(--cream)] py-16 border-t-4 border-[var(--gold)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--gold)] tracking-wide">The Golden Triangle</h3>
            <p className="text-[var(--text-light)] text-sm">
              A boutique company crafting handcrafted luxury journeys across India, from iconic landmarks to carefully
              guarded hidden gems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--gold)]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[var(--text-light)]">
              <li>
                <a href="#destinations" className="hover:text-[var(--gold)] transition">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-[var(--gold)] transition">
                  Tours
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[var(--gold)] transition">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--gold)]">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--text-light)]">
              <li>
                <a href="#home" className="hover:text-[var(--gold)] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--gold)] transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[var(--gold)] transition">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--gold)]">Visit Us</h4>
            <p className="text-[var(--text-light)] text-sm mb-2">+91-956-7890</p>
            <p className="text-[var(--text-light)] text-sm mb-2">hello@reallygreasite.com</p>
            <p className="text-[var(--text-light)] text-sm">123 Anywhere St., Any City</p>
          </div>
        </div>
        <div className="border-t border-[var(--gold)]/20 pt-8 text-center text-sm text-[var(--text-light)]">
          <p>&copy; 2025 The Golden Triangle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
