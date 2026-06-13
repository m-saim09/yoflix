"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.1),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.08),_transparent_25%)]" />
      <div className="relative page-shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-300/80">
            Process
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Launch quickly with a clear process.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            A premium agency experience that makes every step feel effortless and high-end.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(3,8,25,0.35)] backdrop-blur-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/70 text-lg font-black text-sky-300 shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
                {index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
              <div className="mt-7 rounded-[28px] border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-400">
                <p className="uppercase tracking-[0.25em] text-sky-300/70">What you get</p>
                <p className="mt-2 leading-7">{step.deliverable}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
