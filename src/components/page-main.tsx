import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export function PageMain({ children }: { children: ReactNode }) {
  return (
    <main id="content" className="pt-[calc(4.6rem+env(safe-area-inset-top))]">
      {children}
    </main>
  );
}

export function Crumb({
  label,
  href,
  parent,
}: {
  label: string;
  href: string;
  parent?: { href: string; label: string };
}) {
  const trail = [
    { name: "Home", href: "/" },
    ...(parent ? [parent] : []),
    { name: label, href },
  ];
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
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
    </>
  );
}
