import type { Metadata } from "next";
import { ProcurementDesk } from "@/components/procurement-modal";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Buy Corn Starch from ACIL",
  "Commercial paths for direct buyers, distributors, and offtake partners ahead of ACIL commissioning in Habiganj in early 2027.",
  "/procurement",
);

export default function ProcurementPage() {
  return (
    <PageMain>
      <Crumb label="Procurement" href="/procurement" />
      <ProcurementDesk />
    </PageMain>
  );
}
