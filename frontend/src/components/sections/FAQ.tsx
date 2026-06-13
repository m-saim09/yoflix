"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState(FAQS[0].id);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-black sm:text-5xl">
            Questions before
            <br className="hidden sm:block" />
            starting a project.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Clear answers about timelines, revisions, pricing and what to expect.
          </p>
        </div>

        {/* list */}
        <div className="mt-16 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((item, index) => {
            const isOpen = open === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpen(isOpen ? "" : item.id)}
                className="w-full text-left"
              >
                <div className="group py-7 sm:py-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-5 sm:gap-7">
                      <span className="pt-1 text-sm font-bold text-blue-600">
                        0{index + 1}
                      </span>

                      <div className="max-w-3xl">
                        <h3 className="text-lg font-bold leading-8 text-black sm:text-xl">
                          {item.question}
                        </h3>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isOpen ? "mt-4 max-h-52 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          <p className="pr-4 text-sm leading-8 text-slate-600 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-1 shrink-0 text-slate-400 transition duration-300 group-hover:text-blue-600",
                        isOpen && "rotate-180 text-blue-600"
                      )}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}