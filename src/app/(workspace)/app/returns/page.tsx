"use client"

import { useState } from "react"
import { RotateCcw, Search, Plus, Package, MapPin, User, ChevronRight, CheckCircle2, Clock, XCircle, Truck, Warehouse } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const returns = [
  {
    id: "R-2026-041",
    store: "Panda - Al Olaya",
    merchandiser: "Mohammed Ali",
    reason: "Expired",
    status: "approved",
    itemCount: 8,
    submittedDate: "2026-08-04",
    approvedDate: "2026-08-05",
    items: [
      { product: "Al Fares Yogurt 500g", qty: 5, condition: "expired" },
      { product: "Al Fares Full Cream Milk 1L", qty: 3, condition: "expired" },
    ],
  },
  {
    id: "R-2026-040",
    store: "Tamimi - King Fahd",
    merchandiser: "Ahmed Khalid",
    reason: "Damaged",
    status: "submitted",
    itemCount: 4,
    submittedDate: "2026-08-05",
    approvedDate: null,
    items: [
      { product: "Al Fares Orange Juice 1L", qty: 4, condition: "damaged" },
    ],
  },
  {
    id: "R-2026-039",
    store: "LuLu Hypermarket",
    merchandiser: "Ali Nasser",
    reason: "Overstock",
    status: "awaiting_pickup",
    itemCount: 24,
    submittedDate: "2026-08-03",
    approvedDate: "2026-08-04",
    items: [
      { product: "Al Fares Potato Chips 150g", qty: 12, condition: "good" },
      { product: "Al Fares Apple Juice 1L", qty: 12, condition: "good" },
    ],
  },
  {
    id: "R-2026-038",
    store: "Danube - Panorama",
    merchandiser: "Khalid Saeed",
    reason: "Expired",
    status: "warehouse_received",
    itemCount: 16,
    submittedDate: "2026-08-01",
    approvedDate: "2026-08-02",
    items: [
      { product: "Al Fares Tuna 185g", qty: 16, condition: "expired" },
    ],
  },
  {
    id: "R-2026-037",
    store: "Bin Dawood - Corniche",
    merchandiser: "Fahad Mohammed",
    reason: "Damaged",
    status: "rejected",
    itemCount: 6,
    submittedDate: "2026-07-30",
    approvedDate: null,
    items: [
      { product: "Al Fares Tomato Paste 400g", qty: 6, condition: "damaged" },
    ],
  },
  {
    id: "R-2026-036",
    store: "Carrefour - Dhahran",
    merchandiser: "Saeed Al-Harbi",
    reason: "Expired",
    status: "resolved",
    itemCount: 10,
    submittedDate: "2026-07-28",
    approvedDate: "2026-07-29",
    items: [
      { product: "Al Fares Frozen Vegetables 450g", qty: 10, condition: "expired" },
    ],
  },
]

const statusConfig: Record<string, { label: string; classes: string; icon: typeof CheckCircle2 }> = {
  draft: { label: "Draft", classes: "bg-gray-50 text-gray-600 border-gray-200", icon: Clock },
  submitted: { label: "Submitted", classes: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  approved: { label: "Approved", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  rejected: { label: "Rejected", classes: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  awaiting_pickup: { label: "Awaiting Pickup", classes: "bg-amber-50 text-amber-700 border-amber-200", icon: Truck },
  collected: { label: "Collected", classes: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck },
  warehouse_received: { label: "Warehouse Received", classes: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: Warehouse },
  resolved: { label: "Resolved", classes: "bg-emerald-50 text-emerald-800 border-emerald-300", icon: CheckCircle2 },
}

const tabs = ["all", "submitted", "approved", "awaiting_pickup", "warehouse_received", "resolved", "rejected"]

export default function ReturnsPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = returns.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.store.toLowerCase().includes(search.toLowerCase()) ||
      r.merchandiser.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === "all" || r.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns</h1>
          <p className="text-sm text-gray-500">Manage product return requests</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          New Return
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Submitted", count: returns.filter(r => r.status === "submitted").length, color: "text-blue-600" },
          { label: "Approved", count: returns.filter(r => r.status === "approved").length, color: "text-emerald-600" },
          { label: "Awaiting Pickup", count: returns.filter(r => r.status === "awaiting_pickup").length, color: "text-amber-600" },
          { label: "Resolved", count: returns.filter(r => r.status === "resolved").length, color: "text-gray-600" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className={`text-2xl font-bold ${card.color}`}>{card.count}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-3 py-2.5 text-xs font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "text-[#4CAF50] border-[#4CAF50]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab === "all" ? "All" : tab === "awaiting_pickup" ? "Awaiting Pickup" : tab === "warehouse_received" ? "Warehouse" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {tab === "all" ? returns.length : returns.filter(r => r.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search by ID, store, merchandiser..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Returns List */}
      <div className="space-y-3">
        {filtered.map((ret) => {
          const config = statusConfig[ret.status]
          const StatusIcon = config.icon
          const isExpanded = expandedId === ret.id
          return (
            <div key={ret.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : ret.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 font-mono">{ret.id}</span>
                      <Badge variant="outline" className={config.classes}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ret.store}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{ret.merchandiser}</span>
                      <span className="flex items-center gap-1"><Package className="h-3 w-3" />{ret.itemCount} items</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500">Submitted {ret.submittedDate}</p>
                    <p className="text-xs font-medium text-gray-700">{ret.reason}</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/30">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Return Items</h4>
                  <div className="space-y-2">
                    {ret.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                        <span className="text-sm text-gray-700">{item.product}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{item.qty} units</span>
                          <Badge variant="outline" className={
                            item.condition === "expired" ? "bg-red-50 text-red-600 border-red-200 text-[10px]" :
                            item.condition === "damaged" ? "bg-amber-50 text-amber-600 border-amber-200 text-[10px]" :
                            "bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px]"
                          }>
                            {item.condition}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {ret.status === "submitted" && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-[#4CAF50] hover:bg-[#388E3C] text-white h-8 text-xs">Approve</Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-8 text-xs">Reject</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-gray-500">Showing {filtered.length} of {returns.length} returns</p>
    </div>
  )
}
