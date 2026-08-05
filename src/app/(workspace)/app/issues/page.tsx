"use client"

import { useState } from "react"
import { ShieldAlert, Search, Plus, MapPin, User, AlertTriangle, Clock, CheckCircle2, ChevronRight, Flag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const issues = [
  { id: "ISS-041", title: "Out of Stock - Dairy Section", titleAr: "نفاد مخزون - قسم الألبان", store: "Panda - Al Olaya", reportedBy: "Mohammed Ali", category: "out_of_stock", priority: "critical", status: "open", date: "2026-08-05", description: "Al Fares Yogurt and Milk completely out of stock. Shelf space empty for 3 days." },
  { id: "ISS-040", title: "Damaged Display Stand", titleAr: "رف عرض تالف", store: "Tamimi - King Fahd", reportedBy: "Ahmed Khalid", category: "display", priority: "high", status: "in_progress", date: "2026-08-04", description: "Main display stand in aisle 4 is damaged and leans to one side. Risk of falling." },
  { id: "ISS-039", title: "Wrong Pricing Label", titleAr: "ملصق سعر خاطئ", store: "Danube - Panorama", reportedBy: "Khalid Saeed", category: "pricing", priority: "medium", status: "open", date: "2026-08-04", description: "Apple Juice 1L showing old price. Competitor pricing visible nearby." },
  { id: "ISS-038", title: "Competitor New SKU on Shelf", titleAr: "منتج منافس جديد في الرف", store: "LuLu Hypermarket", reportedBy: "Ali Nasser", category: "competitor", priority: "medium", status: "resolved", date: "2026-08-03", description: "Competitor brand added 2 new juice SKUs in our allocated shelf space." },
  { id: "ISS-037", title: "Freezer Temperature Issue", titleAr: "مشكلة في درجة حرارة الفريزر", store: "Carrefour - Dhahran", reportedBy: "Saeed Al-Harbi", category: "equipment", priority: "critical", status: "escalated", date: "2026-08-02", description: "Frozen section freezer not maintaining required temperature. Products at risk." },
  { id: "ISS-036", title: "Missing Price Tags", titleAr: "بطاقات أسعار مفقودة", store: "Bin Dawood - Corniche", reportedBy: "Fahad Mohammed", category: "pricing", priority: "low", status: "resolved", date: "2026-08-01", description: "5 products missing price tags after shelf restocking." },
]

const priorityConfig: Record<string, { label: string; classes: string; dot: string }> = {
  critical: { label: "Critical", classes: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
  high: { label: "High", classes: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  medium: { label: "Medium", classes: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  low: { label: "Low", classes: "bg-gray-50 text-gray-600 border-gray-200", dot: "bg-gray-400" },
}

const statusConfig: Record<string, { label: string; classes: string; icon: typeof CheckCircle2 }> = {
  open: { label: "Open", classes: "bg-blue-50 text-blue-700 border-blue-200", icon: AlertTriangle },
  in_progress: { label: "In Progress", classes: "bg-purple-50 text-purple-700 border-purple-200", icon: Clock },
  resolved: { label: "Resolved", classes: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  closed: { label: "Closed", classes: "bg-gray-50 text-gray-600 border-gray-200", icon: CheckCircle2 },
  escalated: { label: "Escalated", classes: "bg-red-50 text-red-700 border-red-200", icon: Flag },
}

const categoryLabels: Record<string, string> = {
  out_of_stock: "Out of Stock",
  display: "Display",
  pricing: "Pricing",
  damage: "Damage",
  competitor: "Competitor",
  staff: "Staff",
  equipment: "Equipment",
  other: "Other",
}

const tabs = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "escalated", label: "Escalated" },
  { key: "resolved", label: "Resolved" },
]

export default function IssuesPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = issues.filter((i) => {
    const matchesSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.store.toLowerCase().includes(search.toLowerCase()) ||
      i.id.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === "all" || i.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
          <p className="text-sm text-gray-500">Track and resolve field issues</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Open", count: issues.filter(i => i.status === "open").length, color: "text-blue-600" },
          { label: "In Progress", count: issues.filter(i => i.status === "in_progress").length, color: "text-purple-600" },
          { label: "Escalated", count: issues.filter(i => i.status === "escalated").length, color: "text-red-600" },
          { label: "Resolved", count: issues.filter(i => i.status === "resolved").length, color: "text-emerald-600" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className={`text-2xl font-bold ${card.color}`}>{card.count}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key ? "text-[#4CAF50] border-[#4CAF50]" : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {tab.key === "all" ? issues.length : issues.filter(i => i.status === tab.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search issues..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filtered.map((issue) => {
          const priority = priorityConfig[issue.priority]
          const status = statusConfig[issue.status]
          const StatusIcon = status.icon
          return (
            <div key={issue.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50">
                    <ShieldAlert className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{issue.id}</span>
                      <div className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
                      <Badge variant="outline" className={priority.classes + " text-[10px]"}>
                        {priority.label}
                      </Badge>
                      <Badge variant="outline" className={status.classes + " text-[10px]"}>
                        <StatusIcon className="h-2.5 w-2.5 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{issue.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{issue.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{issue.store}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{issue.reportedBy}</span>
                      <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{categoryLabels[issue.category]}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">{issue.date}</p>
                  <ChevronRight className="h-4 w-4 text-gray-300 mt-1 ml-auto" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-gray-500">Showing {filtered.length} of {issues.length} issues</p>
    </div>
  )
}
