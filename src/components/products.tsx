"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileDown, FlaskConical } from "lucide-react";
import { FINISHED_KG_PER_DAY, products, sectors, type Product, type Sector } from "@/lib/data";
import { downloadDatasheet } from "@/lib/spec-pdf";
import { cn } from "@/lib/utils";
import { SectionIntro } from "@/components/reveal";
import { SectionMore } from "@/components/section-more";
import { useSite } from "@/components/site-context";

const filters: { id: Sector | "all"; label: string }[] = [
  { id: "all", label: "All Products" },
  ...sectors.map((sector) => ({ id: sector.id, label: sector.label })),
];

export function Products({ initialFilter = "all" }: { initialFilter?: Sector | "all" }) {
  const { tray, toggleTray, filter: homeFilter, setFilter } = useSite();
  const router = useRouter();
  const pathname = usePathname();
  const onCatalog = pathname === "/products";
  const [localFilter, setLocalFilter] = useState<Sector | "all">(initialFilter);
  const filter = onCatalog ? localFilter : homeFilter;

  const select = (id: Sector | "all") => {
    if (onCatalog) {
      setLocalFilter(id);
      router.replace(id === "all" ? "/products" : `/products?sector=${id}`, { scroll: false });
      return;
    }
    setFilter(id);
  };
  const visible =
    filter === "all" ? products : products.filter((product) => product.categories.includes(filter));

  return (
    <section id="products" className="section-y bg-surface">
      <div className="shell">
        <SectionIntro
          index="03"
          eyebrow="Product portfolio"
          title="Six fractions. One daily mass balance."
          lede="At full design output the mill finishes 130,500 kg a day. Purity bands below are indicative commercial targets for discussion. The lot TDS and certificate of analysis are the controlling documents."
        />
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter products">
          {filters.map((item) => {
            const sector = item.id;
            const count =
              sector === "all"
                ? products.length
                : products.filter((product) => product.categories.includes(sector)).length;
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => select(item.id)}
                className={cn(
                  "min-h-11 shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition",
                  selected
                    ? "border-forest bg-forest text-white"
                    : "border-forest/15 bg-white text-ink hover:border-lime/50",
                )}
              >
                {item.label}
                <span className={cn("ml-2 font-mono text-xs", selected ? "text-lime" : "text-muted")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <motion.div layout className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inTray={tray.includes(product.id)}
                onToggle={() => toggleTray(product.id)}
                wide={product.id === "native"}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <SectionMore href="/products" label="Product register and grade pages" />
      </div>
    </section>
  );
}

function ProductCard({
  product,
  inTray,
  onToggle,
  wide,
}: {
  product: Product;
  inTray: boolean;
  onToggle: () => void;
  wide: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState<"tds" | "msds" | null>(null);
  const share = Math.round((product.yieldKg / FINISHED_KG_PER_DAY) * 100);

  const save = (kind: "tds" | "msds") => {
    setDownload(kind);
    window.setTimeout(() => {
      downloadDatasheet(product, kind);
      window.setTimeout(() => setDownload(null), 1400);
    }, 450);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "flex flex-col rounded-3xl border border-forest/12 bg-white p-5 transition hover:border-lime/40 hover:shadow-[0_22px_44px_-28px_rgba(107,182,52,0.9)]",
        wide && "md:col-span-2 xl:col-span-2 3xl:col-span-2",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-forest uppercase">{product.code}</p>
          <h3 className="mt-2 font-headline text-2xl tracking-tight text-ink">
            <Link href={`/products/${product.id}`} className="hover:text-forest">
              {product.name}
            </Link>
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-lime/15 px-3 py-1 font-mono text-xs font-medium text-forest">
          {product.yieldKg.toLocaleString("en-US")} kg/day
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{product.summary}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-forest/10">
        <div className="h-full rounded-full bg-forest" style={{ width: `${share}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted">{share}% of the 130,500 kg finished day</p>
      <dl className="mt-4 grid grid-cols-2 gap-2">
        {product.purity.map((row) => (
          <div key={row.label} className="rounded-2xl bg-surface px-3 py-2">
            <dt className="text-[11px] text-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl border border-forest/10 px-3 py-3 text-left text-sm font-semibold"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Functional properties
        <span className="font-mono text-xs text-forest">{open ? "Close" : "Open"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.dl
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-3">
              {product.properties.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
              ))}
              <p className="pt-1 text-xs leading-5 text-muted">{product.line}</p>
            </div>
          </motion.dl>
        ) : null}
      </AnimatePresence>
      <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
        <button
          type="button"
          onClick={() => save("tds")}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-forest/15 px-3 py-2.5 text-sm font-semibold text-forest transition hover:border-lime/50"
        >
          <FileDown className="h-4 w-4" />
          {download === "tds" ? "Preparing TDS…" : "Download TDS"}
        </button>
        <button
          type="button"
          onClick={() => save("msds")}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-forest/15 px-3 py-2.5 text-sm font-semibold text-forest transition hover:border-lime/50"
        >
          <FlaskConical className="h-4 w-4" />
          {download === "msds" ? "Preparing MSDS…" : "Download MSDS"}
        </button>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition",
          inTray ? "bg-lime text-ink" : "bg-ink text-white hover:bg-[#123224]",
        )}
      >
        {inTray ? <Check className="h-4 w-4" /> : null}
        {inTray ? "In sample tray" : "Add to Sample Request"}
      </button>
    </motion.article>
  );
}
