export type PlanTier = string;

export type LeadStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface NavLink {
  href: string;
  label: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  summary: string;
  description: string;
  highlight?: boolean;
  timeline: string;
  idealFor: string;
  features: string[];
  metrics: string[];
  cta: string;
}

export interface ManagedPricingPlan {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  price: string;
  billingType: string;
  features: string[];
  buttonText: string;
  badge: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettings {
  _id?: string;
  businessInfo: {
    websiteName: string;
    companyName: string;
    tagline: string;
    aboutText: string;
    footerDescription: string;
  };
  heroSection: {
    badge: string;
    title: string;
    highlightText: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundImage: string;
    dashboardPreview?: string;
  };
  aboutSection: {
    title: string;
    description: string;
    bullets: string[];
    cards: Array<{
      title: string;
      body: string;
    }>;
  };
  contactInfo: {
    businessEmail: string;
    supportEmail: string;
    phoneNumber: string;
    whatsappNumber: string;
    officeAddress: string;
    googleMapsLink: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedIn: string;
    twitter: string;
    youtube: string;
  };
  branding: {
    logo: string;
    favicon: string;
    footerLogo: string;
    primaryColor: string;
    secondaryColor: string;
    ogImage: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  services: Service[];
  caseStudies: Array<{
    id: string;
    title: string;
    category: string;
    summary: string;
    outcomes: string[];
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  stat: string;
  icon: "layers" | "workflow" | "chart" | "shield";
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image?: string;
  summary: string;
  challenge: string;
  outcomes: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  selectedPlan: PlanTier;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  requirements?: string;
  source?: "Website Inquiry" | "Contact Form" | "Manual Entry";
}

export interface Inquiry extends InquiryFormData {
  _id: string;
  status: LeadStatus;
  source: "Website Inquiry" | "Contact Form" | "Manual Entry";
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface OverviewTotals {
  leads: number;
  contacts: number;
  newInquiries: number;
  activeProjects: number;
  monthlyInquiries: number;
}

export interface MonthlyInquiry {
  label: string;
  year: number;
  month: number;
  leads: number;
}

export interface DashboardStats {
  totals: OverviewTotals;
  leadsByStatus: Record<LeadStatus, number>;
  leadsByPlan: Array<{ _id: string; count: number }>;
  monthlyInquiries: MonthlyInquiry[];
  recentLeads: Inquiry[];
}

export interface InquiryFilters {
  status?: LeadStatus | "";
  plan?: PlanTier | "";
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager";
  createdAt: string;
  lastLogin?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface InquiryListResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    pages: number;
    leads: Inquiry[];
    inquiries: Inquiry[];
  };
}

export interface InquiryStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    admin: AdminProfile;
  };
}

export interface ContactListResponse {
  success: boolean;
  message: string;
  data: {
    contacts: Contact[];
    total: number;
  };
}

export interface PricingPlanListResponse {
  success: boolean;
  message: string;
  data: {
    pricingPlans: ManagedPricingPlan[];
  };
}

export interface WebsiteSettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: WebsiteSettings;
  };
}
