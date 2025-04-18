"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid3X3, List, LollipopIcon as Lipstick, Heart, ShoppingCart, Users, Palette, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Types
type SkinType = "all" | "oily" | "dry" | "combination" | "sensitive"
type Finish = "all" | "matte" | "dewy" | "satin" | "natural"
type Tag = "vegan" | "cruelty-free" | "paraben-free" | "fragrance-free" | "hypoallergenic"
type ModelType = "light" | "medium" | "deep" | "dark"
type ViewMode = "grid" | "list"
type SortOption = "featured" | "price-low" | "price-high" | "newest" | "bestselling" | "rated"

interface Shade {
  name: string
  hexCode: string
  modelImages: {
    [key in ModelType]: string
  }
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  rating: number
  reviewCount: number
  skinTypes: SkinType[]
  finishes: Finish[]
  tags: Tag[]
  shades: Shade[]
  images: {
    default: string
    hover: string
  }
  isNew: boolean
  isBestseller: boolean
}

// Mock data for products
const mockProducts: Product[] = [
  {
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
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Light 02",
        hexCode: "#ECD8C3",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Medium 03",
        hexCode: "#D8B394",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Tan 04",
        hexCode: "#C49A78",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Deep 05",
        hexCode: "#A67B5B",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Rich 06",
        hexCode: "#8B5A3C",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Deep Rich 07",
        hexCode: "#6F4E37",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Dark 08",
        hexCode: "#513A2A",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    description: "Rich, creamy formula with intense color payoff and comfortable wear",
    price: 24,
    rating: 4.6,
    reviewCount: 856,
    skinTypes: ["all"],
    finishes: ["matte"],
    tags: ["vegan", "cruelty-free", "paraben-free"],
    shades: [
      {
        name: "Blushing Pink",
        hexCode: "#F7D1CD",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Mauve Dream",
        hexCode: "#8B5D76",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Berry Crush",
        hexCode: "#9C4A5A",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Classic Red",
        hexCode: "#C93636",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: true,
    isBestseller: false,
  },
  {
    id: 3,
    name: "Radiant Glow Highlighter",
    description: "Silky smooth powder that gives a natural, luminous glow",
    price: 32,
    rating: 4.7,
    reviewCount: 623,
    skinTypes: ["all", "dry", "combination"],
    finishes: ["dewy", "natural"],
    tags: ["vegan", "cruelty-free", "paraben-free"],
    shades: [
      {
        name: "Moonlight",
        hexCode: "#F5F5F5",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Golden Hour",
        hexCode: "#F0D5A0",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Bronze Goddess",
        hexCode: "#C19A6B",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Hydrating Skin Tint",
    description: "Lightweight coverage with hydrating benefits for a natural finish",
    price: 36,
    rating: 4.5,
    reviewCount: 412,
    skinTypes: ["dry", "sensitive"],
    finishes: ["dewy", "natural"],
    tags: ["vegan", "cruelty-free", "fragrance-free", "hypoallergenic"],
    shades: [
      {
        name: "Fair 01",
        hexCode: "#F5E8D6",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Light 02",
        hexCode: "#ECD8C3",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Medium 03",
        hexCode: "#D8B394",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Tan 04",
        hexCode: "#C49A78",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Deep 05",
        hexCode: "#A67B5B",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Rich 06",
        hexCode: "#8B5A3C",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: true,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Precision Eyeliner",
    description: "Ultra-fine tip for precise application and long-lasting wear",
    price: 18,
    rating: 4.4,
    reviewCount: 328,
    skinTypes: ["all"],
    finishes: ["matte"],
    tags: ["vegan", "cruelty-free"],
    shades: [
      {
        name: "Blackest Black",
        hexCode: "#000000",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Brown",
        hexCode: "#5E3A1E",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: false,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Matte Perfection Foundation",
    description: "Oil-controlling formula with full coverage and a natural matte finish",
    price: 38,
    rating: 4.6,
    reviewCount: 752,
    skinTypes: ["oily", "combination"],
    finishes: ["matte"],
    tags: ["vegan", "cruelty-free", "paraben-free"],
    shades: [
      {
        name: "Fair 01",
        hexCode: "#F5E8D6",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Light 02",
        hexCode: "#ECD8C3",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Medium 03",
        hexCode: "#D8B394",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Tan 04",
        hexCode: "#C49A78",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Deep 05",
        hexCode: "#A67B5B",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Rich 06",
        hexCode: "#8B5A3C",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Deep Rich 07",
        hexCode: "#6F4E37",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
      {
        name: "Dark 08",
        hexCode: "#513A2A",
        modelImages: {
          light: "/placeholder.svg?height=400&width=400",
          medium: "/placeholder.svg?height=400&width=400",
          deep: "/placeholder.svg?height=400&width=400",
          dark: "/placeholder.svg?height=400&width=400",
        },
      },
    ],
    images: {
      default: "/placeholder.svg?height=400&width=400",
      hover: "/placeholder.svg?height=400&width=400",
    },
    isNew: false,
    isBestseller: true,
  },
]

function page() {
  // State for filters
  const [skinTypeFilter, setSkinTypeFilter] = useState<SkinType>("all")
  const [finishFilter, setFinishFilter] = useState<Finish>("all")
  const [tagFilters, setTagFilters] = useState<Tag[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortOption, setSortOption] = useState<SortOption>("featured")
  const [modelType, setModelType] = useState<ModelType>("light")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null)

  // Apply filters
  useEffect(() => {
    let result = mockProducts

    // Filter by skin type
    if (skinTypeFilter !== "all") {
      result = result.filter((product) => product.skinTypes.includes(skinTypeFilter))
    }

    // Filter by finish
    if (finishFilter !== "all") {
      result = result.filter((product) => product.finishes.includes(finishFilter))
    }

    // Filter by tags
    if (tagFilters.length > 0) {
      result = result.filter((product) => tagFilters.every((tag) => product.tags.includes(tag)))
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortOption) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "bestselling":
        result = [...result].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
        break
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "rated":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - no specific sort
        break
    }

    setFilteredProducts(result)
  }, [skinTypeFilter, finishFilter, tagFilters, priceRange, sortOption])

  // Toggle tag filter
  const toggleTagFilter = (tag: Tag) => {
    if (tagFilters.includes(tag)) {
      setTagFilters(tagFilters.filter((t) => t !== tag))
    } else {
      setTagFilters([...tagFilters, tag])
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSkinTypeFilter("all")
    setFinishFilter("all")
    setTagFilters([])
    setPriceRange([0, 100])
    setSortOption("featured")
  }

  // Handle shade selection
  const handleShadeSelect = (product: Product, shade: Shade) => {
    setSelectedProduct(product)
    setSelectedShade(shade)
  }

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-sm ${star <= rating ? "text-[#8B5D76]" : "text-gray-300"}`}>
            ★
          </span>
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

      {/* Page Title */}
      <div className="container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-[#333333]">Our Products</h1>
        <p className="mt-2 text-[#757575]">Discover makeup that celebrates every skin tone and type</p>
      </div>

      {/* Mobile Filters Button */}
      <div className="container px-4 md:hidden">
        <Button
          variant="outline"
          className="w-full border-[#A3B18A] mb-4 flex items-center justify-center gap-2"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters & Sort
        </Button>
      </div>

      {/* Mobile Filters Sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent className="w-[85vw] sm:max-w-md bg-[#F9F7F3]">
          <SheetHeader>
            <SheetTitle className="text-[#333333]">Filters</SheetTitle>
            <SheetDescription className="text-[#757575]">Refine your product search</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Skin Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-[#333333] mb-3">Skin Type</h3>
              <div className="space-y-2">
                {["all", "oily", "dry", "combination", "sensitive"].map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      id={`mobile-skin-${type}`}
                      checked={skinTypeFilter === type}
                      onCheckedChange={() => setSkinTypeFilter(type as SkinType)}
                      className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                    />
                    <label htmlFor={`mobile-skin-${type}`} className="ml-2 text-sm text-[#333333] capitalize">
                      {type === "all" ? "All Skin Types" : type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Filter */}
            <div>
              <h3 className="text-sm font-medium text-[#333333] mb-3">Finish</h3>
              <div className="space-y-2">
                {["all", "matte", "dewy", "satin", "natural"].map((finish) => (
                  <div key={finish} className="flex items-center">
                    <Checkbox
                      id={`mobile-finish-${finish}`}
                      checked={finishFilter === finish}
                      onCheckedChange={() => setFinishFilter(finish as Finish)}
                      className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                    />
                    <label htmlFor={`mobile-finish-${finish}`} className="ml-2 text-sm text-[#333333] capitalize">
                      {finish === "all" ? "All Finishes" : finish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-[#333333] mb-3">Product Tags</h3>
              <div className="space-y-2">
                {["vegan", "cruelty-free", "paraben-free", "fragrance-free", "hypoallergenic"].map((tag) => (
                  <div key={tag} className="flex items-center">
                    <Checkbox
                      id={`mobile-tag-${tag}`}
                      checked={tagFilters.includes(tag as Tag)}
                      onCheckedChange={() => toggleTagFilter(tag as Tag)}
                      className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                    />
                    <label htmlFor={`mobile-tag-${tag}`} className="ml-2 text-sm text-[#333333] capitalize">
                      {tag.replace("-", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#333333]">Price Range</h3>
                <span className="text-sm text-[#757575]">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="[&>span]:bg-[#8B5D76]"
              />
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-[#333333] mb-3">Sort By</h3>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="border-[#A3B18A] focus:ring-[#8B5D76]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                  <SelectItem value="rated">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" className="border-[#A3B18A] text-[#333333]" onClick={resetFilters}>
                Reset All
              </Button>
              <SheetClose asChild>
                <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Apply Filters</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#333333]">Filters</h2>
                <Button variant="ghost" className="h-8 px-2 text-[#8B5D76]" onClick={resetFilters}>
                  Reset All
                </Button>
              </div>

              {/* Skin Type Filter */}
              <div className="border-t border-[#A3B18A]/30 pt-4 pb-2">
                <h3 className="text-sm font-medium text-[#333333] mb-3">Skin Type</h3>
                <div className="space-y-2">
                  {["all", "oily", "dry", "combination", "sensitive"].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`skin-${type}`}
                        checked={skinTypeFilter === type}
                        onCheckedChange={() => setSkinTypeFilter(type as SkinType)}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                      <label htmlFor={`skin-${type}`} className="ml-2 text-sm text-[#333333] capitalize">
                        {type === "all" ? "All Skin Types" : type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finish Filter */}
              <div className="border-t border-[#A3B18A]/30 pt-4 pb-2">
                <h3 className="text-sm font-medium text-[#333333] mb-3">Finish</h3>
                <div className="space-y-2">
                  {["all", "matte", "dewy", "satin", "natural"].map((finish) => (
                    <div key={finish} className="flex items-center">
                      <Checkbox
                        id={`finish-${finish}`}
                        checked={finishFilter === finish}
                        onCheckedChange={() => setFinishFilter(finish as Finish)}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                      <label htmlFor={`finish-${finish}`} className="ml-2 text-sm text-[#333333] capitalize">
                        {finish === "all" ? "All Finishes" : finish}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div className="border-t border-[#A3B18A]/30 pt-4 pb-2">
                <h3 className="text-sm font-medium text-[#333333] mb-3">Product Tags</h3>
                <div className="space-y-2">
                  {["vegan", "cruelty-free", "paraben-free", "fragrance-free", "hypoallergenic"].map((tag) => (
                    <div key={tag} className="flex items-center">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={tagFilters.includes(tag as Tag)}
                        onCheckedChange={() => toggleTagFilter(tag as Tag)}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                      <label htmlFor={`tag-${tag}`} className="ml-2 text-sm text-[#333333] capitalize">
                        {tag.replace("-", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-[#A3B18A]/30 pt-4 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-[#333333]">Price Range</h3>
                  <span className="text-sm text-[#757575]">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="[&>span]:bg-[#8B5D76]"
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:col-span-3 space-y-6">
            {/* Sort and View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#757575]">Model Diversity:</span>
                <Select value={modelType} onValueChange={(value) => setModelType(value as ModelType)}>
                  <SelectTrigger className="h-8 w-[140px] border-[#A3B18A] focus:ring-[#8B5D76]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Skin</SelectItem>
                    <SelectItem value="medium">Medium Skin</SelectItem>
                    <SelectItem value="deep">Deep Skin</SelectItem>
                    <SelectItem value="dark">Dark Skin</SelectItem>
                  </SelectContent>
                </Select>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Users className="h-4 w-4 text-[#8B5D76]" />
                        <span className="sr-only">Model diversity info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        See how products look on different skin tones to find your perfect match
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-[#757575]">Sort by:</span>
                  <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                    <SelectTrigger className="h-8 w-[180px] border-[#A3B18A] focus:ring-[#8B5D76]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="bestselling">Best Selling</SelectItem>
                      <SelectItem value="rated">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-none ${viewMode === "grid" ? "bg-[#F7D1CD]/30" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-none ${viewMode === "list" ? "bg-[#F7D1CD]/30" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(skinTypeFilter !== "all" || finishFilter !== "all" || tagFilters.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-sm text-[#757575]">Active filters:</span>
                {skinTypeFilter !== "all" && (
                  <Badge className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80 flex items-center gap-1">
                    {skinTypeFilter}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setSkinTypeFilter("all")}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove filter</span>
                    </Button>
                  </Badge>
                )}
                {finishFilter !== "all" && (
                  <Badge className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80 flex items-center gap-1">
                    {finishFilter}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setFinishFilter("all")}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove filter</span>
                    </Button>
                  </Badge>
                )}
                {tagFilters.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80 flex items-center gap-1"
                  >
                    {tag.replace("-", " ")}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleTagFilter(tag)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove filter</span>
                    </Button>
                  </Badge>
                ))}
                <Button variant="link" className="text-xs text-[#8B5D76] h-auto p-0" onClick={resetFilters}>
                  Clear all
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-[#757575]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </div>

            {/* Product Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative">
                      <Image
                        src={product.images.default || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-[300px] object-cover"
                      />
                      {/* Product badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <Badge className="bg-[#B8E1DD] text-[#333333] hover:bg-[#B8E1DD]/80">New</Badge>
                        )}
                        {product.isBestseller && (
                          <Badge className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80">Bestseller</Badge>
                        )}
                      </div>
                      {/* Quick actions */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4 text-[#8B5D76]" />
                          <span className="sr-only">Add to wishlist</span>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-[#333333]">{product.name}</h3>
                      <p className="text-sm text-[#757575] mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-[#757575]">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-medium text-[#333333]">${product.price}</span>
                        <Button className="h-8 bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      {/* Shade Range */}
                      {product.shades.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Palette className="h-4 w-4 text-[#8B5D76]" />
                            <span className="text-xs text-[#757575]">{product.shades.length} shades</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.shades.slice(0, 8).map((shade) => (
                              <TooltipProvider key={shade.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className="w-6 h-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5D76]"
                                      style={{ backgroundColor: shade.hexCode }}
                                      onClick={() => handleShadeSelect(product, shade)}
                                    >
                                      <span className="sr-only">{shade.name}</span>
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{shade.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                            {product.shades.length > 8 && (
                              <Button
                                variant="ghost"
                                className="w-6 h-6 p-0 rounded-full text-xs"
                                onClick={() => setSelectedProduct(product)}
                              >
                                +{product.shades.length - 8}
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Product Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[#757575] text-xs border-[#A3B18A]/50">
                            {tag.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/3">
                        <Image
                          src={product.images.default || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-[300px] md:h-full object-cover"
                        />
                        {/* Product badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isNew && (
                            <Badge className="bg-[#B8E1DD] text-[#333333] hover:bg-[#B8E1DD]/80">New</Badge>
                          )}
                          {product.isBestseller && (
                            <Badge className="bg-[#F7D1CD] text-[#333333] hover:bg-[#F7D1CD]/80">Bestseller</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-[#333333]">{product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(product.rating)}
                              <span className="text-xs text-[#757575]">({product.reviewCount})</span>
                            </div>
                          </div>
                          <span className="font-medium text-[#333333]">${product.price}</span>
                        </div>
                        <p className="text-sm text-[#757575] mt-2">{product.description}</p>

                        {/* Product Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[#757575] text-xs border-[#A3B18A]/50">
                              {tag.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>

                        {/* Shade Range */}
                        {product.shades.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Palette className="h-4 w-4 text-[#8B5D76]" />
                              <span className="text-xs text-[#757575]">{product.shades.length} shades</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {product.shades.map((shade) => (
                                <TooltipProvider key={shade.name}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className="w-6 h-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5D76]"
                                        style={{ backgroundColor: shade.hexCode }}
                                        onClick={() => handleShadeSelect(product, shade)}
                                      >
                                        <span className="sr-only">{shade.name}</span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{shade.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-4">
                          <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="icon" className="border-[#A3B18A]">
                            <Heart className="h-4 w-4 text-[#8B5D76]" />
                            <span className="sr-only">Add to wishlist</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#F7D1CD]/30 flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-[#8B5D76]" />
                </div>
                <h3 className="text-lg font-medium text-[#333333] mb-2">No products found</h3>
                <p className="text-[#757575] mb-4">Try adjusting your filters to find what you're looking for</p>
                <Button variant="outline" className="border-[#A3B18A] text-[#333333]" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shade Visualizer Modal */}
      {selectedProduct && selectedShade && (
        <Sheet open={!!selectedShade} onOpenChange={() => setSelectedShade(null)}>
          <SheetContent className="w-[90vw] sm:max-w-md bg-[#F9F7F3]">
            <SheetHeader>
              <SheetTitle className="text-[#333333]">Shade Visualizer</SheetTitle>
              <SheetDescription className="text-[#757575]">
                {selectedProduct.name} - {selectedShade.name}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedShade.hexCode }}
                />
                <div>
                  <p className="font-medium text-[#333333]">{selectedShade.name}</p>
                  <p className="text-sm text-[#757575]">Hex: {selectedShade.hexCode}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#333333] mb-3">How it looks on different skin tones</h3>
                <Tabs defaultValue="light" className="w-full">
                  <TabsList className="w-full bg-[#F7D1CD]/20">
                    <TabsTrigger value="light" className="flex-1 data-[state=active]:bg-[#F7D1CD]">
                      Light
                    </TabsTrigger>
                    <TabsTrigger value="medium" className="flex-1 data-[state=active]:bg-[#F7D1CD]">
                      Medium
                    </TabsTrigger>
                    <TabsTrigger value="deep" className="flex-1 data-[state=active]:bg-[#F7D1CD]">
                      Deep
                    </TabsTrigger>
                    <TabsTrigger value="dark" className="flex-1 data-[state=active]:bg-[#F7D1CD]">
                      Dark
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="light" className="mt-4">
                    <Image
                      src={selectedShade.modelImages.light || "/placeholder.svg"}
                      alt={`${selectedShade.name} on light skin`}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </TabsContent>
                  <TabsContent value="medium" className="mt-4">
                    <Image
                      src={selectedShade.modelImages.medium || "/placeholder.svg"}
                      alt={`${selectedShade.name} on medium skin`}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </TabsContent>
                  <TabsContent value="deep" className="mt-4">
                    <Image
                      src={selectedShade.modelImages.deep || "/placeholder.svg"}
                      alt={`${selectedShade.name} on deep skin`}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </TabsContent>
                  <TabsContent value="dark" className="mt-4">
                    <Image
                      src={selectedShade.modelImages.dark || "/placeholder.svg"}
                      alt={`${selectedShade.name} on dark skin`}
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-between pt-4">
                <SheetClose asChild>
                  <Button variant="outline" className="border-[#A3B18A] text-[#333333]">
                    Close
                  </Button>
                </SheetClose>
                <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}


export default page