import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function CommercePageShell({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative min-h-[68vh] overflow-hidden bg-[linear-gradient(145deg,#fff_0%,#fff7f8_55%,#ffecef_100%)] py-12 sm:py-16">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-red-100 bg-red-50/50" />
      <div className="relative mx-auto w-[calc(100%_-_32px)] max-w-[1280px]">
        <nav className="mb-7 flex items-center gap-2 text-xs text-zinc-500" aria-label="Breadcrumb">
          <Link className="hover:text-[#ef1b23]" href="/">Home</Link><span>/</span><span className="font-bold text-[#ef1b23]">{title}</span>
        </nav>
        <header className="max-w-3xl">
          <p className="mb-3 text-xs font-black tracking-[0.16em] text-[#ef1b23] uppercase">{eyebrow}</p>
          <h1 className="text-4xl font-black tracking-[-0.045em] text-[#171820] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">{description}</p>
        </header>
        <div className="mt-9">{children}</div>
      </div>
    </section>
  );
}
