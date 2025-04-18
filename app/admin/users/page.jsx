"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
  Users,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"


export default function AdminUsersPage() {
  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily@example.com",
      role: "customer",
      status: "active",
      orders: 12,
      totalSpent: 845.75,
      lastActive: "2023-11-15",
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "michael@example.com",
      role: "customer",
      status: "active",
      orders: 5,
      totalSpent: 320.5,
      lastActive: "2023-11-14",
    },
    {
      id: 3,
      name: "Sophia Williams",
      email: "sophia@example.com",
      role: "customer",
      status: "inactive",
      orders: 3,
      totalSpent: 156.25,
      lastActive: "2023-10-28",
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@glowandgrace.com",
      role: "admin",
      status: "active",
      orders: 0,
      totalSpent: 0,
      lastActive: "2023-11-15",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james@example.com",
      role: "customer",
      status: "active",
      orders: 8,
      totalSpent: 412.99,
      lastActive: "2023-11-12",
    },
    {
      id: 6,
      name: "Olivia Davis",
      email: "olivia@example.com",
      role: "customer",
      status: "banned",
      orders: 1,
      totalSpent: 45.0,
      lastActive: "2023-09-05",
    },
    {
      id: 7,
      name: "Content Editor",
      email: "editor@glowandgrace.com",
      role: "editor",
      status: "active",
      orders: 0,
      totalSpent: 0,
      lastActive: "2023-11-14",
    },
    {
      id: 8,
      name: "William Miller",
      email: "william@example.com",
      role: "customer",
      status: "active",
      orders: 6,
      totalSpent: 278.5,
      lastActive: "2023-11-10",
    },
    {
      id: 9,
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "customer",
      status: "active",
      orders: 4,
      totalSpent: 195.75,
      lastActive: "2023-11-08",
    },
    {
      id: 10,
      name: "Alexander Taylor",
      email: "alex@example.com",
      role: "customer",
      status: "inactive",
      orders: 2,
      totalSpent: 87.25,
      lastActive: "2023-10-15",
    },
  ])

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === null || user.role === roleFilter
    const matchesStatus = statusFilter === null || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Handle select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  // Handle select individual user
  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  // Handle delete user
  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setUserToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
      case "inactive":
        return "bg-[#A3B18A]/20 text-[#333333]"
      case "banned":
        return "bg-[#E57373]/20 text-[#E57373]"
      default:
        return "bg-[#A3B18A]/20 text-[#333333]"
    }
  }

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-[#F7D1CD]/20 text-[#8B5D76]"
      case "editor":
        return "bg-[#A3B18A]/20 text-[#333333]"
      case "customer":
        return "bg-[#B8E1DD]/20 text-[#A3B18A]"
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
              <h1 className="text-2xl font-bold text-[#333333]">Users</h1>
              <p className="text-[#757575]">Manage user accounts and permissions</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button
                className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90"
                onClick={() => setIsAddUserDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
              <Button variant="outline" className="border-[#A3B18A]">
                <Download className="mr-2 h-4 w-4" />
                Export Users
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
                    placeholder="Search users by name or email..."
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
                      Role
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setRoleFilter(null)}>All Roles</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setRoleFilter("admin")}>Admin</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRoleFilter("editor")}>Editor</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRoleFilter("customer")}>Customer</DropdownMenuItem>
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
                    <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("banned")}>Banned</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {(roleFilter || statusFilter) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-[#757575]">Active filters:</span>
                {roleFilter && (
                  <Badge
                    variant="outline"
                    className="bg-[#F7D1CD]/20 text-[#8B5D76] hover:bg-[#F7D1CD]/30 border-[#F7D1CD]"
                  >
                    Role: {roleFilter}
                    <button
                      className="ml-1 hover:text-[#E57373]"
                      onClick={() => setRoleFilter(null)}
                      aria-label="Remove role filter"
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
                    setRoleFilter(null)
                    setStatusFilter(null)
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="bg-[#F7D1CD]/20 p-4 rounded-lg mb-6 flex items-center justify-between">
              <p className="text-[#333333]">
                <span className="font-medium">{selectedUsers.length}</span> users selected
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

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#A3B18A]/30">
                    <th className="py-3 px-4 text-left">
                      <Checkbox
                        checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">User</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Role</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Orders</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Total Spent</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-[#757575]">Last Active</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-[#757575]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#A3B18A]/30 hover:bg-[#F9F7F3]">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                          className="border-[#A3B18A] data-[state=checked]:bg-[#8B5D76] data-[state=checked]:border-[#8B5D76]"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                            <AvatarFallback className="bg-[#F7D1CD] text-[#8B5D76]">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[#333333]">{user.name}</div>
                            <div className="text-xs text-[#757575]">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusBadgeColor(user.status)}>{user.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{user.orders}</td>
                      <td className="py-3 px-4 text-[#757575]">
                        {user.totalSpent > 0 ? `$${user.totalSpent.toFixed(2)}` : "-"}
                      </td>
                      <td className="py-3 px-4 text-[#757575]">{user.lastActive}</td>
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
                              <Link href={`/admin/users/${user.id}`} className="flex w-full">
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-[#E57373]"
                              onClick={() => {
                                setUserToDelete(user.id)
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

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-[#A3B18A]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#333333]">No users found</h3>
                <p className="mt-2 text-[#757575]">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#A3B18A]/30">
              <div className="text-sm text-[#757575]">
                Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{users.length}</span> users
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
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="border-[#A3B18A]" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-[#E57373]" onClick={handleDeleteUser}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with the following details.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="name" className="text-sm font-medium text-[#333333]">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  className="mt-1 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-[#333333]">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="mt-1 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="password" className="text-sm font-medium text-[#333333]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  className="mt-1 border-[#A3B18A] focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                />
              </div>
              <div>
                <label htmlFor="role" className="text-sm font-medium text-[#333333]">
                  Role
                </label>
                <select
                  id="role"
                  className="mt-1 w-full rounded-md border border-[#A3B18A] p-2 focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                  defaultValue="customer"
                >
                  <option value="customer">Customer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="text-sm font-medium text-[#333333]">
                  Status
                </label>
                <select
                  id="status"
                  className="mt-1 w-full rounded-md border border-[#A3B18A] p-2 focus:border-[#8B5D76] focus:ring-[#8B5D76]"
                  defaultValue="active"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="border-[#A3B18A]" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5D76] text-white hover:bg-[#8B5D76]/90">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
