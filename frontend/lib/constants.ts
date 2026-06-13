import type {
  CaseStudy,
  FAQ,
  NavLink,
  PricingPlan,
  ProcessStep,
  Service,
  Testimonial,
} from "./types";

export const SITE_NAME = "Yoflix";

export const NAVIGATION_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const PLAN_OPTIONS = ["Level 1", "Level 2", "Level 3"] as const;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "level-1",
    name: "Level 1",
    price: "$6.5k",
    summary: "Launch-ready business presence",
    description:
      "For teams that need a serious website, clear service positioning, and a conversion-focused inquiry flow.",
    timeline: "3-4 weeks",
    idealFor: "Early-stage companies and local service brands",
    features: [
      "Custom website strategy and messaging",
      "Five premium marketing pages",
      "Responsive design system and motion pass",
      "Lead capture form with CRM handoff",
      "Technical SEO setup and launch QA",
    ],
    metrics: ["Fastest launch", "Best for validation", "Foundational CRM"],
    cta: "Choose Level 1",
  },
  {
    id: "level-2",
    name: "Level 2",
    price: "$12k",
    summary: "Growth stack for scaling teams",
    description:
      "For teams that need stronger storytelling, deeper service architecture, and a better-qualified sales pipeline.",
    highlight: true,
    timeline: "5-7 weeks",
    idealFor: "Growth-stage SaaS, agencies, and B2B operators",
    features: [
      "Everything in Level 1",
      "Expanded case studies and proof sections",
      "Advanced inquiry qualification fields",
      "Admin dashboard with lead workflow states",
      "Analytics instrumentation and conversion review",
    ],
    metrics: ["Most selected", "Balanced scope", "Sales-ready CRM"],
    cta: "Choose Level 2",
  },
  {
    id: "level-3",
    name: "Level 3",
    price: "$20k+",
    summary: "High-trust platform and operations layer",
    description:
      "For businesses that need a premium front-end experience and a polished internal operating layer for ongoing demand.",
    timeline: "8-10 weeks",
    idealFor: "Funded startups and established B2B platforms",
    features: [
      "Everything in Level 2",
      "Deeper UX refinement and interaction systems",
      "Broader content architecture and modular sections",
      "Extended admin workflows and reporting",
      "Stakeholder QA, launch support, and iteration window",
    ],
    metrics: ["Highest trust", "Custom workflows", "Executive polish"],
    cta: "Discuss Level 3",
  },
];

export const SERVICES: Service[] = [
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
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "We align on business goals, demand drivers, and the exact credibility gaps the website needs to solve.",
    deliverable: "Strategic brief and conversion outline",
  },
  {
    id: "structure",
    title: "Structure",
    description:
      "We map content, user paths, and proof architecture so each page earns trust without bloated sections.",
    deliverable: "Page architecture and content model",
  },
  {
    id: "design",
    title: "Design",
    description:
      "We design a refined interface system with strong typography, motion, and responsive behavior.",
    deliverable: "High-fidelity UI system",
  },
  {
    id: "ship",
    title: "Ship",
    description:
      "We build the front end, backend, inquiry pipeline, and admin workflow with launch-ready polish.",
    deliverable: "Production deployment package",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Maya Rahman",
    role: "Founder",
    company: "Northlane Health",
    quote:
      "The site stopped feeling like a placeholder and started behaving like part of our sales process.",
    outcome: "42% increase in qualified inbound inquiries",
  },
  {
    id: "t2",
    name: "Daniel Cho",
    role: "VP Growth",
    company: "Stackform",
    quote:
      "Yoflix brought product discipline to marketing. The finished platform feels sharper than most funded startups.",
    outcome: "Shorter sales cycle after launch",
  },
  {
    id: "t3",
    name: "Ariana Wells",
    role: "Managing Director",
    company: "Bayside Advisory",
    quote:
      "The admin side was the surprise win. Our team finally had a clean system for tracking every inquiry.",
    outcome: "Lead follow-up consistency improved across the team",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "atlas",
    title: "Atlas Operations Platform",
    category: "B2B SaaS",
    summary:
      "Repositioned a generic software site into a sharper platform narrative with stronger demo conversion.",
    challenge:
      "The company had good product depth but weak credibility and an unqualified contact flow.",
    outcomes: ["31% lift in demo requests", "Clearer enterprise proof", "Better lead routing"],
  },
  {
    id: "meridian",
    title: "Meridian Capital Advisory",
    category: "Professional Services",
    summary:
      "Built a more executive-looking digital presence for a consultancy competing on trust and clarity.",
    challenge:
      "The previous site looked assembled from a template and undercut the firm’s reputation.",
    outcomes: ["Higher contact quality", "Sharper service packaging", "Mobile experience fixed"],
  },
  {
    id: "pulse",
    title: "Pulse Commerce Engine",
    category: "Growth Product",
    summary:
      "Designed a more product-led web experience with stronger feature communication and pricing confidence.",
    challenge:
      "Visitors understood the brand ambition, but not the product scope or implementation value.",
    outcomes: ["More plan selections", "Lower bounce on pricing", "Improved trust signals"],
  },
];

export const FAQS: FAQ[] = [
  {
    id: "f1",
    question: "How does plan selection work?",
    answer:
      "Each plan routes into the inquiry flow with the selected level prefilled so your team and ours stay aligned from the first submission.",
  },
  {
    id: "f2",
    question: "Can the plans be tailored?",
    answer:
      "Yes. The levels provide structure, not rigidity. We use them to frame scope, then adjust based on your goals and operational needs.",
  },
  {
    id: "f3",
    question: "What happens after an inquiry is submitted?",
    answer:
      "The lead is stored in the backend, appears in the CRM dashboard, and can move through New, Contacted, In Progress, and Closed states.",
  },
  {
    id: "f4",
    question: "Do you handle both website and internal systems?",
    answer:
      "Yes. We treat the public-facing site and the lead-management layer as one product experience, not disconnected projects.",
  },
];

export const PROJECT_TYPES = [
  "Business website",
  "SaaS platform",
  "Agency website",
  "CRM dashboard",
  "Lead funnel rebuild",
  "Custom product build",
];

export const BUDGET_RANGES = [
  "$5k - $10k",
  "$10k - $20k",
  "$20k - $35k",
  "$35k+",
];

export const TIMELINE_OPTIONS = [
  "2-4 weeks",
  "1-2 months",
  "2-3 months",
  "Flexible timeline",
];

export const TRUST_LOGOS = [
  "Vercel",
  "Linear",
  "Stripe",
  "HubSpot",
  "Notion",
  "Slack",
];

export const HOME_STATS = [
  { value: 32, suffix: "+", label: "Platform launches shipped" },
  { value: 94, suffix: "%", label: "Projects launched on schedule" },
  { value: 3.8, suffix: "x", label: "Average lift in lead clarity" },
];
