import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductNeighbors } from "@/components/deeper";
import { ProductDetail } from "@/components/product-detail";
import { Crumb, PageMain } from "@/components/page-main";
import { products } from "@/lib/data";
import { SITE_URL, pageMeta } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) return {};
  return pageMeta(
    `${product.name}, Habiganj`,
    `${product.summary} Design yield ${product.yieldKg.toLocaleString("en-US")} kg/day from the ACIL Habiganj wet mill.`,
    `/products/${product.id}`,
  );
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.summary,
    url: `${SITE_URL}/products/${product.id}`,
    brand: { "@type": "Brand", name: "ACIL" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    category: product.applications[0],
    additionalProperty: [...product.purity, ...product.properties].map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <PageMain>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <Crumb label={product.name} href={`/products/${product.id}`} parent={{ href: "/products", label: "Products" }} />
      <ProductDetail product={product} />
      <ProductNeighbors product={product} />
    </PageMain>
  );
}
