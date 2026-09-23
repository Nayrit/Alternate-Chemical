"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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

export function ProcurementModal() {
  const { procurementOpen, closeProcurement, openRfq } = useSite();
  const [seat, setSeat] = useState<(typeof seats)[number]["id"]>("buyer");
  const [engagement, setEngagement] = useState<(typeof engagements)[number]["id"]>("quarter");

  useEffect(() => {
    if (!procurementOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProcurement();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [procurementOpen, closeProcurement]);

  const chosen = engagements.find((item) => item.id === engagement) ?? engagements[1];

  return (
    <AnimatePresence>
      {procurementOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <motion.button
            type="button"
            aria-label="Close procurement portal"
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProcurement}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-title"
            className="relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#f8faf8] p-6 shadow-2xl md:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Procurement portal</p>
                <h2 id="portal-title" className="mt-2 font-headline text-3xl tracking-tight text-ink">
                  How ACIL will sell once the mill is up.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  There is no login and no password. This desk explains the commercial paths open
                  before commissioning in early 2027. Documents that will travel with a lot: TDS, COA,
                  SDS, and a proforma from the Dhaka office.
                </p>
              </div>
              <button
                type="button"
                onClick={closeProcurement}
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-forest/15"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
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
              <button
                type="button"
                onClick={closeProcurement}
                className="cursor-pointer rounded-full border border-forest/15 px-5 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => openRfq({ intent: engagement === "spot" ? "sample" : "quotation" })}
                className="cursor-pointer rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink"
              >
                Continue to {engagement === "spot" ? "sample request" : "quotation"}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
