"use client"

import { useState } from "react"
import { Search, Plus, MapPin, Clock, User, Calendar, Eye, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const visits = [
  { id: "1", store: "Panda - Al Olaya", storeAr: "بنده - العليا", merchandiser: "Mohammed Ali", date: "2026-08-05", timeStart: "09:00", timeEnd: "10:30", status: "completed", stepsCompleted: 6, totalSteps: 6, checkInTime: "09:02" },
  { id: "2", store: "Tamimi - King Fahd", storeAr: "التميمي - الملك فهد", merchandiser: "Ahmed Khalid", date: "2026-08-05", timeStart: "10:00", timeEnd: "11:30", status: "in_progress", stepsCompleted: 3, totalSteps: 6, checkInTime: "10:05" },
  { id: "3", store: "Danube - Panorama Mall", storeAr: "الدانوب - بانوراما", merchandiser: "Khalid Saeed", date: "2026-08-05", timeStart: "11:00", timeEnd: "12:30", status: "scheduled", stepsCompleted: 0, totalSteps: 6, checkInTime: null },
  { id: "4", store: "Panda - Tahlia", storeAr: "بنده - التحلية", merchandiser: "Fahad Mohammed", date: "2026-08-05", timeStart: "13:00", timeEnd: "14:30", status: "scheduled", stepsCompleted: 0, totalSteps: 6, checkInTime: null },
  { id: "5", store: "Bin Dawood - Corniche", storeAr: "بن داود - الكورنيش", merchandiser: "Omar Hassan", date: "2026-08-05", timeStart: "14:00", timeEnd: "15:30", status: "scheduled", stepsCompleted: 0, totalSteps: 6, checkInTime: null },
  { id: "6", store: "LuLu Hypermarket", storeAr: "لولو هايبرماركت", merchandiser: "Ali Nasser", date: "2026-08-05", timeStart: "09:00", timeEnd: "11:00", status: "completed", stepsCompleted: 6, totalSteps: 6, checkInTime: "09:10" },
  { id: "7", store: "Carrefour - Dhahran Mall", storeAr: "كارفور - الظهران", merchandiser: "Saeed Al-Harbi", date: "2026-08-04", timeStart: "10:00", timeEnd: "11:30", status: "missed", stepsCompleted: 0, totalSteps: 6, checkInTime: null },
  { id: "8", store: "Tamimi - Exit 5", storeAr: "التميمي - مخرج 5", merchandiser: "Yousef Khan", date: "2026-08-04", timeStart: "14:00", timeEnd: "15:30", status: "completed", stepsCompleted: 6, totalSteps: 6, checkInTime: "14:03" },
]

const tabs = [
  { key: "all", label: "All", count: visits.length },
  { key: "scheduled", label: "Scheduled", count: visits.filter(v => v.status === "scheduled").length },
  { key: "in_progress", label: "In Progress", count: visits.filter(v => v.status === "in_progress").length },
  { key: "completed", label: "Completed", count: visits.filter(v => v.status === "completed").length },
  { key: "missed", label: "Missed", count: visits.filter(v => v.status === "missed").length },
]

const statusConfig: Record<string, { label: string; classes: string }> = {
  scheduled: { label: "Scheduled", classes: "bg-gray-50 text-gray-700 border-gray-200" },
  in_progress: { label: "In Progress", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  completed: { label: "Completed", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  missed: { label: "Missed", classes: "bg-red-50 text-red-700 border-red-200" },
  delayed: { label: "Delayed", classes: "bg-amber-50 text-amber-700 border-amber-200" },
}

export function VisitsList() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = visits.filter((v) => {
    const matchesSearch = v.store.toLowerCase().includes(search.toLowerCase()) || v.merchandiser.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === "all" || v.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visits</h1>
          <p className="text-sm text-gray-500">Manage and track field visits</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          Create Visit
        </Button>
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
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by store or merchandiser..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Visit Cards */}
      <div className="space-y-3">
        {filtered.map((visit) => (
          <div
            key={visit.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{visit.store}</p>
                  <Badge variant="outline" className={statusConfig[visit.status].classes}>
                    {statusConfig[visit.status].label}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {visit.merchandiser}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {visit.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {visit.timeStart} - {visit.timeEnd}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Steps progress */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#4CAF50] transition-all"
                    style={{ width: `${(visit.stepsCompleted / visit.totalSteps) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {visit.stepsCompleted}/{visit.totalSteps}
                </span>
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500">Showing {filtered.length} visits</p>
    </div>
  )
}
