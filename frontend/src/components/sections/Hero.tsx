"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const slides = [
    new URL("./images/project-1.jpg", import.meta.url).href,
    new URL("./images/project-2.jpg", import.meta.url).href,
    new URL("./images/project-3.jpg", import.meta.url).href,
  ];

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Industrial Project"
            className={`slide slide-${index + 1} absolute inset-0 h-full w-full object-cover`}
          />
        ))}
      </div>

      {/* Premium Overlays */}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
      <div className="absolute inset-0 backdrop-[blur(2px)]" />

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[140px]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto max-w-5xl text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-200">
                  Trusted Industrial Engineering Partner
                </span>
              </div>
            </motion.div>

            {/* Heading */}
           <motion.h1
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.25 }}
  className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
>
  Building Industrial
  <span className="mt-4 block bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
    Infrastructure That Lasts
  </span>
</motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl"
            >
              Delivering world-class fabrication, construction, maintenance,
              and engineering solutions that empower industrial growth,
              operational efficiency, and long-term success.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_15px_45px_rgba(251,191,36,0.35)]"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
              >
                Get Consultation
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-white/10 pt-10"
            >
              <div>
                <h3 className="text-3xl font-bold text-white">15+</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">300+</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Projects Delivered
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">50+</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Industrial Clients
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        .slide {
          opacity: 0;
          animation: heroSlider 18s infinite;
        }

        .slide-1 {
          animation-delay: 0s;
        }

        .slide-2 {
          animation-delay: 6s;
        }

        .slide-3 {
          animation-delay: 12s;
        }

        @keyframes heroSlider {
          0% {
            opacity: 0;
            transform: scale(1);
          }

          8% {
            opacity: 1;
          }

          30% {
            opacity: 1;
            transform: scale(1.05);
          }

          38% {
            opacity: 0;
            transform: scale(1.1);
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}