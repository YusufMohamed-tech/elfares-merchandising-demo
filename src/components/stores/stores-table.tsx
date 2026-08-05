"use client"

import { useState } from "react"
import { MapPin, Phone, Search, Plus, Filter, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stores = [
  { id: "1", name: "Panda - Al Olaya", nameAr: "بنده - العليا", chain: "Panda", city: "Riyadh", region: "Riyadh", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "Today", compliance: 92 },
  { id: "2", name: "Tamimi - King Fahd", nameAr: "التميمي - الملك فهد", chain: "Tamimi", city: "Riyadh", region: "Riyadh", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "Yesterday", compliance: 88 },
  { id: "3", name: "Danube - Panorama Mall", nameAr: "الدانوب - بانوراما مول", chain: "Danube", city: "Riyadh", region: "Riyadh", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "Today", compliance: 95 },
  { id: "4", name: "Panda - Tahlia", nameAr: "بنده - التحلية", chain: "Panda", city: "Jeddah", region: "Jeddah", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "2 days ago", compliance: 78 },
  { id: "5", name: "Bin Dawood - Corniche", nameAr: "بن داود - الكورنيش", chain: "Bin Dawood", city: "Jeddah", region: "Jeddah", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "Yesterday", compliance: 85 },
  { id: "6", name: "LuLu Hypermarket", nameAr: "لولو هايبرماركت", chain: "LuLu", city: "Dammam", region: "Dammam", contact: "+966 5x xxx xxxx", status: "active", lastVisit: "Today", compliance: 91 },
  { id: "7", name: "Carrefour - Dhahran Mall", nameAr: "كارفور - مجمع الظهران", chain: "Carrefour", city: "Dammam", region: "Dammam", contact: "+966 5x xxx xxxx", status: "inactive", lastVisit: "1 week ago", compliance: 82 },
]

export function StoresTable() {
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")

  const filtered = stores.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.chain.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = regionFilter === "all" || s.region === regionFilter
    return matchesSearch && matchesRegion
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
          <p className="text-sm text-gray-500">Manage your retail network</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Store
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "Riyadh", "Jeddah", "Dammam"].map((region) => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                regionFilter === region
                  ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {region === "all" ? "All Regions" : region}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{store.name}</p>
                      <p className="text-xs text-gray-500">{store.nameAr}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{store.chain}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{store.city}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{store.lastVisit}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${store.compliance}%`,
                          backgroundColor: store.compliance >= 90 ? '#10B981' : store.compliance >= 80 ? '#F59E0B' : '#EF4444'
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{store.compliance}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={store.status === "active" ? "default" : "secondary"} className={store.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50" : ""}>
                    {store.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Showing {filtered.length} of {stores.length} stores</span>
        <span>Average compliance: {Math.round(filtered.reduce((sum, s) => sum + s.compliance, 0) / filtered.length)}%</span>
      </div>
    </div>
  )
}
