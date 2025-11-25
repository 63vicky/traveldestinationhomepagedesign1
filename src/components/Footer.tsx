import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--charcoal)] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h2 className="text-white mb-4">Wanderlux</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Crafting unforgettable travel experiences and luxury adventures around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-[var(--gold-accent)] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-[var(--gold-accent)] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-[var(--gold-accent)] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Destinations", "Tours", "About Us", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/70 hover:text-[var(--gold-accent)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>hello@wanderlux.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Travel Street, New York, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white mb-4">Newsletter</h4>
            <p className="text-white/70 mb-4 leading-relaxed">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[var(--gold-accent)] hover:bg-[var(--gold-accent)]/90 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60">
              © {currentYear} Wanderlux. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-[var(--gold-accent)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[var(--gold-accent)] transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
