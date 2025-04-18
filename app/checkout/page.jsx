"use client"


import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  LollipopIcon as Lipstick,
  Lock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function CheckoutPage() {
  // Mock cart items
  const [cartItems] = useState([
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
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = subtotal * 0.1 // 10% discount
  const estimatedTax = (subtotal - discount) * 0.08 // 8% tax
  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal - discount + estimatedTax + shipping

  // State for checkout steps
  const [activeStep, setActiveStep] = useState("shipping")
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState({
    type: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Handle shipping form change
  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  // Handle payment form change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentMethod((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  // Validate shipping form
  const validateShippingForm = () => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "address1", "city", "state", "zipCode"]
    const errors = {}
    let isValid = true

    requiredFields.forEach((field) => {
      if (!shippingAddress[field]) {
        errors[field] = true
        isValid = false
      }
    })

    // Simple email validation
    if (shippingAddress.email && !/\S+@\S+\.\S+/.test(shippingAddress.email)) {
      errors.email = true
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  // Validate payment form
  const validatePaymentForm = () => {
    const errors = {}
    let isValid = true

    if (paymentMethod.type === "credit-card") {
      if (!paymentMethod.cardNumber || paymentMethod.cardNumber.length < 16) {
        errors.cardNumber = true
        isValid = false
      }
      if (!paymentMethod.cardName) {
        errors.cardName = true
        isValid = false
      }
      if (!paymentMethod.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        errors.expiryDate = true
        isValid = false
      }
      if (!paymentMethod.cvv || !/^\d{3,4}$/.test(paymentMethod.cvv)) {
        errors.cvv = true
        isValid = false
      }
    }

    setFormErrors(errors)
    return isValid
  }

  // Handle next step
  const handleNextStep = () => {
    if (activeStep === "shipping") {
      if (validateShippingForm()) {
        setActiveStep("payment")
      }
    } else if (activeStep === "payment") {
      if (validatePaymentForm()) {
        setActiveStep("review")
      }
    }
  }

  // Handle place order
  const handlePlaceOrder = () => {
    if (!acceptTerms) {
      setFormErrors((prev) => ({ ...prev, terms: true }))
      return
    }

    // Simulate order placement - in a real app, this would submit to an API
    window.location.href = "/checkout/confirmation"
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      {/* Header */}
      <header className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Lipstick className="h-6 w-6 text-[#8B5D76]" />
          <span className="text-xl font-semibold text-[#333333]">Glow & Grace</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#8B5D76]" />
          <span className="text-sm text-[#333333]">Secure Checkout</span>
        </div>
      </header>

      <div className="container px-4 py-8 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Checkout</h1>
          <Link href="/cart" className="text-sm text-[#8B5D76] hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </div>

        {/* Checkout Steps */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  activeStep === "shipping" || activeStep === "payment" || activeStep === "review"
                    ? "bg-[#8B5D76] text-white"
                    : "bg-[#F7D1CD]/50 text-[#333333]"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 ${
                  activeStep === "shipping" || activeStep === "payment" || activeStep === "review"
                    ? "text-[#333333] font-medium"
                    : "text-[#757575]"
                }`}
              >
                Shipping
              </span>
            </div>
            <div className="w-16 h-1 mx-2 bg-[#F7D1CD]/50">
              <div
                className={`h-full bg-[#8B5D76] ${
                  activeStep === "payment" || activeStep === "review" ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  activeStep === "payment" || activeStep === "review"
                    ? "bg-[#8B5D76] text-white"
                    : "bg-[#F7D1CD]/50 text-[#333333]"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 ${
                  activeStep === "payment" || activeStep === "review" ? "text-[#333333] font-medium" : "text-[#757575]"
                }`}
              >
                Payment
              </span>
            </div>
            <div className="w-16 h-1 mx-2 bg-[#F7D1CD]/50">
              <div className={`h-full bg-[#8B5D76] ${activeStep === "review" ? "w-full" : "w-0"}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  activeStep === "review" ? "bg-[#8B5D76] text-white" : "bg-[#F7D1CD]/50 text-[#333333]"
                }`}
              >
                3
              </div>
              <span className={`ml-2 ${activeStep === "review" ? "text-[#333333] font-medium" : "text-[#757575]"}`}>
                Review
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Steps */}
        <div className="md:hidden mb-6">
          <Tabs value={activeStep} className="w-full">
            <TabsList className="w-full bg-[#F7D1CD]/20 h-12">
              <TabsTrigger
                value="shipping"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
                onClick={() => setActiveStep("shipping")}
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
                onClick={() => setActiveStep("payment")}
                disabled={Object.keys(formErrors).length > 0 && activeStep === "shipping"}
              >
                Payment
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
                onClick={() => setActiveStep("review")}
                disabled={(Object.keys(formErrors).length > 0 && activeStep === "payment") || activeStep === "shipping"}
              >
                Review
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            {activeStep === "shipping" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5 text-[#8B5D76]" />
                    <h2 className="text-lg font-medium text-[#333333]">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className={`text-[#333333] ${formErrors.firstName ? "text-[#E57373]" : ""}`}
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.firstName ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.firstName && <p className="text-xs text-[#E57373] mt-1">First name is required</p>}
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className={`text-[#333333] ${formErrors.lastName ? "text-[#E57373]" : ""}`}
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.lastName ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.lastName && <p className="text-xs text-[#E57373] mt-1">Last name is required</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className={`text-[#333333] ${formErrors.email ? "text-[#E57373]" : ""}`}>
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.email ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.email && <p className="text-xs text-[#E57373] mt-1">Valid email is required</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className={`text-[#333333] ${formErrors.phone ? "text-[#E57373]" : ""}`}>
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.phone ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.phone && <p className="text-xs text-[#E57373] mt-1">Phone number is required</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="address1"
                        className={`text-[#333333] ${formErrors.address1 ? "text-[#E57373]" : ""}`}
                      >
                        Address Line 1 *
                      </Label>
                      <Input
                        id="address1"
                        name="address1"
                        value={shippingAddress.address1}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.address1 ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.address1 && <p className="text-xs text-[#E57373] mt-1">Address is required</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address2" className="text-[#333333]">
                        Address Line 2 (Optional)
                      </Label>
                      <Input
                        id="address2"
                        name="address2"
                        value={shippingAddress.address2}
                        onChange={handleShippingChange}
                        className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className={`text-[#333333] ${formErrors.city ? "text-[#E57373]" : ""}`}>
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                          formErrors.city ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                        }`}
                      />
                      {formErrors.city && <p className="text-xs text-[#E57373] mt-1">City is required</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className={`text-[#333333] ${formErrors.state ? "text-[#E57373]" : ""}`}>
                          State/Province *
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                          className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                            formErrors.state ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                          }`}
                        />
                        {formErrors.state && <p className="text-xs text-[#E57373] mt-1">State is required</p>}
                      </div>
                      <div>
                        <Label
                          htmlFor="zipCode"
                          className={`text-[#333333] ${formErrors.zipCode ? "text-[#E57373]" : ""}`}
                        >
                          ZIP/Postal Code *
                        </Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={handleShippingChange}
                          className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                            formErrors.zipCode ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                          }`}
                        />
                        {formErrors.zipCode && <p className="text-xs text-[#E57373] mt-1">ZIP code is required</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-[#333333]">
                        Country *
                      </Label>
                      <Select
                        value={shippingAddress.country}
                        onValueChange={(value) => setShippingAddress((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger className="border-[#A3B18A] focus:ring-[#8B5D76]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-base font-medium text-[#333333] mb-3">Shipping Method</h3>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={(value) => setShippingMethod(value)}
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem value="standard" id="standard" className="border-[#A3B18A] text-[#8B5D76]" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="font-medium text-[#333333]">Standard Shipping</div>
                          <div className="text-sm text-[#757575]">3-5 business days</div>
                        </Label>
                        <div className="font-medium text-[#333333]">
                          {subtotal >= 50 ? "Free" : `$${shipping.toFixed(2)}`}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="express" id="express" className="border-[#A3B18A] text-[#8B5D76]" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="font-medium text-[#333333]">Express Shipping</div>
                          <div className="text-sm text-[#757575]">1-2 business days</div>
                        </Label>
                        <div className="font-medium text-[#333333]">$12.99</div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" onClick={handleNextStep}>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {activeStep === "payment" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-[#8B5D76]" />
                    <h2 className="text-lg font-medium text-[#333333]">Payment Method</h2>
                  </div>

                  <div className="space-y-4">
                    <RadioGroup
                      value={paymentMethod.type}
                      onValueChange={(value) => setPaymentMethod({ type: value })}
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                        <RadioGroupItem
                          value="credit-card"
                          id="credit-card"
                          className="border-[#A3B18A] text-[#8B5D76]"
                        />
                        <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                          <div className="font-medium text-[#333333]">Credit / Debit Card</div>
                          <div className="text-sm text-[#757575]">Visa, Mastercard, American Express</div>
                        </Label>
                        <div className="flex gap-1">
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="paypal" id="paypal" className="border-[#A3B18A] text-[#8B5D76]" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="font-medium text-[#333333]">PayPal</div>
                          <div className="text-sm text-[#757575]">Pay with your PayPal account</div>
                        </Label>
                        <div className="w-12 h-5 bg-gray-200 rounded"></div>
                      </div>
                    </RadioGroup>

                    {paymentMethod.type === "credit-card" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label
                            htmlFor="cardNumber"
                            className={`text-[#333333] ${formErrors.cardNumber ? "text-[#E57373]" : ""}`}
                          >
                            Card Number *
                          </Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentMethod.cardNumber || ""}
                            onChange={handlePaymentChange}
                            className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                              formErrors.cardNumber
                                ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]"
                                : ""
                            }`}
                          />
                          {formErrors.cardNumber && (
                            <p className="text-xs text-[#E57373] mt-1">Valid card number is required</p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="cardName"
                            className={`text-[#333333] ${formErrors.cardName ? "text-[#E57373]" : ""}`}
                          >
                            Name on Card *
                          </Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={paymentMethod.cardName || ""}
                            onChange={handlePaymentChange}
                            className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                              formErrors.cardName ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                            }`}
                          />
                          {formErrors.cardName && <p className="text-xs text-[#E57373] mt-1">Name is required</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="expiryDate"
                              className={`text-[#333333] ${formErrors.expiryDate ? "text-[#E57373]" : ""}`}
                            >
                              Expiry Date *
                            </Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={paymentMethod.expiryDate || ""}
                              onChange={handlePaymentChange}
                              className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                                formErrors.expiryDate
                                  ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]"
                                  : ""
                              }`}
                            />
                            {formErrors.expiryDate && (
                              <p className="text-xs text-[#E57373] mt-1">Valid expiry date is required</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cvv" className={`text-[#333333] ${formErrors.cvv ? "text-[#E57373]" : ""}`}>
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={paymentMethod.cvv || ""}
                              onChange={handlePaymentChange}
                              className={`border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76] ${
                                formErrors.cvv ? "border-[#E57373] focus:border-[#E57373] focus:ring-[#E57373]" : ""
                              }`}
                            />
                            {formErrors.cvv && <p className="text-xs text-[#E57373] mt-1">Valid CVV is required</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod.type === "paypal" && (
                      <div className="mt-4 p-4 bg-[#F7D1CD]/20 rounded-md text-center">
                        <p className="text-[#333333]">
                          You will be redirected to PayPal to complete your payment after reviewing your order.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      className="border-[#A3B18A] text-[#333333]"
                      onClick={() => setActiveStep("shipping")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shipping
                    </Button>
                    <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" onClick={handleNextStep}>
                      Review Order
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Review */}
            {activeStep === "review" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingBag className="h-5 w-5 text-[#8B5D76]" />
                    <h2 className="text-lg font-medium text-[#333333]">Review Your Order</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Shipping Information Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-[#333333]">Shipping Information</h3>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-[#8B5D76]"
                          onClick={() => setActiveStep("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-[#F9F7F3] p-3 rounded-md">
                        <p className="text-[#333333]">
                          {shippingAddress.firstName} {shippingAddress.lastName}
                        </p>
                        <p className="text-[#757575]">{shippingAddress.address1}</p>
                        {shippingAddress.address2 && <p className="text-[#757575]">{shippingAddress.address2}</p>}
                        <p className="text-[#757575]">
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                        </p>
                        <p className="text-[#757575]">{shippingAddress.email}</p>
                        <p className="text-[#757575]">{shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Payment Method Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-[#333333]">Payment Method</h3>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-[#8B5D76]"
                          onClick={() => setActiveStep("payment")}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-[#F9F7F3] p-3 rounded-md">
                        {paymentMethod.type === "credit-card" ? (
                          <div>
                            <p className="text-[#333333]">Credit Card</p>
                            <p className="text-[#757575]">
                              **** **** **** {paymentMethod.cardNumber?.slice(-4) || "****"}
                            </p>
                            <p className="text-[#757575]">{paymentMethod.cardName}</p>
                          </div>
                        ) : (
                          <p className="text-[#333333]">PayPal</p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-[#333333] mb-2">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
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
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => {
                            setAcceptTerms(checked)
                            if (checked) {
                              setFormErrors((prev) => ({ ...prev, terms: false }))
                            }
                          }}
                          className={`border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76] mt-1 ${
                            formErrors.terms ? "border-[#E57373]" : ""
                          }`}
                        />
                        <label
                          htmlFor="terms"
                          className={`text-sm ${formErrors.terms ? "text-[#E57373]" : "text-[#333333]"}`}
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-[#8B5D76] hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#8B5D76] hover:underline">
                            Privacy Policy
                          </Link>
                          . I also agree that my order may be processed and stored by Glow & Grace.
                        </label>
                      </div>
                      {formErrors.terms && (
                        <p className="text-xs text-[#E57373] mt-1 ml-6">You must agree to the terms and conditions</p>
                      )}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button
                        variant="outline"
                        className="border-[#A3B18A] text-[#333333]"
                        onClick={() => setActiveStep("payment")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Payment
                      </Button>
                      <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" onClick={handlePlaceOrder}>
                        Place Order
                        <ShieldCheck className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                    <span className="text-[#333333]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator className="my-2 bg-[#A3B18A]/30" />
                  <div className="flex justify-between font-medium">
                    <span className="text-[#333333]">Total</span>
                    <span className="text-[#333333]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-[#757575]">
                  <ShieldCheck className="h-4 w-4 text-[#8B5D76]" />
                  <span className="text-sm">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
