"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FINISHED_KG_PER_DAY, processSteps } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionIntro } from "@/components/reveal";
import { SectionMore } from "@/components/section-more";

export function ProcessFlow() {
  const [active, setActive] = useState(processSteps[0].id);
  const step = processSteps.find((item) => item.id === active) ?? processSteps[0];
  const share = step.yieldKg ? Math.round((step.yieldKg / FINISHED_KG_PER_DAY) * 1000) / 10 : null;

  return (
    <section id="milling" className="section-y bg-white">
      <div className="shell">
        <SectionIntro
          index="02"
          eyebrow="Milling technology"
          title="One kernel, six commercial streams."
          lede="Whole corn is steeped, milled, and washed until starch, fiber, germ, gluten, and steep liquor each have a buyer. Steam comes from the Thermax boiler at 10,000 kg/hr. Process water leaves through the effluent plant."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            onPointerMove={(event) => {
              if (!event.movementX && !event.movementY) return;
              const id = (event.target as HTMLElement).closest("button")?.getAttribute("data-step");
              if (id) setActive(id);
            }}
          >
            {processSteps.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-step={item.id}
                  onClick={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  className={cn(
                    "min-h-11 min-w-[220px] shrink-0 snap-start cursor-pointer rounded-2xl border px-4 py-4 text-left transition duration-300 sm:min-w-[240px] lg:min-w-0 lg:shrink",
                    selected
                      ? "border-lime/50 bg-ink text-white shadow-[0_18px_40px_-28px_rgba(107,182,52,0.9)]"
                      : "border-forest/12 bg-surface hover:-translate-y-0.5 hover:border-lime/40 hover:shadow-[0_18px_40px_-28px_rgba(107,182,52,0.7)]",
                  )}
                >
                  <span className={cn("font-mono text-[11px]", selected ? "text-lime" : "text-forest")}>
                    {item.index}
                  </span>
                  <span className="mt-1 block font-headline text-xl tracking-tight">{item.title}</span>
                  <span className={cn("mt-1 block text-sm", selected ? "text-white/75" : "text-muted")}>
                    {item.output}
                  </span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-3xl border border-forest/12 bg-surface p-6 md:p-8 lg:sticky lg:top-28 lg:self-start"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-forest uppercase">
                Step {step.index}
              </p>
              <h3 className="mt-3 font-headline text-3xl tracking-tight text-ink md:text-4xl">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{step.yieldNote}</p>
              <div className="mt-6">
                <div className="flex items-end justify-between gap-4">
                  <p className="font-headline text-4xl tracking-tight text-forest">
                    {step.yieldKg ? `${step.yieldKg.toLocaleString("en-US")} kg` : "33,000 MT"}
                  </p>
                  <p className="text-right text-sm text-muted">
                    {share !== null ? `${share}% of finished output` : "Off-season buffer"}
                  </p>
                </div>
                {share !== null ? (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest/10">
                    <motion.div
                      className="h-full rounded-full bg-lime"
                      initial={{ width: 0 }}
                      animate={{ width: `${share}%` }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted">Storage capacity, not a finished product stream.</p>
                )}
              </div>
              <p className="mt-6 text-sm leading-6 text-ink">
                <span className="font-semibold">Industrial use. </span>
                {step.application}
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {step.specs.map((spec) => (
                  <div key={spec.label} className="rounded-2xl border border-forest/10 bg-white px-4 py-3">
                    <dt className="text-xs text-muted">{spec.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          </AnimatePresence>
        </div>
        <SectionMore href="/milling" label="Every milling station, written out" />
      </div>
    </section>
  );
}
