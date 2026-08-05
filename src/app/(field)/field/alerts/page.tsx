"use client"

import { AlertTriangle, Clock, CheckCircle2, Bell, Info } from "lucide-react"

const alerts = [
  { id: 1, type: "expiry", title: "Expiry Alert", message: "3 products expiring within 7 days at Panda - Al Olaya", time: "30 min ago", read: false },
  { id: 2, type: "assignment", title: "New Visit Assigned", message: "You have been assigned a visit to Danube - Panorama Mall tomorrow at 11:00 AM", time: "1 hour ago", read: false },
  { id: 3, type: "approval", title: "Return Approved", message: "Your return request #R-2024-041 has been approved by supervisor", time: "2 hours ago", read: true },
  { id: 4, type: "reminder", title: "Visit Reminder", message: "You have a visit scheduled at Tamimi - King Fahd in 30 minutes", time: "3 hours ago", read: true },
  { id: 5, type: "info", title: "Campaign Update", message: "New summer campaign checklist added to your visit template", time: "Yesterday", read: true },
  { id: 6, type: "expiry", title: "Critical Expiry", message: "Al Fares Yogurt 500g batch EXP-2026-08-07 expires in 2 days at LuLu Dammam", time: "Yesterday", read: true },
]

const typeConfig: Record<string, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  expiry: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  assignment: { icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  approval: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  reminder: { icon: Bell, color: "text-purple-600", bg: "bg-purple-50" },
  info: { icon: Info, color: "text-gray-600", bg: "bg-gray-100" },
}

export default function FieldAlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Alerts</h1>
        {unreadCount > 0 && (
          <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type]
          const Icon = config.icon
          return (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 ${
                !alert.read ? "border-blue-100 bg-blue-50/30" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                    {!alert.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{alert.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
