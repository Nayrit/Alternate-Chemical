"use client";

import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/lib/data";

const seals = [
  { kicker: "FAO", title: "Aligned quality", detail: "Intake, process, and final grading" },
  { kicker: "ISO", title: "Aligned system", detail: "On-site laboratory, every batch" },
  { kicker: "UNIDO", title: "Design basis", detail: "Best-practice wet-mill layout" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="bg-forest">
        <div className="shell flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-end lg:justify-between 3xl:py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.2em] text-lime uppercase">Partnership</p>
            <h2 className="mt-3 font-headline text-3xl leading-tight tracking-tight text-balance sm:text-4xl 3xl:text-5xl">
              Buyers, distributors, and investment partners are invited to build a domestic starch supply chain.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/request" className="rounded-full bg-lime px-5 py-3 text-center text-sm font-semibold text-ink">
              Request Commercial Quotation
            </Link>
            <Link
              href="/request?intent=sample"
              className="rounded-full border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Sample Request
            </Link>
          </div>
        </div>
      </div>
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] 3xl:py-20">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Alternate Chemical Industry Ltd."
              width={3043}
              height={643}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{company.tagline}</p>
          <address className="mt-6 space-y-4 text-sm leading-6 not-italic">
            <p>
              <span className="block font-semibold text-lime">{company.factory.label}</span>
              {company.factory.lines.map((line) => (
                <span key={line} className="block text-white/80">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <span className="block font-semibold text-lime">{company.office.label}</span>
              {company.office.lines.map((line) => (
                <span key={line} className="block text-white/80">
                  {line}
                </span>
              ))}
            </p>
          </address>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/import-substitution" className="text-white/80 hover:text-white">
                Import substitution
              </Link>
            </li>
            <li>
              <Link href="/procurement" className="text-white/80 hover:text-white">
                Procurement
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-3">
          {seals.map((seal) => (
            <div key={seal.kicker} className="rounded-2xl border border-white/10 px-4 py-3">
              <p className="font-mono text-[11px] tracking-[0.18em] text-lime">{seal.kicker}</p>
              <p className="mt-1 font-semibold">{seal.title}</p>
              <p className="text-sm text-white/65">{seal.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <p className="text-xs leading-5 text-white/55">
            © {new Date().getFullYear()} Alternate Chemical Industry Ltd. Design capacities describe the
            Habiganj plant at full commissioning (early 2027) and are taken from the Company Profile 2026.
            They are not current production statistics. Indicative specifications are grade targets for
            discussion and are confirmed on the lot TDS and certificate of analysis. Quotation figures
            generated here are non-binding planning estimates and do not constitute an offer. FAO, ISO,
            and UNIDO marks describe the stated design and quality basis; they are not certificate numbers.
          </p>
        </div>
      </div>
    </footer>
  );
}
