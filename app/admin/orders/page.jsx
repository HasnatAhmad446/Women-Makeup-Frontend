"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react"

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
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminOrdersPage() {
  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      customer: "Emily Johnson",
      email: "emily@example.com",
      date: "2023-11-15",
      status: "delivered",
      payment: "paid",
      total: 124.99,
      items: 3,
    },
    {
      id: "ORD-12344",
      customer: "Michael Smith",
      email: "michael@example.com",
      date: "2023-11-15",
      status: "processing",
      payment: "paid",
      total: 89.95,
      items: 2,
    },
    {
      id: "ORD-12343",
      customer: "Sophia Williams",
      email: "sophia@example.com",
      date: "2023-11-14",
      status: "shipped",
      payment: "paid",
      total: 156.5,
      items: 4,
    },
    {
      id: "ORD-12342",
      customer: "James Brown",
      email: "james@example.com",
      date: "2023-11-14",
      status: "processing",
      payment: "pending",
      total: 42.0,
      items: 1,
    },
    {
      id: "ORD-12341",
      customer: "Olivia Davis",
      email: "olivia@example.com",
      date: "2023-11-13",
      status: "delivered",
      payment: "paid",
      total: 210.75,
      items: 5,
    },
    {
      id: "ORD-12340",
      customer: "William Miller",
      email: "william@example.com",
      date: "2023-11-12",
      status: "cancelled",
      payment: "refunded",
      total: 65.25,
      items: 2,
    },
    {
      id: "ORD-12339",
      customer: "Emma Wilson",
      email: "emma@example.com",
      date: "2023-11-11",
      status: "delivered",
      payment: "paid",
      total: 78.5,
      items: 2,
    },
    {
      id: "ORD-12338",
      customer: "Alexander Taylor",
      email: "alex@example.com",
      date: "2023-11-10",
      status: "delivered",
      payment: "paid",
      total: 135.0,
      items: 3,
    },
    {
      id: "ORD-12337",
      customer: "Charlotte Anderson",
      email: "charlotte@example.com",
      date: "2023-11-09",
      status: "refunded",
      payment: "refunded",
      total: 92.75,
      items: 2,
    },
    {
      id: "ORD-12336",
      customer: "Daniel Thomas",
      email: "daniel@example.com",
      date: "2023-11-08",
      status: "delivered",
      payment: "paid",
      total: 45.99,
      items: 1,
    },
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState(null)
  const [paymentFilter, setPaymentFilter] = useState(null)
  const [selectedOrders, setSelectedOrders] = useState([])

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === null || order.status === statusFilter
    const matchesPayment = paymentFilter === null || order.payment === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  // Handle select all orders
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  // Handle select individual order
  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#F7D1CD]/20 text-[#8B5D76]"
      case "processing":
        return "bg-[#A3B18A]/20 text-[#333333]"
      case "shipped":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
      case "delivered":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
      case "cancelled":
        return "bg-[#E57373]/20 text-[#E57373]"
      case "refunded":
        return "bg-[#E57373]/20 text-[#E57373]"
      default:
        return "bg-[#A3B18A]/20 text-[#333333]"
    }
  }

  // Get payment badge color
  const getPaymentBadgeColor = (payment) => {
    switch (payment) {
      case "paid":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
      case "pending":
        return "bg-[#F7D1CD]/20 text-[#8B5D76]"
      case "failed":
        return "bg-[#E57373]/20 text-[#E57373]"
      case "refunded":
        return "bg-[#A3B18A]/20 text-[#333333]"
      default:
        return "bg-[#A3B18A]/20 text-[#333333]"
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      <AdminSidebar />
      <AdminHeader />

      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#333333]">Orders</h1>
              <p className="text-[#757575]">Manage and process customer orders</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button variant="outline" className="border-[#A3B18A]">
                <Download className="mr-2 h-4 w-4" />
                Export Orders
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
                    placeholder="Search orders by ID, customer name, or email..."
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
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("processing")}>Processing</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>Shipped</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>Delivered</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("refunded")}>Refunded</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#A3B18A]">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Payment
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setPaymentFilter(null)}>All Payments</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setPaymentFilter("paid")}>Paid</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentFilter("pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentFilter("failed")}>Failed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentFilter("refunded")}>Refunded</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#A3B18A]">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>This month</DropdownMenuItem>
                    <DropdownMenuItem>Last month</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Custom range</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {(statusFilter || paymentFilter) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-[#757575]">Active filters:</span>
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
                {paymentFilter && (
                  <Badge
                    variant="outline"
                    className="bg-[#F7D1CD]/20 text-[#8B5D76] hover:bg-[#F7D1CD]/30 border-[#F7D1CD]"
                  >
                    Payment: {paymentFilter}
                    <button
                      className="ml-1 hover:text-[#E57373]"
                      onClick={() => setPaymentFilter(null)}
                      aria-label="Remove payment filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="link"
                  className="h-auto p-0 text-[#8B5D76]"
                  onClick={() => {
                    setStatusFilter(null)
                    setPaymentFilter(null)
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="bg-[#F7D1CD]/20 p-4 rounded-lg mb-6 flex items-center justify-between">
              <p className="text-[#333333]">
                <span className="font-medium">{selectedOrders.length}</span> orders selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#A3B18A]">
                  Update Status
                </Button>
                <Button variant="outline" className="border-[#A3B18A]">
                  Print Invoices
                </Button>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#A3B18A]/30">
                    <th className="py-3 px-4 text-left">
                      <Checkbox
                        checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Order ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Customer</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Payment</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Items</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-[#757575]">Total</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-[#757575]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#A3B18A]/30 hover:bg-[#F9F7F3]">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => handleSelectOrder(order.id)}
                          className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/admin/orders/${order.id}`} className="text-[#8B5D76] hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-[#333333]">{order.customer}</div>
                          <div className="text-xs text-[#757575]">{order.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{order.date}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPaymentBadgeColor(order.payment)}>{order.payment}</Badge>
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{order.items}</td>
                      <td className="py-3 px-4 text-right font-medium text-[#333333]">${order.total.toFixed(2)}</td>
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
                              <Link href={`/admin/orders/${order.id}`} className="flex w-full">
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-[#A3B18A]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#333333]">No orders found</h3>
                <p className="mt-2 text-[#757575]">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#A3B18A]/30">
              <div className="text-sm text-[#757575]">
                Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{orders.length}</span> orders
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
    </div>
  )
}
