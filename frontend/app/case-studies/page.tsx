import type { Metadata } from "next";
import CaseStudiesPreview from "@/components/sections/CaseStudiesPreview";

export const metadata: Metadata = {
  title: "Case Studies | Yoflix",
  description: "See how Yoflix improves business websites, platform trust, and inquiry operations.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-32 text-white">
        <div className="page-shell pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
            Case studies
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight">
            Examples where better product thinking changed the commercial result.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            These projects focus on what matters after launch: clarity, trust, and cleaner
            conversion paths.
          </p>
        </div>
      </section>
      <CaseStudiesPreview />
    </>
  );
}
