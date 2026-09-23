"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSite } from "@/components/site-context";

const seats = [
  {
    id: "buyer",
    title: "Direct buyer",
    detail: "A mill, plant, or formulation site taking starch or co-products for its own use.",
  },
  {
    id: "distributor",
    title: "Distributor",
    detail: "A trader holding territory for food, pharma, textile, or feed accounts.",
  },
  {
    id: "offtake",
    title: "Offtake partner",
    detail: "A buyer ready to discuss a scheduled share of design capacity.",
  },
] as const;

const engagements = [
  {
    id: "spot",
    title: "Spot evaluation",
    detail: "A qualified sample, then a first commercial lot once the Habiganj plant is commissioned.",
  },
  {
    id: "quarter",
    title: "Quarterly offtake",
    detail: "A volume band reviewed each quarter against crush, silo cover, and the modification line.",
  },
  {
    id: "annual",
    title: "Annual supply",
    detail: "An allocation conversation against 23,100 MT of native-starch design capacity and the co-product streams.",
  },
] as const;

export function ProcurementDesk({ dialog = false }: { dialog?: boolean }) {
  const { openRfq } = useSite();
  const [seat, setSeat] = useState<(typeof seats)[number]["id"]>("buyer");
  const [engagement, setEngagement] = useState<(typeof engagements)[number]["id"]>("quarter");
  const chosen = engagements.find((item) => item.id === engagement) ?? engagements[1];
  const frame = (
    <>
        <div className="rounded-3xl border border-forest/12 bg-[#f8faf8] p-5 sm:p-8 3xl:p-10">
            <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Procurement portal</p>
                <h1 className="mt-2 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
                  How ACIL will sell once the mill is up.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  There is no login and no password. This desk explains the commercial paths open
                  before commissioning in early 2027. Documents that will travel with a lot: TDS, COA,
                  SDS, and a proforma from the Dhaka office.
                </p>
            </div>
            <p className="mt-6 text-sm font-semibold">Your seat</p>
            <div className="mt-2 grid gap-2 md:grid-cols-3">
              {seats.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSeat(item.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-lime/40",
                    seat === item.id ? "border-lime/60 bg-white" : "border-forest/12 bg-white/70",
                  )}
                >
                  <span className="block font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-muted">{item.detail}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold">Engagement</p>
            <div className="mt-2 grid gap-2 md:grid-cols-3">
              {engagements.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEngagement(item.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-lime/40",
                    engagement === item.id ? "border-forest bg-forest text-white" : "border-forest/12 bg-white",
                  )}
                >
                  <span className="block font-semibold">{item.title}</span>
                  <span className={cn("mt-1 block text-sm leading-5", engagement === item.id ? "text-white/75" : "text-muted")}>
                    {item.detail}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-ink px-5 py-4 text-sm text-white">
              <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">
                {seats.find((item) => item.id === seat)?.title} · {chosen.title}
              </p>
              <p className="mt-2 leading-6 text-white/75">
                Lead time is measured from full commissioning, not from today. Allocation talks can
                start now against design capacity. Nothing on this screen reserves tonnes.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
              {dialog ? (
                <button
                  type="button"
                  onClick={() => openRfq({ intent: engagement === "spot" ? "sample" : "quotation" })}
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Continue to {engagement === "spot" ? "sample request" : "quotation"}
                </button>
              ) : (
                <Link
                  href={engagement === "spot" ? "/request?intent=sample" : "/request"}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Continue to {engagement === "spot" ? "sample request" : "quotation"}
                </Link>
              )}
            </div>
    </>
  );

  if (dialog) return frame;

  return (
    <section className="section-y bg-surface">
      <div className="shell">{frame}</div>
    </section>
  );
}

export function ProcurementModal() {
  const { procurementOpen, closeProcurement } = useSite();

  useEffect(() => {
    if (!procurementOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProcurement();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [procurementOpen, closeProcurement]);

  if (!procurementOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end p-3 sm:place-items-center sm:p-6">
      <button
        type="button"
        aria-label="Close procurement"
        className="absolute inset-0 cursor-pointer bg-ink/60"
        onClick={closeProcurement}
      />
      <div className="relative z-10 max-h-[min(92dvh,52rem)] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#f8faf8] p-2 shadow-2xl">
        <div className="flex justify-end px-3 pt-2">
          <button
            type="button"
            onClick={closeProcurement}
            className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-semibold text-forest"
          >
            Close
          </button>
        </div>
        <ProcurementDesk dialog />
      </div>
    </div>
  );
}
