"use client";

import { MessageSquareQuote, Save } from "lucide-react";
import toast from "react-hot-toast";
import { websiteSettingsAPI } from "@/lib/api";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";
import { AdminSectionCard } from "./AdminCards";

export function FooterContactWorkspace() {
  const { settings, setSettings, loading } = useWebsiteSettings();

  const update = (section: "businessInfo" | "contactInfo" | "socialLinks", field: string, value: string) => {
    setSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const save = async () => {
    await websiteSettingsAPI.update(settings);
    toast.success("Footer and contact settings updated.");
  };

  if (loading) {
    return <div className="admin-panel h-[540px]" />;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <AdminSectionCard
        title="Footer and contact controls"
        subtitle="Adjust the most visible operational website details without touching code."
      >
        <div className="grid gap-4">
          <TextArea label="Footer Description" value={settings.businessInfo.footerDescription} onChange={(value) => update("businessInfo", "footerDescription", value)} />
          <Input label="Business Email" value={settings.contactInfo.businessEmail} onChange={(value) => update("contactInfo", "businessEmail", value)} />
          <Input label="Support Email" value={settings.contactInfo.supportEmail} onChange={(value) => update("contactInfo", "supportEmail", value)} />
          <Input label="Phone Number" value={settings.contactInfo.phoneNumber} onChange={(value) => update("contactInfo", "phoneNumber", value)} />
          <Input label="WhatsApp Number" value={settings.contactInfo.whatsappNumber} onChange={(value) => update("contactInfo", "whatsappNumber", value)} />
          <Input label="Office Address" value={settings.contactInfo.officeAddress} onChange={(value) => update("contactInfo", "officeAddress", value)} />
          <Input label="Google Maps Link" value={settings.contactInfo.googleMapsLink} onChange={(value) => update("contactInfo", "googleMapsLink", value)} />
          <Input label="Facebook" value={settings.socialLinks.facebook} onChange={(value) => update("socialLinks", "facebook", value)} />
          <Input label="Instagram" value={settings.socialLinks.instagram} onChange={(value) => update("socialLinks", "instagram", value)} />
          <Input label="LinkedIn" value={settings.socialLinks.linkedIn} onChange={(value) => update("socialLinks", "linkedIn", value)} />
          <Input label="Twitter / X" value={settings.socialLinks.twitter} onChange={(value) => update("socialLinks", "twitter", value)} />
          <Input label="YouTube" value={settings.socialLinks.youtube} onChange={(value) => update("socialLinks", "youtube", value)} />
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={() => void save()} className="admin-secondary-button bg-sky-400/20 text-white">
            <Save className="h-4 w-4" />
            Save footer & contact
          </button>
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        title="Footer preview"
        subtitle="A tighter preview of the footer contact stack and messaging."
      >
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <MessageSquareQuote className="h-5 w-5 text-sky-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sky-200/70">Footer Summary</p>
              <p className="mt-2 text-xl font-semibold">{settings.businessInfo.companyName}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">{settings.businessInfo.footerDescription}</p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">{settings.contactInfo.businessEmail}</p>
              <p className="mt-1 text-sm text-slate-400">{settings.contactInfo.phoneNumber}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">{settings.contactInfo.officeAddress}</p>
              <p className="mt-1 text-sm text-slate-400">{settings.contactInfo.googleMapsLink}</p>
            </div>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-slate-300">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="admin-input w-full" />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-slate-300">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="admin-input min-h-28 w-full py-3" />
    </label>
  );
}
