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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
      <div className="flex">
        {/* Sidebar - dark background with light text */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[var(--charcoal)] text-white transition-all duration-300 flex flex-col fixed h-screen`}
        >
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            <h2 className={`font-bold text-xl text-white ${!isSidebarOpen && "hidden"}`}>Admin</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-white/10 p-1 rounded text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-2 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition ${
                    isActive
                      ? "bg-[var(--gold)] text-[var(--charcoal)]"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className={isSidebarOpen ? "text-sm font-medium" : "hidden"}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded transition"
            >
              <LogOut size={20} />
              <span className={isSidebarOpen ? "text-sm font-medium" : "hidden"}>Back to Site</span>
            </Link>
          </div>
        </div>

        {/* Main Content - light background with dark text */}
        <div className={`${isSidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
