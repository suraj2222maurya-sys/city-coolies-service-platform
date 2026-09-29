import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | City Coolies",
  description:
    "Read the terms for using City Coolies, requesting property services, reviewing estimates and contacting our team.",
  alternates: { canonical: "/terms-conditions" },
};

const updated = "29 September 2026";

const sections = [
  {
    id: "using-website",
    number: "01",
    title: "Using this website",
    intro:
      "These terms explain how you may use the City Coolies website and request information about our services. By using the website, you agree to use it lawfully and provide accurate details when you contact us.",
    points: [
      "The website provides information about property services, careers and vendor membership.",
      "You must not interfere with the website, submit misleading requests or use it for unlawful purposes.",
      "If you submit a request for someone else, please make sure you have their permission.",
    ],
  },
  {
    id: "service-information",
    number: "02",
    title: "Services, prices and estimates",
    intro:
      "Service descriptions and displayed prices help you explore available work. A starting price or cart total is an estimate based on the selections shown on the website.",
    points: [
      "The final scope and price may depend on location, measurements, site conditions, materials, access and the work you request.",
      "We will explain any applicable survey, material, travel, tax or additional charges before you confirm the relevant work.",
      "We may update service descriptions, availability and displayed prices. An updated price will not silently change a separately confirmed agreement.",
    ],
  },
  {
    id: "booking",
    number: "03",
    title: "Enquiries and booking confirmation",
    intro:
      "Adding a service to the cart or sending an enquiry records your interest. It does not, by itself, confirm an appointment or create a completed purchase.",
    points: [
      "Our team may contact you to confirm requirements, location, availability, timing and the final quotation.",
      "A booking is confirmed only when the relevant details are expressly agreed with you through an official City Coolies channel.",
      "Please check the confirmed service scope and price before work begins.",
    ],
  },
  {
    id: "appointments",
    number: "04",
    title: "Appointments and property access",
    intro:
      "You can help us deliver the agreed service by providing correct contact and property information and reasonable access at the agreed time.",
    points: [
      "Tell us about access restrictions, safety concerns or special site conditions before the appointment.",
      "If a visit needs to change, contact us as soon as possible so a new time can be discussed.",
      "If conditions at the site differ materially from the agreed description, we will discuss the effect on scope, timing or price before additional work proceeds.",
    ],
  },
  {
    id: "payments",
    number: "05",
    title: "Payments",
    intro:
      "Payment method, timing and the amount payable for a service should be communicated as part of the confirmed service arrangement.",
    points: [
      "Please use only the payment instructions provided through an official City Coolies channel.",
      "A third-party payment provider may process an available online checkout and apply its own terms.",
      "Vendor membership payment, where offered, is separate from a customer's service enquiry or cart selection.",
    ],
  },
  {
    id: "changes-cancellations",
    number: "06",
    title: "Changes, cancellations and refunds",
    intro:
      "If you need to change or cancel an agreed service, contact us promptly. Any applicable charge or refund depends on the confirmed arrangement and the work or costs already incurred.",
    points: [
      "We will explain any relevant cancellation or rescheduling conditions before they apply to a booking.",
      "Where a payment has been made, contact us with the transaction and booking details so we can review the request.",
      "Nothing on this page removes any right or remedy available to you under applicable law.",
    ],
  },
  {
    id: "service-delivery",
    number: "07",
    title: "Service delivery",
    intro:
      "We aim to perform confirmed work with reasonable care and communicate material changes that arise during the service.",
    points: [
      "Completion time can be affected by site conditions, weather, access, materials and the agreed scope.",
      "Tell us promptly if the delivered work differs from the confirmed scope so we can review the concern.",
      "Do not ask personnel to perform unsafe, unlawful or materially different work outside the agreed service.",
    ],
  },
  {
    id: "vendor-careers",
    number: "08",
    title: "Vendor membership and careers",
    intro:
      "Vendor membership and career application features are separate from customer service bookings.",
    points: [
      "Submitting an application or membership interest does not guarantee approval, employment, assignments or a particular income.",
      "Review the current membership details and any payment information shown during that process before proceeding.",
      "Additional written terms may be provided if a vendor or employment relationship is offered.",
    ],
  },
  {
    id: "content-links",
    number: "09",
    title: "Website content and external links",
    intro:
      "The City Coolies name, website design, text and original visual materials are provided for viewing and using our website.",
    points: [
      "You may not copy or commercially reuse website material without permission, except where the law permits it.",
      "External websites and payment services may have their own terms and practices.",
      "We may update website information or temporarily restrict access for maintenance or security.",
    ],
  },
  {
    id: "legal-rights",
    number: "10",
    title: "Legal rights and responsibility",
    intro:
      "We work to keep website information useful and accurate, but availability and service details can change. Specific commitments for a job are those confirmed with you for that job.",
    points: [
      "These terms are governed by applicable laws of India.",
      "Nothing in these terms excludes or restricts rights that cannot lawfully be excluded, including applicable consumer rights.",
      "If a concern arises, contact us first with the service details so our team can review it.",
    ],
  },
  {
    id: "privacy-updates",
    number: "11",
    title: "Privacy and updates",
    intro:
      "Our Privacy Policy explains how information submitted through the website is handled. We may update these terms as our website or services change.",
    points: [
      "The date at the top of this page identifies this version.",
      "Please review the current terms when submitting a new request or using a new feature.",
    ],
  },
] as const;

export default function TermsConditionsPage() {
  return (
    <main id="top" className="bg-white text-[#1d1e22]">
      <header className="relative isolate overflow-hidden border-b border-[#f4d5da] bg-[#fff6f7] text-[#202126]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 85% at 88% 48%, rgba(255,111,126,0.28), transparent 72%), radial-gradient(ellipse 52% 95% at 46% -18%, rgba(255,203,211,0.58), transparent 72%), linear-gradient(112deg, #ffffff 0%, #fff9fa 48%, #ffe9ed 100%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-28 -top-44 hidden h-[520px] w-[520px] rounded-full border border-white/80 shadow-[0_0_65px_14px_rgba(255,255,255,0.75)] md:block" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-9 -top-24 hidden h-[365px] w-[365px] rounded-full border border-white/70 shadow-[0_0_34px_rgba(239,27,35,0.10)] md:block" aria-hidden="true" />
        <div className="pointer-events-none absolute right-28 top-14 hidden h-2 w-2 rounded-full bg-white shadow-[0_0_20px_8px_rgba(255,255,255,0.9)] md:block" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[28%] bottom-12 hidden h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_7px_rgba(255,255,255,0.9)] md:block" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1120px] px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f4cbd1] bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e71922] shadow-[0_8px_24px_-16px_rgba(239,27,35,0.5)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef1b23]" />
            City Coolies / Legal
          </div>
          <h1 className="mt-6 text-[42px] font-bold leading-[1.04] tracking-[-0.055em] sm:text-[58px]">
            Terms <span className="text-[#ef1b23]">&amp; Conditions</span>
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-[#535d68] sm:text-base">
            Clear terms for using our website, exploring services and
            confirming work with City Coolies.
          </p>
          <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-[#515963]">
            <span className="h-[2px] w-8 rounded-full bg-[#ef1b23]" />
            Last updated: {updated}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-5 pb-20 pt-9 sm:px-8 sm:pt-12">
        <details className="mb-9 rounded-xl border border-[#eadfe1] bg-[#fffafa] px-4 py-3 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-[#292b31]">
            Jump to a section
          </summary>
          <nav aria-label="Mobile terms sections" className="mt-4 grid gap-1 border-t border-[#eee3e5] pt-3">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="rounded-lg px-2 py-2 text-sm text-[#555b65] hover:bg-[#fff0f2] hover:text-[#e31b24]">
                <span className="mr-3 text-xs font-bold text-[#ef1b23]">{section.number}</span>
                {section.title}
              </a>
            ))}
            <a href="#contact" className="rounded-lg px-2 py-2 text-sm text-[#555b65] hover:bg-[#fff0f2] hover:text-[#e31b24]">
              Contact us
            </a>
          </nav>
        </details>

        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Terms sections" className="hidden lg:sticky lg:top-40 lg:block lg:self-start">
            <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef1b23]">
              Contents
            </p>
            <div className="border-l border-[#e7e0e2]">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="group flex gap-3 border-l-2 border-transparent py-2.5 pl-4 text-[13px] leading-5 text-[#646a73] transition hover:border-[#ef1b23] hover:text-[#e31b24]">
                  <span className="shrink-0 font-bold text-[#b9a1a6] group-hover:text-[#ef1b23]">{section.number}</span>
                  <span>{section.title}</span>
                </a>
              ))}
              <a href="#contact" className="block border-l-2 border-transparent py-2.5 pl-4 text-[13px] font-semibold text-[#ef1b23] hover:border-[#ef1b23]">
                Contact us ↗
              </a>
            </div>
          </nav>

          <article className="min-w-0">
            <div className="border-b border-[#e8e3e4] pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ef1b23]">
                The essentials
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-[32px]">
                Know what happens before work begins.
              </h2>
              <p className="mt-4 max-w-[730px] text-[15px] leading-8 text-[#59616c]">
                Browse services and build a cart to share what you need. Prices
                shown online are estimates. Our team confirms the scope, timing
                and final quote with you before a service booking is agreed.
              </p>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-40 grid gap-4 border-b border-[#e8e3e4] py-10 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-5 sm:py-12">
                <span className="pt-1 text-sm font-bold tabular-nums text-[#ef1b23]">{section.number}</span>
                <div className="min-w-0">
                  <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.035em] sm:text-[27px]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-8 text-[#525b66]">{section.intro}</p>
                  <ul className="mt-5 space-y-3.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[14px] leading-7 text-[#5c6470] sm:text-[15px]">
                        <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#ef1b23]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}

            <section id="contact" className="scroll-mt-40 mt-12 border-t-2 border-[#ef1b23] bg-[#faf8f8] px-5 py-8 sm:px-8">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ef1b23]">
                    Here to help
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                    Questions about these terms?
                  </h2>
                  <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#5b636d]">
                    Share your enquiry or booking details and our team will
                    review your question.
                  </p>
                </div>
                <a href="mailto:citycooliescrm@gmail.com?subject=Terms%20and%20Conditions%20Enquiry" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#ef1b23] px-5 text-sm font-semibold text-white transition hover:bg-[#cf1720] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23]">
                  Email our team ↗
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e8dcdf] pt-5 text-xs leading-6 text-[#686f79]">
                <span>citycooliescrm@gmail.com</span>
                <a href="tel:+918693986939" className="hover:text-[#ef1b23]">+91 86939 86939</a>
                <Link href="/privacy-policy" className="font-semibold text-[#ef1b23] hover:underline">
                  Privacy Policy ↗
                </Link>
              </div>
            </section>

            <a href="#top" className="mt-7 inline-block text-xs font-semibold text-[#ef1b23] hover:underline">
              Back to top ↑
            </a>
          </article>
        </div>
      </div>
    </main>
  );
}