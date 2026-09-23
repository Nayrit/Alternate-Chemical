import type { Metadata } from "next";
import { Products } from "@/components/products";
import { Crumb, PageMain } from "@/components/page-main";
import type { Sector } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Products",
  "Native starch, modified starch, corn fiber, germ, gluten powder, and corn steep liquor from the ACIL Habiganj design.",
  "/products",
);

const sectors: Sector[] = ["food", "pharma", "textile", "feed"];

function isSector(value: string | undefined): value is Sector {
  return Boolean(value && sectors.includes(value as Sector));
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
      <Crumb label="Products" />
      <Products key={initialFilter} initialFilter={initialFilter} />
    </PageMain>
  );
}
