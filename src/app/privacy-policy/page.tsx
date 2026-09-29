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
    <main className="bg-white text-[#171717]">
      <header className="relative overflow-hidden border-b border-[#f5dce0] bg-[radial-gradient(circle_at_85%_10%,#ffdce3_0%,transparent_34%),linear-gradient(135deg,#fff7f8_0%,#ffffff_60%)]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f3cbd1] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#dd1721] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#ef1b23]" />
            Trust & transparency
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-[-0.05em] text-[#171717] sm:text-5xl lg:text-6xl">
                Privacy <span className="text-[#ef1b23]">Policy</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#555c68] sm:text-lg">
                A clear guide to the information you share with City Coolies,
                how it supports our services, and the choices available to you.
              </p>
              <p className="mt-6 text-sm font-semibold text-[#68707c]">
                Last updated: {updated}
              </p>
            </div>

            <div className="rounded-3xl border border-[#f3d4d9] bg-white/90 p-6 shadow-[0_18px_50px_-35px_rgba(100,25,37,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f2] text-[#ef1b23]">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3 20 6v5.3c0 5.1-3.1 8-8 9.7-4.9-1.7-8-4.6-8-9.7V6l8-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9 11.7 2 2 4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-extrabold">Need help with your data?</h2>
              <p className="mt-2 text-sm leading-6 text-[#656d78]">
                Send us a privacy question or a request concerning information
                you submitted through this website.
              </p>
              <a href="mailto:citycooliescrm@gmail.com?subject=Privacy%20Request"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ef1b23] px-5 text-sm font-bold text-white transition hover:bg-[#d71921] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23]">
                Email City Coolies <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-16">
        <nav aria-label="Privacy policy sections" className="lg:sticky lg:top-40 lg:self-start">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef1b23]">
            On this page
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}
                className="shrink-0 rounded-xl border border-[#f0e5e7] bg-white px-3 py-2.5 text-sm font-semibold text-[#515b68] transition hover:border-[#ef1b23] hover:bg-[#fff5f6] hover:text-[#df1721] focus-visible:outline-2 focus-visible:outline-[#ef1b23] lg:shrink">
                <span className="mr-2 text-xs font-extrabold text-[#ef1b23]">{section.number}</span>
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="min-w-0 space-y-5">
          <div className="rounded-3xl border border-[#f2d9dd] bg-[#fff7f8] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ef1b23]">At a glance</p>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">
              Your information has a purpose.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#58616c] sm:text-base">
              We use details you provide to respond to service enquiries, review
              career applications and support vendor membership. Your selected
              services can be kept in your browser while you browse the website.
              The sections below explain these activities in more detail.
            </p>
          </div>

          {sections.map((section) => (
            <section key={section.id} id={section.id}
              className="scroll-mt-40 rounded-3xl border border-[#eee5e7] bg-white p-6 shadow-[0_14px_40px_-36px_rgba(65,20,30,0.35)] sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f2] text-sm font-black text-[#ef1b23]">
                  {section.number}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#535d69] sm:text-base">
                    {section.intro}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-7 text-[#535d69] sm:text-base">
                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef1b23]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}

          <section id="contact" className="scroll-mt-40 overflow-hidden rounded-3xl bg-[#19191d] p-7 text-white sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff8d96]">
              Contact us
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Privacy questions or requests?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d4d4d8] sm:text-base">
              Please explain your request and provide enough detail for us to
              identify the enquiry or application. We may need to verify your
              identity before responding to a request about personal information.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:citycooliescrm@gmail.com?subject=Privacy%20Request"
                className="inline-flex min-h-11 items-center rounded-xl bg-[#ef1b23] px-5 text-sm font-bold text-white transition hover:bg-[#d71921]">
                citycooliescrm@gmail.com
              </a>
              <a href="tel:+918693986939"
                className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 text-sm font-bold text-white transition hover:bg-white/10">
                +91 86939 86939
              </a>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#aeb0b8]">
              City Coolies Pvt. Ltd. · No. 117, Village High Road,
              Sholinganallur, Chennai 600119, India
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}