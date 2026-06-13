"use client";

import { motion } from "framer-motion";

const featureData = [
  {
    title: "Trusted by ambitious teams",
    description: "Seen across modern startups, creative agencies, and category-leading brands.",
  },
  {
    title: "Sleek analytics",
    description: "Dashboard intelligence that feels polished, fast, and premium.",
  },
  {
    title: "Launch-ready design",
    description: "A refined experience built for high-converting websites and lead systems.",
  },
  {
    title: "Future-proof visuals",
    description: "Deep glass panels, soft glow, and ambient lighting for an elevated product feel.",
  },
];

const logos = ["Stripe", "Notion", "Dropbox", "Figma", "Slack", "Airtable"];

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-20 text-slate-200">
      <div className="absolute inset-x-0 top-0 h-60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_35%)] blur-3xl" />
      <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.12),_transparent_55%)] blur-3xl" />

      <div className="relative page-shell">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-300/80">
            Built for modern teams
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            A premium SaaS platform design for high-growth launches.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Intuitive page structure, polished motion, and lighting-driven interfaces that feel as powerful as your product.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_90px_rgba(6,12,27,0.38)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:bg-white/10"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/15 to-transparent opacity-80" />
              <div className="relative z-10">
                <div className="inline-flex rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-200">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 rounded-[36px] border border-white/10 bg-[#061021]/80 p-8 shadow-[0_30px_90px_rgba(8,14,30,0.35)] backdrop-blur-2xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/70">
                Trusted by teams across categories
              </p>
              <p className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Companies rely on this interface for an elegant modern presence.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-300 opacity-80 transition duration-300 hover:opacity-100"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
