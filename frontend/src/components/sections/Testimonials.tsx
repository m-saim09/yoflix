"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.06),_transparent_28%)]" />
      <div className="relative page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-300/80">
            Testimonials
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            What clients say about our premium experience.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Real results described with clarity and a modern, high-end presentation.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(3,8,25,0.35)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl font-black leading-none text-sky-400/20">“</div>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{item.quote}</p>
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-lg font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-400">{item.role}, {item.company}</p>
                <div className="mt-4 inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                  {item.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
