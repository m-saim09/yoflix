"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Mail, Phone, PencilLine, Save, Trash2, X } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BUDGET_RANGES, PLAN_OPTIONS, PROJECT_TYPES, TIMELINE_OPTIONS } from "@/lib/constants";
import { formatDatetime, validateEmail, validatePhone } from "@/lib/utils";
import type { Inquiry, LeadStatus, PlanTier } from "@/lib/types";

const statusOptions: LeadStatus[] = ["New", "Contacted", "In Progress", "Closed"];
const sourceOptions: Inquiry["source"][] = ["Website Inquiry", "Contact Form", "Manual Entry"];

interface LeadEditFormValues {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  selectedPlan: PlanTier;
  projectType: string;
  budget: string;
  timeline: string;
  status: LeadStatus;
  source: Inquiry["source"];
  message: string;
  requirements: string;
}

const getLeadFormValues = (lead: Inquiry): LeadEditFormValues => ({
  fullName: lead.fullName,
  email: lead.email,
  phone: lead.phone,
  companyName: lead.companyName,
  selectedPlan: lead.selectedPlan,
  projectType: lead.projectType,
  budget: lead.budget,
  timeline: lead.timeline,
  status: lead.status,
  source: lead.source,
  message: lead.message,
  requirements: lead.requirements || "",
});

const validateLeadForm = (values: LeadEditFormValues) => {
  const errors: Partial<Record<keyof LeadEditFormValues, string>> = {};

  if (values.fullName.trim().length < 2) errors.fullName = "Name must be at least 2 characters.";
  if (!validateEmail(values.email)) errors.email = "Enter a valid email.";
  if (!validatePhone(values.phone)) errors.phone = "Enter a valid phone number.";
  if (values.companyName.trim().length < 2) errors.companyName = "Company name is required.";
  if (!values.projectType.trim()) errors.projectType = "Project type is required.";
  if (values.message.trim().split(/\s+/).filter(Boolean).length < 20) {
    errors.message = "Description should be at least 20 words for proper lead context.";
  }

  return errors;
};

export function LeadDetailsModal({
  lead,
  onClose,
  onEdit,
}: {
  lead: Inquiry | null;
  onClose: () => void;
  onEdit?: (lead: Inquiry) => void;
}) {
  return (
    <AnimatePresence>
      {lead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="admin-scrollbar w-full max-w-4xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] max-h-[90vh]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Lead detail</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-900">{lead.fullName}</h3>
                <p className="mt-2 text-sm text-slate-500">{lead.companyName}</p>
              </div>
              <div className="flex items-center gap-2">
                {onEdit ? (
                  <button
                    type="button"
                    onClick={() => onEdit(lead)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit lead
                  </button>
                ) : null}
                <button type="button" onClick={onClose} className="admin-icon-button">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="Email" value={lead.email} icon={<Mail className="h-4 w-4" />} />
              <InfoCard label="Phone" value={lead.phone} icon={<Phone className="h-4 w-4" />} />
              <InfoCard label="Plan" value={lead.selectedPlan} />
              <InfoCard label="Status" value={<StatusBadge status={lead.status} />} />
              <InfoCard label="Project type" value={lead.projectType} />
              <InfoCard label="Budget" value={lead.budget} />
              <InfoCard label="Timeline" value={lead.timeline} />
              <InfoCard label="Source" value={lead.source} />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoCard label="Received" value={formatDatetime(lead.createdAt)} />
              <InfoCard label="Updated" value={formatDatetime(lead.updatedAt)} />
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Full project description</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{lead.message}</p>
            </div>

            <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Requirements</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {lead.requirements || "No additional requirements were provided."}
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function LeadEditModal({
  lead,
  open,
  saving,
  onClose,
  onSave,
}: {
  lead: Inquiry | null;
  open: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (payload: LeadEditFormValues) => Promise<void>;
}) {
  const [form, setForm] = useState<LeadEditFormValues | null>(lead ? getLeadFormValues(lead) : null);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadEditFormValues, string>>>({});

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setForm(lead ? getLeadFormValues(lead) : null);
    setErrors({});
  }, [lead, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const updateField = <K extends keyof LeadEditFormValues>(key: K, value: LeadEditFormValues[K]) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSubmit = async () => {
    if (!form) return;

    const nextErrors = validateLeadForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    await onSave({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      companyName: form.companyName.trim(),
      projectType: form.projectType.trim(),
      message: form.message.trim(),
      requirements: form.requirements.trim(),
    });
  };

  return (
    <AnimatePresence>
      {open && lead && form ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="admin-scrollbar w-full max-w-5xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] max-h-[92vh]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Edit lead</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-900">Update inquiry details</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Keep the full lead record accurate with rich project details and status updates.
                </p>
              </div>
              <button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Full name" error={errors.fullName}>
                <input
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
              <Field label="Company name" error={errors.companyName}>
                <input
                  value={form.companyName}
                  onChange={(event) => updateField("companyName", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
              <Field label="Plan">
                <select
                  value={form.selectedPlan}
                  onChange={(event) => updateField("selectedPlan", event.target.value as PlanTier)}
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {PLAN_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value as LeadStatus)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {statusOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Project type" error={errors.projectType}>
                <select
                  value={form.projectType}
                  onChange={(event) => updateField("projectType", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {PROJECT_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Budget">
                <select
                  value={form.budget}
                  onChange={(event) => updateField("budget", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {BUDGET_RANGES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Timeline">
                <select
                  value={form.timeline}
                  onChange={(event) => updateField("timeline", event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {TIMELINE_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Source">
                <select
                  value={form.source}
                  onChange={(event) => updateField("source", event.target.value as Inquiry["source"])}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                >
                  {sourceOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.75fr_1fr]">
              <Field label="Project description" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  rows={10}
                  className="w-full min-h-[260px] rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
              <Field label="Requirements">
                <textarea
                  value={form.requirements}
                  onChange={(event) => updateField("requirements", event.target.value)}
                  rows={10}
                  className="w-full min-h-[260px] rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                disabled={saving}
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function ConfirmDeleteModal({
  open,
  title,
  description,
  confirmLabel,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.15)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <Trash2 className="h-4 w-4" />
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500">
        {icon}
        {label}
      </p>
      <div className="mt-3 text-sm text-slate-700">{value}</div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      {children}
      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </label>
  );
}
