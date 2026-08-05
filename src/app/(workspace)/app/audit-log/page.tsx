"use client"

import { useState } from "react"
import { FileText, Search, Filter, User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const auditLogs = [
  { id: 1, action: "return.approved", actor: "Yousef Khan", target: "Return R-2026-039", detail: "Approved return request of 24 units from LuLu Hypermarket", timestamp: "2026-08-05 14:23", category: "returns" },
  { id: 2, action: "issue.created", actor: "Mohammed Ali", target: "Issue ISS-041", detail: "Reported out-of-stock issue at Panda Al Olaya dairy section", timestamp: "2026-08-05 11:05", category: "issues" },
  { id: 3, action: "visit.completed", actor: "Ahmed Khalid", target: "Visit #V-1041", detail: "Completed visit at Tamimi King Fahd — 6/6 steps done", timestamp: "2026-08-05 10:47", category: "visits" },
  { id: 4, action: "return.submitted", actor: "Ahmed Khalid", target: "Return R-2026-040", detail: "Submitted return of 4 damaged Orange Juice 1L units", timestamp: "2026-08-05 09:15", category: "returns" },
  { id: 5, action: "user.login", actor: "Mohammed Ali", target: "System", detail: "User logged in from Riyadh (mobile)", timestamp: "2026-08-05 08:30", category: "auth" },
  { id: 6, action: "expiry.flagged", actor: "System", target: "Batch BATCH-2024-089", detail: "Auto-flagged Al Fares Yogurt 500g as critical — 2 days to expiry", timestamp: "2026-08-05 06:00", category: "expiry" },
  { id: 7, action: "return.rejected", actor: "Yousef Khan", target: "Return R-2026-037", detail: "Rejected return — insufficient damage evidence", timestamp: "2026-08-01 16:10", category: "returns" },
  { id: 8, action: "visit.missed", actor: "System", target: "Visit #V-1035", detail: "Visit at Bin Dawood Corniche marked missed — no check-in by deadline", timestamp: "2026-07-31 18:00", category: "visits" },
  { id: 9, action: "campaign.created", actor: "Yousef Khan", target: "Campaign C-003", detail: "Created Dairy Shelf Refresh campaign for 7 stores", timestamp: "2026-07-30 11:20", category: "campaigns" },
  { id: 10, action: "user.invited", actor: "Yousef Khan", target: "Omar Rashid", detail: "Invited new merchandiser to Riyadh region", timestamp: "2026-07-25 09:05", category: "auth" },
]

const categoryColors: Record<string, string> = {
  returns: "bg-purple-50 text-purple-700 border-purple-200",
  issues: "bg-orange-50 text-orange-700 border-orange-200",
  visits: "bg-blue-50 text-blue-700 border-blue-200",
  auth: "bg-gray-50 text-gray-600 border-gray-200",
  expiry: "bg-amber-50 text-amber-700 border-amber-200",
  campaigns: "bg-[#F9A825]/10 text-amber-800 border-amber-200",
}

const actionVerb = (action: string) => {
  const parts = action.split(".")
  return parts[1]?.replace("_", " ") || action
}

export default function AuditLogPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = ["all", "visits", "returns", "issues", "expiry", "campaigns", "auth"]

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.detail.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500">Track all system actions and changes</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                categoryFilter === cat ? "bg-[#4CAF50] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Log Feed */}
      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        {filtered.map((log) => (
          <div key={log.id} className="flex items-start gap-4 px-4 py-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex-shrink-0 w-32 text-right hidden sm:block">
              <p className="text-xs text-gray-400">{log.timestamp.split(" ")[0]}</p>
              <p className="text-xs font-medium text-gray-500">{log.timestamp.split(" ")[1]}</p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-gray-700 font-semibold">{log.action}</span>
                <Badge variant="outline" className={categoryColors[log.category] + " text-[10px]"}>
                  {log.category}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">{log.detail}</p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><User className="h-2.5 w-2.5" />{log.actor}</span>
                <span className="flex items-center gap-1 sm:hidden"><Calendar className="h-2.5 w-2.5" />{log.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">Showing {filtered.length} of {auditLogs.length} entries</p>
    </div>
  )
}
