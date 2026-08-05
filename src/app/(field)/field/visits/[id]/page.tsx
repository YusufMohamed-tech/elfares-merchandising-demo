"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  MapPin, Clock, CheckCircle2, Camera, FileText,
  AlertTriangle, ChevronLeft, Navigation, Loader2,
  Package, Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const visitData = {
  id: "2",
  store: "Tamimi - King Fahd",
  storeAr: "التميمي - الملك فهد",
  address: "King Fahd Rd, Riyadh",
  time: "10:00 - 11:30",
  geofenceRadius: 150,
  steps: [
    { id: "shelf_check", name: "Shelf Check", nameAr: "فحص الأرفف", type: "photo", required: true, completed: true },
    { id: "stock_count", name: "Stock Count", nameAr: "جرد المخزون", type: "form", required: true, completed: true },
    { id: "expiry_check", name: "Expiry Check", nameAr: "فحص الصلاحية", type: "form", required: true, completed: true },
    { id: "display_photo", name: "Display Photo", nameAr: "صورة العرض", type: "photo", required: true, completed: false },
    { id: "competitor_check", name: "Competitor Check", nameAr: "فحص المنافسين", type: "form", required: false, completed: false },
    { id: "notes", name: "Visit Notes", nameAr: "ملاحظات الزيارة", type: "text", required: false, completed: false },
  ],
}

const stepIcons: Record<string, typeof Camera> = {
  photo: Camera,
  form: FileText,
  text: FileText,
}

export default function VisitExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const [checkedIn, setCheckedIn] = useState(true)
  const [checkingIn, setCheckingIn] = useState(false)
  const [gpsError, setGpsError] = useState("")
  const [steps, setSteps] = useState(visitData.steps)

  const completedSteps = steps.filter(s => s.completed).length
  const totalSteps = steps.length
  const requiredSteps = steps.filter(s => s.required)
  const requiredCompleted = requiredSteps.filter(s => s.completed).length
  const canCheckOut = requiredCompleted === requiredSteps.length

  const handleCheckIn = () => {
    setCheckingIn(true)
    setGpsError("")

    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser")
      setCheckingIn(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCheckedIn(true)
        setCheckingIn(false)
      },
      (error) => {
        setGpsError("Unable to get your location. Please enable GPS.")
        setCheckingIn(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const toggleStep = (stepId: string) => {
    setSteps(prev =>
      prev.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
    )
  }

  const handleCheckOut = () => {
    router.push("/field/today")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/field/today" className="p-1 -ml-1 rounded-lg hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-900">{visitData.store}</h1>
            <p className="text-xs text-gray-500">{visitData.address}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-700">{visitData.time}</p>
            <p className="text-[10px] text-gray-400">{completedSteps}/{totalSteps} steps</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Check-in Section */}
        {!checkedIn ? (
          <div className="rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Navigation className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Check In to Start Visit</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              You must be within {visitData.geofenceRadius}m of the store
            </p>
            {gpsError && (
              <div className="flex items-center gap-2 text-xs text-red-600 mb-3 justify-center">
                <AlertTriangle className="h-3 w-3" />
                {gpsError}
              </div>
            )}
            <Button
              onClick={handleCheckIn}
              disabled={checkingIn}
              className="bg-[#4CAF50] hover:bg-[#388E3C] text-white w-full"
            >
              {checkingIn ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Getting location...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Check In
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Checked in at 10:05 AM</span>
          </div>
        )}

        {/* Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs text-gray-500">{completedSteps}/{totalSteps} completed</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#4CAF50] transition-all duration-300"
              style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">Visit Steps</h3>
          {steps.map((step, index) => {
            const StepIcon = stepIcons[step.type] || FileText
            return (
              <button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                disabled={!checkedIn}
                className={`w-full flex items-center gap-3 rounded-xl border p-4 text-left transition-all active:scale-[0.98] ${
                  step.completed
                    ? "border-emerald-200 bg-emerald-50/50"
                    : checkedIn
                    ? "border-gray-200 bg-white hover:border-gray-300"
                    : "border-gray-100 bg-gray-50 opacity-60"
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  step.completed ? "bg-emerald-100" : "bg-gray-100"
                }`}>
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <StepIcon className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${step.completed ? "text-emerald-800" : "text-gray-900"}`}>
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-400">{step.nameAr}</p>
                </div>
                <div className="flex items-center gap-2">
                  {step.required && !step.completed && (
                    <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Required</span>
                  )}
                  {step.type === "photo" && (
                    <Camera className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Check-out */}
        {checkedIn && (
          <Button
            onClick={handleCheckOut}
            disabled={!canCheckOut}
            className={`w-full h-12 text-base font-semibold ${
              canCheckOut
                ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {canCheckOut ? "Complete Visit & Check Out" : `Complete required steps (${requiredCompleted}/${requiredSteps.length})`}
          </Button>
        )}
      </div>
    </div>
  )
}
