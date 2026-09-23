import type { Metadata } from "next";
import { Company } from "@/components/company";
import { CompanyDepth } from "@/components/deeper";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Corn Wet Mill in Habiganj",
  "Alternate Chemical Industry Ltd. is commissioning a corn wet mill on Satian Road, Ratanpur, Madhobpur, Habiganj, with a corporate office in Dhaka 1000.",
  "/company",
);

export default function CompanyPage() {
  return (
    <PageMain>
      <Crumb label="Company" href="/company" />
      <Company />
      <CompanyDepth />
    </PageMain>
  );
}
