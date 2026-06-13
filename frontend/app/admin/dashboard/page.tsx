"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminSectionCard, AdminStatCard } from "@/components/admin/AdminCards";
import { MonthlyGrowthChart, PlanDistributionChart, StatusBreakdownChart } from "@/components/admin/AdminCharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { inquiryAPI } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";
import { formatDatetime, truncate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const response = await inquiryAPI.getStats();
        if (active) {
          setStats(response.data);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <AdminShell
      title="Dashboard overview"
      description="A high-level view of lead volume, recent activity, plan mix, and operational momentum across the admin system."
      actions={
        <Link href="/admin/leads" className="admin-secondary-button">
          Review leads
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      {loading || !stats ? (
        <div className="grid gap-5">
          <div className="grid gap-5 lg:grid-cols-4">
            <Skeleton className="h-44 bg-white/10" />
            <Skeleton className="h-44 bg-white/10" />
            <Skeleton className="h-44 bg-white/10" />
            <Skeleton className="h-44 bg-white/10" />
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
            <Skeleton className="h-[360px] bg-white/10" />
            <Skeleton className="h-[360px] bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard label="Total leads" value={stats.totals.leads} accent="blue" caption="All pricing inquiries stored in the CRM." />
            <AdminStatCard label="Total contacts" value={stats.totals.contacts} accent="green" caption="Short-form contact requests from the public site." />
            <AdminStatCard label="New inquiries" value={stats.totals.newInquiries} accent="amber" caption="Fresh leads waiting for outreach." />
            <AdminStatCard label="Active projects" value={stats.totals.activeProjects} accent="rose" caption="Contacted and in-progress opportunities." />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
            <MonthlyGrowthChart stats={stats} />
            <StatusBreakdownChart stats={stats} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <PlanDistributionChart stats={stats} />
            <AdminSectionCard title="Recent inquiries" subtitle="The latest website submissions, sorted by newest first.">
              {!stats.recentLeads.length ? (
                <EmptyState title="No recent activity yet" description="Seed a few records or wait for new website submissions to populate this list." />
              ) : (
                <div className="space-y-3">
                  {stats.recentLeads.map((lead) => (
                    <div key={lead._id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{lead.fullName}</p>
                            <p className="mt-1 text-sm text-slate-600">{lead.companyName}</p>
                          </div>
                          <StatusBadge status={lead.status} />
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{truncate(lead.message, 120)}</p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-600">
                          <span>{lead.selectedPlan}</span>
                          <span>{formatDatetime(lead.createdAt)}</span>
                        </div>
                      </div>
                  ))}
                </div>
              )}
            </AdminSectionCard>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
