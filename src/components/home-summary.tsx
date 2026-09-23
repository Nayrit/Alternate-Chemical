import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  company,
  esg,
  glance,
  IMPORT_2023_MT,
  industryUses,
  NATIVE_ANNUAL_MT,
  processSteps,
  products,
} from "@/lib/data";

function PageLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00562d]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

export function HomeSummary() {
  return (
    <>
      <section className="section-y bg-surface">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">01. Company</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl">
            A domestic starch platform, built on local corn.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
            Commissioning {company.commissioning}, after machinery integration through {company.machinery}. The mill is in Madhobpur. The commercial desk is in Dhaka.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {glance.map((item) => (
              <article key={item.label} className="rounded-3xl border border-forest/12 bg-white p-5">
                <p className="font-headline text-2xl tracking-tight text-forest sm:text-3xl">{item.figure}</p>
                <p className="mt-2 font-semibold text-ink">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[company.factory, company.office].map((place) => (
              <article key={place.label} className="rounded-3xl border border-forest/12 bg-white p-5">
                <p className="text-sm font-semibold text-forest">{place.label}</p>
                {place.lines.map((line) => (
                  <p key={line} className="text-sm leading-6 text-ink">
                    {line}
                  </p>
                ))}
              </article>
            ))}
          </div>
          <div className="mt-8">
            <PageLink href="/company">Company page</PageLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">02. Milling technology</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl">
            One kernel, six commercial streams.
          </h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.id} className="rounded-3xl border border-forest/12 bg-surface p-5">
                <p className="font-mono text-[11px] text-forest">{step.index}</p>
                <p className="mt-2 font-headline text-xl tracking-tight text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-muted">{step.output}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <PageLink href="/milling">Milling flow</PageLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">03. Products</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl">
            Six fractions. One daily mass balance.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col rounded-3xl border border-forest/12 bg-white p-5">
                <p className="font-mono text-[11px] tracking-[0.16em] text-forest uppercase">{product.code}</p>
                <h3 className="mt-2 font-headline text-2xl tracking-tight text-ink">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{product.summary}</p>
                <p className="mt-3 font-mono text-xs text-forest">
                  {product.yieldKg.toLocaleString("en-US")} kg/day
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-forest hover:underline"
                >
                  {product.name} specification
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <PageLink href="/products">All product specifications</PageLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">04. Industrial applications</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl">
            Specified for the industries that already import the grade.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {industryUses.map((row) => (
              <article key={row.id} className="rounded-3xl border border-forest/12 bg-surface p-5">
                <h3 className="font-headline text-xl tracking-tight text-ink">{row.industry}</h3>
                <p className="mt-2 text-sm font-medium text-forest">{row.products}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{row.fn}</p>
                <Link
                  href={`/products?sector=${row.id}`}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-forest hover:underline"
                >
                  Grades for {row.industry}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <PageLink href="/applications">Applications page</PageLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">05. Import substitution</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance text-ink sm:text-4xl">
            Domestic capacity against a 67% tariff on imported starch.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl bg-ink p-6 text-white">
              <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">2023 maize starch imports</p>
              <p className="mt-3 font-headline text-4xl tracking-tight text-lime">
                {IMPORT_2023_MT.toLocaleString("en-US")} MT
              </p>
              <p className="mt-2 text-sm text-white/75">All origins, World Bank WITS. Declared value $5.83 million.</p>
            </article>
            <article className="rounded-3xl border border-forest/12 bg-white p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-forest uppercase">Native starch, design year</p>
              <p className="mt-3 font-headline text-4xl tracking-tight text-forest">
                {NATIVE_ANNUAL_MT.toLocaleString("en-US")} MT
              </p>
              <p className="mt-2 text-sm text-muted">330 operating days × 70,000 kg. About twice the 2023 import volume.</p>
            </article>
          </div>
          <div className="mt-8">
            <PageLink href="/import-substitution">Import substitution page</PageLink>
          </div>
        </div>
      </section>

      <section className="section-y bg-ink text-white">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-lime uppercase">06. Habiganj plant</p>
          <h2 className="mt-3 max-w-3xl font-headline text-3xl leading-[0.98] tracking-tight text-balance sm:text-4xl">
            Crush, steam, sun, and zero discharge.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-[#0c2418] p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Solar planning case</p>
              <p className="mt-3 font-headline text-3xl">{esg.carbonTonnesPerYear.toLocaleString("en-US")} t</p>
              <p className="mt-2 text-sm text-white/70">CO₂e a year, modeled. The array size is set at commissioning.</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#0c2418] p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">ETP water loop</p>
              <p className="mt-3 font-headline text-3xl">{esg.waterLitresPerDay.toLocaleString("en-US")} L</p>
              <p className="mt-2 text-sm text-white/70">A day, returned through the effluent plant. A planning factor.</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#0c2418] p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Effluent leaving the boundary</p>
              <p className="mt-3 font-headline text-3xl">0 L</p>
              <p className="mt-2 text-sm text-white/70">Zero-discharge design. Treated process water stays on site.</p>
            </article>
          </div>
          <div className="mt-8">
            <Link
              href="/sustainability"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink"
            >
              Habiganj plant page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
