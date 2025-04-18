"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, LollipopIcon as Lipstick } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    // Simulate login - replace with actual authentication
    setTimeout(() => {
      setLoading(false)
      // For demo purposes only - would be replaced with actual auth logic
      if (email === "demo@example.com" && password === "password") {
        window.location.href = "/dashboard"
      } else {
        setError("Invalid email or password")
      }
    }, 1500)
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-[#F9F7F3]">
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Lipstick className="h-6 w-6 text-[#8B5D76]" />
              <span className="text-xl font-semibold text-[#333333]">Glow & Grace</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#333333]">Welcome back</h1>
            <p className="text-[#757575]">Enter your credentials to access your account</p>
          </div>
          {error && (
            <Alert className="border-[#E57373] bg-[#E57373]/10 text-[#E57373]">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="beauty@example.com"
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
                <Link href="/forgot-password" className="text-sm text-[#8B5D76] hover:underline">
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
            <Button type="submit" className="w-full bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-[#A3B18A]/30"></span>
            <span className="relative bg-[#F9F7F3] px-2 text-sm text-[#757575]">Or continue with</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full border-[#A3B18A]">
              Google
            </Button>
            <Button variant="outline" className="w-full border-[#A3B18A]">
              Facebook
            </Button>
          </div>
          <div className="text-center text-sm text-[#757575]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#8B5D76] hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-[#F7D1CD]/30 md:block relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">Discover Your Natural Beauty</h2>
            <p className="text-[#757575] mb-6">
              Our products are designed to enhance your natural beauty, not mask it. Cruelty-free, eco-friendly, and
              made with love.
            </p>
            <div className="inline-block bg-[#B8E1DD] px-3 py-1 text-sm text-[#333333] rounded-full">
              100% Cruelty Free
            </div>
          </div>
          <div className="mt-8 w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Makeup products"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
