import type { Metadata } from "next";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Process from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Services | Yoflix",
  description: "Explore Yoflix services across strategy, design, engineering, and lead operations.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 text-white">
        <div className="page-shell pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
            Services
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight">
            Premium website design is only one layer. We also refine the workflow behind it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The best business sites are not just attractive. They classify offers clearly,
            capture better information, and support the sales team once interest shows up.
          </p>
        </div>
      </section>
      <ServicesOverview />
      <Process />
    </>
  );
}
