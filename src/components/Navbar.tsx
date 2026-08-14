"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.345-.259.508-.697.417-1.117L6.963 3.148A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.69 5.517a2 2 0 0 1-2.12 0L2.25 6.75"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m-6-6 6 6-6 6"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative overflow-hidden bg-[#ef1b23] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_45%,transparent_70%)]" />

        <div className="relative mx-auto flex min-h-10 max-w-[1480px] items-center justify-center px-4 sm:px-6 lg:justify-between lg:px-10">
          <p className="hidden text-[12px] font-semibold tracking-[0.18em] uppercase lg:block">
          Complete Property Care. Professional Work. Trusted Results.
          </p>

          <div className="flex items-center gap-5 text-[13px] font-medium sm:text-[13px]">
            <a
              href="tel:+918693986939"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-75"
              aria-label="Call City Coolies"
            >
              <PhoneIcon />
              <span>+91 86939 86939</span>
            </a>

            <span className="h-4 w-px bg-white/35" />

            <a
              href="mailto:citycoolicescrm@gmail.com"
              className="hidden items-center gap-2 transition-opacity duration-300 hover:opacity-75 sm:flex"
              aria-label="Email City Coolies"
            >
              <EmailIcon />
              <span>citycoolicescrm@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      <nav
  aria-label="Main navigation"
  className={`relative isolate overflow-hidden border-b border-[#ef1b23]/20 bg-white transition-all duration-500 ${
    isScrolled
      ? "shadow-[0_22px_60px_-28px_rgba(239,27,35,0.55)]"
      : "shadow-[0_18px_50px_-30px_rgba(239,27,35,0.38)]"
  }`}
>
 <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />

   

       <div
  className={`relative mx-auto flex max-w-[1480px] items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:pl-4 lg:pr-10 ${
    isScrolled ? "min-h-[78px]" : "min-h-[94px]"
  }`}
>
          <Link
  href="/"
  className="group relative z-10 -ml-8 flex shrink-0 items-center lg:-ml-16 xl:-ml-24"
  aria-label="City Coolies home"
>
  <span className="pointer-events-none absolute -inset-4 -z-20 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(239,27,35,0.18),transparent_68%)] opacity-0 blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

  <span className="pointer-events-none absolute -inset-x-3 inset-y-0 -z-10 overflow-hidden rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    <span className="absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md transition-transform duration-1000 group-hover:translate-x-[520%]" />
  </span>

  <span className="pointer-events-none absolute -bottom-2 left-[12%] h-[10px] w-[76%] rounded-full bg-[#ef1b23]/20 opacity-0 blur-xl transition-all duration-500 group-hover:translate-y-1 group-hover:opacity-100" />

  <Image
    src="/city-coolies-logo(2).png"
    alt="City Coolies"
    width={520}
    height={150}
    priority
    sizes="(max-width: 640px) 280px, (max-width: 1280px) 320px, 370px"
    className={`h-auto object-contain drop-shadow-[0_6px_10px_rgba(239,27,35,0.10)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.035] group-hover:drop-shadow-[0_14px_18px_rgba(239,27,35,0.24)] ${
      isScrolled
        ? "w-[270px] sm:w-[300px] lg:w-[340px]"
        : "w-[280px] sm:w-[320px] lg:w-[370px]"
    }`}
  />
</Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navigationLinks.map((item) => {
              const active = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative isolate flex min-h-12 items-center overflow-hidden rounded-full px-4 text-[13px] font-bold tracking-[0.04em] uppercase transition-all duration-300 ${
                    active
                      ? "text-white shadow-[0_10px_25px_-12px_rgba(239,27,35,0.8)]"
                      : "text-[#e71922] hover:-translate-y-0.5 hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,#ff2630_0%,#df1119_100%)] transition-all duration-300 ${
                      active
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />

                  <span className="relative">{item.label}</span>

                  {!active && (
                    <span className="absolute inset-x-5 bottom-2 h-[2px] origin-center scale-x-0 rounded-full bg-[#ef1b23] transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/vendor-membership"
              className="group relative isolate hidden min-h-13 items-center gap-2 overflow-hidden rounded-full border border-[#ef1b23] bg-[#ef1b23] px-6 text-[13px] font-extrabold tracking-[0.06em] text-white uppercase shadow-[0_14px_30px_-12px_rgba(239,27,35,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(239,27,35,0.8)] xl:flex"
            >
              <span className="absolute inset-0 -z-10 translate-x-[-120%] skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span>Vendor Membership</span>
              <ArrowIcon />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#ef1b23] shadow-[0_12px_25px_-16px_rgba(239,27,35,0.7)] transition-all duration-300 hover:border-[#ef1b23] hover:bg-[#ef1b23] hover:text-white xl:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="relative h-5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[18px] h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[9px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-red-100 bg-white transition-all duration-500 xl:hidden ${
            isMenuOpen
              ? "max-h-[620px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-10">
            <div className="grid gap-2">
              {navigationLinks.map((item, index) => {
                const active = isActiveLink(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ transitionDelay: `${index * 45}ms` }}
                    className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 text-[14px] font-bold tracking-[0.05em] uppercase transition-all duration-300 ${
                      active
                        ? "border-[#ef1b23] bg-[#ef1b23] text-white shadow-lg shadow-red-200/60"
                        : "border-red-100 bg-red-50/40 text-[#e71922] hover:border-[#ef1b23] hover:bg-red-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowIcon />
                  </Link>
                );
              })}

              <Link
                href="/vendor-membership"
                className="group mt-2 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#ff2731_0%,#df1119_100%)] px-6 text-sm font-extrabold tracking-[0.06em] text-white uppercase shadow-[0_16px_30px_-12px_rgba(239,27,35,0.75)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Vendor Membership</span>
                <ArrowIcon />
              </Link>

              <div className="mt-3 grid gap-2 rounded-2xl border border-red-100 bg-white p-4 text-sm text-[#e71922] sm:grid-cols-2">
                <a
                  href="tel:+918693986939"
                  className="flex items-center gap-2 font-semibold"
                >
                  <PhoneIcon />
                  <span>+91 86939 86939</span>
                </a>

                <a
                  href="mailto:citycoolicescrm@gmail.com"
                  className="flex items-center gap-2 font-semibold sm:justify-end"
                >
                  <EmailIcon />
                  <span>citycoolicescrm@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}