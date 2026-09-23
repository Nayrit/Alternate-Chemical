import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const chapters = [
  {
    href: "/company",
    index: "01",
    title: "Company",
    text: "The Habiganj plant, the Dhaka office, and the design basis behind a domestic starch platform.",
  },
  {
    href: "/milling",
    index: "02",
    title: "Milling technology",
    text: "Steeping, germ, fiber, gluten, starch, and the 33,000 MT silo buffer, one kernel at a time.",
  },
  {
    href: "/products",
    index: "03",
    title: "Products",
    text: "Six fractions from a 130,500 kg finished day, with indicative grades, TDS, and MSDS.",
  },
  {
    href: "/applications",
    index: "04",
    title: "Industrial applications",
    text: "Food, pharmaceutical, textile sizing, and feed uses for the grades Bangladesh already imports.",
  },
  {
    href: "/import-substitution",
    index: "05",
    title: "Import substitution",
    text: "23,100 MT of native-starch design capacity against 11,604 MT of 2023 maize-starch imports.",
  },
  {
    href: "/sustainability",
    index: "06",
    title: "Habiganj plant",
    text: "The site plan, the Thermax boiler, rooftop solar, and the zero-discharge effluent plant.",
  },
];

export function HomeChapters() {
  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">The site</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl md:text-5xl">
          Six pages for the mill, the grades, and the market.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              className="group flex min-h-44 flex-col rounded-3xl border border-forest/12 bg-white p-6 transition hover:-translate-y-1 hover:border-lime/50 hover:shadow-[0_22px_44px_-28px_rgba(107,182,52,0.9)]"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-forest">{chapter.index}</span>
              <span className="mt-3 font-headline text-2xl tracking-tight text-ink">{chapter.title}</span>
              <span className="mt-3 text-sm leading-6 text-muted">{chapter.text}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-forest">
                Open page
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
