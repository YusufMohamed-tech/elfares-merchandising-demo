"use client"

import { useState } from "react"
import { Megaphone, Plus, Calendar, Store, Users, Target, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const campaigns = [
  {
    id: "C-001",
    name: "Ramadan Fresh Display",
    nameAr: "عرض رمضان الطازج",
    status: "active",
    startDate: "2026-07-15",
    endDate: "2026-08-15",
    stores: 7,
    compliance: 88,
    description: "Premium placement and special display stands for Ramadan season",
    category: "seasonal",
  },
  {
    id: "C-002",
    name: "Back to School Snacks",
    nameAr: "وجبات خفيفة العودة للمدرسة",
    status: "active",
    startDate: "2026-08-01",
    endDate: "2026-09-01",
    stores: 5,
    compliance: 72,
    description: "Dedicated snack display near school supply sections",
    category: "seasonal",
  },
  {
    id: "C-003",
    name: "Dairy Shelf Refresh",
    nameAr: "تجديد رف الألبان",
    status: "scheduled",
    startDate: "2026-08-15",
    endDate: "2026-09-15",
    stores: 7,
    compliance: 0,
    description: "Full planogram update for all dairy sections",
    category: "planogram",
  },
  {
    id: "C-004",
    name: "New SKU Launch — Juice",
    nameAr: "إطلاق منتج جديد — عصائر",
    status: "scheduled",
    startDate: "2026-08-20",
    endDate: "2026-09-20",
    stores: 4,
    compliance: 0,
    description: "Introduction of 3 new juice flavours with POS materials",
    category: "new_product",
  },
  {
    id: "C-005",
    name: "Summer Frozen Drive",
    nameAr: "حملة المجمدات الصيفية",
    status: "completed",
    startDate: "2026-06-01",
    endDate: "2026-07-31",
    stores: 6,
    compliance: 94,
    description: "Expanded frozen section and promotional pricing for summer",
    category: "seasonal",
  },
]

const statusConfig: Record<string, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  scheduled: { label: "Scheduled", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  completed: { label: "Completed", classes: "bg-gray-50 text-gray-600 border-gray-200" },
  paused: { label: "Paused", classes: "bg-amber-50 text-amber-700 border-amber-200" },
}

const categoryLabels: Record<string, string> = {
  seasonal: "Seasonal",
  planogram: "Planogram",
  new_product: "New Product",
  promotion: "Promotion",
}

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { key: "all", label: "All", count: campaigns.length },
    { key: "active", label: "Active", count: campaigns.filter(c => c.status === "active").length },
    { key: "scheduled", label: "Scheduled", count: campaigns.filter(c => c.status === "scheduled").length },
    { key: "completed", label: "Completed", count: campaigns.filter(c => c.status === "completed").length },
  ]

  const filtered = activeTab === "all" ? campaigns : campaigns.filter(c => c.status === activeTab)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-sm text-gray-500">Manage merchandising campaigns and promotions</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-2xl font-bold text-emerald-700">{campaigns.filter(c => c.status === "active").length}</p>
          <p className="text-xs text-emerald-600 mt-1">Active Campaigns</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-2xl font-bold text-blue-700">{campaigns.filter(c => c.status === "scheduled").length}</p>
          <p className="text-xs text-blue-600 mt-1">Upcoming</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-2xl font-bold text-gray-700">
            {Math.round(campaigns.filter(c => c.status === "active").reduce((sum, c) => sum + c.compliance, 0) / campaigns.filter(c => c.status === "active").length)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Avg Compliance</p>
        </div>
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
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="space-y-3">
        {filtered.map((campaign) => {
          const config = statusConfig[campaign.status]
          return (
            <div key={campaign.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F9A825]/10 flex-shrink-0">
                    <Megaphone className="h-5 w-5 text-[#F9A825]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{campaign.name}</span>
                      <Badge variant="outline" className={config.classes + " text-[10px]"}>{config.label}</Badge>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{categoryLabels[campaign.category]}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{campaign.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{campaign.startDate} → {campaign.endDate}</span>
                      <span className="flex items-center gap-1"><Store className="h-3 w-3" />{campaign.stores} stores</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {campaign.status !== "scheduled" && (
                    <div className="text-right">
                      <p className={`text-lg font-bold ${campaign.compliance >= 85 ? "text-emerald-600" : campaign.compliance >= 70 ? "text-amber-500" : "text-red-500"}`}>
                        {campaign.compliance}%
                      </p>
                      <p className="text-[10px] text-gray-400">Compliance</p>
                    </div>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              {campaign.status !== "scheduled" && campaign.compliance > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${campaign.compliance >= 85 ? "bg-emerald-500" : campaign.compliance >= 70 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${campaign.compliance}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
