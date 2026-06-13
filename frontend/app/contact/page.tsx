import type { Metadata } from "next";

import { InquiryForm } from "@/components/forms/InquiryForm";
import { PLAN_OPTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Inquiry | Yoflix",
  description:
    "Submit your project details and create a lead directly in the Yoflix CRM pipeline.",
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;

  const selected = PLAN_OPTIONS.includes(
    params.plan as (typeof PLAN_OPTIONS)[number]
  )
    ? (params.plan as (typeof PLAN_OPTIONS)[number])
    : "Level 2";

  return (
    <main className="relative overflow-hidden bg-white pt-28 text-slate-950">

      {/* SIMPLE CLEAN BACKGROUND (NO LINES / NO GLOW) */}
      <div className="absolute inset-0 bg-white" />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24">

        {/* HERO */}
        <div className="mx-auto max-w-4xl text-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white/80 px-6 py-3 shadow-xl backdrop-blur-2xl">

            <div className="h-2.5 w-2.5 rounded-full bg-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.8)]" />

            <span className="text-xs font-bold uppercase tracking-[0.28em] text-lime-700">
              Premium Inquiry Portal
            </span>
          </div>

          {/* TITLE */}
          <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl">
            Let’s Build Something{" "}
            <span className="bg-gradient-to-r from-lime-500 via-emerald-500 to-lime-400 bg-clip-text text-transparent">
              Exceptional
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-9 text-slate-600">
            Your selected package is already linked to this inquiry. Once submitted, it will instantly appear in the Yoflix CRM dashboard for onboarding, follow-up, and project tracking.
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="mt-0">
          <InquiryForm defaultPlan={selected} />
        </div>

      </section>
    </main>
  );
}