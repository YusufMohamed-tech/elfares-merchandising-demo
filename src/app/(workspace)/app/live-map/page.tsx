"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Search, Radio, MapPin } from "lucide-react"

const LiveMapView = dynamic(() => import("@/components/live-map/LiveMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <Radio className="h-8 w-8 animate-pulse text-green-500" />
        <p className="text-sm font-medium">Loading map…</p>
      </div>
    </div>
  ),
})

import type { Merchandiser } from "@/components/live-map/LiveMapView"

export const merchandisers: Merchandiser[] = [
  {
    id: "1",
    name: "Mohammed Ali",
    avatar: "M",
    status: "active",
    store: "Tamimi – King Fahd",
    checkedIn: true,
    lastSeen: "2 min ago",
    lat: 24.6973,
    lng: 46.7289,
    battery: 82,
    tasksComplete: 3,
    tasksTotal: 6,
  },
  {
    id: "2",
    name: "Sara Ahmed",
    avatar: "S",
    status: "active",
    store: "Panda – Olaya",
    checkedIn: true,
    lastSeen: "1 min ago",
    lat: 24.7136,
    lng: 46.6752,
    battery: 61,
    tasksComplete: 5,
    tasksTotal: 5,
  },
  {
    id: "3",
    name: "Khalid Nasser",
    avatar: "K",
    status: "idle",
    store: "Carrefour – Riyadh Park",
    checkedIn: true,
    lastSeen: "18 min ago",
    lat: 24.7512,
    lng: 46.6924,
    battery: 44,
    tasksComplete: 2,
    tasksTotal: 4,
  },
  {
    id: "4",
    name: "Fatima Hassan",
    avatar: "F",
    status: "offline",
    store: "—",
    checkedIn: false,
    lastSeen: "2h ago",
    lat: 24.6748,
    lng: 46.7082,
    battery: 12,
    tasksComplete: 0,
    tasksTotal: 3,
  },
  {
    id: "5",
    name: "Omar Saleh",
    avatar: "O",
    status: "active",
    store: "Danube – Al Malaz",
    checkedIn: true,
    lastSeen: "Just now",
    lat: 24.6862,
    lng: 46.7468,
    battery: 93,
    tasksComplete: 4,
    tasksTotal: 6,
  },
]

const statusColor: Record<string, string> = {
  active: "bg-emerald-500",
  idle: "bg-amber-400",
  offline: "bg-gray-400",
}

const statusLabel: Record<string, string> = {
  active: "Active",
  idle: "Idle",
  offline: "Offline",
}

export default function LiveMapPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const filtered = merchandisers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.store.toLowerCase().includes(search.toLowerCase())
  )

  const counts = {
    active: merchandisers.filter(m => m.status === "active").length,
    idle: merchandisers.filter(m => m.status === "idle").length,
    offline: merchandisers.filter(m => m.status === "offline").length,
  }

  const selectedMerch = selected ? merchandisers.find(m => m.id === selected) : null

  return (
    <div className="flex overflow-hidden -m-4 lg:-m-6" style={{ height: "calc(100vh - 64px)" }}>
      {/* Left panel */}
      <aside className="w-72 flex-shrink-0 flex flex-col bg-white border-r border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="h-4 w-4 text-emerald-500 animate-pulse" />
            <h2 className="text-sm font-semibold text-gray-900">Live Locations</h2>
            <span className="ml-auto text-xs text-gray-400">{counts.active} active</span>
          </div>
          {/* Status summary chips */}
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {counts.active} Active
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              {counts.idle} Idle
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
              {counts.offline} Offline
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search merchandiser or store…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* List */}
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filtered.map(m => (
            <li key={m.id}>
              <button
                onClick={() => setSelected(selected === m.id ? null : m.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                  selected === m.id
                    ? "bg-green-50 border-l-2 border-green-500"
                    : "hover:bg-gray-50 border-l-2 border-transparent"
                }`}
              >
                {/* Avatar with status dot */}
                <div className="relative flex-shrink-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    m.status === "active" ? "bg-emerald-500" :
                    m.status === "idle" ? "bg-amber-400" : "bg-gray-400"
                  }`}>
                    {m.avatar}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColor[m.status]}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                  <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    {m.checkedIn ? m.store : "Not checked in"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{m.lastSeen}</p>
                </div>
              </button>

              {/* Expanded detail */}
              {selected === m.id && (
                <div className="px-4 pb-3 bg-green-50 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tasks</span>
                    <span className="font-medium text-gray-800">{m.tasksComplete}/{m.tasksTotal}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${m.tasksTotal ? (m.tasksComplete / m.tasksTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Battery</span>
                    <span className={`font-medium ${m.battery < 20 ? "text-red-500" : "text-gray-800"}`}>{m.battery}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.battery < 20 ? "bg-red-400" : m.battery < 50 ? "bg-amber-400" : "bg-emerald-400"}`}
                      style={{ width: `${m.battery}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Status: <span className={`font-medium ${
                      m.status === "active" ? "text-emerald-600" :
                      m.status === "idle" ? "text-amber-600" : "text-gray-500"
                    }`}>{statusLabel[m.status]}</span>
                  </p>
                </div>
              )}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-xs text-gray-400">No results</li>
          )}
        </ul>
      </aside>

      {/* Map */}
      <div className="flex-1 relative">
        <LiveMapView
          merchandisers={merchandisers}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  )
}
