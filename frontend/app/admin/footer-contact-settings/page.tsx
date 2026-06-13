"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { FooterContactWorkspace } from "@/components/admin/FooterContactWorkspace";

export default function FooterContactSettingsPage() {
  return (
    <AdminShell
      title="Footer and contact settings"
      description="Keep the public website’s footer copy, contact details, maps link, and social channels aligned with the business."
    >
      <FooterContactWorkspace />
    </AdminShell>
  );
}
