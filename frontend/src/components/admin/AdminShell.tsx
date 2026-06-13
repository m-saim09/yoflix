"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BadgeDollarSign,
  Bell,
  Globe,
  LayoutDashboard,
  Menu,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import { authAPI } from "@/lib/api";
import { useAdminSession } from "@/hooks/useAdminSession";
import { formatDate, removeAuthToken } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import AdminSidebar from "./AdminSidebar";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/pricing-management", label: "Pricing", icon: BadgeDollarSign },
  { href: "/admin/website-settings", label: "Settings", icon: Globe },
];

export function AdminShell({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { admin, loading } = useAdminSession(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const activeItem = useMemo(
    () => navItems.find((item) => pathname.startsWith(item.href)),
    [pathname]
  );

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // noop
    }

    removeAuthToken();

    toast.success("Signed out successfully");
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f7fb] p-4 sm:p-6">
        <div className="mx-auto grid max-w-[1600px] gap-5 lg:grid-cols-[300px_1fr]">
          <Skeleton className="h-[92vh] rounded-[34px] bg-slate-200" />
          <Skeleton className="h-[92vh] rounded-[34px] bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f7fb] text-slate-900">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] lg:ml-[280px]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:block lg:h-screen lg:w-[280px]">
          <AdminSidebar
            adminName={admin?.name || "Admin"}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            >
              <motion.aside
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-3 top-3 bottom-3 w-[calc(100%-1.5rem)] max-w-[330px]"
              >
                <AdminSidebar
                  adminName={admin?.name || "Admin"}
                  onLogout={handleLogout}
                  onNavigate={() => setMenuOpen(false)}
                />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main */}
        <main
          className="mx-5 flex h-screen flex-col rounded-[34px] border border-slate-200 bg-white sm:mx-3 lg:mx-0 lg:rounded-none"
        >
          {/* topbar */}
          <header
            className="sticky top-0 z-20 flex flex-shrink-0 items-center justify-between gap-4 rounded-t-[34px] border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:rounded-t-none"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-700">
                  {activeItem?.label || "Admin"}
                </span>

                <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-700 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-slate-500" />
                  Live
                </div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-800"
              >
                <Bell className="h-3 w-3 text-slate-500" />
                <span className="hidden sm:inline">CRM synced</span>
              </div>

              {actions}
            </div>
          </header>

          {/* session card */}
          <section className="flex-shrink-0 border-b border-slate-200 px-4 py-2 sm:px-6">
            <div
              className="flex flex-col gap-2 rounded-[20px] border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-semibold text-white shadow">
                  {admin?.name?.charAt(0) || "A"}
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {admin?.name || "Admin"}
                  </p>

                  <p className="text-xs text-slate-500">
                    Last login {admin?.lastLogin ? formatDate(admin.lastLogin) : "not available"}
                  </p>
                </div>
              </div>

              <div
                className="inline-flex items-center gap-1 rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 flex-shrink-0"
              >
                <ShieldCheck className="h-3 w-3" />
                <span className="hidden sm:inline">Protected session</span>
              </div>
            </div>
          </section>

          {/* page content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
