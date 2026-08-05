"use client"

import { StatCard } from "./stat-card"
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
} from "lucide-react"

export function StatsGrid() {
  const stats = [
    {
      title: "Scheduled Visits",
      value: 48,
      change: "+12% from last week",
      changeType: "positive" as const,
      icon: CalendarCheck,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Completed Today",
      value: 23,
      change: "78% completion rate",
      changeType: "positive" as const,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "In Progress",
      value: 5,
      change: "3 merchandisers active",
      changeType: "neutral" as const,
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
    {
      title: "Missed Visits",
      value: 2,
      change: "-4% from last week",
      changeType: "positive" as const,
      icon: XCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
    },
    {
      title: "Active Merchandisers",
      value: 12,
      change: "All regions covered",
      changeType: "neutral" as const,
      icon: Users,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
    },
    {
      title: "Expiry Alerts",
      value: 7,
      change: "3 critical (< 7 days)",
      changeType: "negative" as const,
      icon: AlertTriangle,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
    {
      title: "Pending Returns",
      value: 4,
      change: "2 awaiting approval",
      changeType: "neutral" as const,
      icon: RotateCcw,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },
    {
      title: "Open Issues",
      value: 6,
      change: "1 critical priority",
      changeType: "negative" as const,
      icon: ShieldAlert,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
