import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  label,
  value,
  accent,
  caption,
}: {
  label: string;
  value: string | number;
  accent: "blue" | "green" | "amber" | "rose";
  caption: string;
}) {
  const accentMap = {
    blue: "from-sky-400/25 to-cyan-300/5 text-sky-100",
    green: "from-emerald-400/25 to-lime-300/5 text-emerald-100",
    amber: "from-amber-300/25 to-orange-200/5 text-amber-100",
    rose: "from-rose-300/25 to-fuchsia-200/5 text-rose-100",
  };

  return (
    <div className="admin-panel overflow-hidden">
      <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-br blur-2xl", accentMap[accent])} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-700">{label}</p>
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100/80 p-2 text-slate-700">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-5 text-4xl font-semibold text-slate-900">{value}</p>
        <p className="mt-3 text-sm text-slate-600">{caption}</p>
      </div>
    </div>
  );
}

export function AdminSectionCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("admin-panel h-full pb-6 flex flex-col", className)}>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      <div className="flex-1 min-w-0 min-h-0">{children}</div>
    </section>
  );
}
