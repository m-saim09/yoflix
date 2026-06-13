"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { PricingManagementWorkspace } from "@/components/admin/PricingManagementWorkspace";

export default function PricingManagementPage() {
  return (
    <AdminShell
      title="Pricing management"
      description="Run your pricing cards like a product surface with activation controls, editing, ordering, and live preview."
    >
      <PricingManagementWorkspace />
    </AdminShell>
  );
}
