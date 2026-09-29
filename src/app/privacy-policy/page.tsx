import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | City Coolies",
  description:
    "Learn how City Coolies handles service enquiries, career applications, vendor information, website data and payment information.",
  alternates: { canonical: "/privacy-policy" },
};

const updated = "29 September 2026";

const sections = [
  {
    id: "overview",
    number: "01",
    title: "Who this policy covers",
    intro:
      "City Coolies Pvt. Ltd. provides property services through this website. This policy explains how information is handled when you browse the website, enquire about a service, apply for a role, or interact with the vendor membership process.",
    points: [
      "It applies to customers, website visitors, job applicants and prospective service partners.",
      "The information we handle depends on the feature you choose to use.",
      "A service provider or payment provider may have its own privacy terms when you use its service.",
    ],
  },
  {
    id: "information",
    number: "02",
    title: "Information you provide",
    intro:
      "We receive information that you choose to enter in our forms or send to us directly.",
    points: [
      "Service enquiries: your name, phone number, email address, selected service and the requirements you write in the message.",
      "Career applications: contact details, location, preferred role, experience, skills, other application answers and the CV or resume you upload.",
      "Vendor membership: the details you enter in the vendor form, including contact, work and service information. If you choose the location feature, your browser asks for permission before providing location coordinates.",
      "Messages or requests you send by email, phone or other contact channels.",
    ],
  },
  {
    id: "website-data",
    number: "03",
    title: "Website and device information",
    intro:
      "Some information is generated when you use the website, even if you do not submit a form.",
    points: [
      "Basic technical information, such as browser and device details, requested pages and diagnostic records, may be handled by our website hosting and security services.",
      "Selected services and cart choices can be stored in your browser so they remain available while you browse service pages.",
      "Optional location information is requested only when you use a feature that asks your browser for location access. You can decline or change that permission in your device or browser settings.",
      "Browser storage can generally be cleared through your browser settings; clearing it may remove saved service selections.",
    ],
  },
  {
    id: "purposes",
    number: "04",
    title: "How we use information",
    intro:
      "We use information in connection with the request or feature for which it was provided.",
    points: [
      "To review enquiries, respond to you and discuss service scope, availability and pricing.",
      "To process career applications and contact candidates about relevant roles.",
      "To review vendor interest, display or process membership steps and respond to partner queries.",
      "To operate the website, maintain service selections, investigate errors and protect the site from misuse.",
      "To meet applicable legal, accounting, security and record-keeping requirements.",
    ],
  },
  {
    id: "sharing",
    number: "05",
    title: "When information is shared",
    intro:
      "Information may be shared where needed to run the website, respond to a request or provide a service.",
    points: [
      "Relevant City Coolies staff and service personnel may receive the details needed to handle an enquiry or service request.",
      "Email and hosting providers may process information when they deliver form submissions or operate the website.",
      "If you use vendor membership payment, Razorpay handles its checkout and payment process. Our website receives payment identifiers and status needed to verify the transaction; card details are entered through the payment provider.",
      "Information may also be disclosed when required by applicable law or a valid legal request.",
    ],
  },
  {
    id: "payments",
    number: "06",
    title: "Payments and external services",
    intro:
      "Vendor membership checkout uses a third-party payment service. You should read the payment provider's privacy information before completing payment.",
    points: [
      "Payment availability depends on the configured checkout service.",
      "Links to maps, social media or other external websites take you to services with their own privacy practices.",
      "We are responsible for our website practices; external services explain their own processing in their policies.",
    ],
  },
  {
    id: "retention",
    number: "07",
    title: "How long information is kept",
    intro:
      "We keep information for the time reasonably needed for the purpose for which it was received, including handling requests, applications, transactions, disputes and applicable record-keeping obligations.",
    points: [
      "The period can differ for an enquiry, a career application and a payment record.",
      "Browser-stored service selections remain on your device until they are changed, cleared, or removed by the website or browser.",
      "When information is no longer needed, we take steps to delete it or stop identifying individuals from it, subject to applicable requirements.",
    ],
  },
  {
    id: "security",
    number: "08",
    title: "Security",
    intro:
      "We take reasonable technical and organisational steps to protect information against unauthorised access, alteration, loss and misuse. No internet service or transmission method can be guaranteed completely secure.",
    points: [
      "Access to submitted information should be limited to people and providers who need it for the relevant purpose.",
      "Please avoid sending payment card details or sensitive identity documents in ordinary service enquiry messages.",
      "If you believe information sent to us has been misused, contact us using the details below.",
    ],
  },
  {
    id: "choices",
    number: "09",
    title: "Your choices and requests",
    intro:
      "You can contact us about personal information you have provided through the website.",
    points: [
      "Ask us to review or correct information that is inaccurate.",
      "Request deletion or raise a concern about how information is handled, subject to applicable legal requirements.",
      "Change optional browser location permission or clear locally stored service selections through browser settings.",
      "If a processing activity depends on your consent, contact us to withdraw it where applicable. This may affect our ability to provide the related feature or service.",
    ],
  },
  {
    id: "children",
    number: "10",
    title: "Children's information",
    intro:
      "This website is intended for people who can request property services, apply for work or enquire about a vendor relationship. It is not designed to collect information directly from children.",
    points: [
      "If you believe a child has submitted personal information through the website, contact us so we can review the request.",
    ],
  },
  {
    id: "updates",
    number: "11",
    title: "Changes to this policy",
    intro:
      "We may update this page as website features or information-handling practices change. The date at the top shows when this version was last updated.",
    points: [
      "Please check this page again when you use a new website feature or submit new information.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
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
            Privacy <span className="text-[#ef1b23]">Policy</span>
          </h1>

          <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-[#535d68] sm:text-base">
            How information is handled when you browse City Coolies,
            request a service, apply for a role or explore vendor membership.
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
          <nav aria-label="Mobile privacy policy sections" className="mt-4 grid gap-1 border-t border-[#eee3e5] pt-3">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}
                className="rounded-lg px-2 py-2 text-sm text-[#555b65] hover:bg-[#fff0f2] hover:text-[#e31b24]">
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
          <nav aria-label="Privacy policy sections" className="hidden lg:sticky lg:top-40 lg:block lg:self-start">
            <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef1b23]">
              Contents
            </p>
            <div className="border-l border-[#e7e0e2]">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}
                  className="group flex gap-3 border-l-2 border-transparent py-2.5 pl-4 text-[13px] leading-5 text-[#646a73] transition hover:border-[#ef1b23] hover:text-[#e31b24]">
                  <span className="shrink-0 font-bold text-[#b9a1a6] group-hover:text-[#ef1b23]">
                    {section.number}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
              <a href="#contact"
                className="block border-l-2 border-transparent py-2.5 pl-4 text-[13px] font-semibold text-[#ef1b23] hover:border-[#ef1b23]">
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
                Clear information about your information.
              </h2>
              <p className="mt-4 max-w-[730px] text-[15px] leading-8 text-[#59616c]">
                City Coolies uses information you provide to respond to service
                enquiries, review applications and support vendor membership.
                Selected services may be stored in your browser while you
                navigate the website. The details are explained below.
              </p>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id}
                className="scroll-mt-40 grid gap-4 border-b border-[#e8e3e4] py-10 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-5 sm:py-12">
                <span className="pt-1 text-sm font-bold tabular-nums text-[#ef1b23]">
                  {section.number}
                </span>
                <div className="min-w-0">
                  <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.035em] sm:text-[27px]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-8 text-[#525b66]">
                    {section.intro}
                  </p>
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
                    Privacy support
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                    Questions about your data?
                  </h2>
                  <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#5b636d]">
                    Tell us about the enquiry or application concerned. We may
                    verify your identity before responding to a request about
                    personal information.
                  </p>
                </div>
                <a href="mailto:citycooliescrm@gmail.com?subject=Privacy%20Request"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#ef1b23] px-5 text-sm font-semibold text-white transition hover:bg-[#cf1720] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23]">
                  Email privacy support ↗
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e8dcdf] pt-5 text-xs leading-6 text-[#686f79]">
                <span>citycooliescrm@gmail.com</span>
                <a href="tel:+918693986939" className="hover:text-[#ef1b23]">+91 86939 86939</a>
                <span>City Coolies Pvt. Ltd. · Sholinganallur, Chennai</span>
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