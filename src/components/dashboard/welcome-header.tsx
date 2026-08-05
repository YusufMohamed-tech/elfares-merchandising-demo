"use client"

import { CalendarDays } from "lucide-react"

export function WelcomeHeader() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of today&apos;s merchandising operations
        </p>
      </div>
      <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 sm:flex">
        <CalendarDays className="h-4 w-4" />
        {dateStr}
      </div>
    </div>
  )
}
