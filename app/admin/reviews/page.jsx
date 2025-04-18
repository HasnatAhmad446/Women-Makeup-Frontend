"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronDown, MoreHorizontal, Search, SlidersHorizontal, Star, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"


export default function AdminReviewsPage() {
  // Mock reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      productName: "Luminous Silk Foundation",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Emily Johnson",
      rating: 5,
      title: "Perfect for my dry skin!",
      content:
        "I've been searching for a foundation that doesn't cling to my dry patches and this is it! The finish is beautiful and dewy without looking greasy. It lasts all day and doesn't settle into fine lines. Definitely worth the price!",
      date: "2023-11-15",
      status: "approved",
    },
    {
      id: 2,
      productId: 1,
      productName: "Luminous Silk Foundation",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Sophia Williams",
      rating: 4,
      title: "Beautiful finish but needs setting",
      content:
        "The foundation gives a gorgeous luminous finish that looks like real skin. My only issue is that it transfers a bit if I don't set it with powder. I have combination skin and find it works well with a good primer underneath.",
      date: "2023-10-28",
      status: "approved",
    },
    {
      id: 3,
      productId: 3,
      productName: "Radiant Glow Highlighter",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Aisha M.",
      rating: 5,
      title: "Stunning glow!",
      content:
        "This highlighter gives the most beautiful glow without emphasizing texture. It's buildable and can be subtle for daytime or intense for evening looks. The formula is smooth and blends like a dream.",
      date: "2023-11-10",
      status: "approved",
    },
    {
      id: 4,
      productId: 2,
      productName: "Velvet Matte Lipstick",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "James Brown",
      rating: 3,
      title: "Good but not great for dry lips",
      content:
        "The color is beautiful and long-lasting, but I find it a bit drying on my already dry lips. I need to use a lip balm underneath. The packaging is luxurious though.",
      date: "2023-11-14",
      status: "pending",
    },
    {
      id: 5,
      productId: 4,
      productName: "Precision Eyeliner",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Nina P.",
      rating: 5,
      title: "Holy grail eyeliner!",
      content:
        "I've repurchased this eyeliner three times now. It's so easy to create precise lines and it doesn't smudge or fade throughout the day. The tip stays sharp and doesn't dry out quickly like other liners I've tried.",
      date: "2023-11-05",
      status: "approved",
    },
    {
      id: 6,
      productId: 5,
      productName: "Hydrating Skin Tint",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Michael Smith",
      rating: 2,
      title: "Not enough coverage",
      content:
        "This product is too sheer for my liking. It barely covers any imperfections and disappears within a few hours. The hydrating claims are true though, it feels nice on the skin.",
      date: "2023-11-12",
      status: "pending",
    },
    {
      id: 7,
      productId: 6,
      productName: "Volumizing Mascara",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Olivia Davis",
      rating: 1,
      title: "Terrible formula, clumps badly",
      content:
        "This mascara is a disaster! It clumps terribly and makes my lashes stick together. It also flakes throughout the day and irritates my eyes. Waste of money!",
      date: "2023-11-08",
      status: "rejected",
    },
    {
      id: 8,
      productId: 7,
      productName: "Brow Sculptor Pencil",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "William Miller",
      rating: 4,
      title: "Great for natural brows",
      content:
        "This brow pencil creates the most natural-looking brows. The spoolie on the end is perfect for blending. I wish the pencil was a bit creamier, but overall it's a great product.",
      date: "2023-11-03",
      status: "approved",
    },
    {
      id: 9,
      productId: 8,
      productName: "Matte Blush",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Emma Wilson",
      rating: 5,
      title: "Beautiful color payoff",
      content:
        "This blush is pigmented but still easy to blend. The color is gorgeous and lasts all day on my skin. I've received so many compliments when wearing it!",
      date: "2023-10-25",
      status: "pending",
    },
    {
      id: 10,
      productId: 9,
      productName: "Hydrating Lip Balm",
      productImage: "/placeholder.svg?height=50&width=50",
      customer: "Alexander Taylor",
      rating: 4,
      title: "Moisturizing and long-lasting",
      content:
        "This lip balm keeps my lips hydrated for hours. The slight tint is perfect for a natural look. I keep one in my bag, one at my desk, and one by my bed!",
      date: "2023-11-01",
      status: "approved",
    },
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [selectedReviews, setSelectedReviews] = useState([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)
  const [reviewDetailOpen, setReviewDetailOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)

  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchQuery === "" ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating = ratingFilter === null || review.rating === ratingFilter
    const matchesStatus = statusFilter === null || review.status === statusFilter

    return matchesSearch && matchesRating && matchesStatus
  })

  // Handle select all reviews
  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(filteredReviews.map((review) => review.id))
    }
  }

  // Handle select individual review
  const handleSelectReview = (id) => {
    if (selectedReviews.includes(id)) {
      setSelectedReviews(selectedReviews.filter((reviewId) => reviewId !== id))
    } else {
      setSelectedReviews([...selectedReviews, id])
    }
  }

  // Handle delete review
  const handleDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))
      setReviewToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setReviews(reviews.filter((review) => !selectedReviews.includes(review.id)))
    setSelectedReviews([])
  }

  // Handle approve review
  const handleApproveReview = (id) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, status: "approved" } : review)))
  }

  // Handle reject review
  const handleRejectReview = (id) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, status: "rejected" } : review)))
  }

  // Handle bulk approve
  const handleBulkApprove = () => {
    setReviews(
      reviews.map((review) =>
        selectedReviews.includes(review.id) ? { ...review, status: "approved" } : review,
      ),
    )
    setSelectedReviews([])
  }

  // Handle bulk reject
  const handleBulkReject = () => {
    setReviews(
      reviews.map((review) =>
        selectedReviews.includes(review.id) ? { ...review, status: "rejected" } : review,
      ),
    )
    setSelectedReviews([])
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
      case "pending":
        return "bg-[#F7D1CD]/20 text-[#8B5D76]"
      case "rejected":
        return "bg-[#E57373]/20 text-[#E57373]"
      default:
        return "bg-[#A3B18A]/20 text-[#333333]"
    }
  }

  // Render stars
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
      <AdminSidebar />
      <AdminHeader />

      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#333333]">Reviews</h1>
              <p className="text-[#757575]">Manage and moderate customer reviews</p>
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
                    placeholder="Search reviews..."
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
                      <Star className="mr-2 h-4 w-4" />
                      Rating
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setRatingFilter(null)}>All Ratings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setRatingFilter(5)}>5 Stars</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRatingFilter(4)}>4 Stars</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRatingFilter(3)}>3 Stars</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRatingFilter(2)}>2 Stars</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRatingFilter(1)}>1 Star</DropdownMenuItem>
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
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("approved")}>Approved</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {(ratingFilter !== null || statusFilter) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-[#757575]">Active filters:</span>
                {ratingFilter !== null && (
                  <Badge
                    variant="outline"
                    className="bg-[#F7D1CD]/20 text-[#8B5D76] hover:bg-[#F7D1CD]/30 border-[#F7D1CD]"
                  >
                    Rating: {ratingFilter} {ratingFilter === 1 ? "Star" : "Stars"}
                    <button
                      className="ml-1 hover:text-[#E57373]"
                      onClick={() => setRatingFilter(null)}
                      aria-label="Remove rating filter"
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
                    setRatingFilter(null)
                    setStatusFilter(null)
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedReviews.length > 0 && (
            <div className="bg-[#F7D1CD]/20 p-4 rounded-lg mb-6 flex items-center justify-between">
              <p className="text-[#333333]">
                <span className="font-medium">{selectedReviews.length}</span> reviews selected
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="border-[#A3B18A] text-[#A3B18A]" onClick={handleBulkApprove}>
                  <Check className="mr-2 h-4 w-4" />
                  Approve Selected
                </Button>
                <Button variant="outline" className="border-[#A3B18A] text-[#E57373]" onClick={handleBulkReject}>
                  <X className="mr-2 h-4 w-4" />
                  Reject Selected
                </Button>
                <Button variant="destructive" className="bg-[#E57373]" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          {/* Reviews Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#A3B18A]/30">
                    <th className="py-3 px-4 text-left">
                      <Checkbox
                        checked={filteredReviews.length > 0 && selectedReviews.length === filteredReviews.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Product</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Customer</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Rating</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Review</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Status</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-[#757575]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id} className="border-b border-[#A3B18A]/30 hover:bg-[#F9F7F3]">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedReviews.includes(review.id)}
                          onCheckedChange={() => handleSelectReview(review.id)}
                          className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <Image
                              src={review.productImage || "/placeholder.svg"}
                              alt={review.productName}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="text-[#333333]">{review.productName}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#333333]">{review.customer}</td>
                      <td className="py-3 px-4">{renderStars(review.rating)}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-[#333333]">{review.title}</div>
                          <div className="text-xs text-[#757575] truncate max-w-[200px]">{review.content}</div>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-xs text-[#8B5D76]"
                            onClick={() => {
                              setSelectedReview(review)
                              setReviewDetailOpen(true)
                            }}
                          >
                            Read more
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{review.date}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusBadgeColor(review.status)}>{review.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-1">
                          {review.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#A3B18A]"
                                onClick={() => handleApproveReview(review.id)}
                              >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#E57373]"
                                onClick={() => handleRejectReview(review.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedReview(review)
                                  setReviewDetailOpen(true)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              {review.status !== "approved" && (
                                <DropdownMenuItem onClick={() => handleApproveReview(review.id)}>
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {review.status !== "rejected" && (
                                <DropdownMenuItem onClick={() => handleRejectReview(review.id)}>
                                  Reject
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-[#E57373]"
                                onClick={() => {
                                  setReviewToDelete(review.id)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredReviews.length === 0 && (
              <div className="py-12 text-center">
                <Star className="mx-auto h-12 w-12 text-[#A3B18A]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#333333]">No reviews found</h3>
                <p className="mt-2 text-[#757575]">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#A3B18A]/30">
              <div className="text-sm text-[#757575]">
                Showing <span className="font-medium">{filteredReviews.length}</span> of{" "}
                <span className="font-medium">{reviews.length}</span> reviews
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-[#A3B18A]" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-[#E57373]" onClick={handleDeleteReview}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Detail Dialog */}
      <Dialog open={reviewDetailOpen} onOpenChange={setReviewDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0">
                  <Image
                    src={selectedReview.productImage || "/placeholder.svg"}
                    alt={selectedReview.productName}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[#333333]">{selectedReview.productName}</h3>
                  <p className="text-sm text-[#757575]">
                    <Link
                      href={`/admin/products/${selectedReview.productId}`}
                      className="text-[#8B5D76] hover:underline"
                    >
                      View Product
                    </Link>
                  </p>
                </div>
              </div>

              <div className="bg-[#F9F7F3] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#333333]">{selectedReview.customer}</span>
                    <Badge className={getStatusBadgeColor(selectedReview.status)}>{selectedReview.status}</Badge>
                  </div>
                  <span className="text-sm text-[#757575]">{selectedReview.date}</span>
                </div>
                <div className="mb-2">{renderStars(selectedReview.rating)}</div>
                <h4 className="font-medium text-[#333333] mb-2">{selectedReview.title}</h4>
                <p className="text-[#757575]">{selectedReview.content}</p>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  {selectedReview.status !== "approved" && (
                    <Button
                      variant="outline"
                      className="border-[#A3B18A] text-[#A3B18A]"
                      onClick={() => {
                        handleApproveReview(selectedReview.id)
                        setReviewDetailOpen(false)
                      }}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {selectedReview.status !== "rejected" && (
                    <Button
                      variant="outline"
                      className="border-[#A3B18A] text-[#E57373]"
                      onClick={() => {
                        handleRejectReview(selectedReview.id)
                        setReviewDetailOpen(false)
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="bg-[#E57373]"
                  onClick={() => {
                    setReviewToDelete(selectedReview.id)
                    setReviewDetailOpen(false)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
