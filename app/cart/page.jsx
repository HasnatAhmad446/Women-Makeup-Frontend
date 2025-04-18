"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Gift, LollipopIcon as Lipstick, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"


export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Luminous Silk Foundation",
      price: 42,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      shade: "Medium 03",
    },
    {
      id: 2,
      name: "Velvet Matte Lipstick",
      price: 24,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
      shade: "Mauve Dream",
    },
    {
      id: 3,
      name: "Radiant Glow Highlighter",
      price: 32,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      shade: "Golden Hour",
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = couponApplied ? subtotal * 0.1 : 0 // 10% discount
  const giftWrapFee = giftWrap ? 5 : 0
  const estimatedTax = (subtotal - discount) * 0.08 // 8% tax
  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal - discount + estimatedTax + shipping + giftWrapFee

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setCouponApplied(true)
      setCouponError(false)
    } else {
      setCouponApplied(false)
      setCouponError(true)
    }
  }

  // Clear coupon
  const clearCoupon = () => {
    setCouponCode("")
    setCouponApplied(false)
    setCouponError(false)
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      {/* Header */}
      <header className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Lipstick className="h-6 w-6 text-[#8B5D76]" />
          <span className="text-xl font-semibold text-[#333333]">Glow & Grace</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-[#333333] hover:text-[#8B5D76] hover:bg-[#F7D1CD]/20">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <div className="container px-4 py-8 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-[#333333] mb-4">Cart Items ({cartItems.length})</h2>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium text-[#333333]">{item.name}</h3>
                              {item.shade && (
                                <p className="text-sm text-[#757575] mt-1">Shade: {item.shade}</p>
                              )}
                            </div>
                            <div className="text-[#333333] font-medium mt-2 sm:mt-0">
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md border-[#A3B18A]"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md border-[#A3B18A]"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-[#E57373] hover:text-[#E57373]/80 hover:bg-[#E57373]/10"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-[#333333] mb-4">Promotions</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                      />
                      {couponApplied && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 p-0 text-[#757575]"
                          onClick={clearCoupon}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Clear coupon</span>
                        </Button>
                      )}
                    </div>
                    <Button
                      className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90"
                      onClick={applyCoupon}
                      disabled={couponApplied || !couponCode}
                    >
                      Apply
                    </Button>
                  </div>

                  {couponApplied && (
                    <Alert className="mt-3 border-[#B8E1DD] bg-[#B8E1DD]/10">
                      <Check className="h-4 w-4 text-[#A3B18A]" />
                      <AlertDescription className="text-[#333333]">
                        Coupon code <span className="font-medium">WELCOME10</span> applied! 10% off your order.
                      </AlertDescription>
                    </Alert>
                  )}

                  {couponError && (
                    <Alert className="mt-3 border-[#E57373] bg-[#E57373]/10">
                      <X className="h-4 w-4 text-[#E57373]" />
                      <AlertDescription className="text-[#E57373]">
                        Invalid coupon code. Please try again.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-4 flex items-center">
                    <Checkbox
                      id="gift-wrap"
                      checked={giftWrap}
                      onCheckedChange={(checked) => setGiftWrap(checked)}
                      className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                    />
                    <label htmlFor="gift-wrap" className="ml-2 text-sm text-[#333333] flex items-center">
                      <Gift className="h-4 w-4 mr-1 text-[#8B5D76]" />
                      Add gift wrapping for $5.00
                    </label>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="flex justify-between items-center">
                <Link href="/products">
                  <Button variant="outline" className="border-[#A3B18A]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-[#333333] mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Subtotal</span>
                      <span className="text-[#333333]">${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-[#A3B18A]">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Estimated Tax</span>
                      <span className="text-[#333333]">${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757575]">Shipping</span>
                      <span className="text-[#333333]">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {giftWrap && (
                      <div className="flex justify-between">
                        <span className="text-[#757575]">Gift Wrapping</span>
                        <span className="text-[#333333]">${giftWrapFee.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2 bg-[#A3B18A]/30" />
                    <div className="flex justify-between font-medium">
                      <span className="text-[#333333]">Total</span>
                      <span className="text-[#333333]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/checkout">
                      <Button className="w-full bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-[#757575]">
                      By proceeding to checkout, you agree to our{" "}
                      <Link href="/terms" className="text-[#8B5D76] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#8B5D76] hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[#757575]">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-sm">Free shipping on orders over $50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#F7D1CD]/30 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-[#8B5D76]" />
            </div>
            <h2 className="text-xl font-medium text-[#333333] mb-2">Your cart is empty</h2>
            <p className="text-[#757575] mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
