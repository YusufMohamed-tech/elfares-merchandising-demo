"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Camera, Bell, User, LogOut, Settings } from "lucide-react";
import { logout } from "@/lib/supabase/auth-actions";

const bottomNavItems = [
  { name: "Today",   icon: Home,   href: "/field/today" },
  { name: "Visits",  icon: MapPin, href: "/field/visits" },
  { name: "Camera",  icon: Camera, href: "/field/camera", highlighted: true },
  { name: "Alerts",  icon: Bell,   href: "/field/alerts" },
  { name: "Profile", icon: User,   href: "/field/profile" },
];

export default function FieldLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    setProfileOpen(false);
    await logout();
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between px-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 36V20" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 20C18 16 14 12 12 8C14 10 18 14 20 16" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 20C22 16 26 12 28 8C26 10 22 14 20 16" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 26C17 22 13 18 11 14C13 16 17 20 20 22" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 26C23 22 27 18 29 14C27 16 23 20 20 22" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-semibold text-gray-900">AlFares</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/field/alerts" className="relative p-2 rounded-md text-gray-500">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Profile dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              M
            </button>

            {profileOpen && (
              <div className="absolute top-10 right-0 w-48 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Mohammed Ali</p>
                  <p className="text-xs text-gray-400 mt-0.5">Merchandiser</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/field/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-[72px]">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          if (item.highlighted) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center -mt-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 shadow-lg shadow-green-200">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="mt-1 text-xs font-medium text-green-600">{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1 ${isActive ? "text-green-600" : "text-gray-400"}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : ""}`} />
              <span className={`mt-1 text-xs font-medium ${isActive ? "text-green-600" : "text-gray-400"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
