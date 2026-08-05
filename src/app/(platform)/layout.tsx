"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/hg/dashboard" },
  { name: "Companies", icon: Building2, href: "/hg/companies" },
  { name: "Settings", icon: Settings, href: "/hg/settings" },
];

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex flex-col w-[240px] bg-[#1A1A2E] text-white flex-shrink-0">
        {/* Sidebar Header */}
        <header className="flex flex-col justify-center h-16 px-6 border-b border-white/10">
          <span className="text-lg font-bold tracking-wide">hgc</span>
          <span className="text-xs text-gray-400">HG Communications</span>
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "text-white bg-white/10 border-l-2 border-[#E8505B]"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between px-6 border-b border-gray-200 bg-white">
          <span className="text-lg font-semibold text-gray-900">HG Platform</span>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8505B] text-white text-sm font-medium">
            A
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
