import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote | City Coolies",
  description: "Request a free quote for City Coolies professional property services across India.",
};

export default function ContactPage() {
  return (
    <main className="bg-[linear-gradient(145deg,#fff_0%,#fff6f7_55%,#ffe8eb_100%)] py-14 sm:py-20">
      <div className="mx-auto grid w-[min(100%-32px,1180px)] gap-9 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <section>
          <nav className="text-xs font-bold text-zinc-500"><Link href="/">Home</Link> <span className="mx-2">/</span> <span className="text-[#ed1c24]">Free Quote</span></nav>
          <p className="mt-8 text-xs font-black uppercase tracking-[.18em] text-[#ed1c24]">Pan India Property Services</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-.04em] text-zinc-950 sm:text-5xl">Tell us what your property needs.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">Share your service requirement and address. Our team will review it and confirm availability, inspection requirements and the final quote.</p>
          <div className="mt-7 space-y-3 text-sm font-bold text-zinc-800">
            <p>✓ Free initial consultation</p><p>✓ Chennai main branch · Pan India service</p><p>✓ Final pricing confirmed after inspection where applicable</p>
          </div>
        </section>
        <QuoteForm />
      </div>
    </main>
  );
}

