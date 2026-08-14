import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";


const services = [
  "Deep Cleaning",
  "Renovation",
  "Electrical Works",
  "Plumbing Works",
  "Painting Services",
  "Civil Construction & Maintenance",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
  label: "Facebook",
  href: "https://www.facebook.com/",
  icon: FaFacebookF,
  iconColor: "text-[#1877F2]",
  className: "hover:bg-[#1877F2]",
},
  {
  label: "Instagram",
  href: "https://www.instagram.com/",
  icon: FaInstagram,
  iconColor:
    "text-white bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
  className:
    "border-transparent hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(214,36,159,0.65)]",
},
  {
  label: "X",
  href: "https://x.com/",
  icon: FaXTwitter,
  iconColor: "text-white",
  className:
    "!rounded-full !border-black !bg-black hover:!bg-black hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.65)]",
},
 {
  label: "YouTube",
  href: "https://www.youtube.com/",
  icon: FaYoutube,
  iconColor: "text-white",
  className:
    "!rounded-full !border-[#FF0000] !bg-[#FF0000] hover:!bg-[#FF0000] hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(255,0,0,0.65)]",
},
  {
  label: "LinkedIn",
  href: "https://www.linkedin.com/",
  icon: FaLinkedinIn,
  iconColor: "text-white",
  className:
    "!rounded-xl !border-[#0A66C2] !bg-[#0A66C2] hover:!bg-[#0A66C2] hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(10,102,194,0.65)]",
},
 {
  label: "WhatsApp",
  href: "https://wa.me/918693986939",
  icon: FaWhatsapp,
  iconColor: "text-white",
  className:
    "!rounded-full !border-[#25D366] !bg-[#25D366] hover:!bg-[#25D366] hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(37,211,102,0.65)]",
},
];

export default function Footer() {
  return (
   <footer className="relative isolate overflow-hidden bg-white text-zinc-900">
     

     <div className="mx-auto max-w-[1480px] px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.3fr_0.75fr_0.9fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="City Coolies home">
              <Image
  src="/city-coolies-logo(2).png"
  alt="City Coolies"
  width={520}
  height={150}
  className="h-auto w-[320px] object-contain drop-shadow-[0_10px_28px_rgba(239,27,35,0.28)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03]"
/>
            </Link>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-black">
              City Coolies Pvt. Ltd. provides professional deep cleaning,
              renovation, electrical, plumbing, painting and complete civil
              work solutions for residential, commercial, industrial and
              institutional properties.
            </p>

            <p className="mt-5 text-sm font-bold tracking-[0.08em] text-[#ff4a51] uppercase">
              Professional Service. Quality Work. Trusted Results.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                   className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.22)] ${social.iconColor ?? "text-[#ef1b23]"} ${social.className}`}
                  >
                    <Icon />
                  </a>
                );
              })}

<a
  href="mailto:citycoolicescrm@gmail.com"
  aria-label="Gmail"
  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_12px_28px_-10px_rgba(234,67,53,0.45)]"
>
  <svg
    aria-hidden="true"
    viewBox="0 0 48 36"
    className="h-6 w-7"
  >
    <path fill="#4285F4" d="M4 8v24h8V16L4 8Z" />
    <path fill="#34A853" d="M36 16v16h8V8l-8 8Z" />
    <path fill="#FBBC04" d="M36 16 44 8V4.8c0-3.3-3.8-5.2-6.5-3.2L36 2.7V16Z" />
    <path fill="#C5221F" d="M4 8l8 8V2.7L10.5 1.6C7.8-.4 4 1.5 4 4.8V8Z" />
    <path fill="#EA4335" d="M12 16 24 25 36 16V2.7L24 11.5 12 2.7V16Z" />
  </svg>
</a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#ef1b23]">Quick Links</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#ef1b23]" />

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                   className="group inline-flex items-center gap-3 text-sm text-black transition-colors duration-300 hover:text-[#ef1b23]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef1b23] transition-transform duration-300 group-hover:scale-150" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#ef1b23]">Our Services</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#ef1b23]" />

            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-6 text-black"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef1b23]" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-[#ef1b23]">Contact Us</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#ef1b23]" />

            <div className="mt-6 space-y-5">
              <a
                href="https://maps.google.com/?q=No.+117,+Village+High+Road,+Sholinganallur,+Chennai+600119"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
               <span className="flex h-8 w-8 shrink-0 items-center justify-center">
  <svg
    aria-hidden="true"
    viewBox="0 0 48 48"
    className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
  >
    <path
      fill="#34A853"
      d="M24 46s14-12.2 14-25A14 14 0 1 0 10 21c0 12.8 14 25 14 25Z"
    />
    <path
      fill="#4285F4"
      d="M24 7a14 14 0 0 0-12.1 7L24 26l12.1-12A14 14 0 0 0 24 7Z"
    />
    <path
      fill="#FBBC04"
      d="M11.9 14A14 14 0 0 0 10 21c0 6.1 3.2 12.2 6.6 16.9L24 26 11.9 14Z"
    />
    <path
      fill="#EA4335"
      d="M36.1 14 24 26l7.4 11.9C34.8 33.2 38 27.1 38 21a14 14 0 0 0-1.9-7Z"
    />
    <circle cx="24" cy="21" r="5.5" fill="white" />
    <circle cx="24" cy="21" r="3.2" fill="#4285F4" />
  </svg>
</span>

                <span className="text-sm leading-6 text-black transition-colors group-hover:text-[#ef1b23]">
                  No. 117, Village High Road, Sholinganallur,
                  Chennai-600119
                </span>
              </a>

              <a
                href="tel:+918693986939"
                className="group flex items-center gap-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center">
  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1BAA39] text-[15px] text-[#1BAA39] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1BAA39] group-hover:text-white">
    <MdPhone />
  </span>
</span>

                <span className="text-sm text-black transition-colors group-hover:text-[#ef1b23]">
                  +91 86939 86939
                </span>
              </a>

              <a
                href="mailto:citycoolicescrm@gmail.com"
                className="group flex items-center gap-4"
              >
<span className="flex h-8 w-8 shrink-0 items-center justify-center">
  <svg
    aria-hidden="true"
    viewBox="0 0 48 36"
    className="h-7 w-8 transition-transform duration-300 group-hover:scale-110"
  >
    <path fill="#4285F4" d="M4 8v24h8V16L4 8Z" />
    <path fill="#34A853" d="M36 16v16h8V8l-8 8Z" />
    <path
      fill="#FBBC04"
      d="M36 16 44 8V4.8c0-3.3-3.8-5.2-6.5-3.2L36 2.7V16Z"
    />
    <path
      fill="#C5221F"
      d="M4 8l8 8V2.7L10.5 1.6C7.8-.4 4 1.5 4 4.8V8Z"
    />
    <path
      fill="#EA4335"
      d="M12 16 24 25 36 16V2.7L24 11.5 12 2.7V16Z"
    />
  </svg>
</span>

                <span className="text-sm text-black transition-colors group-hover:text-[#ef1b23]">
                  citycoolicescrm@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

       <div className="mt-14 border-t border-black/20 pt-7">
        <div className="flex flex-col items-center justify-between gap-5 text-center text-sm text-[#ef1b23] md:flex-row md:text-left">
            <p>
              © {new Date().getFullYear()} City Coolies Pvt. Ltd. All rights
              reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              <Link
                href="/privacy-policy"
className="font-semibold text-[#ef1b23] transition-colors hover:text-[#c91018]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-conditions"
              className="font-semibold text-[#ef1b23] transition-colors hover:text-[#c91018]"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}