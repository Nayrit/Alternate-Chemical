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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]">
      <div className="h-1 bg-forest" />
      <div className="h-[3px] bg-lime" />
      <div
        className={cn(
          "border-b border-forest/12 bg-[#f8faf8]/80 backdrop-blur-md",
          scrolled && "shadow-[0_10px_30px_-24px_rgba(8,28,21,0.45)]",
        )}
      >
        <div className="shell flex h-[4.25rem] items-center gap-3 sm:gap-4">
          <a href="#top" className="shrink-0" aria-label="ACIL home">
            <Image
              src="/images/logo.png"
              alt="Alternate Chemical Industry Ltd."
              width={3043}
              height={643}
              priority
              sizes="(min-width: 120rem) 280px, (min-width: 48rem) 220px, 160px"
              className="h-9 w-auto sm:h-10 md:h-11 3xl:h-14"
            />
          </a>
          <nav className="ml-auto hidden items-center gap-x-4 xl:flex 3xl:gap-x-6" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "text-[13px] font-medium tracking-tight text-ink/80 transition hover:text-forest 3xl:text-base",
                  active === item.id && "text-forest",
                )}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => openRfq({ intent: "sample", productIds: [] })}
              className="cursor-pointer text-[13px] font-medium text-ink/80 transition hover:text-forest 3xl:text-base"
            >
              Sample Request
            </button>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-6">
            <button
              type="button"
              onClick={() => openRfq({ intent: "quotation" })}
              className="min-h-11 cursor-pointer whitespace-nowrap rounded-full bg-forest px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#00562d] 3xl:px-5 3xl:text-sm"
            >
              <span className="xl:hidden">Quote</span>
              <span className="hidden xl:inline">Request Commercial Quotation</span>
            </button>
            <button
              type="button"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-forest/15 xl:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div
          id="site-menu"
          className="max-h-[calc(100dvh-5rem-env(safe-area-inset-top))] overflow-y-auto border-b border-forest/12 bg-[#f8faf8] px-[var(--shell-pad)] py-4 xl:hidden"
        >
          <nav className="mx-auto grid w-full max-w-[var(--shell-max)] grid-cols-1 gap-1 md:grid-cols-2" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 py-3 text-base font-medium hover:bg-forest/5"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="flex min-h-11 cursor-pointer items-center rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-forest/5"
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
