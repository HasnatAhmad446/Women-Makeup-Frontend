"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Check, LollipopIcon as Lipstick } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    setLoading(true)
    // Simulate signup - replace with actual registration
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      // For demo purposes only - would be replaced with actual auth logic
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
            <h1 className="text-3xl font-bold text-[#333333]">Create an account</h1>
            <p className="text-[#757575]">Enter your information to get started</p>
          </div>

          {error && (
            <Alert className="border-[#E57373] bg-[#E57373]/10 text-[#E57373]">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-[#B8E1DD] bg-[#B8E1DD]/10 text-[#333333]">
              <Check className="h-4 w-4 text-[#A3B18A]" />
              <AlertDescription>Account created successfully! You can now log in.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#333333]">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="beauty@example.com"
                value={formData.email}
                onChange={handleChange}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#333333]">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#333333]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#757575] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the{" "}
                <Link href="/terms" className="text-[#8B5D76] hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
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
            Already have an account?{" "}
            <Link href="/login" className="text-[#8B5D76] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-[#A3B18A]/20 md:block relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-[#333333] mb-4">Join Our Beauty Community</h2>
            <p className="text-[#757575] mb-6">
              Sign up today and get 15% off your first purchase, plus exclusive access to new product launches and
              beauty tips.
            </p>
            <div className="flex justify-center gap-2">
              <div className="inline-block bg-[#F7D1CD] px-3 py-1 text-sm text-[#333333] rounded-full">
                15% Off First Order
              </div>
              <div className="inline-block bg-[#B8E1DD] px-3 py-1 text-sm text-[#333333] rounded-full">
                Free Shipping
              </div>
            </div>
          </div>
          <div className="mt-8 w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Beauty products"
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
