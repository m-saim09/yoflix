"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";
import { setAdmin, setAuthToken } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@yoflix.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      if (!response.token || !response.data?.admin) {
        throw new Error(response.message || "Login failed");
      }

      setAuthToken(response.token);
      setAdmin(response.data.admin);
      toast.success("Signed in successfully.");
      router.replace("/admin/dashboard");
    } catch {
      toast.error("Unable to sign in with those credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,#040b16_0%,#07111f_100%)] px-4 py-12">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(2,8,23,0.45)] backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden border-b border-white/10 p-8 text-white lg:border-b-0 lg:border-r lg:p-10">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-sky-400/25 via-cyan-300/10 to-transparent blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-100">
              <Sparkles className="h-3.5 w-3.5" />
              Secure admin access
            </div>
            <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
              Run the inbound engine like a product team.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Monitor lead quality, manage follow-up, review contact requests, and keep revenue-side reporting clean.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Protected admin routes and persistent sessions",
                "Lead workflow controls with analytics snapshots",
                "Responsive CRM UI built for operators, not templates",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-emerald-400/12 p-2 text-emerald-200">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-10">
          <form className="w-full" onSubmit={onSubmit}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Yoflix CRM</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Sign in to the dashboard</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use your admin credentials to access leads, contacts, analytics, and platform settings.
            </p>

            <div className="mt-8 space-y-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="admin-input w-full pl-11"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="admin-input w-full pl-11"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Enter admin workspace"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
