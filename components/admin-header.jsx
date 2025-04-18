"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Search, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="h-16 px-4 border-b border-[#A3B18A]/30 bg-white flex items-center justify-between lg:justify-end lg:ml-64">
      {/* Search Bar - Hidden on mobile */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md flex-1 mr-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#757575]" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] w-full"
          />
        </div>
        <Button type="submit" className="ml-2 bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
          Search
        </Button>
      </form>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#E57373] text-white">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer py-3">
                <div>
                  <p className="font-medium text-[#333333]">New order received</p>
                  <p className="text-sm text-[#757575]">Order #12345 needs processing</p>
                  <p className="text-xs text-[#757575] mt-1">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-3">
                <div>
                  <p className="font-medium text-[#333333]">Low stock alert</p>
                  <p className="text-sm text-[#757575]">Luminous Silk Foundation is running low</p>
                  <p className="text-xs text-[#757575] mt-1">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-3">
                <div>
                  <p className="font-medium text-[#333333]">New review</p>
                  <p className="text-sm text-[#757575]">A customer left a 5-star review</p>
                  <p className="text-xs text-[#757575] mt-1">3 hours ago</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-[#8B5D76]">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback className="bg-[#F7D1CD] text-[#8B5D76]">AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-[#333333]">Admin User</p>
                <p className="text-xs text-[#757575]">Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-[#757575]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => (window.location.href = "/admin/login")}
            >
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
