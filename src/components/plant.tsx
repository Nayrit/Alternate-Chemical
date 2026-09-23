"use client";

import { useState } from "react";
import { esg, plantZones } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/count-up";
import { SectionIntro } from "@/components/reveal";
import { SectionMore } from "@/components/section-more";

export function Plant() {
  const [selected, setSelected] = useState("modified");
  const zone = plantZones.find((item) => item.id === selected) ?? plantZones[5];

  return (
    <section id="sustainability" className="section-y bg-ink text-white">
      <div className="shell">
        <SectionIntro
          index="06"
          eyebrow="Habiganj plant"
          title="A blueprint for crush, steam, sun, and zero discharge."
          lede="Satian Road, Ratanpur, Madhobpur. The layout below follows the 2026 facility plan: silos, steeping, the milling hall, the Wuhan Friendship modification line, the Thermax boiler, the laboratory, the effluent plant, and rooftop solar."
          invert
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#07160f] p-3">
            <svg viewBox="0 0 1000 660" className="h-auto min-w-[36rem] w-full sm:min-w-0" role="img" aria-label="Indicative Habiganj site layout">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(107,182,52,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="1000" height="660" fill="url(#grid)" />
              <path
                d="M160 180 C 280 210, 420 200, 520 150"
                fill="none"
                stroke="#6BB634"
                strokeWidth="2"
                className="flow-line"
              />
              {plantZones.map((item) => {
                const on = item.id === selected;
                return (
                  <g
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    className="cursor-pointer"
                    onClick={() => setSelected(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelected(item.id);
                      }
                    }}
                  >
                    <rect
                      x={item.x}
                      y={item.y}
                      width={item.w}
                      height={item.h}
                      rx="16"
                      fill={on ? "rgba(107,182,52,0.2)" : "rgba(0,104,55,0.28)"}
                      stroke={on ? "#6BB634" : "rgba(107,182,52,0.45)"}
                      strokeWidth={on ? 3 : 1.4}
                    />
                    <text x={item.x + 16} y={item.y + 32} fill="#6BB634" fontSize="13" fontFamily="var(--font-plex), monospace">
                      {item.code}
                    </text>
                    <text x={item.x + 16} y={item.y + 58} fill="#ffffff" fontSize="18" fontFamily="var(--font-syne), sans-serif">
                      {item.svg}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="px-2 pt-2 text-xs text-white/55">
              Indicative site layout from the company profile. Not a construction drawing. Scroll sideways on a small screen.
            </p>
          </div>
          <article className="rounded-3xl border border-lime/30 bg-[#0c2418] p-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Zone {zone.code}</p>
            <h3 className="mt-3 font-headline text-3xl tracking-tight">{zone.label}</h3>
            <p className="mt-4 text-sm leading-6 text-white/75">{zone.detail}</p>
            <p className="mt-5 inline-flex rounded-full bg-lime/15 px-3 py-1 text-sm font-semibold text-lime">
              {zone.metric}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {plantZones.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    "cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-medium transition",
                    item.id === selected
                      ? "border-lime/60 bg-lime/15 text-lime"
                      : "border-white/10 text-white/70 hover:border-lime/40",
                  )}
                >
                  {item.code} {item.label}
                </button>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <CounterCard
            value={esg.carbonTonnesPerYear}
            suffix=""
            unit="t CO₂e / year"
            label="Solar planning case"
            caption="Modeled avoidance, not a metered result. Array size is set at commissioning."
          />
          <CounterCard
            value={esg.waterLitresPerDay}
            suffix=""
            unit="litres / day"
            label="ETP water loop"
            caption="Design-basis recirculation. Zero-discharge means this water stays on site."
          />
          <CounterCard
            value={0}
            suffix=""
            unit="litres discharged"
            label="Effluent leaving the boundary"
            caption="Zero-discharge design. Treated process water is not released to the surrounding land."
          />
        </div>
        <details className="mt-4 rounded-2xl border border-white/10 px-5 py-4 text-sm text-white/70">
          <summary className="cursor-pointer font-medium text-white">Planning basis for the counters</summary>
          <div className="mt-3 space-y-2 leading-6">
            <p>
              Carbon uses a planning case of 400 kWp, 4.2 peak-sun hours, an 80% performance ratio, and a
              grid factor of 0.60 kg CO₂/kWh: 400 × 4.2 × 365 × 0.8 × 0.60 / 1,000 = {esg.carbonTonnesPerYear} tonnes
              a year. The profile states rooftop solar without a contracted kilowatt figure.
            </p>
            <p>
              Water uses 2.5 m³ per tonne of corn, a wet-mill planning factor, on the 150 TPD crush:
              375,000 litres a day returned through the ETP. It is not a hydraulic design from the equipment vendor.
            </p>
          </div>
        </details>
        <SectionMore href="/sustainability" label="Every zone on the site plan" tone="lime" />
      </div>
    </section>
  );
}

function CounterCard({
  value,
  suffix,
  unit,
  label,
  caption,
}: {
  value: number;
  suffix: string;
  unit: string;
  label: string;
  caption: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#0c2418] p-6">
      <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">{label}</p>
      <p className="mt-3 font-headline text-3xl tracking-tight text-balance text-white sm:text-4xl 3xl:text-5xl">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-sm text-lime">{unit}</p>
      <p className="mt-3 text-sm leading-6 text-white/65">{caption}</p>
    </article>
  );
}
