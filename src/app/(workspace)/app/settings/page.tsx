"use client"

import { useState } from "react"
import { Settings, Globe, Bell, Shield, Building2, Palette, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const sections = [
  { key: "workspace", label: "Workspace", icon: Building2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "localization", label: "Localization", icon: Globe },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("workspace")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage workspace configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === s.key
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 space-y-6">
          {activeSection === "workspace" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Workspace Details</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Company Name</Label>
                    <Input defaultValue="Elfares Food Industries" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Industry</Label>
                    <Input defaultValue="Food & Beverage" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Timezone</Label>
                    <Input defaultValue="Asia/Riyadh (UTC+3)" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Primary Contact</Label>
                    <Input defaultValue="admin@elfares.sa" className="mt-1.5" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Visit Settings</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Geofence Radius (meters)</Label>
                    <Input defaultValue="150" type="number" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Visit Timeout (minutes)</Label>
                    <Input defaultValue="240" type="number" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4 max-w-md">
                {[
                  { label: "Expiry Alerts", desc: "Notify when products are within 7 days of expiry", defaultChecked: true },
                  { label: "Missed Visits", desc: "Alert when a scheduled visit is not completed", defaultChecked: true },
                  { label: "Return Submitted", desc: "Notify managers when a return is submitted", defaultChecked: true },
                  { label: "Issue Escalated", desc: "Alert when an issue is escalated", defaultChecked: true },
                  { label: "Campaign Updates", desc: "Notify team when campaigns start or end", defaultChecked: false },
                  { label: "Weekly Summary", desc: "Send a weekly performance report", defaultChecked: false },
                ].map((item) => (
                  <label key={item.label} className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="peer sr-only" />
                      <div className="h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-[#4CAF50] transition-colors" />
                      <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-5 max-w-md">
                <div className="rounded-lg border border-gray-200 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Password Policy</h3>
                  {["Require minimum 8 characters", "Require special characters", "Require uppercase letters"].map((policy) => (
                    <label key={policy} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#4CAF50]" />
                      <span className="text-sm text-gray-600">{policy}</span>
                    </label>
                  ))}
                </div>
                <div className="rounded-lg border border-gray-200 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Session Settings</h3>
                  <div>
                    <Label className="text-xs text-gray-500">Session Timeout (hours)</Label>
                    <Input defaultValue="24" type="number" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "localization" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Localization</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">Default Language</Label>
                  <select className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                    <option>Arabic (العربية)</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">Date Format</Label>
                  <select className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">Currency</Label>
                  <Input defaultValue="SAR — Saudi Riyal" className="mt-1.5" />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <Button
              onClick={handleSave}
              className={`gap-2 text-sm ${saved ? "bg-emerald-500 hover:bg-emerald-500" : "bg-[#4CAF50] hover:bg-[#388E3C]"} text-white`}
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Changes"}
            </Button>
            <Button variant="ghost" className="text-sm text-gray-500">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
