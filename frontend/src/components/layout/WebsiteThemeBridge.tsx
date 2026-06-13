"use client";

import { useEffect } from "react";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";

export function WebsiteThemeBridge() {
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--site-primary",
      settings.branding.primaryColor || "#2563eb"
    );
    document.documentElement.style.setProperty(
      "--site-secondary",
      settings.branding.secondaryColor || "#0f172a"
    );
  }, [settings.branding.primaryColor, settings.branding.secondaryColor]);

  return null;
}
