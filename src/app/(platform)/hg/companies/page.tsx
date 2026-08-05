"use client"

import { useState } from "react"
import { Building2, Search, Plus, Users, MapPin, Calendar, TrendingUp, ExternalLink, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const companies = [
  {
    id: "1",
    name: "AlFares Food Industries",
    nameAr: "الفارس للصناعات الغذائية",
    industry: "Food & Beverage",
    plan: "enterprise",
    status: "active",
    users: 8,
    stores: 7,
    regions: 3,
    since: "2026-01-15",
    lastActivity: "2026-08-05",
    compliance: 91,
    initials: "EF",
    color: "#4CAF50",
  },
  {
    id: "2",
    name: "Nada Dairy Co.",
    nameAr: "شركة ندى للألبان",
    industry: "Dairy Products",
    plan: "professional",
    status: "active",
    users: 5,
    stores: 4,
    regions: 2,
    since: "2026-03-01",
    lastActivity: "2026-08-04",
    compliance: 87,
    initials: "ND",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Sharqiya Snacks",
    nameAr: "شركة الشرقية للمقرمشات",
    industry: "Snacks & Confectionery",
    plan: "starter",
    status: "active",
    users: 3,
    stores: 3,
    regions: 1,
    since: "2026-05-10",
    lastActivity: "2026-08-03",
    compliance: 83,
    initials: "SS",
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Gulf Fresh Farms",
    nameAr: "مزارع الخليج الطازجة",
    industry: "Fresh Produce",
    plan: "professional",
    status: "trial",
    users: 4,
    stores: 2,
    regions: 1,
    since: "2026-07-20",
    lastActivity: "2026-08-02",
    compliance: 76,
    initials: "GF",
    color: "#10B981",
  },
]

const planConfig: Record<string, { label: string; classes: string }> = {
  enterprise: { label: "Enterprise", classes: "bg-purple-50 text-purple-700 border-purple-200" },
  professional: { label: "Professional", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  starter: { label: "Starter", classes: "bg-gray-50 text-gray-600 border-gray-200" },
}

const statusConfig: Record<string, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-emerald-500" },
  trial: { label: "Trial", dot: "bg-amber-500" },
  suspended: { label: "Suspended", dot: "bg-red-500" },
}

export default function HGCompaniesPage() {
  const [search, setSearch] = useState("")

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500">Manage client tenants on the platform</p>
        </div>
        <Button className="bg-[#E8505B] hover:bg-[#D43D48] text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Clients", value: companies.length, color: "text-gray-900" },
          { label: "Active", value: companies.filter(c => c.status === "active").length, color: "text-emerald-600" },
          { label: "On Trial", value: companies.filter(c => c.status === "trial").length, color: "text-amber-600" },
          { label: "Total Users", value: companies.reduce((s, c) => s + c.users, 0), color: "text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Company Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((company) => {
          const plan = planConfig[company.plan]
          const status = statusConfig[company.status]
          return (
            <div key={company.id} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white text-sm font-bold"
                    style={{ backgroundColor: company.color }}
                  >
                    {company.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-xs text-gray-400">{company.industry}</p>
                  </div>
                </div>
                <button className="p-1 rounded-md text-gray-400 hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className={plan.classes + " text-[10px]"}>{plan.label}</Badge>
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${company.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { icon: Users, value: company.users, label: "Users" },
                  { icon: Building2, value: company.stores, label: "Stores" },
                  { icon: MapPin, value: company.regions, label: "Regions" },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="rounded-lg bg-gray-50 p-2.5 text-center">
                      <Icon className="h-3.5 w-3.5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-bold text-gray-800">{stat.value}</p>
                      <p className="text-[10px] text-gray-400">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">Avg Compliance</span>
                  <span className={`text-xs font-semibold ${company.compliance >= 88 ? "text-emerald-600" : company.compliance >= 80 ? "text-amber-600" : "text-red-500"}`}>
                    {company.compliance}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${company.compliance >= 88 ? "bg-emerald-500" : company.compliance >= 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${company.compliance}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Client since {company.since}
                </span>
                <button className="flex items-center gap-1 text-xs text-[#E8505B] hover:text-[#D43D48] font-medium">
                  View workspace
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
