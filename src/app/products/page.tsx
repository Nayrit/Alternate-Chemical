import type { Metadata } from "next";
import { ProductRegister } from "@/components/deeper";
import { Products } from "@/components/products";
import { Crumb, PageMain } from "@/components/page-main";
import type { Sector } from "@/lib/data";
import { pageMeta } from "@/lib/site";

const sectorMeta: Record<Sector, { title: string; description: string }> = {
  food: {
    title: "Food Grade Corn Starch",
    description:
      "Native and modified corn starch for thickening, stabilizing, and binding. ACIL Habiganj design grades for food and beverage. Commissioning early 2027.",
  },
  pharma: {
    title: "Pharmaceutical Excipient Starch",
    description:
      "Native corn starch as a tablet excipient and binder from the ACIL Habiganj wet mill. Design grade, with commissioning scheduled for early 2027.",
  },
  textile: {
    title: "Textile Sizing Starch",
    description:
      "Native and oxidized corn starch for yarn sizing and fabric finishing in Bangladesh, from the ACIL Habiganj wet-mill design.",
  },
  feed: {
    title: "Corn Fiber, Germ, Gluten, and Steep Liquor",
    description:
      "Corn fiber, germ, gluten powder, and steep liquor for livestock, poultry, aquaculture, and fermentation from the ACIL Habiganj design.",
  },
};

const sectors: Sector[] = ["food", "pharma", "textile", "feed"];

function isSector(value: string | undefined): value is Sector {
  return Boolean(value && sectors.includes(value as Sector));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>;
}): Promise<Metadata> {
  const { sector } = await searchParams;
  if (isSector(sector)) {
    return pageMeta(sectorMeta[sector].title, sectorMeta[sector].description, `/products?sector=${sector}`);
  }
  return pageMeta(
    "Native and Modified Corn Starch",
    "Native starch, modified starch, corn fiber, germ, gluten powder, and corn steep liquor from the ACIL Habiganj wet-mill design.",
    "/products",
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>;
}) {
  const { sector } = await searchParams;
  const initialFilter = isSector(sector) ? sector : "all";

  return (
    <PageMain>
      <Crumb label="Products" href="/products" />
      <Products key={initialFilter} initialFilter={initialFilter} />
      <ProductRegister />
    </PageMain>
  );
}
