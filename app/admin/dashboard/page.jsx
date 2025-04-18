"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-12345",
    customer: "Emily Johnson",
    date: "2023-11-15",
    status: "Completed",
    total: 124.99,
  },
  {
    id: "ORD-12344",
    customer: "Michael Smith",
    date: "2023-11-15",
    status: "Processing",
    total: 89.95,
  },
  {
    id: "ORD-12343",
    customer: "Sophia Williams",
    date: "2023-11-14",
    status: "Shipped",
    total: 156.5,
  },
  {
    id: "ORD-12342",
    customer: "James Brown",
    date: "2023-11-14",
    status: "Processing",
    total: 42.0,
  },
  {
    id: "ORD-12341",
    customer: "Olivia Davis",
    date: "2023-11-13",
    status: "Completed",
    total: 210.75,
  },
]

// Mock data for low stock products
const lowStockProducts = [
  {
    id: 1,
    name: "Luminous Silk Foundation",
    sku: "LSF-001",
    stock: 5,
    threshold: 10,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick - Ruby Red",
    sku: "VML-023",
    stock: 3,
    threshold: 15,
  },
  {
    id: 3,
    name: "Radiant Glow Highlighter",
    sku: "RGH-007",
    stock: 7,
    threshold: 12,
  },
]

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("week")

  // Mock statistics based on time range
  const getStats = () => {
    const multiplier = timeRange === "today" ? 1 : timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365
    return {
      revenue: 1250 * multiplier,
      orders: 25 * multiplier,
      customers: 18 * multiplier,
      averageOrder: 50,
      revenueChange: 12.5,
      ordersChange: 8.3,
      customersChange: 5.7,
      averageOrderChange: 3.2,
    }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-[#F9F7F3]">
      <AdminSidebar />
      <AdminHeader />

      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#333333]">Dashboard</h1>
              <p className="text-[#757575]">Welcome back, Admin User</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                New Order
              </Button>
              <Button variant="outline" className="border-[#A3B18A]">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value)}>
              <TabsList className="bg-[#F7D1CD]/20">
                <TabsTrigger value="today" className="data-[state=active]:bg-[#F7D1CD]">
                  Today
                </TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-[#F7D1CD]">
                  This Week
                </TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-[#F7D1CD]">
                  This Month
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-[#F7D1CD]">
                  This Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#757575]">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-[#8B5D76]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#333333]">${stats.revenue.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {stats.revenueChange > 0 ? (
                    <ArrowUp className="h-4 w-4 text-[#A3B18A] mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-[#E57373] mr-1" />
                  )}
                  <p className={`text-xs ${stats.revenueChange > 0 ? "text-[#A3B18A]" : "text-[#E57373]"}`}>
                    {Math.abs(stats.revenueChange)}% from previous period
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#757575]">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-[#8B5D76]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#333333]">{stats.orders}</div>
                <div className="flex items-center mt-1">
                  {stats.ordersChange > 0 ? (
                    <ArrowUp className="h-4 w-4 text-[#A3B18A] mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-[#E57373] mr-1" />
                  )}
                  <p className={`text-xs ${stats.ordersChange > 0 ? "text-[#A3B18A]" : "text-[#E57373]"}`}>
                    {Math.abs(stats.ordersChange)}% from previous period
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#757575]">New Customers</CardTitle>
                <Users className="h-4 w-4 text-[#8B5D76]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#333333]">{stats.customers}</div>
                <div className="flex items-center mt-1">
                  {stats.customersChange > 0 ? (
                    <ArrowUp className="h-4 w-4 text-[#A3B18A] mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-[#E57373] mr-1" />
                  )}
                  <p className={`text-xs ${stats.customersChange > 0 ? "text-[#A3B18A]" : "text-[#E57373]"}`}>
                    {Math.abs(stats.customersChange)}% from previous period
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#757575]">Avg. Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#8B5D76]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#333333]">${stats.averageOrder}</div>
                <div className="flex items-center mt-1">
                  {stats.averageOrderChange > 0 ? (
                    <ArrowUp className="h-4 w-4 text-[#A3B18A] mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-[#E57373] mr-1" />
                  )}
                  <p className={`text-xs ${stats.averageOrderChange > 0 ? "text-[#A3B18A]" : "text-[#E57373]"}`}>
                    {Math.abs(stats.averageOrderChange)}% from previous period
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders and Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Link href="/admin/orders">
                    <Button variant="ghost" className="h-8 text-[#8B5D76]">
                      View All
                    </Button>
                  </Link>
                </div>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#A3B18A]/30">
                        <th className="text-left py-3 px-2 text-sm font-medium text-[#757575]">Order ID</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-[#757575]">Customer</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-[#757575]">Date</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-[#757575]">Status</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-[#757575]">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-[#A3B18A]/30 hover:bg-[#F9F7F3]">
                          <td className="py-3 px-2">
                            <Link href={`/admin/orders/${order.id}`} className="text-[#8B5D76] hover:underline">
                              {order.id}
                            </Link>
                          </td>
                          <td className="py-3 px-2">{order.customer}</td>
                          <td className="py-3 px-2">{order.date}</td>
                          <td className="py-3 px-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === "Completed"
                                  ? "bg-[#B8E1DD]/20 text-[#A3B18A]"
                                  : order.status === "Processing"
                                    ? "bg-[#F7D1CD]/20 text-[#8B5D76]"
                                    : "bg-[#A3B18A]/20 text-[#333333]"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Low Stock Alert</CardTitle>
                  <Link href="/admin/products">
                    <Button variant="ghost" className="h-8 text-[#8B5D76]">
                      View All
                    </Button>
                  </Link>
                </div>
                <CardDescription>Products that need restocking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-[#F9F7F3] rounded-md">
                      <div>
                        <h3 className="font-medium text-[#333333]">{product.name}</h3>
                        <p className="text-xs text-[#757575]">SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#E57373] font-medium">{product.stock} left</p>
                        <p className="text-xs text-[#757575]">Threshold: {product.threshold}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
