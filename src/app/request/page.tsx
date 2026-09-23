import type { Metadata } from "next";
import { RequestForm } from "@/components/rfq-drawer";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Request Corn Starch Quotation or Sample",
  "Stage a non-binding planning quotation or an evaluation sample for ACIL native starch, modified starch, and co-products.",
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
      <Crumb
        label={intent === "sample" ? "Sample request" : "Commercial quotation"}
        href="/request"
      />
      <RequestForm key={`${intent}:${productIds.join(",")}`} intent={intent} productIds={productIds} />
    </PageMain>
  );
}
