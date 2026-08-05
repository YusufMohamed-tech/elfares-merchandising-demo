"use client"

import { useState } from "react"
import { Bell, AlertTriangle, CheckCircle2, Clock, Package, RotateCcw, Megaphone, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const allNotifications = [
  { id: "1", type: "expiry",     title: "Critical Expiry Alert",           body: "Al Fares Yogurt 500g at Panda Al Olaya expires in 2 days (BATCH-2024-089). Immediate action required.",       time: "30 min ago",  read: false, date: "Today" },
  { id: "2", type: "expiry",     title: "Expiry Warning",                  body: "Al Fares Full Cream Milk 1L at Tamimi King Fahd expires in 5 days.",                                            time: "1 hour ago",  read: false, date: "Today" },
  { id: "3", type: "return",     title: "Return Submitted",                body: "Ahmed Khalid submitted a return request (R-2026-040) for 4 damaged Orange Juice units at Tamimi King Fahd.",    time: "2 hours ago", read: false, date: "Today" },
  { id: "4", type: "issue",      title: "Issue Escalated",                 body: "Freezer temperature issue at Carrefour Dhahran has been escalated to critical priority.",                       time: "3 hours ago", read: false, date: "Today" },
  { id: "5", type: "visit",      title: "Visit Completed",                 body: "Mohammed Ali completed visit at Danube Panorama Mall — 6/6 steps done, compliance 95%.",                       time: "4 hours ago", read: true,  date: "Today" },
  { id: "6", type: "approval",   title: "Return Approved",                 body: "Return request R-2026-039 (LuLu Hypermarket, 24 units) has been approved and is awaiting pickup.",              time: "Yesterday",   read: true,  date: "Yesterday" },
  { id: "7", type: "visit",      title: "Missed Visit",                    body: "Scheduled visit to Bin Dawood Corniche was not completed. Reason not provided.",                               time: "Yesterday",   read: true,  date: "Yesterday" },
  { id: "8", type: "campaign",   title: "Campaign Starting Soon",          body: "Dairy Shelf Refresh campaign starts in 10 days (Aug 15). Ensure all 7 stores are notified.",                   time: "2 days ago",  read: true,  date: "Earlier" },
  { id: "9", type: "issue",      title: "Issue Resolved",                  body: "Competitor SKU issue at LuLu Hypermarket (ISS-038) has been marked as resolved by Yousef Khan.",               time: "2 days ago",  read: true,  date: "Earlier" },
  { id: "10", type: "approval",  title: "Return Rejected",                 body: "Return request R-2026-037 from Bin Dawood Corniche was rejected — insufficient damage evidence provided.",     time: "5 days ago",  read: true,  date: "Earlier" },
]

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  expiry:   { icon: AlertTriangle, color: "text-amber-600",  bg: "bg-amber-50" },
  return:   { icon: RotateCcw,     color: "text-purple-600", bg: "bg-purple-50" },
  issue:    { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  visit:    { icon: CheckCircle2,  color: "text-emerald-600",bg: "bg-emerald-50" },
  approval: { icon: CheckCircle2,  color: "text-blue-600",   bg: "bg-blue-50" },
  campaign: { icon: Megaphone,     color: "text-[#F9A825]",  bg: "bg-yellow-50" },
  info:     { icon: Info,          color: "text-gray-500",   bg: "bg-gray-100" },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [filter, setFilter] = useState("all")

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id))

  const filtered = notifications.filter(n => {
    if (filter === "unread") return !n.read
    if (filter === "expiry") return n.type === "expiry"
    if (filter === "visits") return n.type === "visit"
    if (filter === "returns") return n.type === "return" || n.type === "approval"
    if (filter === "issues") return n.type === "issue"
    return true
  })

  const grouped = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = []
    acc[n.date].push(n)
    return acc
  }, {} as Record<string, typeof allNotifications>)

  const filters = [
    { key: "all",     label: "All" },
    { key: "unread",  label: "Unread" },
    { key: "expiry",  label: "Expiry" },
    { key: "visits",  label: "Visits" },
    { key: "returns", label: "Returns" },
    { key: "issues",  label: "Issues" },
  ]

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" onClick={markAllRead} className="text-sm text-[#4CAF50] hover:text-[#388E3C]">
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              filter === f.key ? "bg-[#4CAF50] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
            {f.key === "unread" && unreadCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-[9px] px-1 rounded-full">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Grouped notifications */}
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{date}</h3>
          <div className="space-y-2">
            {items.map((notif) => {
              const config = typeConfig[notif.type] ?? typeConfig.info
              const Icon = config.icon
              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`relative rounded-xl border p-4 cursor-pointer transition-colors group ${
                    !notif.read ? "border-blue-100 bg-blue-50/30 hover:bg-blue-50/50" : "border-gray-200 bg-white hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                          <button
                            onClick={(e) => { e.stopPropagation(); dismiss(notif.id) }}
                            className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-gray-300 hover:text-gray-500 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.body}</p>
                      <p className="text-[10px] text-gray-400 mt-2">{notif.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Bell className="h-6 w-6 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">No notifications</p>
          <p className="text-xs text-gray-400 mt-1">You're all caught up</p>
        </div>
      )}
    </div>
  )
}
