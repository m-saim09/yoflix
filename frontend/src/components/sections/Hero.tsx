"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero relative min-h-screen overflow-hidden text-slate-950">
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/70 bg-slate-50/80 px-5 py-3 text-sm uppercase tracking-[0.22em] text-slate-900 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <span className="rounded-full bg-[#4973ff]/15 px-3 py-1 text-[#1c3dcc]">Yoflix</span>
            <span>Digital products, websites & CRM systems</span>
          </div>

          <h2>
            Design, build, and launch
            <span className="block text-[#4973ff]">modern business experiences</span>
          </h2>

          <p>
            Grow your brand with premium websites, smart lead capture, and CRM workflows crafted for ambitious businesses.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#4973ff] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#3a5ce8]"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/15"
            >
              View services
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="waves" />

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        .hero {
          --hero-wave: #4973ff;
          position: relative;
          background: #ffffff;
          color: #0f172a;
          min-height: 100vh;
        }

        .content {
          max-width: 600px;
          margin: 0 auto;
          padding: 140px 20px 120px;
          position: relative;
          z-index: 1;
        }

        .hero h2 {
          position: relative;
          z-index: 1;
          font-size: clamp(3rem, 6vw, 4.5rem);
          margin: 1.5rem 0 0.75rem;
          line-height: 1.05;
          color: #0f172a;
        }

        .hero h2 span {
          color: #8cb7ff;
        }

        .hero p {
          position: relative;
          z-index: 1;
          font-size: 1.05rem;
          color: rgba(15, 23, 42, 0.72);
          line-height: 1.7;
          max-width: 34rem;
        }

        .waves {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background-color: var(--hero-wave);
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
          transition: 500ms;
        }

        .waves::before,
        .waves::after {
          content: "";
          position: absolute;
          width: 300vw;
          height: 300vw;
          top: -65vw;
          left: 50%;
          transform: translate(-50%, -75%);
        }

        .waves::before {
          border-radius: 44%;
          background: rgba(51, 51, 51, 1);
          animation: waves 8s linear infinite;
        }

        .waves::after {
          border-radius: 44%;
          background: rgba(51, 51, 51, 0.5);
          animation: waves 15s linear infinite;
        }

        @keyframes waves {
          0% {
            transform: translate(-50%, -75%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -75%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
