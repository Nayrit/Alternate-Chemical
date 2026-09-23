import type { ReactNode } from "react";
import Link from "next/link";

export function PageMain({ children }: { children: ReactNode }) {
  return (
    <main id="content" className="pt-[calc(4.6rem+env(safe-area-inset-top))]">
      {children}
    </main>
  );
}

export function Crumb({
  label,
  parent,
}: {
  label: string;
  parent?: { href: string; label: string };
}) {
  return (
    <p className="shell pt-8 text-sm text-muted">
      <Link href="/" className="font-medium text-forest hover:underline">
        Home
      </Link>
      {parent ? (
        <>
          <span aria-hidden="true"> / </span>
          <Link href={parent.href} className="font-medium text-forest hover:underline">
            {parent.label}
          </Link>
        </>
      ) : null}
      <span aria-hidden="true"> / </span>
      <span>{label}</span>
    </p>
  );
}
