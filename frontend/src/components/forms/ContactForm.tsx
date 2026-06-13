"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Loader2, MessageSquareHeart } from "lucide-react";
import toast from "react-hot-toast";
import { contactAPI } from "@/lib/api";
import type { ContactFormData } from "@/lib/types";

const inputClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

const textareaClass =
  "min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

const initialState: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await contactAPI.submit(form);
      toast.success("Contact request sent.");
      setForm(initialState);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="surface-panel rounded-[30px] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-sky-50 p-3">
          <MessageSquareHeart className="h-5 w-5 text-sky-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Quick contact</p>
          <p className="text-sm text-slate-500">
            For short questions, partnership notes, or scheduling.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputClass}
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </Field>
        <div className="hidden sm:block" />
      </div>

      <div className="mt-4">
        <Field label="Message">
          <textarea
            className={textareaClass}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            required
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send contact request"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
