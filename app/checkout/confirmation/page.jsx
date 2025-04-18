"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Download, LollipopIcon as Lipstick, Mail, MapPin, ShoppingBag, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"



export default function ConfirmationPage() {
  // Mock order data
  const [orderItems] = useState([
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

  // Calculate totals
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = subtotal * 0.1 // 10% discount
  const estimatedTax = (subtotal - discount) * 0.08 // 8% tax
  const shipping = 0 // Free shipping
  const total = subtotal - discount + estimatedTax + shipping

  // Generate random order number and tracking number
  const orderNumber = "GG-" + Math.floor(100000 + Math.random() * 900000)
  const trackingNumber = "TRK-" + Math.floor(1000000000 + Math.random() * 9000000000)

  // Calculate estimated delivery date (7 days from now)
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      {/* Header */}
      <header className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Lipstick className="h-6 w-6 text-[#8B5D76]" />
          <span className="text-xl font-semibold text-[#333333]">Glow & Grace</span>
        </Link>
      </header>

      <div className="container px-4 py-8 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="bg-[#B8E1DD]/20 p-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#B8E1DD] flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-[#333333]" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">Thank You for Your Order!</h1>
              <p className="text-[#757575]">
                Your order has been received and is now being processed. You will receive a confirmation email shortly.
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-sm font-medium text-[#757575] mb-1">Order Number</h2>
                  <p className="text-lg font-medium text-[#333333]">{orderNumber}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-[#757575] mb-1">Order Date</h2>
                  <p className="text-lg font-medium text-[#333333]">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-[#757575] mb-1">Tracking Number</h2>
                  <p className="text-lg font-medium text-[#333333]">{trackingNumber}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-[#757575] mb-1">Estimated Delivery</h2>
                  <p className="text-lg font-medium text-[#333333]">{formattedDeliveryDate}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="flex-1 bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                  <Truck className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
                <Button variant="outline" className="flex-1 border-[#A3B18A]">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-medium text-[#333333] mb-4">Order Details</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-[#333333]">{item.name}</h4>
                          {item.shade && <p className="text-xs text-[#757575]">Shade: {item.shade}</p>}
                          <p className="text-xs text-[#757575]">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-[#333333]">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4 bg-[#A3B18A]/30" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#757575]">Subtotal</span>
                  <span className="text-[#333333]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#A3B18A]">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Estimated Tax</span>
                  <span className="text-[#333333]">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Shipping</span>
                  <span className="text-[#333333]">Free</span>
                </div>
                <Separator className="my-2 bg-[#A3B18A]/30" />
                <div className="flex justify-between font-medium">
                  <span className="text-[#333333]">Total</span>
                  <span className="text-[#333333]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#8B5D76]" />
                <h2 className="text-lg font-medium text-[#333333]">Shipping Information</h2>
              </div>
              <div className="space-y-1">
                <p className="text-[#333333]">Jane Doe</p>
                <p className="text-[#757575]">123 Makeup Street</p>
                <p className="text-[#757575]">Beauty City, BC 12345</p>
                <p className="text-[#757575]">United States</p>
                <p className="text-[#757575]">jane.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-medium text-[#333333] mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7D1CD] flex items-center justify-center">
                    <Mail className="h-4 w-4 text-[#8B5D76]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#333333]">Check Your Email</h3>
                    <p className="text-sm text-[#757575]">
                      We've sent a confirmation email to your inbox with all the details of your order.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7D1CD] flex items-center justify-center">
                    <Truck className="h-4 w-4 text-[#8B5D76]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#333333]">Track Your Order</h3>
                    <p className="text-sm text-[#757575]">
                      Use your tracking number to follow your package's journey to you.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7D1CD] flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-[#8B5D76]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#333333]">Enjoy Your Products</h3>
                    <p className="text-sm text-[#757575]">
                      We hope you love your new beauty products! Don't forget to leave a review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
