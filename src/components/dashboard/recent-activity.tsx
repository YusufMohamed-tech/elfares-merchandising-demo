"use client"

import { CheckCircle2, Camera, AlertTriangle, RotateCcw, MapPin, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Visit completed",
    description: "Mohammed A. completed visit at Panda - Al Olaya",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: Camera,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    title: "Photos uploaded",
    description: "12 shelf photos uploaded for Tamimi - King Fahd",
    time: "12 min ago",
  },
  {
    id: 3,
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    title: "Expiry alert",
    description: "3 products expiring within 7 days at Danube - Panorama",
    time: "25 min ago",
  },
  {
    id: 4,
    icon: RotateCcw,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    title: "Return submitted",
    description: "Ahmed K. submitted return request (8 items) from LuLu Dammam",
    time: "1 hour ago",
  },
  {
    id: 5,
    icon: MapPin,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    title: "Check-in",
    description: "Khalid S. checked in at Carrefour - Dhahran Mall",
    time: "1 hour ago",
  },
  {
    id: 6,
    icon: Clock,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    title: "Visit delayed",
    description: "Visit to Bin Dawood - Corniche delayed by Fahad M.",
    time: "2 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-xs text-gray-500">Latest field updates</p>
        </div>
        <button className="text-xs font-medium text-[#4CAF50] hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}>
                <Icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500 truncate">{activity.description}</p>
              </div>
              <span className="flex-shrink-0 text-xs text-gray-400">{activity.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
