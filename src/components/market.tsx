"use client";

import { useState } from "react";
import {
  ANNUAL_CORN_INTAKE_MT,
  IMPORT_2023_MT,
  IMPORT_2023_USD_M,
  NATIVE_ANNUAL_MT,
  OPERATING_DAYS,
  TARIFF_INCIDENCE,
  starchImports,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/count-up";
import { SectionIntro } from "@/components/reveal";

export function Market() {
  const [view, setView] = useState<"volume" | "tariff">("volume");
  const [origin, setOrigin] = useState(starchImports[0].origin);
  const active = starchImports.find((row) => row.origin === origin) ?? starchImports[0];
  const maxOrigin = Math.max(...starchImports.map((row) => row.tonnes));

  return (
    <section id="advantage" className="bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          index="05"
          eyebrow="Import substitution"
          title="Domestic capacity against a 67% tariff on imported starch."
          lede="Maize starch imported into Bangladesh in 2023 totalled 11,604 tonnes, worth $5.83 million. ACIL’s native-starch design capacity is 23,100 MT a year, about twice that import volume, while the corn it buys carries zero duty."
        />
        <div className="mt-8 inline-flex rounded-full border border-forest/15 bg-white p-1">
          {(
            [
              ["volume", "Annual volume"],
              ["tariff", "Tariff exposure"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition",
                view === id ? "bg-forest text-white" : "text-ink hover:text-forest",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {view === "volume" ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-forest/12 bg-white p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <VolumeBar
                  label="2023 maize starch imports"
                  value={IMPORT_2023_MT}
                  max={NATIVE_ANNUAL_MT}
                  tone="forest"
                  note="All origins, World Bank WITS"
                />
                <VolumeBar
                  label="ACIL native starch, design year"
                  value={NATIVE_ANNUAL_MT}
                  max={NATIVE_ANNUAL_MT}
                  tone="lime"
                  note={`${OPERATING_DAYS} operating days × 70,000 kg`}
                />
              </div>
              <p className="mt-6 text-sm leading-6 text-muted">
                70,000 kg/day × {OPERATING_DAYS} days = 23,100 MT of native starch. At the same day
                count the mill would take {ANNUAL_CORN_INTAKE_MT.toLocaleString("en-US")} MT of corn,
                beside the 300,000 MT already used each year by the six starch producers operating in
                the country.
              </p>
            </div>
            <div className="rounded-3xl border border-forest/12 bg-ink p-6 text-white md:p-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">
                2023 imports by origin
              </p>
              <div className="mt-5 space-y-3">
                {starchImports.map((row) => (
                  <button
                    key={row.origin}
                    type="button"
                    onMouseEnter={() => setOrigin(row.origin)}
                    onFocus={() => setOrigin(row.origin)}
                    onClick={() => setOrigin(row.origin)}
                    className="block w-full cursor-pointer text-left"
                  >
                    <span className="flex items-center justify-between text-sm">
                      <span className={origin === row.origin ? "text-lime" : "text-white/80"}>{row.origin}</span>
                      <span className="font-mono tabular-nums">{row.tonnes.toLocaleString("en-US")} t</span>
                    </span>
                    <span className="mt-1 block h-2 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={cn(
                          "block h-full rounded-full",
                          origin === row.origin ? "bg-lime" : "bg-white/40",
                        )}
                        style={{ width: `${(row.tonnes / maxOrigin) * 100}%` }}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/70">
                {active.origin}: {active.tonnes.toLocaleString("en-US")} t · ${active.value.toFixed(2)} million.
                Combined declared value ${IMPORT_2023_USD_M.toFixed(2)} million.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl bg-ink p-8 text-white">
              <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Imported corn starch</p>
              <p className="mt-4 font-headline text-6xl tracking-tight text-lime">
                <CountUp value={Math.round(TARIFF_INCIDENCE * 100)} suffix="%" />
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                Total tax incidence on imported corn starch. The duty sits on the finished ingredient,
                not on the grain.
              </p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-lime" style={{ width: `${TARIFF_INCIDENCE * 100}%` }} />
              </div>
            </article>
            <article className="rounded-3xl border border-forest/12 bg-white p-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Corn ACIL buys locally</p>
              <p className="mt-4 font-headline text-6xl tracking-tight text-forest">
                <CountUp value={0} suffix="%" />
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                Import tariff on corn. Shipping volatility on a starch cargo does not apply to a kernel
                that never left the country.
              </p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-forest/10">
                <div className="h-full w-[3%] rounded-full bg-forest" />
              </div>
            </article>
          </div>
        )}

        <article className="mt-4 rounded-3xl border border-forest/12 bg-white p-6 md:flex md:items-end md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Sizing starch demand</p>
            <p className="mt-3 font-headline text-4xl tracking-tight text-ink md:text-5xl">$38.5 billion</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Bangladesh apparel exports in 2024, the world’s second largest. The textile industry is
              the country’s largest single consumer of corn starch, for yarn sizing and fabric finishing.
              ACIL’s native and oxidized grades are specified for that use.
            </p>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-5 text-muted md:mt-0 md:text-right">
            Sources: World Bank WITS, maize starch exports to Bangladesh, 2023. National Board of
            Revenue tariff schedule via USDA FAS, Dhaka, March 2025. WTO, 2024.
          </p>
        </article>
      </div>
    </section>
  );
}

function VolumeBar({
  label,
  value,
  max,
  tone,
  note,
}: {
  label: string;
  value: number;
  max: number;
  tone: "forest" | "lime";
  note: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <p className={cn("mt-2 font-headline text-4xl tracking-tight", tone === "lime" ? "text-forest" : "text-ink")}>
        <CountUp value={value} />
        <span className="ml-1 text-lg">MT</span>
      </p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-forest/10">
        <div
          className={cn("h-full rounded-full", tone === "lime" ? "bg-lime" : "bg-forest")}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">{note}</p>
    </div>
  );
}
