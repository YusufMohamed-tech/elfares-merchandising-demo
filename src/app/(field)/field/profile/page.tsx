"use client"

import { MapPin, Phone, Mail, Globe, LogOut, ChevronRight, Shield, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FieldProfilePage() {
  return (
    <div className="px-4 py-5 space-y-5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-xl font-bold">
          MA
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Mohammed Ali</h1>
          <p className="text-sm text-gray-500">Merchandiser</p>
          <p className="text-xs text-gray-400">Riyadh Region</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
          <p className="text-xl font-bold text-gray-900">156</p>
          <p className="text-[10px] text-gray-500">Total Visits</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
          <p className="text-xl font-bold text-emerald-600">94%</p>
          <p className="text-[10px] text-gray-500">Completion</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
          <p className="text-xl font-bold text-gray-900">4.8</p>
          <p className="text-[10px] text-gray-500">Rating</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">m.ali@elfares.sa</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">+966 55 xxx xxxx</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Riyadh, Saudi Arabia</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <button className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Notifications</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </button>
        <button className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Language</span>
          </div>
          <span className="text-xs text-gray-400">English</span>
        </button>
        <button className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Privacy</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </button>
      </div>

      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 gap-2">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>

      <p className="text-center text-[10px] text-gray-400">
        Elfares Merchandising Platform v1.0<br />
        Powered by HG Communication
      </p>
    </div>
  )
}
