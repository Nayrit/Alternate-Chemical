import type { Metadata } from "next";
import { Company } from "@/components/company";
import { CompanyDepth } from "@/components/deeper";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Company",
  "Alternate Chemical Industry Ltd. is commissioning a corn wet mill in Madhobpur, Habiganj, with a corporate office in Dhaka.",
  "/company",
);

export default function CompanyPage() {
  return (
    <PageMain>
      <Crumb label="Company" />
      <Company />
      <CompanyDepth />
    </PageMain>
  );
}
