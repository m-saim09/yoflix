"use client";

import { useEffect, useState } from "react";
import { AdminSectionCard, AdminStatCard } from "@/components/admin/AdminCards";
import { MonthlyGrowthChart, PlanDistributionChart, StatusBreakdownChart } from "@/components/admin/AdminCharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { Skeleton } from "@/components/ui/Skeleton";
import { inquiryAPI } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

export default function AnalyticsPage() {
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
      title="Analytics"
      description="Dedicated reporting view for monthly volume, pipeline distribution, and plan-level demand signals."
    >
      {loading || !stats ? (
        <div className="grid gap-5">
          <Skeleton className="h-44 bg-white/10" />
          <div className="grid gap-5 xl:grid-cols-3">
            <Skeleton className="h-[360px] bg-white/10" />
            <Skeleton className="h-[360px] bg-white/10" />
            <Skeleton className="h-[360px] bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard label="Leads this month" value={stats.totals.monthlyInquiries} accent="blue" caption="Rolling 30-day inbound volume." />
            <AdminStatCard label="New queue" value={stats.leadsByStatus.New} accent="amber" caption="Leads awaiting first response." />
            <AdminStatCard label="In progress" value={stats.leadsByStatus["In Progress"]} accent="green" caption="Active opportunities being worked." />
            <AdminStatCard label="Closed" value={stats.leadsByStatus.Closed} accent="rose" caption="Resolved or completed inquiries." />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <MonthlyGrowthChart stats={stats} />
            <StatusBreakdownChart stats={stats} />
          </div>

          <PlanDistributionChart stats={stats} />

          <AdminSectionCard title="Interpretation" subtitle="Quick context for the current reporting snapshot.">
            <div className="grid gap-4 lg:grid-cols-3">
              <InsightCard title="Demand quality" description="Use New vs Contacted counts to monitor response backlog and handoff speed." />
              <InsightCard title="Pricing signal" description="Plan distribution shows which offer level resonates most with current traffic." />
              <InsightCard title="Momentum" description="Monthly inquiry growth helps separate one-off spikes from real pipeline improvement." />
            </div>
          </AdminSectionCard>
        </div>
      )}
    </AdminShell>
  );
}

function InsightCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
      <p className="text-lg font-semibold text-[var(--admin-blue)]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-slate-700">{description}</p>
    </div>
  );
}
