"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Sat", completed: 18, scheduled: 22 },
  { day: "Sun", completed: 24, scheduled: 28 },
  { day: "Mon", completed: 20, scheduled: 25 },
  { day: "Tue", completed: 27, scheduled: 30 },
  { day: "Wed", completed: 22, scheduled: 26 },
  { day: "Thu", completed: 30, scheduled: 32 },
  { day: "Fri", completed: 23, scheduled: 24 },
]

export function VisitsChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Visit Performance</h3>
          <p className="text-xs text-gray-500">Completed vs scheduled this week</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#4CAF50]" />
            <span className="text-gray-500">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="text-gray-500">Scheduled</span>
          </div>
        </div>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="scheduled"
              stroke="#CBD5E1"
              fill="#F1F5F9"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#4CAF50"
              fill="rgba(76, 175, 80, 0.1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
