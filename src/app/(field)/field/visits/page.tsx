"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, CheckCircle2, Clock, XCircle, Calendar, ChevronRight } from "lucide-react"

const allVisits = [
  { id: "1", store: "Panda - Al Olaya", date: "Today", time: "09:00", status: "completed" },
  { id: "2", store: "Tamimi - King Fahd", date: "Today", time: "10:00", status: "in_progress" },
  { id: "3", store: "Danube - Panorama Mall", date: "Today", time: "11:00", status: "upcoming" },
  { id: "4", store: "Panda - Exit 15", date: "Today", time: "13:00", status: "upcoming" },
  { id: "5", store: "Tamimi - Takhassusi", date: "Today", time: "15:00", status: "upcoming" },
  { id: "6", store: "LuLu Hypermarket", date: "Yesterday", time: "09:00", status: "completed" },
  { id: "7", store: "Carrefour - Dhahran", date: "Yesterday", time: "11:00", status: "completed" },
  { id: "8", store: "Bin Dawood - Corniche", date: "Yesterday", time: "14:00", status: "missed" },
  { id: "9", store: "Panda - Al Olaya", date: "Tomorrow", time: "09:00", status: "scheduled" },
  { id: "10", store: "Danube - Panorama", date: "Tomorrow", time: "11:00", status: "scheduled" },
]

const statusStyles: Record<string, { icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  completed: { icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  in_progress: { icon: Clock, color: "text-blue-600", bgColor: "bg-blue-50" },
  upcoming: { icon: MapPin, color: "text-gray-500", bgColor: "bg-gray-50" },
  scheduled: { icon: Calendar, color: "text-indigo-500", bgColor: "bg-indigo-50" },
  missed: { icon: XCircle, color: "text-red-500", bgColor: "bg-red-50" },
}

export default function FieldVisitsPage() {
  const [filter, setFilter] = useState("all")

  const filters = ["all", "today", "upcoming", "past"]
  const filtered = allVisits.filter((v) => {
    if (filter === "all") return true
    if (filter === "today") return v.date === "Today"
    if (filter === "upcoming") return v.date === "Tomorrow" || v.status === "scheduled"
    if (filter === "past") return v.date === "Yesterday"
    return true
  })

  const grouped = filtered.reduce((acc, visit) => {
    if (!acc[visit.date]) acc[visit.date] = []
    acc[visit.date].push(visit)
    return acc
  }, {} as Record<string, typeof allVisits>)

  return (
    <div className="px-4 py-5 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">My Visits</h1>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
              filter === f ? "bg-[#4CAF50] text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([date, visits]) => (
        <div key={date}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{date}</h3>
          <div className="space-y-2">
            {visits.map((visit) => {
              const config = statusStyles[visit.status]
              const Icon = config.icon
              return (
                <Link
                  key={visit.id}
                  href={`/field/visits/${visit.id}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 active:scale-[0.98] transition-transform"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bgColor}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{visit.store}</p>
                    <p className="text-xs text-gray-400">{visit.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
