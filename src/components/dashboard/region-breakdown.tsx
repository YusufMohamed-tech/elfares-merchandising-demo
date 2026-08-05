"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Riyadh", value: 24, color: "#4CAF50" },
  { name: "Jeddah", value: 14, color: "#F9A825" },
  { name: "Dammam", value: 10, color: "#3B82F6" },
]

export function RegionBreakdown() {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Visits by Region</h3>
        <p className="text-xs text-gray-500">Today&apos;s distribution</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-[140px] w-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3">
          {data.map((region) => (
            <div key={region.name} className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: region.color }} />
              <div>
                <p className="text-sm font-medium text-gray-700">{region.name}</p>
                <p className="text-xs text-gray-400">{region.value} visits ({Math.round((region.value / total) * 100)}%)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
