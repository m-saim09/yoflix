"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardStats, LeadStatus } from "@/lib/types";
import { AdminSectionCard } from "./AdminCards";

const statusColorMap: Record<LeadStatus, string> = {
  New: "#7dd3fc",
  Contacted: "#c084fc",
  "In Progress": "#fbbf24",
  Closed: "#34d399",
};

const planColors = ["#7dd3fc", "#4ade80", "#fbbf24"];

export function MonthlyGrowthChart({ stats }: { stats: DashboardStats }) {
  return (
    <AdminSectionCard
      title="Monthly inquiry growth"
      subtitle="Twelve-month view of inbound demand."
      className="h-[420px]"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={stats.monthlyInquiries}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ stroke: "rgba(125,211,252,0.3)" }}
            contentStyle={{
              backgroundColor: "#091425",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 18,
              color: "#e2e8f0",
            }}
          />
          <Line
            type="monotone"
            dataKey="leads"
            stroke="#7dd3fc"
            strokeWidth={3}
            dot={{ r: 4, fill: "#7dd3fc" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AdminSectionCard>
  );
}

export function StatusBreakdownChart({ stats }: { stats: DashboardStats }) {
  const data = Object.entries(stats.leadsByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <AdminSectionCard
      title="Status breakdown"
      subtitle="See how far leads move through the pipeline."
      className="h-[420px]"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={68}
            outerRadius={108}
            paddingAngle={6}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={statusColorMap[entry.name as LeadStatus]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#091425",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 18,
              color: "#e2e8f0",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {data.map((item) => (
          <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: statusColorMap[item.name as LeadStatus] }}
              />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </AdminSectionCard>
  );
}

export function PlanDistributionChart({ stats }: { stats: DashboardStats }) {
  return (
    <AdminSectionCard
      title="Plan distribution"
      subtitle="Which pricing level is driving the most demand."
      className="h-[420px]"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={stats.leadsByPlan}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="_id" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(125,211,252,0.08)" }}
            contentStyle={{
              backgroundColor: "#091425",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 18,
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey="count" radius={[12, 12, 0, 0]}>
            {stats.leadsByPlan.map((entry, index) => (
              <Cell key={entry._id} fill={planColors[index % planColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AdminSectionCard>
  );
}
