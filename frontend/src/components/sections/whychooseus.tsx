"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap, Activity } from "lucide-react";

const cards = [
  {
    title: "Unmatched Security Protection",
    desc: "Advanced AI-driven threat detection keeps your business safe 24/7.",
    icon: ShieldCheck,
    color: "#87E64B",
    glow: "rgba(135,230,75,0.18)",
  },
  {
    title: "Trusted by Clients Worldwide",
    desc: "High satisfaction rate with enterprise-grade reliability.",
    icon: Users,
    color: "#0056F5",
    glow: "rgba(0,86,245,0.18)",
  },
  {
    title: "Lightning Fast Performance",
    desc: "Optimized systems ensure speed, scalability and zero lag.",
    icon: Zap,
    color: "#FFE000",
    glow: "rgba(255,224,0,0.18)",
  },
  {
    title: "Real-Time Monitoring",
    desc: "Continuous tracking with instant alerts against threats.",
    icon: Activity,
    color: "#F00000",
    glow: "rgba(240,0,0,0.18)",
  },
];

export default function ReasonsToChooseUs() {
  return (
    <section className="relative w-full py-28 px-6 bg-[#f5f5f3] overflow-hidden font-[Inter]">

      {/* soft premium background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_65%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="text-sm px-4 py-1 rounded-full bg-[#e7e3dc] text-gray-600">
          Reasons to select us
        </span>

        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-6 tracking-tight">
          Unmatched security performance
        </h2>

        <p className="text-gray-500 mt-4 text-lg leading-relaxed">
          This level of security is essential for businesses handling confidential
          information, financial transactions, and personal data.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto perspective-[1400px]">

        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-[24px] p-[1px]"
            >
              {/* subtle border */}
              <div
                className="absolute inset-0 rounded-[24px] opacity-60"
                style={{
                  background: `linear-gradient(140deg, ${item.color}, transparent 75%)`,
                }}
              />

              {/* card */}
              <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* soft glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at top, ${item.glow}, transparent 70%)`,
                  }}
                />

                {/* icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 relative z-10"
                  style={{
                    backgroundColor: item.color,
                    color: "white",
                    boxShadow: `0 8px 20px ${item.glow}`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* title */}
                <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight relative z-10">
                  {item.title}
                </h3>

                {/* desc */}
                <p className="text-sm text-gray-500 mt-2 leading-relaxed relative z-10">
                  {item.desc}
                </p>

                {/* bottom accent */}
                <div
                  className="h-[3px] w-12 mt-6 rounded-full relative z-10"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}