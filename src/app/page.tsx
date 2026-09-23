import { Applications } from "@/components/applications";
import { Company } from "@/components/company";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Market } from "@/components/market";
import { Plant } from "@/components/plant";
import { ProcessFlow } from "@/components/process-flow";
import { Products } from "@/components/products";
import { SITE_DESCRIPTION, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Corn Starch Manufacturer in Bangladesh | Alternate Chemical Industry Ltd.",
  SITE_DESCRIPTION,
  "/",
  { absolute: true },
);

export default function Home() {
  return (
    <main id="content">
      <JsonLd />
      <Hero />
      <Company />
      <ProcessFlow />
      <Products />
      <Applications />
      <Market />
      <Plant />
    </main>
  );
}
