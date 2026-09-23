"use client";

import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/data";
import { useSite } from "@/components/site-context";

export function SampleTray() {
  const { tray, clearTray, openRfq } = useSite();
  const names = tray
    .map((id) => products.find((product) => product.id === id)?.name)
    .filter((name): name is string => Boolean(name));
  const visible = names.length > 0;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-3xl flex-col gap-3 rounded-3xl border border-lime/40 bg-ink/95 px-4 py-3 text-white shadow-[0_18px_50px_-24px_rgba(107,182,52,0.8)] backdrop-blur-md sm:flex-row sm:items-center 3xl:max-w-4xl"
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">
              {names.length} in the sample tray
            </p>
            <p className="truncate text-sm text-white/80">{names.join(" · ")}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={clearTray} className="min-h-11 cursor-pointer rounded-full px-3 py-2 text-sm text-white/70">
              Clear
            </button>
            <button
              type="button"
              onClick={() => openRfq({ intent: "sample", productIds: tray })}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink"
            >
              Request samples
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
