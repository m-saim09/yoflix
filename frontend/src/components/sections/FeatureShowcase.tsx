"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Sparkles, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: Activity,
    title: "Real-time insights",
    description: "Live dashboards with luminous charts and instant KPI visibility.",
  },
  {
    icon: Cpu,
    title: "Performance optimization",
    description: "A lightweight UI with fast motion, crisp typography, and modern gradients.",
  },
  {
    icon: ShieldCheck,
    title: "Secure launch",
    description: "Built on reliable infrastructure to keep your site and leads protected.",
  },
  {
    icon: Sparkles,
    title: "Premium polish",
    description: "Glassmorphism cards, neon accents, and layered glow for a luxury aesthetic.",
  },
];

export default function FeatureShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_30%),radial-gradient(circle_at_20%_70%,_rgba(14,165,233,0.08),_transparent_22%)]" />
      <div className="absolute left-1/2 top-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-transparent blur-3xl" />
      <div className="relative page-shell">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-300/80">
            Core features
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            A futuristic interface built to move quickly.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            The homepage experience is engineered for clarity, depth, and elegant motion that feels premium.
          </p>
        </div>

        <div className="mt-16 grid gap-6 xl:grid-cols-[2fr_1.1fr] xl:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(2,8,23,0.4)] backdrop-blur-2xl"
                >
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky-400/15 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/70 text-sky-200 shadow-[0_18px_50px_rgba(56,189,248,0.25)]">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[36px] border border-white/10 bg-[#081026]/90 p-8 shadow-[0_40px_120px_rgba(2,8,23,0.5)] backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between gap-3 text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-sky-300/70">Dashboard preview</p>
                <p className="mt-3 text-3xl font-black text-white">Intelligent metrics</p>
              </div>
              <div className="h-14 w-14 rounded-3xl bg-slate-900/70 ring-1 ring-sky-400/15" />
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-[#061026] p-5">
              <div className="flex justify-between gap-4 text-sm text-slate-400">
                <span>Visits</span>
                <span>Realtime</span>
              </div>
              <div className="mt-4 h-44 rounded-[28px] bg-gradient-to-br from-[#081026] to-[#041026] p-4">
                <div className="flex h-full flex-col justify-between rounded-[24px] bg-slate-950/70 p-4 shadow-[inset_0_0_40px_rgba(37,99,235,0.18)]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase tracking-[0.28em]">Session rate</span>
                    <span className="text-xs text-sky-300">+18%</span>
                  </div>
                  <div className="mt-6 h-24 rounded-[24px] bg-[linear-gradient(180deg,rgba(14,165,233,0.35),rgba(37,99,235,0.12))]" />
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
                    {[
                      { label: "CTR", value: "4.2%" },
                      { label: "Leads", value: "182" },
                      { label: "NPS", value: "93" },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-3xl bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{metric.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
