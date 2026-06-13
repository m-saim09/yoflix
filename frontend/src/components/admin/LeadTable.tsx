"use client";

import { Eye, PencilLine, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PLAN_OPTIONS } from "@/lib/constants";
import { cn, formatDatetime, truncate } from "@/lib/utils";
import type { Inquiry, LeadStatus } from "@/lib/types";

const statusOptions: LeadStatus[] = ["New", "Contacted", "In Progress", "Closed"];

export function LeadFilters({
  search,
  status,
  plan,
  onSearch,
  onStatus,
  onPlan,
}: {
  search: string;
  status: LeadStatus | "";
  plan: "" | (typeof PLAN_OPTIONS)[number];
  onSearch: (value: string) => void;
  onStatus: (value: LeadStatus | "") => void;
  onPlan: (value: "" | (typeof PLAN_OPTIONS)[number]) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
      <input
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search by name, company, email, or project type"
        className="h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/10"
      />
      <select
        value={status}
        onChange={(event) => onStatus(event.target.value as LeadStatus | "")}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/10"
      >
        <option value="">All statuses</option>
        {statusOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        value={plan}
        onChange={(event) => onPlan(event.target.value as "" | (typeof PLAN_OPTIONS)[number])}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/10"
      >
        <option value="">All plans</option>
        {PLAN_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LeadTable({
  leads,
  loading,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  leads: Inquiry[];
  loading: boolean;
  onView: (lead: Inquiry) => void;
  onEdit: (lead: Inquiry) => void;
  onDelete: (lead: Inquiry) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full bg-slate-200" />
        <Skeleton className="h-20 w-full bg-slate-200" />
        <Skeleton className="h-20 w-full bg-slate-200" />
      </div>
    );
  }

  if (!leads.length) {
    return (
      <EmptyState
        title="No leads matched your filters"
        description="Try widening your search, or wait for the next website inquiry to land."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-[28px] border border-slate-200 xl:block">
        <div className="grid grid-cols-[1.15fr_0.9fr_1.1fr_0.8fr_0.95fr_0.9fr] bg-slate-50 px-5 py-4 text-xs uppercase tracking-[0.22em] text-slate-600">
          <div>Lead</div>
          <div>Project</div>
          <div>Description</div>
          <div>Plan</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-slate-200 bg-white">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="grid min-w-0 grid-cols-[1.15fr_0.9fr_1.1fr_0.8fr_0.95fr_0.9fr] items-center gap-4 px-5 py-5 text-sm text-slate-700"
            >
              <div>
                <p className="font-semibold text-slate-900">{lead.fullName}</p>
                <p className="mt-1 text-slate-500">{lead.companyName}</p>
                <p className="mt-2 text-xs text-slate-500">{lead.email}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDatetime(lead.createdAt)}</p>
              </div>
              <div>
                <p className="font-medium text-slate-800">{lead.projectType}</p>
                <p className="mt-1 text-xs text-slate-500">{lead.budget}</p>
                <p className="mt-1 text-xs text-slate-500">{lead.source}</p>
              </div>
              <div className="pr-3 min-w-0">
                <p
                  title={lead.message}
                  className="text-sm leading-7 text-slate-700"
                >
                  {truncate(lead.message, 20)}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-800">{lead.selectedPlan}</p>
                <p className="mt-1 text-xs text-slate-500">{lead.timeline}</p>
              </div>
              <div className="space-y-2">
                <StatusBadge status={lead.status} />
                <select
                  value={lead.status}
                  onChange={(event) => onStatusChange(lead._id, event.target.value as LeadStatus)}
                  className="h-10 rounded-2xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/10"
                >
                  {statusOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onView(lead)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200"
                  aria-label={`View ${lead.fullName}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(lead)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200"
                  aria-label={`Edit ${lead.fullName}`}
                >
                  <PencilLine className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(lead)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm transition hover:bg-rose-100"
                  aria-label={`Delete ${lead.fullName}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:hidden">
        {leads.map((lead) => (
          <div key={lead._id} className="rounded-[28px] border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">{lead.fullName}</p>
                <p className="mt-1 text-sm text-slate-500">{lead.companyName}</p>
                <p className="mt-2 text-xs text-slate-500">{formatDatetime(lead.createdAt)}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MiniInfo label="Plan" value={lead.selectedPlan} />
              <MiniInfo label="Source" value={lead.source} />
              <MiniInfo label="Budget" value={lead.budget} />
              <MiniInfo label="Project" value={lead.projectType} />
            </div>
            <p
              title={lead.message}
              className="mt-4 text-sm leading-7 text-slate-700"
            >
              {truncate(lead.message, 20)}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] items-center">
              <select
                value={lead.status}
                onChange={(event) => onStatusChange(lead._id, event.target.value as LeadStatus)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/10"
              >
                {statusOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onView(lead)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <Eye className="h-4 w-4" />
                View
              </button>
              <button
                type="button"
                onClick={() => onEdit(lead)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <PencilLine className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(lead)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function PaginationControls({
  page,
  pages,
  onPageChange,
}: {
  page: number;
  pages: number;
  onPageChange: (value: number) => void;
}) {
  if (pages <= 1) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-400">
        Page {page} of {pages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={cn("admin-secondary-button", page <= 1 && "cursor-not-allowed opacity-40")}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          className={cn("admin-secondary-button", page >= pages && "cursor-not-allowed opacity-40")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-600">{label}</p>
      <p className="mt-2 text-sm text-slate-800">{value}</p>
    </div>
  );
}
