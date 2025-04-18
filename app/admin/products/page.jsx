"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"


export default function AdminProductsPage() {
  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Luminous Silk Foundation",
      sku: "LSF-001",
      category: "Face",
      price: 42,
      stock: 25,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Velvet Matte Lipstick - Ruby Red",
      sku: "VML-023",
      category: "Lips",
      price: 24,
      stock: 42,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Radiant Glow Highlighter",
      sku: "RGH-007",
      category: "Face",
      price: 32,
      stock: 18,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Precision Eyeliner - Black",
      sku: "PEL-012",
      category: "Eyes",
      price: 18,
      stock: 56,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      name: "Hydrating Skin Tint - Medium",
      sku: "HST-034",
      category: "Face",
      price: 36,
      stock: 29,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 6,
      name: "Volumizing Mascara",
      sku: "VMS-009",
      category: "Eyes",
      price: 22,
      stock: 47,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 7,
      name: "Brow Sculptor Pencil - Brown",
      sku: "BSP-015",
      category: "Eyes",
      price: 20,
      stock: 38,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 8,
      name: "Matte Blush - Peach",
      sku: "MBL-027",
      category: "Face",
      price: 26,
      stock: 33,
      status: "active",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 9,
      name: "Hydrating Lip Balm",
      sku: "HLB-042",
      category: "Lips",
      price: 16,
      stock: 62,
      status: "draft",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 10,
      name: "Setting Powder - Translucent",
      sku: "SPT-019",
      category: "Face",
      price: 28,
      stock: 41,
      status: "archived",
      image: "/placeholder.svg?height=50&width=50",
    },
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === null || product.category === categoryFilter
    const matchesStatus = statusFilter === null || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Handle select all products
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Handle select individual product
  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  // Handle delete product
  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setProductToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
    setSelectedProducts([])
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      <AdminSidebar />
      <AdminHeader />

      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#333333]">Products</h1>
              <p className="text-[#757575]">Manage your product inventory</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button
                className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90"
                onClick={() => setIsAddProductOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline" className="border-[#A3B18A]">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#757575]" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#A3B18A]">
                      <Filter className="mr-2 h-4 w-4" />
                      Category
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCategoryFilter(null)}>All Categories</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setCategoryFilter("Face")}>Face</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter("Eyes")}>Eyes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter("Lips")}>Lips</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#A3B18A]">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("archived")}>Archived</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {(categoryFilter || statusFilter) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-[#757575]">Active filters:</span>
                {categoryFilter && (
                  <Badge
                    variant="outline"
                    className="bg-[#F7D1CD]/20 text-[#8B5D76] hover:bg-[#F7D1CD]/30 border-[#F7D1CD]"
                  >
                    Category: {categoryFilter}
                    <button
                      className="ml-1 hover:text-[#E57373]"
                      onClick={() => setCategoryFilter(null)}
                      aria-label="Remove category filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {statusFilter && (
                  <Badge
                    variant="outline"
                    className="bg-[#F7D1CD]/20 text-[#8B5D76] hover:bg-[#F7D1CD]/30 border-[#F7D1CD]"
                  >
                    Status: {statusFilter}
                    <button
                      className="ml-1 hover:text-[#E57373]"
                      onClick={() => setStatusFilter(null)}
                      aria-label="Remove status filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="link"
                  className="h-auto p-0 text-[#8B5D76]"
                  onClick={() => {
                    setCategoryFilter(null)
                    setStatusFilter(null)
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="bg-[#F7D1CD]/20 p-4 rounded-lg mb-6 flex items-center justify-between">
              <p className="text-[#333333]">
                <span className="font-medium">{selectedProducts.length}</span> products selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#A3B18A]">
                  Change Status
                </Button>
                <Button variant="destructive" className="bg-[#E57373]" onClick={handleBulkDelete}>
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#A3B18A]/30">
                    <th className="py-3 px-4 text-left">
                      <Checkbox
                        checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Product</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">SKU</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Status</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-[#757575]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-[#A3B18A]/30 hover:bg-[#F9F7F3]">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                          className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-[#333333]">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{product.sku}</td>
                      <td className="py-3 px-4 text-[#757575]">{product.category}</td>
                      <td className="py-3 px-4 text-[#333333]">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`${
                            product.stock < 10
                              ? "text-[#E57373]"
                              : product.stock < 20
                                ? "text-[#8B5D76]"
                                : "text-[#A3B18A]"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${
                            product.status === "active"
                              ? "bg-[#B8E1DD]/20 text-[#A3B18A]"
                              : product.status === "draft"
                                ? "bg-[#F7D1CD]/20 text-[#8B5D76]"
                                : "bg-[#A3B18A]/20 text-[#333333]"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link href={`/admin/products/${product.id}`} className="flex w-full">
                                Edit Product
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-[#E57373]"
                              onClick={() => {
                                setProductToDelete(product.id)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-[#A3B18A]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#333333]">No products found</h3>
                <p className="mt-2 text-[#757575]">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#A3B18A]/30">
              <div className="text-sm text-[#757575]">
                Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#A3B18A]" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="border-[#A3B18A]" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="bg-[#F7D1CD]/20">
              <TabsTrigger value="basic" className="data-[state=active]:bg-[#F7D1CD]">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-[#F7D1CD]">
                Pricing & Inventory
              </TabsTrigger>
              <TabsTrigger value="images" className="data-[state=active]:bg-[#F7D1CD]">
                Images
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input id="name" className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full rounded-md border border-[#A3B18A] p-2 focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                  ></textarea>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger className="border-[#A3B18A] focus:ring-[#8B5D76]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="face">Face</SelectItem>
                      <SelectItem value="eyes">Eyes</SelectItem>
                      <SelectItem value="lips">Lips</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input id="sku" className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]">$</span>
                    <Input
                      id="price"
                      type="number"
                      className="pl-8 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comparePrice">Compare-at Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]">$</span>
                    <Input
                      id="comparePrice"
                      type="number"
                      className="pl-8 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cost">Cost per item</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]">$</span>
                    <Input
                      id="cost"
                      type="number"
                      className="pl-8 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  className="border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                />
                <p className="text-xs text-[#757575] mt-1">You'll be alerted when stock reaches this level</p>
              </div>
            </TabsContent>
            <TabsContent value="images" className="space-y-4 mt-4">
              <div className="border-2 border-dashed border-[#A3B18A]/50 rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#F7D1CD]/30 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-[#8B5D76]" />
                </div>
                <h3 className="text-[#333333] font-medium mb-2">Upload Product Images</h3>
                <p className="text-[#757575] text-sm mb-4">Drag and drop your images here, or click to browse</p>
                <Button variant="outline" className="border-[#A3B18A]">
                  Browse Files
                </Button>
                <p className="text-xs text-[#757575] mt-4">
                  Supported formats: JPEG, PNG, WebP. Maximum file size: 5MB.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="flex items-center">
            <Label htmlFor="status" className="mr-4">
              Status
            </Label>
            <Select defaultValue="draft">
              <SelectTrigger className="w-[180px] border-[#A3B18A] focus:ring-[#8B5D76]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" className="border-[#A3B18A]" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-[#A3B18A]" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-[#E57373]" onClick={handleDeleteProduct}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
