"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  lanes,
  products,
  sectorLeadProduct,
  sectors,
  type LaneId,
  type Sector,
} from "@/lib/data";
import { productById, quoteBulk, quoteSample } from "@/lib/quote";
import { cn, money } from "@/lib/utils";
import { useSite } from "@/components/site-context";

const steps = ["Sector", "Product & volume", "Delivery", "Company & estimate"];

export function RequestForm({
  intent = "quotation",
  productIds = [],
  plain = false,
}: {
  intent?: "sample" | "quotation";
  productIds?: string[];
  plain?: boolean;
}) {
  const { clearTray } = useSite();
  const incoming = productIds.filter((id) => productById(id));
  const sampleMode = intent === "sample";
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<Sector>("food");
  const [productId, setProductId] = useState(incoming[0] ?? "native");
  const [sampleIds, setSampleIds] = useState<string[]>(incoming);
  const [volume, setVolume] = useState(40);
  const [sampleKg, setSampleKg] = useState<1 | 5 | 25>(5);
  const [lane, setLane] = useState<LaneId>("habiganj");
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  const product = productById(productId) ?? products[0];
  const bulk = useMemo(() => quoteBulk(product, volume, lane), [product, volume, lane]);
  const sample = useMemo(
    () => quoteSample(sampleIds.length ? sampleIds : [productId], lane),
    [sampleIds, productId, lane],
  );
  const validate = () => {
    if (step === 1 && sampleMode && sampleIds.length === 0) {
      setError("Select at least one product for the sample set.");
      return false;
    }
    if (step === 3) {
      const companyValue = companyName.trim();
      const contactValue = contact.trim();
      const emailValue = email.trim();
      const phoneValue = phone.trim();
      if (
        companyValue.length < 2 ||
        companyValue.length > 120 ||
        contactValue.length < 2 ||
        contactValue.length > 120
      ) {
        setError("Enter the company and the person we should write to.");
        return false;
      }
      if (emailValue.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setError("Enter a valid work email.");
        return false;
      }
      if (phoneValue.length < 6 || phoneValue.length > 30 || /[<>]/.test(phoneValue)) {
        setError("Enter a phone number the commercial desk can reach.");
        return false;
      }
      if (note.trim().length > 500) {
        setError("Keep the note under 500 characters.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const next = () => {
    if (!validate()) return;
    setStep((value) => Math.min(3, value + 1));
  };

  const submit = () => {
    if (!validate()) return;
    const stamp = new Date();
    const ref = `ACIL-26-${stamp.getMonth() + 1}${stamp.getDate()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReference(ref);
    if (sampleMode) clearTray();
  };

  const Title = plain ? "h2" : "h1";

  return (
    <section className={plain ? "flex min-h-0 flex-1 flex-col" : "section-y bg-surface"}>
      <div className={plain ? "flex min-h-0 flex-1 flex-col" : "shell"}>
        <div
          className={
            plain
              ? "flex min-h-0 flex-1 flex-col bg-[#f8faf8]"
              : "mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-forest/12 bg-[#f8faf8] 3xl:max-w-4xl"
          }
        >
            <div className="border-b border-forest/12 px-5 py-5 sm:px-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">
                {sampleMode ? "Sample request" : "Commercial quotation"}
              </p>
              <Title className="mt-2 font-headline text-3xl tracking-tight text-balance text-ink sm:text-4xl">
                {sampleMode ? "Evaluation samples" : "Request a planning quotation"}
              </Title>
            </div>
            <ol className="grid grid-cols-4 gap-2 px-5 py-4">
              {steps.map((label, index) => (
                <li key={label} className="min-w-0">
                  <span
                    className={cn(
                      "block h-1 rounded-full",
                      index <= step ? "bg-lime" : "bg-forest/10",
                    )}
                  />
                  <span className={cn("mt-2 block truncate text-[11px]", index === step ? "font-semibold text-ink" : "text-muted")}>
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(event) => {
                event.preventDefault();
                if (reference) return;
                if (step < 3) next();
                else submit();
              }}
            >
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-4">
                {reference ? (
                  <div className="rounded-3xl border border-lime/40 bg-white p-6">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-forest uppercase">Staged locally</p>
                    <p className="mt-3 font-headline text-3xl tracking-tight text-ink">{reference}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      This preview keeps the request in the browser. A production desk would route it to
                      the Dhaka commercial office for confirmation after early-2027 commissioning. The
                      figure below is not an offer.
                    </p>
                    <Estimate sampleMode={sampleMode} bulk={bulk} sample={sample} sampleKg={sampleKg} product={product} volume={volume} />
                  </div>
                ) : null}
                {!reference && step === 0 ? (
                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-semibold text-ink">Which industry is buying?</legend>
                    {sectors.map((item) => (
                      <label
                        key={item.id}
                        className={cn(
                          "block cursor-pointer rounded-2xl border px-4 py-3",
                          sector === item.id ? "border-lime/60 bg-white" : "border-forest/12 bg-white/60",
                        )}
                      >
                        <input
                          type="radio"
                          name="sector"
                          className="sr-only"
                          checked={sector === item.id}
                          onChange={() => {
                            setSector(item.id);
                            if (!incoming.length) setProductId(sectorLeadProduct[item.id]);
                          }}
                        />
                        <span className="block font-semibold text-ink">{item.label}</span>
                        <span className="mt-1 block text-sm leading-6 text-muted">{item.detail}</span>
                      </label>
                    ))}
                  </fieldset>
                ) : null}
                {!reference && step === 1 && sampleMode ? (
                  <fieldset>
                    <legend className="text-sm font-semibold text-ink">Sample set</legend>
                    <div className="mt-3 space-y-2">
                      {products.map((item) => {
                        const checked = sampleIds.includes(item.id);
                        return (
                          <label key={item.id} className={cn("flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3", checked ? "border-lime/60 bg-white" : "border-forest/12")}>
                            <span>
                              <span className="block font-medium">{item.name}</span>
                              <span className="text-xs text-muted">{item.code}</span>
                            </span>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setSampleIds((current) =>
                                  current.includes(item.id)
                                    ? current.filter((id) => id !== item.id)
                                    : [...current, item.id],
                                )
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-sm font-semibold">Sample size, each product</p>
                    <div className="mt-2 flex gap-2">
                      {([1, 5, 25] as const).map((kg) => (
                        <button
                          key={kg}
                          type="button"
                          onClick={() => setSampleKg(kg)}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold",
                            sampleKg === kg ? "border-forest bg-forest text-white" : "border-forest/15",
                          )}
                        >
                          {kg} kg
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
                {!reference && step === 1 && !sampleMode ? (
                  <div>
                    <p className="text-sm font-semibold text-ink">Target product</p>
                    <div className="mt-3 space-y-2">
                      {products.map((item) => (
                        <label key={item.id} className={cn("flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3", productId === item.id ? "border-lime/60 bg-white" : "border-forest/12")}>
                          <span>
                            <span className="block font-medium">{item.name}</span>
                            <span className="text-xs text-muted">{item.yieldKg.toLocaleString("en-US")} kg/day design yield</span>
                          </span>
                          <input type="radio" name="product" checked={productId === item.id} onChange={() => setProductId(item.id)} />
                        </label>
                      ))}
                    </div>
                    <label className="mt-5 block text-sm font-semibold" htmlFor="volume">
                      Monthly volume · {volume >= 500 ? "500+ MT" : `${volume} MT`}
                    </label>
                    <input
                      id="volume"
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      value={volume}
                      onChange={(event) => setVolume(Number(event.target.value))}
                      className="mt-3 w-full accent-forest"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-muted">
                      <span>5 MT</span>
                      <span>500+ MT</span>
                    </div>
                  </div>
                ) : null}
                {!reference && step === 2 ? (
                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-semibold">Delivery specification</legend>
                    {lanes.map((item) => (
                      <label key={item.id} className={cn("block cursor-pointer rounded-2xl border px-4 py-3", lane === item.id ? "border-lime/60 bg-white" : "border-forest/12")}>
                        <input type="radio" name="lane" className="sr-only" checked={lane === item.id} onChange={() => setLane(item.id)} />
                        <span className="block font-semibold">{item.label}</span>
                        <span className="mt-1 block text-sm text-muted">{item.detail}</span>
                      </label>
                    ))}
                  </fieldset>
                ) : null}
                {!reference && step === 3 ? (
                  <div className="space-y-3">
                    <Field
                      id="company"
                      label="Company"
                      value={companyName}
                      onChange={setCompanyName}
                      autoComplete="organization"
                      maxLength={120}
                    />
                    <Field
                      id="contact"
                      label="Commercial contact"
                      value={contact}
                      onChange={setContact}
                      autoComplete="name"
                      maxLength={120}
                    />
                    <Field
                      id="email"
                      label="Work email"
                      value={email}
                      onChange={setEmail}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={120}
                    />
                    <Field
                      id="phone"
                      label="Phone"
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={30}
                    />
                    <label className="block text-sm font-semibold" htmlFor="note">
                      Note <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={note}
                      maxLength={500}
                      onChange={(event) => setNote(event.target.value.slice(0, 500))}
                      rows={3}
                      className="w-full rounded-2xl border border-forest/15 bg-white px-3 py-2 text-base outline-none focus:border-forest sm:text-sm"
                    />
                    <Estimate sampleMode={sampleMode} bulk={bulk} sample={sample} sampleKg={sampleKg} product={product} volume={volume} />
                  </div>
                ) : null}
                {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-forest/12 px-5 py-4">
                <button
                  type="button"
                  className="cursor-pointer text-sm font-semibold text-muted disabled:opacity-40"
                  disabled={step === 0 || Boolean(reference)}
                  onClick={() => {
                    setError("");
                    setStep((value) => Math.max(0, value - 1));
                  }}
                >
                  Back
                </button>
                {reference ? (
                  <Link href="/products" className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white">
                    Back to products
                  </Link>
                ) : (
                  <button type="submit" className="cursor-pointer rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white">
                    {step < 3 ? "Continue" : sampleMode ? "Stage sample request" : "Stage quotation"}
                  </button>
                )}
              </div>
            </form>
        </div>
      </div>
    </section>
  );
}

export function RfqDrawer() {
  const { rfqOpen, closeRfq, rfqSession, launch } = useSite();

  useEffect(() => {
    if (!rfqOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRfq();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [rfqOpen, closeRfq]);

  if (!rfqOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Close request" className="absolute inset-0 cursor-pointer bg-ink/55" onClick={closeRfq} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-hidden bg-[#f8faf8] shadow-2xl">
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <p className="font-mono text-[11px] tracking-[0.16em] text-forest uppercase">Commercial desk</p>
          <button type="button" onClick={closeRfq} className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-semibold text-forest">
            Close
          </button>
        </div>
        <RequestForm
          key={`${rfqSession}-${launch.intent}-${launch.productIds.join(",")}`}
          intent={launch.intent}
          productIds={launch.productIds}
          plain
        />
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete: string;
  inputMode?: "text" | "email" | "tel";
  maxLength: number;
}) {
  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        spellCheck={type === "email" ? false : undefined}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
        className="mt-1 min-h-11 w-full rounded-2xl border border-forest/15 bg-white px-3 py-2.5 text-base font-normal outline-none focus:border-forest sm:text-sm"
      />
    </label>
  );
}

function Estimate({
  sampleMode,
  bulk,
  sample,
  sampleKg,
  product,
  volume,
}: {
  sampleMode: boolean;
  bulk: ReturnType<typeof quoteBulk>;
  sample: ReturnType<typeof quoteSample>;
  sampleKg: number;
  product: { name: string };
  volume: number;
}) {
  if (sampleMode) {
    return (
      <div className="rounded-2xl bg-ink p-4 text-sm text-white">
        <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Sample estimate</p>
        <p className="mt-2">{sample.count} product{sample.count === 1 ? "" : "s"} · {sampleKg} kg each</p>
        <p className="mt-1 text-white/70">Handling {money(sample.handling)} · lane {money(sample.freight)}</p>
        <p className="mt-3 font-headline text-3xl text-lime">{money(sample.total)}</p>
        <p className="mt-2 text-xs leading-5 text-white/60">
          Non-binding. Sample handling is a planning allowance, not a price list. First commercial
          shipments follow commissioning in early 2027.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-ink p-4 text-sm text-white">
      <p className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Planning estimate</p>
      <dl className="mt-3 space-y-1 text-white/80">
        <div className="flex justify-between gap-4"><dt>{product.name}</dt><dd>{money(bulk.unit)} / MT</dd></div>
        <div className="flex justify-between gap-4"><dt>Volume</dt><dd>{volume >= 500 ? "500+ MT, priced at 500" : `${bulk.volume} MT`}</dd></div>
        <div className="flex justify-between gap-4"><dt>Scale adjustment</dt><dd>{bulk.scale ? `−${(bulk.scale * 100).toFixed(1)}%` : "None under 100 MT"}</dd></div>
        <div className="flex justify-between gap-4"><dt>{bulk.lane.label}</dt><dd>{money(bulk.freight)} / MT</dd></div>
      </dl>
      <p className="mt-3 font-headline text-3xl text-lime">{money(bulk.total)}</p>
      <p className="mt-2 text-xs leading-5 text-white/60">
        Not an offer and not a list price. Unit rates and freight are calculator assumptions so a buyer
        can see the shape of a domestic supply. ACIL’s desk confirms any figure.
      </p>
    </div>
  );
}
