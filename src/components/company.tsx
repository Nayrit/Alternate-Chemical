import { MapPin } from "lucide-react";
import { company, glance } from "@/lib/data";
import { Reveal, SectionIntro } from "@/components/reveal";

export function Company() {
  return (
    <section id="company" className="section-y bg-surface">
      <div className="shell">
        <SectionIntro
          index="01"
          eyebrow="Company"
          title="A domestic starch platform, built on local corn."
          lede="Alternate Chemical Industry Ltd. manufactures corn starch, modified starch, and the kernel fractions around them. The Habiganj plant is placed against rising food, pharmaceutical, textile, and feed demand, and against a tariff that still sits on imported starch."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {glance.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.06}
              className="rounded-3xl border border-forest/12 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_22px_40px_-28px_rgba(107,182,52,0.85)]"
            >
              <p className="font-headline text-2xl tracking-tight text-balance text-forest sm:text-3xl 3xl:text-4xl">{item.figure}</p>
              <p className="mt-3 font-semibold text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-forest/12 bg-ink p-8 text-white">
            <p className="font-mono text-[11px] tracking-[0.2em] text-lime uppercase">Vision</p>
            <p className="mt-4 font-headline text-2xl leading-tight tracking-tight text-balance sm:text-3xl 3xl:text-4xl">
              Bangladesh as a self-reliant producer of the starch and derivative ingredients its industries depend on.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-forest/12 bg-white p-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-forest uppercase">Mission</p>
            <p className="mt-4 font-headline text-2xl leading-tight tracking-tight text-balance text-ink sm:text-3xl 3xl:text-4xl">
              Convert local agricultural output into food, pharmaceutical, and industrial-grade ingredients at international quality and competitive cost.
            </p>
          </Reveal>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[company.factory, company.office].map((place) => (
            <article key={place.label} className="flex gap-4 rounded-3xl border border-forest/12 bg-white p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime/15 text-forest">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-forest">{place.label}</p>
                {place.lines.map((line) => (
                  <p key={line} className="text-sm leading-6 text-ink">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-forest/12 bg-forest/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Design basis", "UNIDO best practices"],
            ["Standards", "FAO and ISO, on-site laboratory"],
            ["Markets", "Food, pharma, textile, feed"],
            ["Commissioning", "Early 2027"],
          ].map(([term, detail]) => (
            <div key={term} className="bg-white px-5 py-4">
              <dt className="font-mono text-[10px] tracking-[0.18em] text-forest uppercase">{term}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
