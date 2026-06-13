"use client";

import Link from "next/link";
import { ArrowRight, Check, Info, Rocket, Compass, Sparkles } from "lucide-react";
import { usePricingPlans } from "@/hooks/useWebsiteContent";

const planIcons: Record<string, any> = {
  "Level 1": Sparkles,
  "Level 2": Rocket,
  "Level 3": Compass,
};

export default function PricingPreview() {
  const { pricingPlans } = usePricingPlans();

  const activePlans = pricingPlans
    .filter((plan) => plan.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-[#F00004FF]/40 bg-gray px-5 py-2 shadow-md backdrop-blur-md">
  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F00004FF]">
    Pricing Plans
  </p>
</div>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple pricing for serious growth
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Choose the perfect plan to scale your business with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {activePlans.map((plan) => {
            const Icon = planIcons[plan.title] || Sparkles;
            const featured = plan.isPopular;

            return (
              <div
                key={plan._id}
                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  featured
                    ? "border-[#87E64B] shadow-2xl scale-[1.03] bg-white"
                    : "border-gray-200 bg-white hover:shadow-xl"
                }`}
              >
                {/* Badge */}
                {featured && (
                  <span className="absolute top-5 right-5 bg-[#87e64b] text-black text-sm font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}

                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      featured
                        ? "bg-[#87E64B]/20 text-[#4CAF1E]"
                        : "bg-[#E8F0FF] text-[#0761F4FF]"
                    }`}
                  >
                    <Icon size={26} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {plan.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    / {plan.billingType}
                  </span>
                </div>

                {/* Button */}
                <Link
                  href={`/inquiry?plan=${encodeURIComponent(plan.title)}`}
                  onClick={(e) => {
                    try {
                      if (typeof window !== "undefined" && window.location.pathname === "/") {
                        e.preventDefault();
                        const url = `/?plan=${encodeURIComponent(plan.title)}#inquiry`;
                        window.history.replaceState({}, "", url);
                        window.dispatchEvent(new CustomEvent("planSelected", { detail: { plan: plan.title } }));
                        const el = document.getElementById("inquiry");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    } catch (err) {
                      // fallback to normal navigation
                    }
                  }}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition duration-300 ${
                    featured
                      ? "bg-[#87E64B] text-black hover:bg-[#76d63d]"
                      : "bg-[#0761F4FF] text-white shadow-[0_12px_30px_-18px_rgba(7,97,244,0.8)] hover:-translate-y-0.5 hover:bg-[#054dcf]"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight size={16} />
                </Link>

                {/* Features */}
                <div className="mt-10">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">
                    Free features
                  </h4>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-between text-sm text-gray-700"
                      >
                        <div className="flex items-center gap-3">
                                      <Check
                            size={18}
                            className={
                              featured ? "text-[#87E64B]" : "text-[#0761F4FF]"
                            }
                          />
                          <span>{feature}</span>
                        </div>

                        <span className="text-gray-400">
                          <Info size={16} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}