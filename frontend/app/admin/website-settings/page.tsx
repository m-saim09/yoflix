"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { WebsiteSettingsWorkspace } from "@/components/admin/WebsiteSettingsWorkspace";

export default function WebsiteSettingsPage() {
  return (
    <AdminShell
      title="Website settings"
      description="Control company information, branding assets, colors, social links, and SEO from one CMS-style workspace."
    >
      <WebsiteSettingsWorkspace />
    </AdminShell>
  );
}
