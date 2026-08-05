"use client"

import { useState } from "react"
import { UserCog, Plus, Search, Shield, MapPin, Phone, Mail, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const users = [
  { id: "1", name: "Yousef Khan", nameAr: "يوسف خان", email: "y.khan@alfares.sa", phone: "+966 50 111 2233", role: "manager", region: "All Regions", status: "active", lastActive: "2026-08-05", initials: "YK" },
  { id: "2", name: "Mohammed Ali", nameAr: "محمد علي", email: "m.ali@alfares.sa", phone: "+966 55 234 5678", role: "merchandiser", region: "Riyadh", status: "active", lastActive: "2026-08-05", initials: "MA" },
  { id: "3", name: "Ahmed Khalid", nameAr: "أحمد خالد", email: "a.khalid@alfares.sa", phone: "+966 55 345 6789", role: "merchandiser", region: "Jeddah", status: "active", lastActive: "2026-08-05", initials: "AK" },
  { id: "4", name: "Khalid Saeed", nameAr: "خالد سعيد", email: "k.saeed@alfares.sa", phone: "+966 55 456 7890", role: "merchandiser", region: "Riyadh", status: "active", lastActive: "2026-08-04", initials: "KS" },
  { id: "5", name: "Ali Nasser", nameAr: "علي ناصر", email: "a.nasser@alfares.sa", phone: "+966 55 567 8901", role: "merchandiser", region: "Dammam", status: "active", lastActive: "2026-08-04", initials: "AN" },
  { id: "6", name: "Fahad Mohammed", nameAr: "فهد محمد", email: "f.mohammed@alfares.sa", phone: "+966 55 678 9012", role: "supervisor", region: "Jeddah", status: "active", lastActive: "2026-08-03", initials: "FM" },
  { id: "7", name: "Saeed Al-Harbi", nameAr: "سعيد الحربي", email: "s.alharbi@alfares.sa", phone: "+966 55 789 0123", role: "merchandiser", region: "Dammam", status: "active", lastActive: "2026-08-03", initials: "SA" },
  { id: "8", name: "Omar Rashid", nameAr: "عمر راشد", email: "o.rashid@alfares.sa", phone: "+966 55 890 1234", role: "merchandiser", region: "Riyadh", status: "inactive", lastActive: "2026-07-28", initials: "OR" },
]

const roleConfig: Record<string, { label: string; classes: string }> = {
  manager: { label: "Manager", classes: "bg-purple-50 text-purple-700 border-purple-200" },
  supervisor: { label: "Supervisor", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  merchandiser: { label: "Merchandiser", classes: "bg-gray-50 text-gray-600 border-gray-200" },
}

const avatarColors = ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-red-400", "bg-indigo-500", "bg-teal-500", "bg-rose-500"]

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const roles = ["all", "manager", "supervisor", "merchandiser"]

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.region.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">Manage team members and access</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === "active").length}</p>
          <p className="text-xs text-gray-500 mt-1">Active Users</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === "merchandiser").length}</p>
          <p className="text-xs text-gray-500 mt-1">Merchandisers</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-xs text-gray-500 mt-1">Regions Covered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                roleFilter === r ? "bg-[#4CAF50] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Region</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Last Active</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user, i) => {
              const role = roleConfig[user.role]
              return (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]} text-white text-sm font-semibold`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge variant="outline" className={role.classes + " text-[10px]"}>
                      <Shield className="h-2.5 w-2.5 mr-1" />
                      {role.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {user.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{user.lastActive}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${
                      user.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">Showing {filtered.length} of {users.length} users</p>
    </div>
  )
}
