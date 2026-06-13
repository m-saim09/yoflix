"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BadgeDollarSign,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/pricing-management", label: "Pricing", icon: BadgeDollarSign },
  { href: "/admin/website-settings", label: "Settings", icon: Globe },
];

export default function AdminSidebar({
  adminName = "Admin",
  onNavigate,
  onLogout,
}: {
  adminName?: string;
  onNavigate?: () => void;
  onLogout?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
          ✦
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4f46e5]">Yoflix Admin</h2>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
            Control panel
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-6">
        <div className="mb-5 px-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600">
          Navigation
        </div>

        <div className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                  active
                    ? "bg-[#ecebff] text-[#4f46e5]"
                    : "text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                    active
                      ? "bg-white text-[#4f46e5] shadow-sm"
                      : "text-slate-700 group-hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <span>{label}</span>

                {active && <div className="ml-auto h-7 w-[3px] rounded-full bg-[#4f46e5]" />}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-semibold text-white">
              {adminName.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">{adminName}</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
