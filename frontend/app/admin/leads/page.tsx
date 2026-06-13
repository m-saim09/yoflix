"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AdminSectionCard } from "@/components/admin/AdminCards";
import {
  ConfirmDeleteModal,
  LeadDetailsModal,
  LeadEditModal,
} from "@/components/admin/AdminDialogs";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadFilters, LeadTable, PaginationControls } from "@/components/admin/LeadTable";
import { inquiryAPI } from "@/lib/api";
import { PLAN_OPTIONS } from "@/lib/constants";
import type { Inquiry, LeadStatus } from "@/lib/types";

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [plan, setPlan] = useState<"" | (typeof PLAN_OPTIONS)[number]>("");
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);
  const [editingLead, setEditingLead] = useState<Inquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [savingLead, setSavingLead] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await inquiryAPI.getAll({ page, limit: 8, search, status, plan });
      setLeads(response.data.leads);
      setPages(response.data.pages);
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void loadLeads();
  }, [page, search, status, plan]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const updateStatus = async (leadId: string, nextStatus: LeadStatus) => {
    await inquiryAPI.update(leadId, { status: nextStatus });
    toast.success("Lead status updated.");
    await loadLeads();
  };

  const deleteLead = async () => {
    if (!deleteTarget) return;
    await inquiryAPI.delete(deleteTarget._id);
    toast.success("Lead deleted.");
    setDeleteTarget(null);
    await loadLeads();
  };

  const saveLead = async (payload: Partial<Inquiry>) => {
    if (!editingLead) return;

    setSavingLead(true);
    try {
      await inquiryAPI.update(editingLead._id, payload);
      toast.success("Lead details updated.");
      setEditingLead(null);
      setSelectedLead(null);
      await loadLeads();
    } finally {
      setSavingLead(false);
    }
  };

  return (
    <AdminShell
      title="Leads management"
      description="Search, filter, inspect, edit, and clean up inbound inquiries with a cleaner lead pipeline across desktop and mobile."
    >
      <AdminSectionCard
        title="Lead pipeline"
        subtitle="Descriptions stay compact in the table, while view and edit flows keep the full inquiry context available."
      >
        <LeadFilters
          search={search}
          status={status}
          plan={plan}
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          onStatus={(value) => {
            setPage(1);
            setStatus(value);
          }}
          onPlan={(value) => {
            setPage(1);
            setPlan(value);
          }}
        />

        <div className="mt-5">
          <LeadTable
            leads={leads}
            loading={loading}
            onView={setSelectedLead}
            onEdit={setEditingLead}
            onDelete={setDeleteTarget}
            onStatusChange={updateStatus}
          />
          <PaginationControls page={page} pages={pages} onPageChange={setPage} />
        </div>
      </AdminSectionCard>

      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onEdit={(lead) => {
          setSelectedLead(null);
          setEditingLead(lead);
        }}
      />
      <LeadEditModal
        lead={editingLead}
        open={Boolean(editingLead)}
        saving={savingLead}
        onClose={() => setEditingLead(null)}
        onSave={saveLead}
      />
      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete lead?"
        description="This removes the inquiry permanently from the CRM and analytics views."
        confirmLabel="Delete lead"
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteLead}
      />
    </AdminShell>
  );
}
