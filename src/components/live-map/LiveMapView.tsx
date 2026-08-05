"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export type Merchandiser = {
  id: string
  name: string
  avatar: string
  status: "active" | "idle" | "offline"
  store: string
  checkedIn: boolean
  lastSeen: string
  lat: number
  lng: number
  tasksComplete: number
  tasksTotal: number
  battery: number
}

const STATUS_COLORS: Record<string, string> = {
  active: "#10b981",
  idle: "#f59e0b",
  offline: "#9ca3af",
}

function makeMarkerIcon(avatar: string, status: string) {
  const color = STATUS_COLORS[status] ?? "#9ca3af"
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
      <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="3"/>
      <text x="20" y="26" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="white">${avatar}</text>
      <polygon points="20,48 13,32 27,32" fill="${color}"/>
    </svg>`
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -52],
  })
}

type Props = {
  merchandisers: Merchandiser[]
  selected: string | null
  onSelect: (id: string | null) => void
}

export default function LiveMapView({ merchandisers, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [24.7136, 46.6752],
      zoom: 13,
      zoomControl: false,
    })

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Sync markers
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const existingIds = new Set(markersRef.current.keys())

    for (const m of merchandisers) {
      existingIds.delete(m.id)
      const existing = markersRef.current.get(m.id)
      const icon = makeMarkerIcon(m.avatar, m.status)

      if (!existing) {
        const marker = L.marker([m.lat, m.lng], { icon })
          .addTo(map)
          .bindPopup(buildPopup(m))

        marker.on("click", () => onSelect(m.id))
        markersRef.current.set(m.id, marker)
      } else {
        existing.setIcon(icon)
        existing.setLatLng([m.lat, m.lng])
        existing.setPopupContent(buildPopup(m))
      }
    }

    // Remove stale markers
    for (const id of existingIds) {
      markersRef.current.get(id)?.remove()
      markersRef.current.delete(id)
    }
  }, [merchandisers, onSelect])

  // Pan to selected
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selected) return
    const m = merchandisers.find(x => x.id === selected)
    if (!m) return
    map.flyTo([m.lat, m.lng], 15, { duration: 1 })
    const marker = markersRef.current.get(selected)
    marker?.openPopup()
  }, [selected, merchandisers])

  return (
    <div ref={containerRef} className="w-full h-full" />
  )
}

function buildPopup(m: Merchandiser) {
  const color = STATUS_COLORS[m.status] ?? "#9ca3af"
  const taskPct = m.tasksTotal ? Math.round((m.tasksComplete / m.tasksTotal) * 100) : 0
  return `
    <div style="font-family:system-ui,sans-serif;min-width:180px;padding:4px 0">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:32px;height:32px;border-radius:50%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">
          ${m.avatar}
        </div>
        <div>
          <p style="margin:0;font-size:13px;font-weight:600;color:#111">${m.name}</p>
          <p style="margin:0;font-size:11px;color:#6b7280">${m.checkedIn ? m.store : "Not checked in"}</p>
        </div>
      </div>
      <div style="font-size:11px;color:#6b7280;margin-bottom:4px">
        Tasks: <strong style="color:#111">${m.tasksComplete}/${m.tasksTotal}</strong> &nbsp;•&nbsp; Battery: <strong style="color:${m.battery < 20 ? "#ef4444" : "#111"}">${m.battery}%</strong>
      </div>
      <div style="height:4px;background:#e5e7eb;border-radius:4px;overflow:hidden;margin-bottom:6px">
        <div style="height:100%;width:${taskPct}%;background:${color};border-radius:4px"></div>
      </div>
      <p style="margin:0;font-size:10px;color:#9ca3af">Last seen ${m.lastSeen}</p>
    </div>
  `
}
