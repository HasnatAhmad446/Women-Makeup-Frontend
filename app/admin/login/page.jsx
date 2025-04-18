"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, LollipopIcon as Lipstick, Lock } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)
    // Simulate login - replace with actual authentication
    setTimeout(() => {
      setLoading(false)
      // For demo purposes only - would be replaced with actual auth logic
      if (email === "admin@glowandgrace.com" && password === "admin123") {
        window.location.href = "/admin/dashboard"
      } else {
        setError("Invalid email or password")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <div className="flex justify-center">
              <Lipstick className="h-10 w-10 text-[#8B5D76]" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-[#333333]">Admin Login</h1>
            <p className="mt-2 text-[#757575]">Sign in to access the admin dashboard</p>
          </div>

          {error && (
            <Alert className="border-[#E57373] bg-[#E57373]/10 text-[#E57373]">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@glowandgrace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#333333]">
                  Password
                </Label>
                <Link href="/admin/forgot-password" className="text-sm text-[#8B5D76] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
                className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[#757575] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[#757575]">
                <Lock className="h-4 w-4 text-[#8B5D76]" />
                <span>Secure login</span>
              </div>
              <Button type="submit" className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-[#757575] pt-4 border-t border-[#A3B18A]/30">
            <p>
              Return to{" "}
              <Link href="/" className="text-[#8B5D76] hover:underline">
                Glow & Grace
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-[#757575]">
        <p>&copy; {new Date().getFullYear()} Glow & Grace. All rights reserved.</p>
      </footer>
    </div>
  )
}
