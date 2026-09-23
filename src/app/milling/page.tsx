import type { Metadata } from "next";
import { MillingDepth } from "@/components/deeper";
import { ProcessFlow } from "@/components/process-flow";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Milling technology",
  "How the Habiganj wet mill separates corn into starch, fiber, germ, gluten, and steep liquor, with a 33,000 MT silo buffer.",
  "/milling",
);

export default function MillingPage() {
  return (
    <PageMain>
      <Crumb label="Milling technology" />
      <ProcessFlow />
      <MillingDepth />
    </PageMain>
  );
}
