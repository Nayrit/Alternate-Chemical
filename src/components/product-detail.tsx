"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, FileDown, FlaskConical } from "lucide-react";
import { FINISHED_KG_PER_DAY, sectors, type Product } from "@/lib/data";
import { downloadDatasheet } from "@/lib/spec-pdf";
import { cn } from "@/lib/utils";
import { useSite } from "@/components/site-context";

export function ProductDetail({ product }: { product: Product }) {
  const { tray, toggleTray } = useSite();
  const [download, setDownload] = useState<"tds" | "msds" | null>(null);
  const inTray = tray.includes(product.id);
  const share = Math.round((product.yieldKg / FINISHED_KG_PER_DAY) * 100);
  const names = product.categories
    .map((id) => sectors.find((sector) => sector.id === id)?.label)
    .filter((name): name is string => Boolean(name));

  const save = (kind: "tds" | "msds") => {
    setDownload(kind);
    window.setTimeout(() => {
      downloadDatasheet(product, kind);
      window.setTimeout(() => setDownload(null), 1400);
    }, 450);
  };

  return (
    <article className="section-y bg-surface">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-forest uppercase">{product.code}</p>
          <h1 className="mt-3 font-headline text-4xl tracking-tight text-balance text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">{product.summary}</p>
          <p className="mt-4 text-sm leading-6 text-muted">{product.line}</p>
          <p className="mt-6 font-headline text-3xl tracking-tight text-forest">
            {product.yieldKg.toLocaleString("en-US")} kg/day
          </p>
          <p className="mt-1 text-sm text-muted">{share}% of the 130,500 kg finished day</p>
          <div className="mt-4 h-1.5 max-w-md overflow-hidden rounded-full bg-forest/10">
            <div className="h-full rounded-full bg-forest" style={{ width: `${share}%` }} />
          </div>
          {names.length ? (
            <p className="mt-6 text-sm text-muted">
              Industries: {names.join(", ")}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/request?intent=quotation&products=${product.id}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white"
            >
              Request a planning quotation
            </Link>
            <button
              type="button"
              onClick={() => toggleTray(product.id)}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
                inTray ? "bg-lime text-ink" : "bg-ink text-white",
              )}
            >
              {inTray ? <Check className="h-4 w-4" /> : null}
              {inTray ? "In sample tray" : "Add to sample request"}
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-forest/12 bg-white p-6">
          <h2 className="font-headline text-2xl tracking-tight text-ink">Indicative grade</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            These bands are targets for discussion. The lot TDS and certificate of analysis control.
          </p>
          <dl className="mt-5 grid gap-2">
            {product.purity.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 rounded-2xl bg-surface px-3 py-2 text-sm">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-semibold text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-8 font-headline text-2xl tracking-tight text-ink">Functional properties</h2>
          <dl className="mt-4 space-y-3">
            {product.properties.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 space-y-2 text-sm text-ink">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => save("tds")}
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-forest/15 px-3 py-2.5 text-sm font-semibold text-forest"
            >
              <FileDown className="h-4 w-4" />
              {download === "tds" ? "Preparing TDS…" : "Download TDS"}
            </button>
            <button
              type="button"
              onClick={() => save("msds")}
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-forest/15 px-3 py-2.5 text-sm font-semibold text-forest"
            >
              <FlaskConical className="h-4 w-4" />
              {download === "msds" ? "Preparing MSDS…" : "Download MSDS"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
