"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";

export function DynamicContactInfoPanel() {
  const { settings } = useWebsiteSettings();

  return (
    <div className="surface-panel p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
        Contact
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {settings.businessInfo.companyName}
      </h1>
      <p className="mt-5 text-base leading-7 text-slate-600">
        {settings.businessInfo.aboutText}
      </p>

      <div className="mt-8 space-y-5">
        {[
          { icon: Mail, label: "Email", value: settings.contactInfo.businessEmail },
          { icon: Phone, label: "Phone", value: settings.contactInfo.phoneNumber },
          { icon: MapPin, label: "Office", value: settings.contactInfo.officeAddress },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-4 rounded-3xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Icon className="h-5 w-5 text-sky-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <p className="mt-1 text-sm text-slate-600">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="#contact-form"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white"
      >
        Send your project brief
      </Link>
    </div>
  );
}
