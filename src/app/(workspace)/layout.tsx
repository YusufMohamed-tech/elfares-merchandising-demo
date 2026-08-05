"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  MapPin,
  Calendar,
  Users,
  Store,
  Package,
  Clock,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Megaphone,
  UserCog,
  Settings,
  FileText,
  Search,
  Globe,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/app/dashboard" },
      { name: "Notifications", icon: Bell, href: "/app/notifications" },
    ],
  },
  {
    label: "Field Operations",
    items: [
      { name: "Visits", icon: MapPin, href: "/app/visits" },
      { name: "Calendar", icon: Calendar, href: "/app/calendar" },
      { name: "Teams", icon: Users, href: "/app/teams" },
    ],
  },
  {
    label: "Retail Network",
    items: [
      { name: "Stores", icon: Store, href: "/app/stores" },
      { name: "Products", icon: Package, href: "/app/products" },
    ],
  },
  {
    label: "Stock Operations",
    items: [
      { name: "Expiry", icon: Clock, href: "/app/expiry" },
      { name: "Returns", icon: RotateCcw, href: "/app/returns" },
    ],
  },
  {
    label: "Quality",
    items: [
      { name: "Issues", icon: AlertTriangle, href: "/app/issues" },
      { name: "Approvals", icon: CheckCircle, href: "/app/approvals" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { name: "Reports", icon: BarChart3, href: "/app/reports" },
      { name: "Campaigns", icon: Megaphone, href: "/app/campaigns" },
    ],
  },
  {
    label: "Administration",
    items: [
      { name: "Users", icon: UserCog, href: "/app/users" },
      { name: "Settings", icon: Settings, href: "/app/settings" },
      { name: "Audit Log", icon: FileText, href: "/app/audit-log" },
    ],
  },
];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "AR">("EN");

  const sidebarWidth = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300
          ${sidebarWidth}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static`}
      >
        {/* Sidebar Header */}
        <header className="flex h-16 items-center gap-3 px-4 border-b border-gray-100">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-yellow-500">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold text-gray-900">Elfares</span>
          )}
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              {!sidebarCollapsed && (
                <p className="px-3 mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-green-50 text-green-700 border-l-2 border-green-600"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }
                          ${sidebarCollapsed ? "justify-center" : ""}
                        `}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex items-center justify-center p-3 border-t border-gray-100">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 lg:px-6">
          {/* Left: hamburger (mobile) + search */}
          <div className="flex items-center gap-3 flex-1">
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md text-gray-500 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
              className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-sm font-medium">
              U
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
