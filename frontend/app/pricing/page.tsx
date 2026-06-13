"use client";

import PricingPreview from "@/components/sections/PricingPreview";
import ReasonsToSelectUs from "@/components/sections/whychooseus";
import { CounterSection } from "@/components/sections/countersection";

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden scroll-smooth">
      
      {/* PREMIUM BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-purple-300/30 blur-3xl rounded-full animate-float" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-cyan-300/30 blur-3xl rounded-full animate-float delay-1000" />
      </div>

      {/* HERO / PRICING SECTION */}
      <section className="flex justify-center px-4 pt-10">
        <div className="animate-fadeUp w-full max-w-6xl">
          <PricingPreview />
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="mt-20 px-4">
        <div className="animate-fadeUp delay-200 w-full max-w-6xl mx-auto">
          <ReasonsToSelectUs />
        </div>
      </section>

      {/* COUNTER SECTION */}
      <section className="mt-20 px-4 pb-20">
        <div className="animate-fadeUp delay-300 w-full max-w-6xl mx-auto">
          <CounterSection />
        </div>
      </section>

      {/* PREMIUM ANIMATIONS */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }

        .animate-fadeUp {
          animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.96);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}