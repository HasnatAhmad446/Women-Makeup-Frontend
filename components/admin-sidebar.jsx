"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Box, ChevronDown, FileText, Home, LollipopIcon as Lipstick, LogOut, Menu, Package, Settings, ShoppingCart, Star, Users, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"


export function AdminSidebar({ className }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="flex lg:hidden items-center h-16 px-4 border-b border-[#A3B18A]/30">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <Lipstick className="h-6 w-6 text-[#8B5D76]" />
          <span className="font-semibold text-[#333333]">Glow & Grace Admin</span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[280px] bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-[#A3B18A]/30">
              <div className="flex items-center gap-2">
                <Lipstick className="h-6 w-6 text-[#8B5D76]" />
                <span className="font-semibold text-[#333333]">Glow & Grace</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-2">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-[#F7D1CD]/30 text-[#8B5D76]"
                        : "text-[#333333] hover:bg-[#F9F7F3] hover:text-[#8B5D76]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-[#A3B18A]/30">
              <Button
                variant="outline"
                className="w-full border-[#A3B18A] text-[#333333] hover:bg-[#F7D1CD]/20 hover:text-[#8B5D76]"
                onClick={() => (window.location.href = "/admin/login")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-[#A3B18A]/30">
        <div className="flex items-center h-16 px-4 border-b border-[#A3B18A]/30">
          <div className="flex items-center gap-2">
            <Lipstick className="h-6 w-6 text-[#8B5D76]" />
            <span className="font-semibold text-[#333333]">Glow & Grace Admin</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-[#F7D1CD]/30 text-[#8B5D76]"
                    : "text-[#333333] hover:bg-[#F9F7F3] hover:text-[#8B5D76]"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-[#A3B18A]/30">
          <Button
            variant="outline"
            className="w-full border-[#A3B18A] text-[#333333] hover:bg-[#F7D1CD]/20 hover:text-[#8B5D76]"
            onClick={() => (window.location.href = "/admin/login")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
