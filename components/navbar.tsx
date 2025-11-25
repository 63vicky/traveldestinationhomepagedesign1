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
        <Link href="/" className="text-2xl font-bold text-[var(--gold)] tracking-wide">
          The Golden Triangle
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[var(--cream)] hover:text-[var(--gold)] transition-colors text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <Link href="/admin" className="px-6 py-2 text-[var(--cream)] hover:text-[var(--gold)] text-sm">
            Admin
          </Link>
          <button className="btn-primary text-sm">Book Now</button>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[var(--cream)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--burgundy-dark)] border-t border-[var(--gold)]/20 mt-4 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-[var(--cream)] hover:text-[var(--gold)] text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="block py-2 text-[var(--cream)] hover:text-[var(--gold)] text-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  )
}
