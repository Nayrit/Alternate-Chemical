import type { Metadata } from "next";
import { Plant } from "@/components/plant";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Sustainability",
  "The Habiganj site plan: silos, the modification line, the Thermax boiler, rooftop solar, and a zero-discharge effluent plant.",
  "/sustainability",
);

export default function SustainabilityPage() {
  return (
    <PageMain>
      <Crumb label="Sustainability" />
      <Plant />
    </PageMain>
  );
}
