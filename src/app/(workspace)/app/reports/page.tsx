"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"

const visitTrendData = [
  { month: "Mar", completed: 112, missed: 8 },
  { month: "Apr", completed: 128, missed: 6 },
  { month: "May", completed: 135, missed: 10 },
  { month: "Jun", completed: 142, missed: 7 },
  { month: "Jul", completed: 158, missed: 5 },
  { month: "Aug", completed: 89, missed: 3 },
]

const complianceData = [
  { region: "Riyadh", score: 91 },
  { region: "Jeddah", score: 87 },
  { region: "Dammam", score: 94 },
  { region: "Makkah", score: 83 },
  { region: "Madinah", score: 88 },
]

const expiryDistribution = [
  { name: "Safe", value: 58, color: "#10B981" },
  { name: "Notice", value: 22, color: "#3B82F6" },
  { name: "Warning", value: 14, color: "#F59E0B" },
  { name: "Critical", value: 6, color: "#EF4444" },
]

const returnsByReason = [
  { reason: "Expired", count: 18 },
  { reason: "Damaged", count: 12 },
  { reason: "Overstock", count: 9 },
  { reason: "Wrong Item", count: 4 },
  { reason: "Other", count: 3 },
]

const kpis = [
  { label: "Avg Visit Compliance", value: "91%", change: "+3%", up: true },
  { label: "Total Visits (Aug)", value: "89", change: "+12%", up: true },
  { label: "Open Issues", value: "4", change: "-2", up: true },
  { label: "Pending Returns", value: "2", change: "-5", up: true },
]

const periods = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months"]

export default function ReportsPage() {
  const [period, setPeriod] = useState("Last 6 Months")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Performance overview across all operations</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  period === p ? "bg-[#4CAF50] text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2 text-sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {kpi.change} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Visit Trend */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Visit Trend</h3>
          <p className="text-xs text-gray-500 mb-4">Completed vs missed visits per month</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitTrendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMissed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="completed" stroke="#4CAF50" strokeWidth={2} fill="url(#gradCompleted)" name="Completed" />
                <Area type="monotone" dataKey="missed" stroke="#EF4444" strokeWidth={2} fill="url(#gradMissed)" name="Missed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance by Region */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Compliance by Region</h3>
          <p className="text-xs text-gray-500 mb-4">Average merchandising score</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} formatter={(value) => [`${value}%`, "Compliance"]} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={36}>
                  {complianceData.map((entry, i) => (
                    <Cell key={i} fill={entry.score >= 90 ? "#4CAF50" : entry.score >= 85 ? "#F9A825" : "#EF4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Expiry Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Expiry Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Product expiry status breakdown</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expiryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {expiryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} formatter={(value) => [`${value} products`, ""]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Returns by Reason */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Returns by Reason</h3>
          <p className="text-xs text-gray-500 mb-4">Return request breakdown this period</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={returnsByReason} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="reason" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={72} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="count" fill="#4CAF50" radius={[0, 4, 4, 0]} barSize={18} name="Returns" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
