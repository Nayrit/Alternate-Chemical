import type { Metadata } from "next";
import { Applications } from "@/components/applications";
import { ApplicationDepth } from "@/components/deeper";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Textile Sizing, Food, Pharma, and Feed Starch",
  "Food, pharmaceutical excipient, textile sizing, and feed uses for ACIL native starch, modified starch, and kernel fractions from Habiganj.",
  "/applications",
);

export default function ApplicationsPage() {
  return (
    <PageMain>
      <Crumb label="Industrial applications" href="/applications" />
      <Applications />
      <ApplicationDepth />
    </PageMain>
  );
}
