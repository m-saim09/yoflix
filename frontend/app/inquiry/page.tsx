import type { Metadata } from "next";

import { InquiryForm } from "@/components/forms/InquiryForm";

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

  const selected = params.plan?.trim() ? params.plan : "Level 2";

  return (
    <main className="relative overflow-hidden bg-[#f8fafc] pt-32 text-slate-950">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_30%)]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* TOP GLOW */}
      <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-lime-300/20 blur-[140px]" />

      <div className="absolute bottom-[-250px] right-[-250px] h-[600px] w-[600px] rounded-full bg-emerald-300/20 blur-[150px]" />

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
          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl">

            Let’s Build Something

            <span className="bg-gradient-to-r from-lime-500 via-emerald-500 to-lime-400 bg-clip-text text-transparent">
              {" "}Exceptional
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600">
            Your selected package is already attached to the inquiry.
            Once submitted, your request is instantly added into the
            Yoflix CRM dashboard for onboarding, follow-up, and project tracking.
          </p>

          {/* STATS */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">

            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-2xl">

              <div className="text-4xl font-black text-lime-600">
                100%
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Secure Process
              </p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-2xl">

              <div className="text-4xl font-black text-lime-600">
                24/7
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Client Support
              </p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-2xl">

              <div className="text-4xl font-black text-lime-600">
                Fast
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Delivery Speed
              </p>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="mt-24">
          <InquiryForm defaultPlan={selected} />
        </div>
      </section>
    </main>
  );
}