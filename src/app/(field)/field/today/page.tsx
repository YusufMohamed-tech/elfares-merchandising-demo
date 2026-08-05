"use client"

import { MapPin, Clock, Navigation, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

const todayVisits = [
  { id: "1", store: "Panda - Al Olaya", storeAr: "بنده - العليا", address: "Al Olaya St, Riyadh", time: "09:00 - 10:30", status: "completed", steps: "6/6", distance: "2.3 km" },
  { id: "2", store: "Tamimi - King Fahd", storeAr: "التميمي - الملك فهد", address: "King Fahd Rd, Riyadh", time: "10:00 - 11:30", status: "in_progress", steps: "3/6", distance: "4.1 km" },
  { id: "3", store: "Danube - Panorama Mall", storeAr: "الدانوب - بانوراما مول", address: "Panorama Mall, Riyadh", time: "11:00 - 12:30", status: "upcoming", steps: "0/6", distance: "7.2 km" },
  { id: "4", store: "Panda - Exit 15", storeAr: "بنده - مخرج 15", address: "Exit 15, Northern Ring Rd", time: "13:00 - 14:30", status: "upcoming", steps: "0/6", distance: "12.5 km" },
  { id: "5", store: "Tamimi - Takhassusi", storeAr: "التميمي - التخصصي", address: "Takhassusi St, Riyadh", time: "15:00 - 16:30", status: "upcoming", steps: "0/6", distance: "9.8 km" },
]

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  completed: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", label: "Completed" },
  in_progress: { icon: Clock, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", label: "In Progress" },
  upcoming: { icon: MapPin, color: "text-gray-500", bg: "bg-gray-50 border-gray-200", label: "Upcoming" },
}

export default function FieldTodayPage() {
  const completed = todayVisits.filter(v => v.status === "completed").length
  const total = todayVisits.length

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Good morning, Mohammed</h1>
        <p className="text-sm text-gray-500 mt-0.5">You have {total - completed} visits remaining today</p>
      </div>

      {/* Progress Card */}
      <div className="rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#388E3C] p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Today&apos;s Progress</p>
            <p className="text-3xl font-bold mt-1">{completed}/{total}</p>
            <p className="text-xs text-white/60 mt-1">visits completed</p>
          </div>
          <div className="relative h-16 w-16">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray={`${(completed / total) * 100}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {Math.round((completed / total) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Visit List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Today&apos;s Schedule</h2>
        {todayVisits.map((visit) => {
          const config = statusConfig[visit.status]
          const StatusIcon = config.icon
          return (
            <Link
              key={visit.id}
              href={`/field/visits/${visit.id}`}
              className={`block rounded-xl border p-4 transition-all active:scale-[0.98] ${
                visit.status === "in_progress" ? "border-blue-200 bg-blue-50/30 shadow-sm" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bg} border`}>
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{visit.store}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{visit.address}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {visit.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {visit.distance}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 mt-1" />
              </div>
              {visit.status === "in_progress" && (
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-600 font-medium">Steps: {visit.steps}</span>
                    <span className="text-blue-500 font-medium">Continue →</span>
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
