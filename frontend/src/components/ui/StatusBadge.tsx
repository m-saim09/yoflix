import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/types";

const map: Record<LeadStatus, string> = {
  New: "bg-sky-100 text-sky-700",
  Contacted: "bg-violet-100 text-violet-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Closed: "bg-emerald-100 text-emerald-700",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        map[status]
      )}
    >
      {status}
    </span>
  );
}
