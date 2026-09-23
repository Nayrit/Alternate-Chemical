import type { Metadata } from "next";
import { RequestForm } from "@/components/rfq-drawer";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Commercial request",
  "Stage a non-binding planning quotation or an evaluation sample request for ACIL starch and co-products.",
  "/request",
);

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; products?: string }>;
}) {
  const query = await searchParams;
  const intent = query.intent === "sample" ? "sample" : "quotation";
  const productIds = (query.products ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return (
    <PageMain>
      <Crumb label={intent === "sample" ? "Sample request" : "Commercial quotation"} />
      <RequestForm key={`${intent}:${productIds.join(",")}`} intent={intent} productIds={productIds} />
    </PageMain>
  );
}
