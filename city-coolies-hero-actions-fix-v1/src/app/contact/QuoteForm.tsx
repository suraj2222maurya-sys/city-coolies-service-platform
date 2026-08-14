"use client";

import { useState, type FormEvent } from "react";

type QuoteFormState = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  pinCode: string;
  address: string;
  details: string;
};

const INITIAL_FORM: QuoteFormState = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  city: "",
  pinCode: "",
  address: "",
  details: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const update = (field: keyof QuoteFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        whatsappUrl?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Quote request could not be submitted.");
      }

      setMessage(result.message ?? "Your quote request is ready.");
      setForm(INITIAL_FORM);
      if (result.whatsappUrl) window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Quote request could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  };

  const fields: Array<[keyof QuoteFormState, string, string, string?]> = [
    ["fullName", "Full Name", "Enter your full name"],
    ["phone", "Mobile Number", "Enter your 10-digit number", "tel"],
    ["email", "Email Address", "Enter your email address", "email"],
    ["service", "Required Service", "Example: Deep Cleaning"],
    ["city", "City", "Enter your city"],
    ["pinCode", "PIN Code", "Enter 6-digit PIN code", "tel"],
  ];

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-red-100 bg-white p-5 shadow-[0_24px_65px_rgba(70,27,34,.1)] sm:grid-cols-2 sm:p-7">
      {fields.map(([field, label, placeholder, type]) => (
        <label key={field} className="text-xs font-extrabold text-zinc-700">
          {label}
          <input
            required
            type={type ?? "text"}
            inputMode={field === "phone" || field === "pinCode" ? "numeric" : undefined}
            value={form[field]}
            onChange={(event) => update(field, event.target.value)}
            placeholder={placeholder}
            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-[#ed1c24] focus:ring-4 focus:ring-red-50"
          />
        </label>
      ))}

      <label className="text-xs font-extrabold text-zinc-700 sm:col-span-2">
        Service Address
        <textarea required rows={3} value={form.address} onChange={(event) => update("address", event.target.value)} placeholder="House / flat, street, area and landmark" className="mt-2 w-full resize-none rounded-xl border border-zinc-200 p-4 text-sm outline-none transition focus:border-[#ed1c24] focus:ring-4 focus:ring-red-50" />
      </label>

      <label className="text-xs font-extrabold text-zinc-700 sm:col-span-2">
        Work Details
        <textarea required rows={4} value={form.details} onChange={(event) => update("details", event.target.value)} placeholder="Describe the service you need" className="mt-2 w-full resize-none rounded-xl border border-zinc-200 p-4 text-sm outline-none transition focus:border-[#ed1c24] focus:ring-4 focus:ring-red-50" />
      </label>

      {message ? <p role="status" className={`rounded-xl p-3 text-sm font-bold sm:col-span-2 ${isError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{message}</p> : null}

      <button disabled={submitting} type="submit" className="min-h-13 rounded-xl bg-[#ed1c24] px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:bg-[#d9141c] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
        {submitting ? "Submitting Request..." : "Submit Free Quote Request"}
      </button>
    </form>
  );
}

