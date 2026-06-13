"use client";

import { motion } from "framer-motion";
import { Globe, Layers3, Sparkles, ShieldCheck } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";

const serviceMap = {
  globe: Globe,
  layers: Layers3,
  sparkles: Sparkles,
  shield: ShieldCheck,
};

export default function ServicesOverview() {
  const { settings } = useWebsiteSettings();

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.08),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.06),_transparent_26%)]" />
      <div className="relative page-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300/80">
            Services
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            All the capabilities needed for a future-ready site.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Every element is crafted to feel premium: from landing pages to marketing funnels, analytics, and creative storytelling.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {settings.services.map((service, index) => {
            const Icon = serviceMap[service.icon as keyof typeof serviceMap] || Globe;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(3,8,25,0.42)] backdrop-blur-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-500/15 to-transparent" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/70 text-sky-300 shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
                    <Icon size={24} />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-sky-300/70">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-[28px] border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-400">
                    {service.stat}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
