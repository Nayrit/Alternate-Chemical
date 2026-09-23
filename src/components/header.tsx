"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useSite } from "@/components/site-context";

export function Header() {
  const { openRfq } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("company");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["company", "milling", "products", "applications", "advantage", "sustainability"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id === "advantage" ? "applications" : visible.target.id;
        setActive(id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="h-1 bg-forest" />
      <div className="h-[3px] bg-lime" />
      <div
        className={cn(
          "border-b border-forest/12 bg-[#f8faf8]/80 backdrop-blur-md",
          scrolled && "shadow-[0_10px_30px_-24px_rgba(8,28,21,0.45)]",
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-4 px-5 md:px-8">
          <a href="#top" className="shrink-0" aria-label="ACIL home">
            <Image
              src="/images/logo.png"
              alt="Alternate Chemical Industry Ltd."
              width={3043}
              height={643}
              priority
              className="h-9 w-auto md:h-11"
            />
          </a>
          <nav className="ml-auto hidden items-center gap-x-4 xl:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium tracking-tight text-ink/80 transition hover:text-forest",
                  active === item.id && "text-forest",
                )}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => openRfq({ intent: "sample", productIds: [] })}
              className={cn(
                "text-[13px] font-medium text-ink/80 transition hover:text-forest",
                "cursor-pointer",
              )}
            >
              Sample Request
            </button>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-6">
            <button
              type="button"
              onClick={() => openRfq({ intent: "quotation" })}
              className="cursor-pointer whitespace-nowrap rounded-full bg-forest px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#00562d]"
            >
              <span className="xl:hidden">Quote</span>
              <span className="hidden xl:inline">Request Commercial Quotation</span>
            </button>
            <button
              type="button"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-forest/15 xl:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="border-b border-forest/12 bg-[#f8faf8] px-5 py-4 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-forest/5"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-forest/5"
              onClick={() => {
                setOpen(false);
                openRfq({ intent: "sample" });
              }}
            >
              Sample Request
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
