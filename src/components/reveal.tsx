"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionIntro({
  index,
  eyebrow,
  title,
  lede,
  invert = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  invert?: boolean;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p
        className={cn(
          "font-mono text-[11px] tracking-[0.22em] uppercase",
          invert ? "text-lime" : "text-forest",
        )}
      >
        {index}. {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-headline text-4xl leading-[0.98] tracking-tight md:text-5xl",
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      <p className={cn("mt-5 text-base leading-7 md:text-lg", invert ? "text-white/75" : "text-muted")}>
        {lede}
      </p>
    </Reveal>
  );
}
