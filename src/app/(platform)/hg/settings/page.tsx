"use client"

import { useState } from "react"
import { Globe, Bell, Shield, CreditCard, Webhook, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const sections = [
  { key: "platform", label: "Platform", icon: Globe },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "security", label: "Security", icon: Shield },
  { key: "integrations", label: "Integrations", icon: Webhook },
]

export default function HGSettingsPage() {
  const [activeSection, setActiveSection] = useState("platform")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500">Configure HG Communication platform</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
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
                      ? "bg-[#E8505B]/10 text-[#E8505B]"
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
          {activeSection === "platform" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Platform Identity</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Platform Name</Label>
                    <Input defaultValue="HG Communication" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Support Email</Label>
                    <Input defaultValue="support@hg-comm.sa" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Platform URL</Label>
                    <Input defaultValue="https://platform.hg-comm.sa" className="mt-1.5" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Default Limits</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Max Users per Tenant (Starter)</Label>
                    <Input defaultValue="5" type="number" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Max Users per Tenant (Professional)</Label>
                    <Input defaultValue="20" type="number" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase tracking-wide">Max Users per Tenant (Enterprise)</Label>
                    <Input defaultValue="Unlimited" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "billing" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Billing & Plans</h2>
              <div className="space-y-3 max-w-lg">
                {[
                  { plan: "Starter", price: "SAR 500/mo", features: "5 users, 3 stores, 1 region" },
                  { plan: "Professional", price: "SAR 1,500/mo", features: "20 users, 10 stores, 3 regions" },
                  { plan: "Enterprise", price: "Custom", features: "Unlimited users, stores, regions" },
                ].map((tier) => (
                  <div key={tier.plan} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{tier.plan}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tier.features}</p>
                    </div>
                    <span className="text-sm font-bold text-[#E8505B]">{tier.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Platform Security</h2>
              <div className="space-y-4 max-w-md">
                <div className="rounded-lg border border-gray-200 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Tenant Isolation</h3>
                  {[
                    "Row-level security enforced on all tables",
                    "Tenant ID required on all API requests",
                    "Cross-tenant data access blocked",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "integrations" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Integrations</h2>
              <div className="space-y-3 max-w-lg">
                {[
                  { name: "Supabase", desc: "Authentication & database", status: "connected" },
                  { name: "Vercel", desc: "Deployment & hosting", status: "connected" },
                  { name: "SendGrid", desc: "Email notifications", status: "not_connected" },
                  { name: "Twilio", desc: "SMS alerts", status: "not_connected" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{integration.name}</p>
                      <p className="text-xs text-gray-400">{integration.desc}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      integration.status === "connected"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {integration.status === "connected" ? "Connected" : "Connect"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <Button
              onClick={handleSave}
              className={`gap-2 text-sm ${saved ? "bg-emerald-500 hover:bg-emerald-500" : "bg-[#E8505B] hover:bg-[#D43D48]"} text-white`}
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
