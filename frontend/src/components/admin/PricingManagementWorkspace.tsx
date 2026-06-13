"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, GripVertical, Plus, Sparkles, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { pricingAPI } from "@/lib/api";
import type { ManagedPricingPlan } from "@/lib/types";
import { defaultManagedPricingPlans } from "@/lib/site-defaults";
import { cn } from "@/lib/utils";
import { AdminSectionCard } from "./AdminCards";
import { ConfirmDeleteModal } from "./AdminDialogs";
import { EmptyState } from "../ui/EmptyState";
import { Skeleton } from "../ui/Skeleton";

type PricingDraft = Omit<ManagedPricingPlan, "_id" | "createdAt" | "updatedAt">;

const draftFromPlan = (plan?: ManagedPricingPlan): PricingDraft => ({
  title: plan?.title || "",
  slug: plan?.slug || "",
  shortDescription: plan?.shortDescription || "",
  price: plan?.price || "",
  billingType: plan?.billingType || "project",
  features: plan?.features || [""],
  buttonText: plan?.buttonText || "Choose Plan",
  badge: plan?.badge || "",
  isPopular: plan?.isPopular || false,
  isActive: plan?.isActive ?? true,
  order: plan?.order || 1,
});

export function PricingManagementWorkspace() {
  const [plans, setPlans] = useState<ManagedPricingPlan[]>(defaultManagedPricingPlans);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<ManagedPricingPlan | null>(null);
  const [draft, setDraft] = useState<PricingDraft>(draftFromPlan());
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ManagedPricingPlan | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const response = await pricingAPI.getAdmin();
      setPlans(response.data.pricingPlans.sort((a, b) => a.order - b.order));
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void loadPlans();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const openCreate = () => {
    setEditingPlan(null);
    setDraft(draftFromPlan({ ...defaultManagedPricingPlans[0], _id: "", title: "", slug: "", shortDescription: "", price: "", badge: "", isPopular: false, order: plans.length + 1 }));
    setModalOpen(true);
  };

  const openEdit = (plan: ManagedPricingPlan) => {
    setEditingPlan(plan);
    setDraft(draftFromPlan(plan));
    setModalOpen(true);
  };

  const savePlan = async () => {
    // Validation
    if (!draft.title?.trim()) {
      toast.error("Plan title is required");
      return;
    }
    if (!draft.price?.trim()) {
      toast.error("Price is required");
      return;
    }
    if (!draft.shortDescription?.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!draft.billingType?.trim()) {
      toast.error("Billing type is required");
      return;
    }

    const cleanedFeatures = draft.features.map((item) => item.trim()).filter(Boolean);
    if (cleanedFeatures.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    const generatedSlug = draft.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const payload = {
      ...draft,
      slug: (draft.slug || generatedSlug).trim() || generatedSlug,
      billingType: draft.billingType.trim() || "project",
      buttonText: draft.buttonText.trim() || "Choose Plan",
      features: cleanedFeatures,
    };

    try {
      if (editingPlan) {
        await pricingAPI.update(editingPlan._id, payload);
        toast.success("Pricing plan updated.");
      } else {
        await pricingAPI.create(payload);
        toast.success("Pricing plan created.");
      }

      setModalOpen(false);
      await loadPlans();
    } catch (error) {
      toast.error("Failed to save pricing plan. Please check all fields and try again.");
      console.error("Save plan error:", error);
    }
  };

  const deletePlan = async () => {
    if (!deleteTarget) return;
    await pricingAPI.delete(deleteTarget._id);
    toast.success("Pricing plan deleted.");
    setDeleteTarget(null);
    await loadPlans();
  };

  const togglePlan = async (plan: ManagedPricingPlan) => {
    await pricingAPI.toggle(plan._id);
    toast.success(plan.isActive ? "Plan archived." : "Plan activated.");
    await loadPlans();
  };

  const movePlan = async (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= plans.length) return;

    const reordered = [...plans];
    [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
    const normalized = reordered.map((plan, idx) => ({ ...plan, order: idx + 1 }));
    setPlans(normalized);
    await Promise.all(
      normalized.map((plan) => pricingAPI.update(plan._id, { order: plan.order }))
    );
    toast.success("Pricing order updated.");
  };

  const onDropPlan = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const ordered = [...plans];
    const from = ordered.findIndex((plan) => plan._id === dragId);
    const to = ordered.findIndex((plan) => plan._id === targetId);
    const [moved] = ordered.splice(from, 1);
    ordered.splice(to, 0, moved);
    const normalized = ordered.map((plan, idx) => ({ ...plan, order: idx + 1 }));
    setPlans(normalized);
    setDragId(null);
    await Promise.all(
      normalized.map((plan) => pricingAPI.update(plan._id, { order: plan.order }))
    );
    toast.success("Pricing order updated.");
  };

  const activePlans = useMemo(() => plans.filter((plan) => plan.isActive).length, [plans]);

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSectionCard
          title="Existing Pricing Levels"
          subtitle="All configured pricing cards. Drag to reorder, edit details, or activate/deactivate for the public site."
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-medium text-slate-950">{plans.length} pricing levels configured</p>
              <p className="mt-1 text-sm text-slate-600">{activePlans} currently active on the public website.</p>
            </div>
            <button type="button" onClick={openCreate} className="admin-secondary-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add new level
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-32 bg-white/10" />
              <Skeleton className="h-32 bg-white/10" />
            </div>
          ) : !plans.length ? (
            <EmptyState
              title="No pricing levels yet"
              description="Create your first pricing plan and it will become available to the public pricing page."
            />
          ) : (
            <div className="space-y-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan._id}
                  layout
                  draggable
                  onDragStart={() => setDragId(plan._id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => void onDropPlan(plan._id)}
                  className={cn(
                    "group rounded-[28px] border p-5 transition",
                    plan.isPopular
                      ? "border-sky-300/40 bg-sky-50"
                      : "border-slate-200 bg-white"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-sky-600">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xl font-semibold text-slate-950">{plan.title}</p>
                          {plan.badge ? (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950">
                              {plan.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                          {plan.shortDescription}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          <span>{plan.price}</span>
                          <span>{plan.billingType}</span>
                          <span>{plan.isActive ? "Active" : "Inactive"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => void movePlan(index, -1)} className="admin-icon-button bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200">
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => void movePlan(index, 1)} className="admin-icon-button bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200">
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => void togglePlan(plan)} className="admin-secondary-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                        {plan.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button type="button" onClick={() => openEdit(plan)} className="admin-secondary-button bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200">
                        Edit
                      </button>
                      <button type="button" onClick={() => setDeleteTarget(plan)} className="admin-danger-button">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AdminSectionCard>

        <AdminSectionCard
          title="Public Site Preview"
          subtitle="Live preview of how active pricing levels appear on the website."
        >
          <div className="space-y-4">
            {plans
              .filter((plan) => plan.isActive)
              .sort((a, b) => a.order - b.order)
              .map((plan) => (
                <div
                  key={plan._id}
                  className={cn(
                    "relative rounded-[28px] border p-5",
                    plan.isPopular
                      ? "border-sky-300/40 bg-sky-50 text-slate-950"
                      : "border-slate-200 bg-white text-slate-900"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => openEdit(plan)}
                    className="absolute right-5 top-5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition"
                  >
                    Edit
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-lg font-semibold">{plan.title}</p>
                    {plan.badge ? (
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>{plan.price}</span>
                    <span>{plan.billingType}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </AdminSectionCard>
      </div>

      {plans.length > 0 && (
        <AdminSectionCard
          title="All Pricing Plans Grid"
          subtitle="Visual overview of all configured pricing plans"
          className="mt-10"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={cn(
                  "group rounded-[24px] border p-4 transition",
                  plan.isPopular
                    ? "border-sky-300/40 bg-sky-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm sm:text-base font-semibold text-slate-950">{plan.title}</p>
                      {plan.badge && (
                        <span className="rounded-full bg-sky-600 px-2 py-1 text-[10px] font-bold text-white">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {!plan.isActive && (
                      <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700">Inactive</span>
                    )}
                    {plan.isPopular && (
                      <span className="rounded-full bg-sky-500 px-2 py-1 text-[10px] font-semibold text-white">Popular</span>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{plan.shortDescription}</p>
                <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-950">{plan.price}</p>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider">{plan.billingType}</p>
                <div className="mt-4 space-y-2">
                  {plan.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="text-[11px] sm:text-xs text-slate-600 flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0"></span>
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-[11px] text-slate-500 italic">+{plan.features.length - 3} more features</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(plan)}
                  className="mt-4 w-full rounded-[16px] border border-blue-600 bg-blue-600 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </AdminSectionCard>
      )}

      <PricingEditorModal
        open={modalOpen}
        draft={draft}
        editing={Boolean(editingPlan)}
        onClose={() => setModalOpen(false)}
        onChange={setDraft}
        onSave={savePlan}
      />

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete pricing card?"
        description="This plan will be removed from both the CMS and the public pricing page."
        confirmLabel="Delete plan"
        onClose={() => setDeleteTarget(null)}
        onConfirm={deletePlan}
      />
    </>
  );
}

function PricingEditorModal({
  open,
  draft,
  editing,
  onClose,
  onChange,
  onSave,
}: {
  open: boolean;
  draft: PricingDraft;
  editing: boolean;
  onClose: () => void;
  onChange: Dispatch<SetStateAction<PricingDraft>>;
  onSave: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="flex h-full max-h-[90vh] w-full max-w-5xl flex-col rounded-[28px] sm:rounded-[32px] border border-slate-200 bg-white text-slate-900 shadow-[0_30px_120px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 sm:px-6 py-4 sm:py-5">
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-blue-600 font-semibold">Pricing Editor</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-slate-900">
                  {editing ? "Edit Pricing Level" : "Create New Pricing Level"}
                </h3>
              </div>
              <button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-100 text-slate-900 transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-5 sm:px-6 py-5 sm:py-6">
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">Title & Price</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={draft.title}
                      onChange={(event) => onChange((current) => ({ ...current, title: event.target.value }))}
                      placeholder="e.g., Starter Plan"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                    <input
                      value={draft.price}
                      onChange={(event) => onChange((current) => ({ ...current, price: event.target.value }))}
                      placeholder="e.g., $29/month"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">URL Slug & Billing</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={draft.slug}
                      onChange={(event) => onChange((current) => ({ ...current, slug: event.target.value }))}
                      placeholder="auto-generated"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                    <input
                      value={draft.billingType}
                      onChange={(event) => onChange((current) => ({ ...current, billingType: event.target.value }))}
                      placeholder="e.g., per month, per project"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">Description</label>
                  <textarea
                    value={draft.shortDescription}
                    onChange={(event) => onChange((current) => ({ ...current, shortDescription: event.target.value }))}
                    placeholder="Brief plan summary that appears on the pricing page"
                    className="min-h-24 sm:min-h-28 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition resize-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">Button & Badge</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={draft.buttonText}
                      onChange={(event) => onChange((current) => ({ ...current, buttonText: event.target.value }))}
                      placeholder="e.g., Get Started"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                    <input
                      value={draft.badge}
                      onChange={(event) => onChange((current) => ({ ...current, badge: event.target.value }))}
                      placeholder="e.g., Most Popular (optional)"
                      className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-blue-600">Features Included</label>
                    <button
                      type="button"
                      onClick={() => onChange((current) => ({ ...current, features: [...current.features, ""] }))}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>
                  <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      {draft.features.map((feature, index) => (
                        <div key={`${index}-${feature}`} className="flex gap-2 sm:gap-3">
                          <input
                            value={feature}
                            onChange={(event) =>
                              onChange((current) => ({
                                ...current,
                                features: current.features.map((item, idx) =>
                                  idx === index ? event.target.value : item
                                ),
                              }))
                            }
                            className="h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition flex-1"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              onChange((current) => ({
                                ...current,
                                features: current.features.filter((_, idx) => idx !== index),
                              }))
                            }
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-900 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">Options</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 sm:p-4 cursor-pointer transition hover:bg-slate-100">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-900">Mark as Popular</span>
                        <input
                          type="checkbox"
                          checked={draft.isPopular}
                          onChange={(event) => onChange((current) => ({ ...current, isPopular: event.target.checked }))}
                          className="h-4 w-4 rounded cursor-pointer"
                        />
                      </div>
                    </label>
                    <label className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 sm:p-4 cursor-pointer transition hover:bg-slate-100">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-900">Show on Website</span>
                        <input
                          type="checkbox"
                          checked={draft.isActive}
                          onChange={(event) => onChange((current) => ({ ...current, isActive: event.target.checked }))}
                          className="h-4 w-4 rounded cursor-pointer"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-600 font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Live Preview
                </div>
                <div className="mt-4 sm:mt-5 rounded-[24px] border border-blue-200 bg-white p-4 sm:p-6">
                  {draft.badge ? (
                    <div className="mb-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white">
                      {draft.badge}
                    </div>
                  ) : null}
                  <p className="text-lg sm:text-2xl font-semibold text-slate-900">{draft.title || "Plan title"}</p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-700">
                    {draft.shortDescription || "Plan summary preview appears here."}
                  </p>
                  <p className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-black text-blue-600">{draft.price || "$0"}</p>
                  <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                    {draft.features.filter(Boolean).map((feature) => (
                      <div key={feature} className="rounded-2xl bg-blue-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 border border-blue-200">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
            </div>

            <div className="border-t border-slate-200 px-5 sm:px-6 py-4 sm:py-5 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition">
                Cancel
              </button>
              <button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                {editing ? "Update" : "Create"} Pricing Level
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}



