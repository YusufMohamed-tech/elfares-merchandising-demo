"use client"

import { Users, MapPin, Phone, Mail, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const team = [
  { id: "1", name: "Mohammed Ali", nameAr: "محمد علي", role: "Merchandiser", region: "Riyadh", phone: "+966 55 xxx xxxx", email: "m.ali@alfares.sa", status: "active", todayVisits: 3, completedToday: 2 },
  { id: "2", name: "Ahmed Khalid", nameAr: "أحمد خالد", role: "Merchandiser", region: "Riyadh", phone: "+966 55 xxx xxxx", email: "a.khalid@alfares.sa", status: "active", todayVisits: 2, completedToday: 1 },
  { id: "3", name: "Khalid Saeed", nameAr: "خالد سعيد", role: "Merchandiser", region: "Riyadh", phone: "+966 55 xxx xxxx", email: "k.saeed@alfares.sa", status: "active", todayVisits: 3, completedToday: 0 },
  { id: "4", name: "Fahad Mohammed", nameAr: "فهد محمد", role: "Merchandiser", region: "Jeddah", phone: "+966 55 xxx xxxx", email: "f.mohammed@alfares.sa", status: "active", todayVisits: 2, completedToday: 2 },
  { id: "5", name: "Omar Hassan", nameAr: "عمر حسن", role: "Merchandiser", region: "Jeddah", phone: "+966 55 xxx xxxx", email: "o.hassan@alfares.sa", status: "inactive", todayVisits: 0, completedToday: 0 },
  { id: "6", name: "Ali Nasser", nameAr: "علي ناصر", role: "Merchandiser", region: "Dammam", phone: "+966 55 xxx xxxx", email: "a.nasser@alfares.sa", status: "active", todayVisits: 2, completedToday: 1 },
  { id: "7", name: "Saeed Al-Harbi", nameAr: "سعيد الحربي", role: "Merchandiser", region: "Dammam", phone: "+966 55 xxx xxxx", email: "s.harbi@alfares.sa", status: "active", todayVisits: 2, completedToday: 2 },
  { id: "8", name: "Yousef Khan", nameAr: "يوسف خان", role: "Supervisor", region: "All", phone: "+966 55 xxx xxxx", email: "y.khan@alfares.sa", status: "active", todayVisits: 0, completedToday: 0 },
]

export default function TeamsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-sm text-gray-500">{team.length} team members</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member) => (
          <div key={member.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4CAF50] text-white text-sm font-semibold">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.nameAr}</p>
                </div>
              </div>
              <Badge variant="outline" className={member.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}>
                {member.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span>{member.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>{member.region}</span>
              </div>
            </div>

            {member.status === "active" && member.todayVisits > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  {member.todayVisits} visits today
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  {member.completedToday} done
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
