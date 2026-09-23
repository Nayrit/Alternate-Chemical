"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionMore({
  href,
  label,
  tone = "forest",
}: {
  href: string;
  label: string;
  tone?: "forest" | "lime";
}) {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <p className="mt-8">
      <Link
        href={href}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 text-sm font-semibold",
          tone === "lime" ? "text-lime" : "text-forest",
        )}
      >
        {label}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </p>
  );
}
