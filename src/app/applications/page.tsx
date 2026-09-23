import type { Metadata } from "next";
import { Applications } from "@/components/applications";
import { ApplicationDepth } from "@/components/deeper";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Industrial applications",
  "Food, pharmaceutical, textile sizing, and feed uses for ACIL corn starch and kernel fractions.",
  "/applications",
);

export default function ApplicationsPage() {
  return (
    <PageMain>
      <Crumb label="Industrial applications" />
      <Applications />
      <ApplicationDepth />
    </PageMain>
  );
}
