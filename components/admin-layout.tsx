"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  MapPin,
  Calendar,
  Plane,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Start closed on mobile
  const pathname = usePathname()

  const menuItems = [
    { id: "overview", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "destinations", label: "Destinations", href: "/admin/destinations", icon: MapPin },
    { id: "tours", label: "Tours", href: "/admin/tours", icon: Plane },
    { id: "bookings", label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { id: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { id: "blogs", label: "Blogs", href: "/admin/blogs", icon: FileText },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--charcoal)] text-white p-4 flex items-center justify-between z-50 border-b border-white/10">
        <h2 className="font-bold text-xl">Admin</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hover:bg-white/10 p-2 rounded text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar - dark background with light text */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } fixed lg:static top-16 lg:top-0 left-0 w-64 bg-[var(--charcoal)] text-white transition-transform duration-300 flex flex-col h-[calc(100vh-4rem)] lg:h-screen z-40`}
        >
          {/* Desktop Header */}
          <div className="hidden lg:flex p-4 items-center justify-between border-b border-white/10">
            <h2 className="font-bold text-xl text-white">Admin</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-white/10 p-1 rounded text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)} // Close on mobile after selection
                  className={`flex items-center gap-3 px-4 py-3 rounded transition min-h-[44px] ${
                    isActive
                      ? "bg-[var(--gold)] text-[var(--charcoal)]"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Link
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded transition min-h-[44px]"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Back to Site</span>
            </Link>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content - light background with dark text */}
        <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">
          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
