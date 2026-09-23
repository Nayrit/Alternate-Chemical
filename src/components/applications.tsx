"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industryUses } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionIntro } from "@/components/reveal";
import { SectionMore } from "@/components/section-more";

export function Applications() {
  return (
    <section id="applications" className="section-y bg-white">
      <div className="shell">
        <SectionIntro
          index="04"
          eyebrow="Industrial applications"
          title="Specified for the industries that already import the grade."
          lede="Textile sizing is the largest single use of corn starch in Bangladesh, tied to a $38.5 billion apparel export industry. Food, pharmaceutical, and feed buyers take the rest of the kernel."
        />
        <div className="mt-10 overflow-hidden rounded-3xl border border-forest/12">
          <div className="hidden grid-cols-[1.1fr_1.3fr_1.8fr_auto] gap-4 bg-ink px-6 py-4 text-[11px] font-mono tracking-[0.16em] text-lime uppercase md:grid">
            <span>Industry</span>
            <span>Products</span>
            <span>Function</span>
            <span>Specifications</span>
          </div>
          {industryUses.map((row, index) => {
            const className = cn(
              "grid w-full cursor-pointer gap-2 px-5 py-5 text-left transition hover:bg-lime/10 md:grid-cols-[1.1fr_1.3fr_1.8fr_auto] md:items-center md:gap-4 md:px-6",
              index % 2 === 0 ? "bg-surface" : "bg-white",
            );
            const body = (
              <>
                <span className="font-headline text-xl tracking-tight text-ink">{row.industry}</span>
                <span className="text-sm font-medium text-forest">{row.products}</span>
                <span className="text-sm leading-6 text-muted">{row.fn}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  View grades
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </>
            );
            return (
              <Link key={row.id} href={`/products?sector=${row.id}`} className={className}>
                {body}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted">
          Textile is identified as the largest consumer of corn starch in Bangladesh. Source: USDA FAS,
          Grain and Feed Annual, Dhaka, March 2025. Apparel export value: WTO trade data, 2024.
        </p>
        <SectionMore href="/applications" label="Industrial applications, in full" />
      </div>
    </section>
  );
}
