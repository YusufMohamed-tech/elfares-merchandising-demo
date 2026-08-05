"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Clock, CheckCircle2, XCircle, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

// Visits keyed by day-of-month for August 2026
const visitsByDay: Record<number, { id: string; store: string; time: string; status: string; merchandiser: string }[]> = {
  4: [
    { id: "v1", store: "Panda - Al Olaya", time: "09:00", status: "completed", merchandiser: "Mohammed Ali" },
    { id: "v2", store: "Tamimi - King Fahd", time: "11:00", status: "completed", merchandiser: "Ahmed Khalid" },
  ],
  5: [
    { id: "v3", store: "Danube - Panorama", time: "09:00", status: "completed", merchandiser: "Khalid Saeed" },
    { id: "v4", store: "LuLu Hypermarket", time: "11:00", status: "in_progress", merchandiser: "Ali Nasser" },
    { id: "v5", store: "Panda - Tahlia", time: "14:00", status: "scheduled", merchandiser: "Mohammed Ali" },
  ],
  6: [
    { id: "v6", store: "Carrefour - Dhahran", time: "10:00", status: "scheduled", merchandiser: "Saeed Al-Harbi" },
    { id: "v7", store: "Bin Dawood - Corniche", time: "13:00", status: "scheduled", merchandiser: "Fahad Mohammed" },
  ],
  7: [
    { id: "v8", store: "Tamimi - King Fahd", time: "09:00", status: "scheduled", merchandiser: "Ahmed Khalid" },
    { id: "v9", store: "Danube - Panorama", time: "11:00", status: "scheduled", merchandiser: "Khalid Saeed" },
    { id: "v10", store: "Panda - Al Olaya", time: "14:00", status: "scheduled", merchandiser: "Mohammed Ali" },
  ],
  10: [
    { id: "v11", store: "LuLu Hypermarket", time: "09:00", status: "scheduled", merchandiser: "Ali Nasser" },
    { id: "v12", store: "Carrefour - Dhahran", time: "12:00", status: "scheduled", merchandiser: "Saeed Al-Harbi" },
  ],
  11: [
    { id: "v13", store: "Panda - Al Olaya", time: "10:00", status: "scheduled", merchandiser: "Mohammed Ali" },
  ],
  12: [
    { id: "v14", store: "Tamimi - King Fahd", time: "09:00", status: "scheduled", merchandiser: "Ahmed Khalid" },
    { id: "v15", store: "Bin Dawood - Corniche", time: "11:00", status: "scheduled", merchandiser: "Fahad Mohammed" },
    { id: "v16", store: "Danube - Panorama", time: "14:00", status: "scheduled", merchandiser: "Khalid Saeed" },
  ],
  3: [
    { id: "v17", store: "Panda - Tahlia", time: "09:00", status: "missed", merchandiser: "Mohammed Ali" },
  ],
  2: [
    { id: "v18", store: "LuLu Hypermarket", time: "10:00", status: "completed", merchandiser: "Ali Nasser" },
    { id: "v19", store: "Carrefour - Dhahran", time: "13:00", status: "completed", merchandiser: "Saeed Al-Harbi" },
  ],
}

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  completed:  { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", label: "Done" },
  in_progress:{ color: "text-blue-700",    bg: "bg-blue-50 border-blue-200",       label: "Active" },
  scheduled:  { color: "text-gray-600",    bg: "bg-gray-50 border-gray-200",       label: "Scheduled" },
  missed:     { color: "text-red-700",     bg: "bg-red-50 border-red-200",         label: "Missed" },
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  // Fixed to August 2026 for demo
  const year = 2026
  const month = 7 // August (0-indexed)
  const today = 5

  const [selectedDay, setSelectedDay] = useState<number>(5)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  const selectedVisits = visitsByDay[selectedDay] ?? []

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500">Visit schedule overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Calendar grid */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5">
          {/* Month header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">{MONTHS[month]} {year}</h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />
              const visits = visitsByDay[day] ?? []
              const isToday = day === today
              const isSelected = day === selectedDay
              const hasVisits = visits.length > 0
              const hasMissed = visits.some(v => v.status === "missed")
              const hasActive = visits.some(v => v.status === "in_progress")
              const allDone = visits.length > 0 && visits.every(v => v.status === "completed")

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative flex flex-col items-center justify-start rounded-lg p-1.5 min-h-[52px] transition-colors text-left
                    ${isSelected ? "bg-[#4CAF50] text-white" : isToday ? "bg-green-50 border border-[#4CAF50]" : "hover:bg-gray-50"}
                  `}
                >
                  <span className={`text-xs font-semibold ${isSelected ? "text-white" : isToday ? "text-[#4CAF50]" : "text-gray-700"}`}>
                    {day}
                  </span>
                  {hasVisits && (
                    <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                      {visits.slice(0, 3).map((v, vi) => (
                        <div
                          key={vi}
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-white/80" :
                            v.status === "completed" ? "bg-emerald-500" :
                            v.status === "in_progress" ? "bg-blue-500" :
                            v.status === "missed" ? "bg-red-500" :
                            "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            {[
              { color: "bg-emerald-500", label: "Completed" },
              { color: "bg-blue-500", label: "In Progress" },
              { color: "bg-gray-300", label: "Scheduled" },
              { color: "bg-red-500", label: "Missed" },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${l.color}`} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Day detail */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-[#4CAF50]" />
            <h3 className="text-sm font-semibold text-gray-900">
              {MONTHS[month]} {selectedDay}, {year}
            </h3>
          </div>

          {selectedVisits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">No visits scheduled</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedVisits.map((visit) => {
                const style = statusStyles[visit.status]
                return (
                  <div key={visit.id} className={`rounded-lg border p-3 ${style.bg}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{visit.store}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{visit.merchandiser}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${style.color} flex-shrink-0`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-500">
                      <Clock className="h-3 w-3" />
                      {visit.time}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-lg font-bold text-gray-800">{selectedVisits.length}</p>
                <p className="text-[10px] text-gray-400">Total</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2">
                <p className="text-lg font-bold text-emerald-700">
                  {selectedVisits.filter(v => v.status === "completed").length}
                </p>
                <p className="text-[10px] text-emerald-600">Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
