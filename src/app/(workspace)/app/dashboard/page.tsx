import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { VisitsChart } from "@/components/dashboard/visits-chart"
import { ComplianceChart } from "@/components/dashboard/compliance-chart"
import { RegionBreakdown } from "@/components/dashboard/region-breakdown"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingVisits } from "@/components/dashboard/upcoming-visits"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <StatsGrid />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VisitsChart />
        <ComplianceChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RegionBreakdown />
        </div>
        <div className="lg:col-span-1">
          <UpcomingVisits />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
