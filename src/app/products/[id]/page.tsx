import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductNeighbors } from "@/components/deeper";
import { ProductDetail } from "@/components/product-detail";
import { Crumb, PageMain } from "@/components/page-main";
import { products } from "@/lib/data";
import { pageMeta } from "@/lib/site";

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
  return pageMeta(product.name, product.summary, `/products/${product.id}`);
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  return (
    <PageMain>
      <Crumb label={product.name} parent={{ href: "/products", label: "Products" }} />
      <ProductDetail product={product} />
      <ProductNeighbors product={product} />
    </PageMain>
  );
}
