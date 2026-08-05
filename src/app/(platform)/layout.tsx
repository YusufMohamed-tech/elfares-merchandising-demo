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
        <header className="flex h-16 items-center gap-3 px-4 border-b border-white/10">
          {/* Elfares wheat logo — white strokes for dark sidebar */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M20 36V20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 20C18 16 14 12 12 8C14 10 18 14 20 16" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 20C22 16 26 12 28 8C26 10 22 14 20 16" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 26C17 22 13 18 11 14C13 16 17 20 20 22" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 26C23 22 27 18 29 14C27 16 23 20 20 22" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Elfares</p>
            <p className="text-[10px] text-gray-400 leading-tight">HG Communications</p>
          </div>
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
