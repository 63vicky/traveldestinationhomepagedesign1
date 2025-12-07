"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "The Golden Triangle", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[var(--burgundy)] shadow-lg py-3" : "bg-[var(--burgundy)]/95 backdrop-blur-sm py-6"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-normal text-[var(--gold)] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          The Golden Triangle
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[var(--cream)] hover:text-[var(--gold)] transition-colors text-sm tracking-wide font-light uppercase text-xs" style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {/* <Link href="/admin" className="px-6 py-2 text-[var(--cream)] hover:text-[var(--gold)] text-sm font-light transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
            Admin
          </Link> */}
          <button className="btn-primary">Book Now</button>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[var(--cream)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--burgundy-dark)] border-t border-[var(--gold)]/20 mt-2 px-5 py-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-[var(--cream)] hover:text-[var(--gold)] text-base font-light transition-colors border-b border-[var(--gold)]/10 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontFamily: 'var(--font-inter)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="block py-3 text-[var(--cream)] hover:text-[var(--gold)] text-base font-light transition-colors mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontFamily: 'var(--font-inter)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  )
}
