"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  LollipopIcon as Lipstick,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock product data
const product = {
  id: 1,
  name: "Luminous Silk Foundation",
  description: "Lightweight, buildable coverage for a natural, radiant finish",
  price: 42,
  rating: 4.8,
  reviewCount: 1243,
  skinTypes: ["all", "dry", "combination"],
  finishes: ["dewy", "natural"],
  tags: ["vegan", "cruelty-free"],
  shades: [
    {
      name: "Fair 01",
      hexCode: "#F5E8D6",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Light 02",
      hexCode: "#ECD8C3",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Medium 03",
      hexCode: "#D8B394",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Tan 04",
      hexCode: "#C49A78",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Deep 05",
      hexCode: "#A67B5B",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Rich 06",
      hexCode: "#8B5A3C",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Deep Rich 07",
      hexCode: "#6F4E37",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
    {
      name: "Dark 08",
      hexCode: "#513A2A",
      modelImages: {
        light: "/placeholder.svg?height=600&width=600",
        medium: "/placeholder.svg?height=600&width=600",
        deep: "/placeholder.svg?height=600&width=600",
        dark: "/placeholder.svg?height=600&width=600",
      },
    },
  ],
  images: {
    default: "/placeholder.svg?height=600&width=600",
    hover: "/placeholder.svg?height=600&width=600",
    gallery: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  isNew: false,
  isBestseller: true,
  details: {
    description: `
      <p>Our Luminous Silk Foundation is a lightweight, buildable medium coverage foundation with a radiant finish. This award-winning foundation delivers a luminous, glowy complexion that looks and feels like your skin, but better.</p>
      <p>Formulated with our exclusive Micro-fil™ technology, this foundation builds easily from sheer to medium coverage and features a natural-looking, radiant finish. Inspired by charmeuse silk, this foundation brightens, corrects and evens skin tone without masking your natural glow.</p>
      <p>Available in 40 shades to suit all skin tones and undertones.</p>
      <ul>
        <li>Lightweight, buildable coverage</li>
        <li>Radiant, natural finish</li>
        <li>Oil-free formula</li>
        <li>Suitable for all skin types</li>
        <li>Dermatologist tested</li>
        <li>Non-comedogenic</li>
      </ul>
    `,
    ingredients: `
      <p>Aqua / Water, Cyclopentasiloxane, Glycerin, Isododecane, Alcohol Denat., Polyglyceryl-4 Isostearate, Cetyl PEG/PPG-10/1 Dimethicone, Hexyl Laurate, Aluminum Starch Octenylsuccinate, Phenoxyethanol, Magnesium Sulfate, Diphenyl Dimethicone, Disteardimonium Hectorite, Tocopheryl Acetate, Fragrance, Disodium Stearoyl Glutamate, Butylene Glycol, Sodium Hyaluronate.</p>
      <p><strong>May Contain:</strong> CI 77891 / Titanium Dioxide, CI 77492, CI 77499, CI 77491 / Iron Oxides.</p>
    `,
    howToUse: `
      <p>For best results, follow these simple steps:</p>
      <ol>
        <li>Start with a clean, moisturized face.</li>
        <li>Apply a pea-sized amount of primer if desired.</li>
        <li>Dispense a small amount of foundation onto the back of your hand.</li>
        <li>Using a foundation brush, beauty blender, or fingertips, apply to the center of your face and blend outward.</li>
        <li>Build coverage as desired by applying additional thin layers.</li>
        <li>Set with powder if desired for longer wear.</li>
      </ol>
      <p><strong>Pro Tip:</strong> For a natural finish, apply with a damp beauty sponge. For more coverage, use a foundation brush.</p>
    `,
  },
  reviews: [
    {
      id: 1,
      author: "Emily J.",
      date: "2023-11-15",
      rating: 5,
      title: "Perfect for my dry skin!",
      content:
        "I've been searching for a foundation that doesn't cling to my dry patches and this is it! The finish is beautiful and dewy without looking greasy. It lasts all day and doesn't settle into fine lines. Definitely worth the price!",
      skinType: "Dry",
      shadeUsed: "Light 02",
      helpfulCount: 42,
      verified: true,
    },
    {
      id: 2,
      author: "Sophia T.",
      date: "2023-10-28",
      rating: 4,
      title: "Beautiful finish but needs setting",
      content:
        "The foundation gives a gorgeous luminous finish that looks like real skin. My only issue is that it transfers a bit if I don't set it with powder. I have combination skin and find it works well with a good primer underneath.",
      skinType: "Combination",
      shadeUsed: "Medium 03",
      helpfulCount: 28,
      verified: true,
    },
    {
      id: 3,
      author: "Aisha M.",
      date: "2023-09-12",
      rating: 5,
      title: "Finally found my perfect shade!",
      content:
        "As someone with deep skin, I've always struggled to find foundations that match my undertone. Deep 05 is perfect for me! The formula is lightweight but provides enough coverage to even out my skin tone. It doesn't oxidize throughout the day either.",
      skinType: "Normal",
      shadeUsed: "Deep 05",
      helpfulCount: 56,
      verified: true,
    },
    {
      id: 4,
      author: "James L.",
      date: "2023-08-30",
      rating: 3,
      title: "Good but not great for oily skin",
      content:
        "The foundation looks beautiful when first applied, but on my oily skin, it starts to break down after about 5 hours. I need to blot frequently. I'd recommend this more for normal to dry skin types.",
      skinType: "Oily",
      shadeUsed: "Tan 04",
      helpfulCount: 19,
      verified: true,
    },
    {
      id: 5,
      author: "Nina P.",
      date: "2023-07-22",
      rating: 5,
      title: "Holy grail foundation!",
      content:
        "I've repurchased this foundation three times now. It gives me the perfect amount of coverage while still looking like skin. I have sensitive skin and this doesn't break me out at all. The shade range is also impressive!",
      skinType: "Sensitive",
      shadeUsed: "Fair 01",
      helpfulCount: 37,
      verified: true,
    },
  ],
}

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedShade, setSelectedShade] = useState(product.shades[0])
  const [modelType, setModelType] = useState("light")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [reviewRatingFilter, setReviewRatingFilter] = useState(null)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = product.reviews.filter((review) => review.rating === rating).length
    const percentage = (count / product.reviews.length) * 100
    return { rating, count, percentage }
  })

  // Filter reviews by rating
  const filteredReviews = reviewRatingFilter
    ? product.reviews.filter((review) => review.rating === reviewRatingFilter)
    : product.reviews

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedShade) {
      setIsAddedToCart(true)
      // Reset the added to cart message after 3 seconds
      setTimeout(() => {
        setIsAddedToCart(false)
      }, 3000)
    }
  }

  // Handle wishlist toggle
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.gallery.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.gallery.length - 1 : prevIndex - 1))
  }

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-[#8B5D76] text-[#8B5D76]" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
    )
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

      {/* Breadcrumbs */}
      <div className="container px-4 py-4 md:px-6">
        <div className="flex items-center text-sm text-[#757575]">
          <Link href="/" className="hover:text-[#8B5D76]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#8B5D76]">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#333333]">{product.name}</span>
        </div>
      </div>

      <div className="container px-4 py-6 md:px-6">
        {/* Back to products */}
        <Link href="/products" className="inline-flex items-center text-sm text-[#8B5D76] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedShade ? selectedShade.modelImages[modelType] : product.images.gallery[currentImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover aspect-square"
              />

              {/* Image navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>

              {/* Product badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-[#B8E1DD] text-[#333333] hover:bg-[#B8E1DD]/80">New</Badge>}
                {product.isBestseller && (
                  <Badge className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80">Bestseller</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.gallery.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index && !selectedShade ? "border-[#8B5D76]" : "border-transparent"
                  }`}
                  onClick={() => {
                    setCurrentImageIndex(index)
                    setSelectedShade(null)
                  }}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Model Diversity Toggle */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-[#8B5D76]" />
                <span className="text-sm font-medium text-[#333333]">See on different skin tones</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={modelType === "light" ? "default" : "outline"}
                  size="sm"
                  className={
                    modelType === "light" ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" : "border-[#A3B18A]"
                  }
                  onClick={() => setModelType("light")}
                >
                  Light
                </Button>
                <Button
                  variant={modelType === "medium" ? "default" : "outline"}
                  size="sm"
                  className={
                    modelType === "medium" ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" : "border-[#A3B18A]"
                  }
                  onClick={() => setModelType("medium")}
                >
                  Medium
                </Button>
                <Button
                  variant={modelType === "deep" ? "default" : "outline"}
                  size="sm"
                  className={
                    modelType === "deep" ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" : "border-[#A3B18A]"
                  }
                  onClick={() => setModelType("deep")}
                >
                  Deep
                </Button>
                <Button
                  variant={modelType === "dark" ? "default" : "outline"}
                  size="sm"
                  className={
                    modelType === "dark" ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" : "border-[#A3B18A]"
                  }
                  onClick={() => setModelType("dark")}
                >
                  Dark
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">{product.name}</h1>
              <p className="mt-2 text-[#757575]">{product.description}</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-[#333333]">{product.rating}</span>
                </div>
                <span className="text-sm text-[#757575]">({product.reviewCount} reviews)</span>
              </div>

              <div className="mt-4">
                <span className="text-2xl font-bold text-[#333333]">${product.price}</span>
              </div>
            </div>

            <Separator className="bg-[#A3B18A]/30" />

            {/* Shade Selection */}
            <div>
              <h2 className="text-sm font-medium text-[#333333] mb-3">Select Shade</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {product.shades.map((shade) => (
                  <TooltipProvider key={shade.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`w-10 h-10 rounded-full focus:outline-none ${
                            selectedShade?.name === shade.name
                              ? "ring-2 ring-[#8B5D76] ring-offset-2"
                              : "border border-gray-200"
                          }`}
                          style={{ backgroundColor: shade.hexCode }}
                          onClick={() => setSelectedShade(shade)}
                        >
                          <span className="sr-only">{shade.name}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{shade.name}</p>
                        <p className="text-xs text-[#757575]">{shade.hexCode}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              {selectedShade && (
                <p className="mt-2 text-sm text-[#333333]">
                  Selected: <span className="font-medium">{selectedShade.name}</span>
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h2 className="text-sm font-medium text-[#333333] mb-3">Quantity</h2>
              <div className="flex items-center w-32 h-10 border border-[#A3B18A] rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-none text-[#333333]"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex-1 text-center font-medium text-[#333333]">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-none text-[#333333]"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90"
                  onClick={handleAddToCart}
                  disabled={!selectedShade}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-[#A3B18A] ${isInWishlist ? "bg-[#F7D1CD]/20" : ""}`}
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? "fill-[#8B5D76] text-[#8B5D76]" : "text-[#8B5D76]"}`} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="outline" size="icon" className="border-[#A3B18A]">
                  <Share2 className="h-4 w-4 text-[#8B5D76]" />
                  <span className="sr-only">Share product</span>
                </Button>
              </div>

              {isAddedToCart && (
                <div className="bg-[#B8E1DD]/20 text-[#333333] p-3 rounded-md text-sm flex items-center">
                  <span className="mr-auto">Added to cart successfully!</span>
                  <Link href="/cart">
                    <Button variant="link" className="h-auto p-0 text-[#8B5D76]">
                      View Cart
                    </Button>
                  </Link>
                </div>
              )}

              {!selectedShade && (
                <div className="bg-[#E57373]/20 text-[#E57373] p-3 rounded-md text-sm">
                  Please select a shade before adding to cart
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-[#8B5D76] mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#333333]">Free Shipping</h3>
                  <p className="text-sm text-[#757575]">On all orders over $50</p>
                </div>
              </div>
            </div>

            {/* Product Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[#757575] border-[#A3B18A]/50">
                  {tag.replace("-", " ")}
                </Badge>
              ))}
            </div>

            {/* Product Details Accordion for Mobile */}
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description" className="border-[#A3B18A]/30">
                  <AccordionTrigger className="text-[#333333]">Description</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="text-sm text-[#757575] space-y-4"
                      dangerouslySetInnerHTML={{ __html: product.details.description }}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ingredients" className="border-[#A3B18A]/30">
                  <AccordionTrigger className="text-[#333333]">Ingredients</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="text-sm text-[#757575] space-y-4"
                      dangerouslySetInnerHTML={{ __html: product.details.ingredients }}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use" className="border-[#A3B18A]/30">
                  <AccordionTrigger className="text-[#333333]">How to Use</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="text-sm text-[#757575] space-y-4"
                      dangerouslySetInnerHTML={{ __html: product.details.howToUse }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Product Details Tabs for Desktop */}
        <div className="hidden md:block mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full bg-[#F7D1CD]/20 h-12">
              <TabsTrigger
                value="description"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="how-to-use"
                className="flex-1 data-[state=active]:bg-[#F7D1CD] data-[state=active]:text-[#333333]"
              >
                How to Use
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div
                className="prose max-w-none text-[#333333]"
                dangerouslySetInnerHTML={{ __html: product.details.description }}
              />
            </TabsContent>
            <TabsContent value="ingredients" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div
                className="prose max-w-none text-[#333333]"
                dangerouslySetInnerHTML={{ __html: product.details.ingredients }}
              />
            </TabsContent>
            <TabsContent value="how-to-use" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div
                className="prose max-w-none text-[#333333]"
                dangerouslySetInnerHTML={{ __html: product.details.howToUse }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#333333]">{product.rating}</div>
                <div className="flex justify-center my-2">{renderStars(product.rating)}</div>
                <div className="text-sm text-[#757575]">Based on {product.reviewCount} reviews</div>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm text-[#333333]">{item.rating} stars</div>
                    <Progress value={item.percentage} className="h-2 flex-1" />
                    <div className="w-10 text-right text-sm text-[#757575]">{item.count}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Write a Review</Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2 space-y-6">
              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-sm text-[#757575]">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={reviewRatingFilter === null ? "default" : "outline"}
                    size="sm"
                    className={
                      reviewRatingFilter === null ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90" : "border-[#A3B18A]"
                    }
                    onClick={() => setReviewRatingFilter(null)}
                  >
                    All
                  </Button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={reviewRatingFilter === rating ? "default" : "outline"}
                      size="sm"
                      className={
                        reviewRatingFilter === rating
                          ? "bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90"
                          : "border-[#A3B18A]"
                      }
                      onClick={() => setReviewRatingFilter(rating)}
                    >
                      {rating} Stars
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {filteredReviews.length > 0 ? (
                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#333333]">{review.author}</span>
                            {review.verified && (
                              <Badge className="bg-[#B8E1DD] text-[#333333] hover:bg-[#B8E1DD]/80 text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-[#757575] mt-1">{review.date}</div>
                        </div>
                        <div>{renderStars(review.rating)}</div>
                      </div>

                      <h3 className="font-medium text-[#333333] mt-3">{review.title}</h3>
                      <p className="text-sm text-[#757575] mt-2">{review.content}</p>

                      {(review.skinType || review.shadeUsed) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {review.skinType && (
                            <Badge variant="outline" className="text-[#757575] text-xs border-[#A3B18A]/50">
                              Skin Type: {review.skinType}
                            </Badge>
                          )}
                          {review.shadeUsed && (
                            <Badge variant="outline" className="text-[#757575] text-xs border-[#A3B18A]/50">
                              Shade: {review.shadeUsed}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#A3B18A]/30">
                        <Button variant="ghost" size="sm" className="text-[#757575] h-8">
                          Helpful ({review.helpfulCount})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[#757575] h-8">
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-[#757575]">
                    No reviews match your filter. Try another filter or view all reviews.
                  </p>
                </div>
              )}

              {/* Write a Review Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
                <h3 className="text-lg font-medium text-[#333333] mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button key={rating} className="text-gray-300 hover:text-[#8B5D76]">
                          <Star className="h-6 w-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Review Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-[#A3B18A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D76]"
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Review</label>
                    <Textarea
                      className="w-full p-2 border border-[#A3B18A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D76]"
                      placeholder="Share your experience with this product"
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-auto">
                      <label className="block text-sm font-medium text-[#333333] mb-1">Skin Type</label>
                      <Select>
                        <SelectTrigger className="w-full sm:w-[180px] border-[#A3B18A] focus:ring-[#8B5D76]">
                          <SelectValue placeholder="Select skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="oily">Oily</SelectItem>
                          <SelectItem value="combination">Combination</SelectItem>
                          <SelectItem value="sensitive">Sensitive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full sm:w-auto">
                      <label className="block text-sm font-medium text-[#333333] mb-1">Shade Used</label>
                      <Select>
                        <SelectTrigger className="w-full sm:w-[180px] border-[#A3B18A] focus:ring-[#8B5D76]">
                          <SelectValue placeholder="Select shade" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.shades.map((shade) => (
                            <SelectItem key={shade.name} value={shade.name}>
                              {shade.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Submit Review</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
