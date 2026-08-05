"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Search, Filter, Package, Calendar, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const expiryRecords = [
  { id: "1", product: "Al Fares Yogurt 500g", productAr: "زبادي الفارس 500 جرام", sku: "AF-DRY-002", store: "Panda - Al Olaya", batch: "BATCH-2024-089", expiryDate: "2026-08-07", quantity: 24, daysLeft: 2, status: "critical" },
  { id: "2", product: "Al Fares Full Cream Milk 1L", productAr: "حليب الفارس كامل الدسم 1 لتر", sku: "AF-DRY-001", store: "Tamimi - King Fahd", batch: "BATCH-2024-091", expiryDate: "2026-08-10", quantity: 12, daysLeft: 5, status: "critical" },
  { id: "3", product: "Al Fares Orange Juice 1L", productAr: "عصير برتقال الفارس 1 لتر", sku: "AF-JCE-001", store: "Danube - Panorama", batch: "BATCH-2024-078", expiryDate: "2026-08-20", quantity: 36, daysLeft: 15, status: "warning" },
  { id: "4", product: "Al Fares Potato Chips 150g", productAr: "شيبس الفارس 150 جرام", sku: "AF-SNK-001", store: "LuLu Hypermarket", batch: "BATCH-2024-055", expiryDate: "2026-08-25", quantity: 48, daysLeft: 20, status: "warning" },
  { id: "5", product: "Al Fares Tuna 185g", productAr: "تونة الفارس 185 جرام", sku: "AF-CAN-002", store: "Carrefour - Dhahran", batch: "BATCH-2024-032", expiryDate: "2026-09-15", quantity: 60, daysLeft: 41, status: "notice" },
  { id: "6", product: "Al Fares Tomato Paste 400g", productAr: "معجون طماطم الفارس 400 جرام", sku: "AF-CAN-001", store: "Bin Dawood - Corniche", batch: "BATCH-2024-028", expiryDate: "2026-09-30", quantity: 72, daysLeft: 56, status: "notice" },
  { id: "7", product: "Al Fares Apple Juice 1L", productAr: "عصير تفاح الفارس 1 لتر", sku: "AF-JCE-002", store: "Panda - Tahlia", batch: "BATCH-2024-012", expiryDate: "2026-10-20", quantity: 96, daysLeft: 76, status: "safe" },
  { id: "8", product: "Al Fares Frozen Vegetables 450g", productAr: "خضار مجمدة الفارس 450 جرام", sku: "AF-FRZ-001", store: "LuLu Hypermarket", batch: "BATCH-2023-998", expiryDate: "2026-11-30", quantity: 120, daysLeft: 117, status: "safe" },
]

const statusConfig: Record<string, { label: string; classes: string; badgeClasses: string; bg: string }> = {
  critical: { label: "Critical (≤7 days)", classes: "text-red-700", badgeClasses: "bg-red-50 text-red-700 border-red-200", bg: "bg-red-50/40 border-red-200" },
  warning: { label: "Warning (≤30 days)", classes: "text-amber-700", badgeClasses: "bg-amber-50 text-amber-700 border-amber-200", bg: "bg-amber-50/40 border-amber-200" },
  notice: { label: "Notice (≤60 days)", classes: "text-blue-700", badgeClasses: "bg-blue-50 text-blue-700 border-blue-200", bg: "bg-white border-gray-200" },
  safe: { label: "Safe (>60 days)", classes: "text-emerald-700", badgeClasses: "bg-emerald-50 text-emerald-700 border-emerald-200", bg: "bg-white border-gray-200" },
}

const tabs = [
  { key: "all", label: "All", count: expiryRecords.length },
  { key: "critical", label: "Critical", count: expiryRecords.filter(r => r.status === "critical").length },
  { key: "warning", label: "Warning", count: expiryRecords.filter(r => r.status === "warning").length },
  { key: "notice", label: "Notice", count: expiryRecords.filter(r => r.status === "notice").length },
  { key: "safe", label: "Safe", count: expiryRecords.filter(r => r.status === "safe").length },
]

export default function ExpiryPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = expiryRecords.filter((r) => {
    const matchesSearch = r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.store.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === "all" || r.status === activeTab
    return matchesSearch && matchesTab
  })

  const criticalCount = expiryRecords.filter(r => r.status === "critical").length
  const warningCount = expiryRecords.filter(r => r.status === "warning").length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expiry Tracking</h1>
          <p className="text-sm text-gray-500">Monitor product expiry dates across all stores</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          Export Report
        </Button>
      </div>

      {/* Alert Banner */}
      {(criticalCount > 0 || warningCount > 0) && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">
            <strong>{criticalCount} critical</strong> products expire within 7 days.{" "}
            <strong>{warningCount} products</strong> expire within 30 days. Immediate action required.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Critical", count: expiryRecords.filter(r => r.status === "critical").length, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
          { label: "Warning", count: expiryRecords.filter(r => r.status === "warning").length, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
          { label: "Notice", count: expiryRecords.filter(r => r.status === "notice").length, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
          { label: "Safe", count: expiryRecords.filter(r => r.status === "safe").length, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
        ].map((card) => (
          <div key={card.label} className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
            <p className={`text-2xl font-bold ${card.color}`}>{card.count}</p>
            <p className="text-xs text-gray-600 mt-1">{card.label}</p>
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
              activeTab === tab.key
                ? "text-[#4CAF50] border-[#4CAF50]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.key ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search product, store, SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Store</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Batch</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((record) => {
              const config = statusConfig[record.status]
              return (
                <tr key={record.id} className={`transition-colors hover:bg-gray-50/50 ${record.status === "critical" ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <Package className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{record.product}</p>
                        <p className="text-xs text-gray-400 font-mono">{record.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {record.store}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs font-mono text-gray-400">{record.batch}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-900">{record.expiryDate}</p>
                      <p className={`text-xs font-medium ${config.classes}`}>{record.daysLeft} days left</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-sm text-gray-600">{record.quantity} units</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={config.badgeClasses}>
                      {record.status === "critical" ? "Critical" : record.status === "warning" ? "Warning" : record.status === "notice" ? "Notice" : "Safe"}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">Showing {filtered.length} of {expiryRecords.length} records</p>
    </div>
  )
}
