"use client";

import { useState } from "react";
import { Save, Home, Image, Info, Mail, Palette, X } from "lucide-react";
import toast from "react-hot-toast";
import { websiteSettingsAPI } from "@/lib/api";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";
import { AdminSectionCard } from "./AdminCards";

export function WebsiteSettingsWorkspace() {
  const { settings, setSettings, loading } = useWebsiteSettings();
  const [activeTab, setActiveTab] = useState<"business" | "hero" | "about" | "contact" | "branding">("business");
  const [previewOpen, setPreviewOpen] = useState(false);

  const updateBusinessInfo = (field: keyof typeof settings.businessInfo, value: string) => {
    setSettings((current) => ({
      ...current,
      businessInfo: {
        ...current.businessInfo,
        [field]: value,
      },
    }));
  };

  const updateHero = (field: keyof typeof settings.heroSection, value: string) => {
    setSettings((current) => ({
      ...current,
      heroSection: {
        ...current.heroSection,
        [field]: value,
      },
    }));
  };

  const updateAbout = (field: "title" | "description", value: string) => {
    setSettings((current) => ({
      ...current,
      aboutSection: {
        ...current.aboutSection,
        [field]: value,
      },
    }));
  };

  const updateAboutBullet = (index: number, value: string) => {
    setSettings((current) => ({
      ...current,
      aboutSection: {
        ...current.aboutSection,
        bullets: current.aboutSection.bullets.map((bullet, bulletIndex) =>
          bulletIndex === index ? value : bullet
        ),
      },
    }));
  };

  const updateAboutCard = (index: number, field: "title" | "body", value: string) => {
    setSettings((current) => ({
      ...current,
      aboutSection: {
        ...current.aboutSection,
        cards: current.aboutSection.cards.map((card, cardIndex) =>
          cardIndex === index ? { ...card, [field]: value } : card
        ),
      },
    }));
  };

  const updateContact = (field: keyof typeof settings.contactInfo, value: string) => {
    setSettings((current) => ({
      ...current,
      contactInfo: {
        ...current.contactInfo,
        [field]: value,
      },
    }));
  };

  const updateSocial = (field: keyof typeof settings.socialLinks, value: string) => {
    setSettings((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [field]: value,
      },
    }));
  };

  const updateBranding = (field: keyof typeof settings.branding, value: string) => {
    setSettings((current) => ({
      ...current,
      branding: {
        ...current.branding,
        [field]: value,
      },
    }));
  };

  const updateSeo = (field: keyof typeof settings.seoSettings, value: string) => {
    setSettings((current) => {
      if (field === "keywords") {
        return {
          ...current,
          seoSettings: {
            ...current.seoSettings,
            keywords: value.split(",").map((item) => item.trim()).filter(Boolean),
          },
        };
      }

      return {
        ...current,
        seoSettings: {
          ...current.seoSettings,
          [field]: value,
        },
      };
    });
  };

  const saveSettings = async () => {
    try {
      await websiteSettingsAPI.update(settings);
      toast.success("Website settings updated.");
    } catch (error) {
      toast.error("Unable to save website settings. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="admin-panel h-[560px]" />;
  }

  function Tab({ id, label, Icon }: { id: string; label: string; Icon?: any }) {
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id as any)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
          activeTab === id ? "bg-sky-600 text-white" : "bg-slate-50 text-slate-700"
        }`}
      >
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Tab id="business" label="Business" Icon={Home} />
        <Tab id="hero" label="Hero" Icon={Image} />
        <Tab id="about" label="About" Icon={Info} />
        <Tab id="contact" label="Contact & Social" Icon={Mail} />
        <Tab id="branding" label="Branding & SEO" Icon={Palette} />
      </div>

      <div>
        {activeTab === "business" && (
          <AdminSectionCard
            title="Business details"
            subtitle="Update company branding, website name, and footer messaging."
          >
            <div className="grid gap-4">
              <Input label="Website Name" value={settings.businessInfo.websiteName} onChange={(value) => updateBusinessInfo("websiteName", value)} />
              <Input label="Company Name" value={settings.businessInfo.companyName} onChange={(value) => updateBusinessInfo("companyName", value)} />
              <Input label="Tagline" value={settings.businessInfo.tagline} onChange={(value) => updateBusinessInfo("tagline", value)} />
              <TextArea label="Footer description" value={settings.businessInfo.footerDescription} onChange={(value) => updateBusinessInfo("footerDescription", value)} />
            </div>
          </AdminSectionCard>
        )}

        {activeTab === "hero" && (
          <AdminSectionCard
            title="Hero section"
            subtitle="Control the top-of-funnel message, links, and background art."
          >
            <div className="grid gap-4">
              <Input label="Badge" value={settings.heroSection.badge} onChange={(value) => updateHero("badge", value)} />
              <Input label="Title" value={settings.heroSection.title} onChange={(value) => updateHero("title", value)} />
              <Input label="Highlight text" value={settings.heroSection.highlightText} onChange={(value) => updateHero("highlightText", value)} />
              <TextArea label="Description" value={settings.heroSection.description} onChange={(value) => updateHero("description", value)} />
              <Input label="Primary button text" value={settings.heroSection.primaryButtonText} onChange={(value) => updateHero("primaryButtonText", value)} />
              <Input label="Primary button link" value={settings.heroSection.primaryButtonLink} onChange={(value) => updateHero("primaryButtonLink", value)} />
              <Input label="Secondary button text" value={settings.heroSection.secondaryButtonText} onChange={(value) => updateHero("secondaryButtonText", value)} />
              <Input label="Secondary button link" value={settings.heroSection.secondaryButtonLink} onChange={(value) => updateHero("secondaryButtonLink", value)} />
              <Input label="Background image URL" value={settings.heroSection.backgroundImage} onChange={(value) => updateHero("backgroundImage", value)} />
              <Input label="Dashboard preview URL" value={settings.heroSection.dashboardPreview || ""} onChange={(value) => updateHero("dashboardPreview", value)} />
            </div>
          </AdminSectionCard>
        )}

        {activeTab === "about" && (
          <AdminSectionCard
            title="About section"
            subtitle="Edit your primary about copy, bullets, and content cards."
          >
            <div className="grid gap-4">
              <Input label="Title" value={settings.aboutSection.title} onChange={(value) => updateAbout("title", value)} />
              <TextArea label="Description" value={settings.aboutSection.description} onChange={(value) => updateAbout("description", value)} />
              <div className="grid gap-3">
                {settings.aboutSection.bullets.map((bullet, index) => (
                  <Input key={index} label={`Bullet ${index + 1}`} value={bullet} onChange={(value) => updateAboutBullet(index, value)} />
                ))}
              </div>
              <div className="grid gap-3">
                {settings.aboutSection.cards.map((card, index) => (
                  <div key={card.title || index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <Input label={`Card ${index + 1} title`} value={card.title} onChange={(value) => updateAboutCard(index, "title", value)} />
                    <TextArea label={`Card ${index + 1} body`} value={card.body} onChange={(value) => updateAboutCard(index, "body", value)} />
                  </div>
                ))}
              </div>
            </div>
          </AdminSectionCard>
        )}

        {activeTab === "contact" && (
          <AdminSectionCard
            title="Contact and social"
            subtitle="Keep your public contact details and social links up to date."
          >
            <div className="grid gap-4">
              <Input label="Business email" value={settings.contactInfo.businessEmail} onChange={(value) => updateContact("businessEmail", value)} />
              <Input label="Support email" value={settings.contactInfo.supportEmail} onChange={(value) => updateContact("supportEmail", value)} />
              <Input label="Phone number" value={settings.contactInfo.phoneNumber} onChange={(value) => updateContact("phoneNumber", value)} />
              <Input label="WhatsApp number" value={settings.contactInfo.whatsappNumber} onChange={(value) => updateContact("whatsappNumber", value)} />
              <Input label="Office address" value={settings.contactInfo.officeAddress} onChange={(value) => updateContact("officeAddress", value)} />
              <Input label="Google Maps link" value={settings.contactInfo.googleMapsLink} onChange={(value) => updateContact("googleMapsLink", value)} />
              <Input label="Facebook" value={settings.socialLinks.facebook} onChange={(value) => updateSocial("facebook", value)} />
              <Input label="Instagram" value={settings.socialLinks.instagram} onChange={(value) => updateSocial("instagram", value)} />
              <Input label="LinkedIn" value={settings.socialLinks.linkedIn} onChange={(value) => updateSocial("linkedIn", value)} />
              <Input label="Twitter" value={settings.socialLinks.twitter} onChange={(value) => updateSocial("twitter", value)} />
              <Input label="YouTube" value={settings.socialLinks.youtube} onChange={(value) => updateSocial("youtube", value)} />
            </div>
          </AdminSectionCard>
        )}

        {activeTab === "branding" && (
          <AdminSectionCard
            title="Branding and SEO"
            subtitle="Update site visuals, colors, and metadata for search engines."
          >
            <div className="grid gap-4">
              <Input label="Logo URL" value={settings.branding.logo} onChange={(value) => updateBranding("logo", value)} />
              <Input label="Favicon URL" value={settings.branding.favicon} onChange={(value) => updateBranding("favicon", value)} />
              <Input label="Footer logo URL" value={settings.branding.footerLogo} onChange={(value) => updateBranding("footerLogo", value)} />
              <Input label="Primary color" value={settings.branding.primaryColor} onChange={(value) => updateBranding("primaryColor", value)} />
              <Input label="Secondary color" value={settings.branding.secondaryColor} onChange={(value) => updateBranding("secondaryColor", value)} />
              <Input label="Open Graph image URL" value={settings.branding.ogImage} onChange={(value) => updateBranding("ogImage", value)} />
              <Input label="Meta title" value={settings.seoSettings.metaTitle} onChange={(value) => updateSeo("metaTitle", value)} />
              <TextArea label="Meta description" value={settings.seoSettings.metaDescription} onChange={(value) => updateSeo("metaDescription", value)} />
              <TextArea label="Meta keywords (comma separated)" value={settings.seoSettings.keywords.join(", ")} onChange={(value) => updateSeo("keywords", value)} />
            </div>
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => void saveSettings()} className="admin-secondary-button bg-sky-400/20 text-white">
                <Save className="h-4 w-4" />
                Save website settings
              </button>
            </div>
          </AdminSectionCard>
        )}
      </div>
    </div>
  );
}

// Persistent action bar and preview modal
function ActionBar({ onPreview, onSave }: { onPreview: () => void; onSave: () => void }) {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3">
      <button onClick={onPreview} className="admin-secondary-button bg-slate-800 text-white px-3 py-2 rounded-md">
        Preview
      </button>
      <button onClick={onSave} className="admin-primary-button bg-sky-600 text-white px-3 py-2 rounded-md flex items-center gap-2">
        <Save className="h-4 w-4" />
        Save
      </button>
    </div>
  );
}

function PreviewModal({ settings, onClose }: { settings: any; onClose: () => void }) {
  const hero = settings.heroSection || {};
  const titleParts = hero.title ? hero.title.split(hero.highlightText || "") : ["", ""];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-50 max-w-3xl w-full rounded-lg overflow-hidden bg-white text-slate-900">
        <div className="p-4 flex justify-between items-center border-b"><h3 className="font-semibold">Live preview</h3><button onClick={onClose}><X className="h-5 w-5"/></button></div>
        <div className="p-6">
          <section className="rounded-md overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <p className="text-xs uppercase text-sky-300">{hero.badge}</p>
            <h1 className="mt-3 text-2xl font-bold">
              {titleParts[0]}
              <span className="text-sky-300">{hero.highlightText}</span>
              {titleParts.slice(1).join(hero.highlightText || "")}
            </h1>
            <p className="mt-2 text-sm text-slate-200">{hero.description}</p>
            <div className="mt-4 flex gap-3">
              <a className="rounded-md bg-white text-slate-900 px-3 py-2" href={hero.primaryButtonLink || '#'}>{hero.primaryButtonText || 'Primary'}</a>
              <a className="rounded-md border border-white/30 text-white px-3 py-2" href={hero.secondaryButtonLink || '#'}>{hero.secondaryButtonText || 'Secondary'}</a>
            </div>
          </section>
        </div>
      </div>
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
      <span className="text-sm text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="admin-input w-full"
      />
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
      <span className="text-sm text-slate-400">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="admin-input min-h-28 w-full py-3"
      />
    </label>
  );
}
