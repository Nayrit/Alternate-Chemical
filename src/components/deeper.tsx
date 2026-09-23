import Link from "next/link";
import {
  ANNUAL_CORN_INTAKE_MT,
  CRUSH_KG_PER_DAY,
  FINISHED_KG_PER_DAY,
  IMPORT_2023_MT,
  IMPORT_2023_USD_M,
  NATIVE_ANNUAL_MT,
  OPERATING_DAYS,
  SILO_BUFFER_MT,
  SILO_PRIMARY_MT,
  TARIFF_INCIDENCE,
  company,
  industryUses,
  plantZones,
  processSteps,
  products,
  starchImports,
  type Product,
} from "@/lib/data";

export function CompanyDepth() {
  const rows = [
    ["Machinery integration", company.machinery],
    ["Full commissioning", company.commissioning],
    ["Operating days", `${OPERATING_DAYS} days a year`],
    ["Daily crush", `${CRUSH_KG_PER_DAY.toLocaleString("en-US")} kg of local corn`],
    ["Annual corn intake", `${ANNUAL_CORN_INTAKE_MT.toLocaleString("en-US")} MT`],
    ["Finished output", `${FINISHED_KG_PER_DAY.toLocaleString("en-US")} kg a day`],
    ["Native starch", `70,000 kg a day, ${NATIVE_ANNUAL_MT.toLocaleString("en-US")} MT a year`],
    ["Silo buffer", `${SILO_BUFFER_MT.toLocaleString("en-US")} MT, with a ${SILO_PRIMARY_MT.toLocaleString("en-US")} MT primary battery`],
    ["Modified line", "100 TPD, Wuhan Friendship New Tech Co., 20,000 kg a day"],
    ["Steam", "Thermax boiler, 10,000 kg/hr"],
    ["Milling hall on the site plan", "50 TPD, beside a 150,000 kg daily crush"],
    ["Imported maize starch, 2023", `${IMPORT_2023_MT.toLocaleString("en-US")} MT, $${IMPORT_2023_USD_M} million`],
    ["Tariff incidence", `${Math.round(TARIFF_INCIDENCE * 100)}% on imported starch`],
  ];

  return (
    <section className="section-y bg-white">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Schedule and design basis</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          The plant is still in integration. Every figure here is a design capacity.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          Machinery integration runs through the end of 2026. Full commissioning is scheduled for early
          2027. The Habiganj factory is on Satian Road, Ratanpur, Madhobpur. The Dhaka office is Suite
          7A-7B and 15D1-15D2, Paramount Heights, 65/2/1 Culvert Road, Dhaka 1000. The layout follows
          UNIDO best practice, with FAO- and ISO-aligned checks in the on-site laboratory.
        </p>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-forest/12 bg-forest/12 sm:grid-cols-2">
          {rows.map(([term, detail]) => (
            <div key={term} className="bg-white px-5 py-4">
              <dt className="font-mono text-[10px] tracking-[0.16em] text-forest uppercase">{term}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function MillingDepth() {
  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Station register</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          All six stations, with the design specification for each.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          The flow above follows one station at a time. This register keeps every yield, note, and
          specification on the page.
        </p>
        <div className="mt-8 grid gap-4">
          {processSteps.map((step) => (
            <article key={step.id} className="rounded-3xl border border-forest/12 bg-white p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-forest">{step.index}</p>
              <h3 className="mt-2 font-headline text-2xl tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-sm font-semibold text-forest">{step.output}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{step.yieldNote}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{step.application}</p>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {step.specs.map((spec) => (
                  <div key={spec.label} className="rounded-2xl bg-surface px-4 py-3">
                    <dt className="text-xs text-muted">{spec.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductRegister() {
  return (
    <section className="section-y bg-white">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Grade register</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          Open a grade for its purity band, properties, and uses.
        </h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-forest/12">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`grid gap-2 px-5 py-5 md:grid-cols-[9rem_1.2fr_8rem_1.4fr] md:items-center md:gap-4 ${index % 2 === 0 ? "bg-surface" : "bg-white"}`}
            >
              <span className="font-mono text-xs tracking-[0.14em] text-forest uppercase">{product.code}</span>
              <span className="font-headline text-xl tracking-tight text-ink">{product.name}</span>
              <span className="text-sm font-semibold text-forest">
                {product.yieldKg.toLocaleString("en-US")} kg/day
              </span>
              <span className="text-sm leading-6 text-muted">{product.applications.join(" · ")}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplicationDepth() {
  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Grade fit</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          Which fraction is written for which industry.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {industryUses.map((row) => {
            const matches = products.filter((product) => product.categories.includes(row.id));
            return (
              <article key={row.id} className="rounded-3xl border border-forest/12 bg-white p-6">
                <h3 className="font-headline text-2xl tracking-tight text-ink">{row.industry}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{row.fn}</p>
                <ul className="mt-4 space-y-3">
                  {matches.map((product) => (
                    <li key={product.id} className="rounded-2xl bg-surface px-4 py-3">
                      <Link href={`/products/${product.id}`} className="font-semibold text-forest hover:underline">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm leading-6 text-ink">{product.applications.join(". ")}.</p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ImportDepth() {
  return (
    <section className="section-y bg-white">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">2023 origin table</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          Maize starch shipped into Bangladesh, by origin.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          World Bank WITS records {IMPORT_2023_MT.toLocaleString("en-US")} MT of maize starch exports to
          Bangladesh in 2023, valued at ${IMPORT_2023_USD_M} million. ACIL native-starch design capacity
          is {NATIVE_ANNUAL_MT.toLocaleString("en-US")} MT a year, from {OPERATING_DAYS} operating days at
          70,000 kg a day. The National Board of Revenue schedule, via USDA FAS Dhaka in March 2025, puts
          tariff incidence at {Math.round(TARIFF_INCIDENCE * 100)} percent.
        </p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-forest/12">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-lime uppercase">
            <span>Origin</span>
            <span>Tonnes</span>
            <span>USD million</span>
          </div>
          {starchImports.map((row, index) => (
            <div
              key={row.origin}
              className={`grid grid-cols-[1.4fr_1fr_1fr] px-5 py-4 text-sm ${index % 2 === 0 ? "bg-surface" : "bg-white"}`}
            >
              <span className="font-semibold text-ink">{row.origin}</span>
              <span className="text-ink">{row.tonnes.toLocaleString("en-US")}</span>
              <span className="text-ink">{row.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlantDepth() {
  return (
    <section className="section-y bg-white">
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Site register</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          Every zone on the Habiganj plan.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {plantZones.map((zone) => (
            <article key={zone.id} className="rounded-3xl border border-forest/12 bg-surface p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-forest">{zone.code}</p>
              <h3 className="mt-2 font-headline text-2xl tracking-tight text-ink">{zone.label}</h3>
              <p className="mt-2 text-sm font-semibold text-forest">{zone.metric}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{zone.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductNeighbors({ product }: { product: Product }) {
  const others = products.filter((item) => item.id !== product.id);
  return (
    <section className="bg-white pb-20">
      <div className="shell">
        <h2 className="font-headline text-3xl tracking-tight text-ink">The rest of the finished day</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          At full design output the mill finishes {FINISHED_KG_PER_DAY.toLocaleString("en-US")} kg a day
          across six streams. {product.name} is one of them.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.id}>
              <Link
                href={`/products/${item.id}`}
                className="block rounded-2xl border border-forest/12 px-4 py-4 hover:border-lime/50"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-forest uppercase">{item.code}</span>
                <span className="mt-1 block font-semibold text-ink">{item.name}</span>
                <span className="mt-1 block text-sm text-muted">
                  {item.yieldKg.toLocaleString("en-US")} kg/day
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const companyFaq = [
  {
    question: "Where is Alternate Chemical Industry Ltd.?",
    answer:
      "The factory is on Satian Road, Ratanpur, Madhobpur, Habiganj. The corporate office is Suite 7A-7B and 15D1-15D2, Paramount Heights, 65/2/1 Culvert Road, Dhaka 1000.",
  },
  {
    question: "When does the Habiganj corn mill commission?",
    answer:
      "Machinery integration runs through the end of 2026. Full commissioning is scheduled for early 2027. The capacities on this site are design figures.",
  },
  {
    question: "What does ACIL produce?",
    answer:
      "Six streams from one wet mill: native corn starch, modified starch, corn fiber, corn germ, gluten powder, and corn steep liquor.",
  },
  {
    question: "How much corn can the mill crush?",
    answer:
      "The design crush is 150,000 kg of local corn a day, with 130,500 kg a day of finished output over 330 operating days.",
  },
];

export function CompanyFaq() {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: companyFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <section className="section-y bg-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <div className="shell">
        <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Questions</p>
        <h2 className="mt-3 max-w-3xl font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
          Where the mill is, when it starts, and what it makes.
        </h2>
        <dl className="mt-8 grid gap-4">
          {companyFaq.map((item) => (
            <div key={item.question} className="rounded-3xl border border-forest/12 bg-white p-6">
              <dt className="font-headline text-xl tracking-tight text-ink">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
