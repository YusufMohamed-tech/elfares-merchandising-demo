"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Clock, RotateCcw, AlertTriangle, User, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pendingApprovals = [
  { id: "R-2026-040", type: "return", title: "Return Request — Tamimi King Fahd", submittedBy: "Ahmed Khalid", date: "2026-08-05", details: "4 damaged Orange Juice 1L units", urgency: "normal" },
  { id: "ISS-041", type: "issue", title: "Critical: Out of Stock — Panda Al Olaya", submittedBy: "Mohammed Ali", date: "2026-08-05", details: "Dairy section completely empty for 3 days", urgency: "critical" },
  { id: "ISS-037", type: "issue", title: "Escalated: Freezer Temperature — Carrefour Dhahran", submittedBy: "Saeed Al-Harbi", date: "2026-08-02", details: "Frozen products at risk of spoilage", urgency: "critical" },
]

const recentApprovals = [
  { id: "R-2026-039", type: "return", title: "Return Request — LuLu Hypermarket", decision: "approved", decidedBy: "Yousef Khan", date: "2026-08-04" },
  { id: "ISS-038", type: "issue", title: "Competitor SKU — LuLu Hypermarket", decision: "resolved", decidedBy: "Yousef Khan", date: "2026-08-04" },
  { id: "R-2026-037", type: "return", title: "Return Request — Bin Dawood Corniche", decision: "rejected", decidedBy: "Yousef Khan", date: "2026-08-01" },
  { id: "ISS-036", type: "issue", title: "Missing Price Tags — Bin Dawood Corniche", decision: "resolved", decidedBy: "Yousef Khan", date: "2026-08-01" },
]

export default function ApprovalsPage() {
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({})

  const handleDecision = (id: string, decision: "approved" | "rejected") => {
    setDecided((prev) => ({ ...prev, [id]: decision }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-sm text-gray-500">Review and approve pending requests</p>
      </div>

      {/* Pending */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-base font-semibold text-gray-800">Pending Review</h2>
          <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
            {pendingApprovals.filter(p => !decided[p.id]).length}
          </span>
        </div>
        <div className="space-y-3">
          {pendingApprovals.map((item) => {
            const decision = decided[item.id]
            const TypeIcon = item.type === "return" ? RotateCcw : AlertTriangle
            return (
              <div
                key={item.id}
                className={`rounded-xl border p-4 transition-all ${
                  decision === "approved" ? "border-emerald-200 bg-emerald-50/30 opacity-60" :
                  decision === "rejected" ? "border-red-200 bg-red-50/30 opacity-60" :
                  item.urgency === "critical" ? "border-red-200 bg-red-50/20" :
                  "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${
                      item.type === "return" ? "bg-purple-50" : "bg-orange-50"
                    }`}>
                      <TypeIcon className={`h-4 w-4 ${item.type === "return" ? "text-purple-600" : "text-orange-600"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        {item.urgency === "critical" && (
                          <span className="text-[10px] font-medium text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">Urgent</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.details}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{item.submittedBy}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{item.date}</span>
                        <span className="font-mono text-gray-300">{item.id}</span>
                      </div>
                    </div>
                  </div>

                  {!decision ? (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleDecision(item.id, "approved")}
                        className="bg-[#4CAF50] hover:bg-[#388E3C] text-white h-8 px-3 gap-1 text-xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDecision(item.id, "rejected")}
                        className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 gap-1 text-xs"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="outline" className={decision === "approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}>
                      {decision === "approved" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {decision === "approved" ? "Approved" : "Rejected"}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Decisions */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Recent Decisions</h2>
        <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
          {recentApprovals.map((item) => {
            const TypeIcon = item.type === "return" ? RotateCcw : AlertTriangle
            return (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <TypeIcon className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.decidedBy} · {item.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className={
                  item.decision === "approved" || item.decision === "resolved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                    : "bg-red-50 text-red-700 border-red-200 text-[10px]"
                }>
                  {item.decision}
                </Badge>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
