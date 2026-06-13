import type { ManagedPricingPlan, WebsiteSettings } from "./types";

export const defaultWebsiteSettings: WebsiteSettings = {
  businessInfo: {
    websiteName: "Yoflix",
    companyName: "Yoflix Studio",
    tagline: "Premium websites and CRM systems for ambitious businesses.",
    aboutText:
      "We design high-trust digital experiences that help serious businesses look credible and convert better.",
    footerDescription:
      "We build premium business websites, polished pricing pages, and CRM-grade admin experiences that support real growth.",
  },
  heroSection: {
    badge: "Premium digital systems",
    title: "We build real websites that bring real clients.",
    highlightText: "real websites",
    description:
      "No fake templates and no throwaway admin panels. We design high-trust websites and operating surfaces for businesses that want cleaner growth.",
    primaryButtonText: "Start a project",
    primaryButtonLink: "/contact",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "/services",
    backgroundImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
    dashboardPreview:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
  },
  aboutSection: {
    title: "We create websites for real businesses.",
    description:
      "Yoflix helps businesses build stronger online presence through clean design, modern delivery, and conversion-focused systems.",
    bullets: [
      "Business websites",
      "Modern responsive design",
      "Fast delivery",
      "Long-term support",
    ],
    cards: [
      {
        title: "Professional Design",
        body: "Minimal, premium, and credible layouts designed around trust.",
      },
      {
        title: "Mobile Ready",
        body: "Every project is built mobile-first for modern users and real buying behavior.",
      },
      {
        title: "Business Focused",
        body: "Design decisions are shaped by commercial clarity, not decorative noise.",
      },
    ],
  },
  contactInfo: {
    businessEmail: "hello@yoflix.com",
    supportEmail: "support@yoflix.com",
    phoneNumber: "+92 300 1234567",
    whatsappNumber: "+92 300 1234567",
    officeAddress: "Lahore, Pakistan",
    googleMapsLink: "https://maps.google.com",
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedIn: "",
    twitter: "",
    youtube: "",
  },
  branding: {
    logo: "",
    favicon: "",
    footerLogo: "",
    primaryColor: "#2563eb",
    secondaryColor: "#0f172a",
    ogImage: "",
  },
  seoSettings: {
    metaTitle: "Yoflix | Premium Business Websites and CRM Systems",
    metaDescription:
      "Yoflix creates premium websites, pricing funnels, and CRM-backed admin systems for serious business growth.",
    keywords: ["web design", "crm dashboard", "business website", "admin panel"],
  },
  services: [
    {
      id: "positioning",
      title: "Brand and product positioning",
      eyebrow: "Strategy",
      description:
        "We turn broad offers into clear, premium narratives that buyers can understand in one pass.",
      bullets: ["Messaging architecture", "Offer packaging", "Conversion hierarchy"],
      stat: "Messaging before pixels",
      icon: "layers",
    },
    {
      id: "experience",
      title: "Website and funnel experience",
      eyebrow: "Design",
      description:
        "We design business websites that feel product-grade, not brochure-grade, across every breakpoint.",
      bullets: ["Interaction design", "Premium responsive UI", "Inquiry journey"],
      stat: "Built for serious buyers",
      icon: "workflow",
    },
    {
      id: "delivery",
      title: "Full-stack implementation",
      eyebrow: "Engineering",
      description:
        "We ship performant frontends, dependable APIs, and admin tooling that your team can actually use.",
      bullets: ["Next.js and Node", "Database-backed forms", "Reusable architecture"],
      stat: "Production-minded code",
      icon: "chart",
    },
    {
      id: "ops",
      title: "CRM and lead operations",
      eyebrow: "Operations",
      description:
        "We connect marketing and sales handoff with structure, visibility, and cleaner follow-through.",
      bullets: ["Lead triage", "Status workflows", "Dashboard reporting"],
      stat: "From inquiry to pipeline",
      icon: "shield",
    },
  ],
  caseStudies: [
    {
      id: "atlas",
      title: "Atlas Operations Platform",
      category: "B2B SaaS",
      summary:
        "Repositioned a generic software site into a sharper platform narrative with stronger demo conversion.",
      outcomes: ["31% lift in demo requests", "Clearer enterprise proof", "Better lead routing"],
    },
    {
      id: "meridian",
      title: "Meridian Capital Advisory",
      category: "Professional Services",
      summary:
        "Built a more executive-looking digital presence for a consultancy competing on trust and clarity.",
      outcomes: ["Higher contact quality", "Sharper service packaging", "Mobile experience fixed"],
    },
    {
      id: "pulse",
      title: "Pulse Commerce Engine",
      category: "Growth Product",
      summary:
        "Designed a more product-led web experience with stronger feature communication and pricing confidence.",
      outcomes: ["More plan selections", "Lower bounce on pricing", "Improved trust signals"],
    },
  ],
};

export const defaultManagedPricingPlans: ManagedPricingPlan[] = [
  {
    _id: "default-level-1",
    title: "Level 1",
    slug: "level-1",
    shortDescription: "Launch-ready business presence for serious teams.",
    price: "$6.5k",
    billingType: "project",
    features: [
      "Custom website strategy and messaging",
      "Five premium marketing pages",
      "Responsive design system and motion pass",
      "Lead capture form with CRM handoff",
    ],
    buttonText: "Choose Level 1",
    badge: "",
    isPopular: false,
    isActive: true,
    order: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "default-level-2",
    title: "Level 2",
    slug: "level-2",
    shortDescription: "Growth stack for teams that need stronger storytelling and CRM structure.",
    price: "$12k",
    billingType: "project",
    features: [
      "Everything in Level 1",
      "Expanded case studies and proof sections",
      "Advanced inquiry qualification fields",
      "Admin dashboard with lead workflow states",
    ],
    buttonText: "Choose Level 2",
    badge: "Most Popular",
    isPopular: true,
    isActive: true,
    order: 2,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "default-level-3",
    title: "Level 3",
    slug: "level-3",
    shortDescription: "High-trust platform and operating layer for established businesses.",
    price: "$20k+",
    billingType: "project",
    features: [
      "Everything in Level 2",
      "Deeper UX refinement and interaction systems",
      "Extended admin workflows and reporting",
      "Launch support and iteration window",
    ],
    buttonText: "Discuss Level 3",
    badge: "Executive",
    isPopular: false,
    isActive: true,
    order: 3,
    createdAt: "",
    updatedAt: "",
  },
];
