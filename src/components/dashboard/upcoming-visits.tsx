"use client"

import { MapPin, Clock, User } from "lucide-react"

const upcomingVisits = [
  {
    id: 1,
    store: "Panda - Al Olaya",
    merchandiser: "Mohammed Ali",
    time: "10:00 AM",
    status: "in_progress",
  },
  {
    id: 2,
    store: "Tamimi - King Fahd Rd",
    merchandiser: "Ahmed Khalid",
    time: "11:30 AM",
    status: "scheduled",
  },
  {
    id: 3,
    store: "Danube - Panorama Mall",
    merchandiser: "Khalid Saeed",
    time: "1:00 PM",
    status: "scheduled",
  },
  {
    id: 4,
    store: "Bin Dawood - Corniche",
    merchandiser: "Fahad Mohammed",
    time: "2:30 PM",
    status: "scheduled",
  },
  {
    id: 5,
    store: "LuLu - Dammam",
    merchandiser: "Omar Hassan",
    time: "3:00 PM",
    status: "scheduled",
  },
]

const statusStyles: Record<string, string> = {
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  scheduled: "bg-gray-50 text-gray-600 border-gray-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

const statusLabels: Record<string, string> = {
  in_progress: "In Progress",
  scheduled: "Scheduled",
  completed: "Completed",
}

export function UpcomingVisits() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Upcoming Visits</h3>
          <p className="text-xs text-gray-500">Today&apos;s schedule</p>
        </div>
        <button className="text-xs font-medium text-[#4CAF50] hover:underline">
          View calendar
        </button>
      </div>
      <div className="space-y-3">
        {upcomingVisits.map((visit) => (
          <div
            key={visit.id}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{visit.store}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="h-3 w-3" />
                  <span className="truncate">{visit.merchandiser}</span>
                  <Clock className="h-3 w-3 ml-1" />
                  <span>{visit.time}</span>
                </div>
              </div>
            </div>
            <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles[visit.status]}`}>
              {statusLabels[visit.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
