"use client";

import { useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  BUDGET_RANGES,
  PLAN_OPTIONS,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
} from "@/lib/constants";

import { inquiryAPI } from "@/lib/api";
import { usePricingPlans, useWebsiteSettings } from "@/hooks/useWebsiteContent";

import type { InquiryFormData, PlanTier } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*                                   SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const inquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  companyName: z.string().min(2),
  selectedPlan: z.string().min(1),
  budget: z.string().min(1),
  projectType: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(20),
});

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const inputClass =
  "h-14 w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl px-5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-400/20";

const textareaClass =
  "min-h-40 w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl px-5 py-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-400/20";

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function InquiryForm({
  defaultPlan = "Level 2",
}: {
  defaultPlan?: PlanTier;
}) {
  const { settings } = useWebsiteSettings();
  const { pricingPlans } = usePricingPlans();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customPlan, setCustomPlan] = useState<string | null>(null);

  const defaultValues = useMemo<InquiryFormData>(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      selectedPlan: defaultPlan,
      budget: "",
      projectType: "",
      timeline: "",
      message: "",
      requirements: "",
    }),
    [defaultPlan]
  );

  const planOptions = useMemo(() => {
    const options: string[] = pricingPlans.map((plan) => plan.title);

    if (defaultPlan && !options.includes(defaultPlan)) {
      options.unshift(defaultPlan);
    }

    if (customPlan && !options.includes(customPlan)) {
      options.unshift(customPlan);
    }

    if (options.length === 0) {
      options.push(...PLAN_OPTIONS);
    }

    return options;
  }, [customPlan, defaultPlan, pricingPlans]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues,
  });

  useEffect(() => {
    const updateSelectedPlan = (plan: string) => {
      setCustomPlan(plan);
      reset({ ...defaultValues, selectedPlan: plan });
    };

    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const plan = params.get("plan");

        if (plan) {
          updateSelectedPlan(plan);
        }

        const handler = (event: Event) => {
          const detail = (event as CustomEvent<{ plan: string }>).detail;
          if (detail?.plan) {
            updateSelectedPlan(detail.plan);
          }
        };

        window.addEventListener("planSelected", handler as EventListener);
        return () => window.removeEventListener("planSelected", handler as EventListener);
      }
    } catch (err) {
      // ignore
    }

    return undefined;
    // We only want to run this on mount and when defaultPlan changes
  }, [defaultPlan, reset, defaultValues]);

  const onSubmit = async (values: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      await inquiryAPI.submit(values);

      setSubmitted(true);

      toast.success("Inquiry Submitted Successfully");

      reset({
        ...defaultValues,
        selectedPlan: values.selectedPlan,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="relative overflow-hidden mt-0 py-32 text-slate-900">

      

      
      <div className="relative mx-auto max-w-7xl px-4">

        {/* HEADER */}
        

        {/* MAIN CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mt-0 overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.08)]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >

          {/* TOP GLOW LINE */}
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300" />

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT SIDE */}
            <div className="relative overflow-hidden border-b border-slate-200/60 bg-white p-8 lg:border-b-0 lg:border-r lg:p-14">

              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute right-[-80px] top-[-80px] h-60 w-60 rounded-full border border-lime-300/30"
              />

              <div className="relative z-10">

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.05,
                  }}
                  className="inline-flex rounded-3xl border border-lime-200 bg-lime-100 p-5 text-lime-700 shadow-lg"
                >

                  <Sparkles className="h-8 w-8" />
                </motion.div>

                <h3 className="mt-10 text-4xl font-black tracking-tight text-slate-900">
                  {settings.businessInfo.companyName}
                </h3>

                <p className="mt-6 text-base leading-8 text-slate-500">
                  {settings.businessInfo.aboutText}
                </p>

                {/* STATS */}
                

                {/* CONTACT */}
                <div className="mt-12 space-y-5">

                  <InfoCard
                    icon={<Mail className="h-5 w-5" />}
                    title="Business Email"
                    value={settings.contactInfo.businessEmail}
                  />

                  <InfoCard
                    icon={<Phone className="h-5 w-5" />}
                    title="Phone Number"
                    value={settings.contactInfo.phoneNumber}
                  />

                  <InfoCard
                    icon={<MapPin className="h-5 w-5" />}
                    title="Office Address"
                    value={settings.contactInfo.officeAddress}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative p-6 sm:p-10 lg:p-14">

              {/* floating glow */}
              
              {submitted && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-8 rounded-3xl border border-lime-200 bg-lime-50 p-5 shadow-lg"
                >

                  <div className="flex items-center gap-3">

                    <CheckCircle2 className="h-5 w-5 text-lime-600" />

                    <p className="text-sm font-semibold text-lime-700">
                      Your inquiry has been submitted successfully.
                    </p>
                  </div>
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Full Name"
                    error={errors.fullName?.message}
                  >
                    <input
                      {...register("fullName")}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    error={errors.email?.message}
                  >
                    <input
                      {...register("email")}
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Phone Number"
                    error={errors.phone?.message}
                  >
                    <input
                      {...register("phone")}
                      className={inputClass}
                      placeholder="+1 234 567 890"
                    />
                  </Field>

                  <Field
                    label="Company Name"
                    error={errors.companyName?.message}
                  >
                    <input
                      {...register("companyName")}
                      className={inputClass}
                      placeholder="Your Company"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field label="Selected Plan">

                    <select
                      {...register("selectedPlan")}
                      className={inputClass}
                    >
                      {planOptions.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Project Type"
                    error={errors.projectType?.message}
                  >

                    <select
                      {...register("projectType")}
                      className={inputClass}
                    >
                      <option>Select</option>

                      {PROJECT_TYPES.map((type) => (
                        <option key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Budget"
                    error={errors.budget?.message}
                  >

                    <select
                      {...register("budget")}
                      className={inputClass}
                    >
                      <option>Select</option>

                      {BUDGET_RANGES.map((budget) => (
                        <option key={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Timeline"
                    error={errors.timeline?.message}
                  >

                    <select
                      {...register("timeline")}
                      className={inputClass}
                    >
                      <option>Select</option>

                      {TIMELINE_OPTIONS.map((timeline) => (
                        <option key={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Project Brief"
                  error={errors.message?.message}
                >

                  <textarea
                    {...register("message")}
                    className={textareaClass}
                    placeholder="Describe your project goals, design vision, features, and expectations..."
                  />
                </Field>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={isSubmitting}
                  type="submit"
                  className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 text-base font-bold text-white shadow-[0_20px_60px_rgba(132,204,22,0.35)] transition-all duration-300"
                >

                  {/* SHINE EFFECT */}
                  <motion.div
                    animate={{
                      x: ["-120%", "220%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 w-24 rotate-12 bg-white/40 blur-xl"
                  />

                  {isSubmitting ? (
                    <span className="relative z-10 flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Inquiry...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">
                      Start Your Project

                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FIELD                                    */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">

      <div className="mb-3 flex items-center justify-between">

        <span className="text-sm font-semibold tracking-wide text-slate-700">
          {label}
        </span>

        {error && (
          <span className="text-xs font-medium text-red-500">
            {error}
          </span>
        )}
      </div>

      {children}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 INFO CARD                                  */
/* -------------------------------------------------------------------------- */

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        rotateX: 4,
        rotateY: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
      className="group rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-lg backdrop-blur-2xl"
      style={{
        transformStyle: "preserve-3d",
      }}
    >

      <div className="flex items-start gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-100 to-emerald-100 text-lime-700 shadow-md">

          {icon}
        </div>

        <div>

          <p className="text-sm font-bold text-slate-900">
            {title}
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 STAT CARD                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.04,
      }}
      className="rounded-3xl border border-slate-200 bg-white/70 p-5 text-center shadow-lg backdrop-blur-2xl"
    >

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 shadow-sm">
        {icon}
      </div>

      <h4 className="mt-4 text-3xl font-black text-lime-600">
        {number}
      </h4>

      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
    </motion.div>
  );
}