"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";

export function DynamicAboutPageContent() {
  const { settings } = useWebsiteSettings();

  return (
    <main className="bg-white pt-28 text-black">
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--site-primary)]">
              About Us
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
              {settings.aboutSection.title}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {settings.aboutSection.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {settings.aboutSection.bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--site-primary)]" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">
            <div className="space-y-6">
              {settings.aboutSection.cards.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-black">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[var(--site-primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
