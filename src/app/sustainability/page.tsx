import type { Metadata } from "next";
import { PlantDepth } from "@/components/deeper";
import { Plant } from "@/components/plant";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Habiganj Plant, Solar, and Zero-Discharge ETP",
  "The ACIL Habiganj site plan: silos, the Wuhan Friendship modification line, a Thermax boiler, rooftop solar, and a zero-discharge effluent plant.",
  "/sustainability",
);

export default function SustainabilityPage() {
  return (
    <PageMain>
      <Crumb label="Sustainability" href="/sustainability" />
      <Plant />
      <PlantDepth />
    </PageMain>
  );
}
