"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { ArrowDownRight, Building2 } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/data";
import { CountUp } from "@/components/count-up";
import { OrbitalMark } from "@/components/orbital-mark";

const AtomCanvas = dynamic(() => import("@/components/atom-canvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <OrbitalMark className="w-[70%]" />
    </div>
  ),
});

class AtomBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

const tickers = [
  { kind: "count" as const, value: 150000, suffix: " kg", label: "Daily crushing capacity" },
  { kind: "count" as const, value: 6, suffix: "", label: "Fractionated product streams" },
  { kind: "count" as const, value: 0, suffix: "%", label: "Waste · 100% kernel biomass sold" },
  { kind: "word" as const, value: "UNIDO", label: "Best-practice plant design" },
];

export function Hero() {
  return (
    <section id="top" className="pt-[calc(4.6rem+env(safe-area-inset-top))]">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="hero-copy py-10 sm:py-14 lg:py-20 3xl:py-24">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">
            Habiganj · Corn wet milling · Commissioning {company.commissioning}
          </p>
          <h1 className="mt-4 max-w-4xl font-headline text-[clamp(2.15rem,2.4vw+1rem,6.5rem)] leading-[1.08] tracking-tight text-balance text-ink">
            {company.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">
            Alternate Chemical Industry Ltd. is bringing a UNIDO best-practice corn wet mill to
            Madhobpur, Habiganj: 150 tonnes of local corn a day, separated into six commercial
            streams for food, pharmaceutical, textile, and feed buyers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00562d]"
            >
              Explore Product Specifications
              <ArrowDownRight className="h-4 w-4" />
            </Link>
            <Link
              href="/procurement"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-forest/20 bg-white px-5 py-3 text-sm font-semibold text-forest transition hover:border-lime/50 hover:shadow-[0_16px_40px_-28px_rgba(107,182,52,0.9)]"
            >
              <Building2 className="h-4 w-4" />
              Procurement Portal
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
            Figures on this site are design capacities from the 2026 company profile. Full
            commissioning is scheduled for early 2027, after machinery integration through the end
            of 2026.
          </p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#145233_0%,#081C15_58%,#06140e_100%)] sm:min-h-[440px] lg:min-h-[680px] 3xl:min-h-[820px]">
          <div className="pointer-events-none absolute inset-6 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute inset-16 rounded-full border border-lime/10" />
          <AtomBoundary
            fallback={
              <div className="grid h-full place-items-center">
                <OrbitalMark className="w-[68%]" />
              </div>
            }
          >
            <div className="absolute inset-0">
              <AtomCanvas />
            </div>
          </AtomBoundary>
          <p className="pointer-events-none absolute bottom-5 left-5 right-5 font-mono text-[10px] tracking-[0.18em] text-lime/80 uppercase">
            Orbital mark · schematic of starch synthesis
          </p>
        </div>
      </div>
      <div className="bg-forest text-white">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {tickers.map((ticker, index) => (
            <div
              key={ticker.label}
              className={`px-3 py-5 sm:px-5 sm:py-6 ${index > 0 ? "lg:border-l lg:border-white/15" : ""} ${index % 2 === 1 ? "border-l border-white/15 lg:border-l" : ""} ${index > 1 ? "border-t border-white/15 lg:border-t-0" : ""}`}
            >
              <p className="font-headline text-2xl tracking-tight text-balance text-lime sm:text-3xl lg:text-4xl 3xl:text-5xl">
                {ticker.kind === "count" ? (
                  <CountUp value={ticker.value} suffix={ticker.suffix} />
                ) : (
                  ticker.value
                )}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/80 sm:text-sm">{ticker.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
