import type { Metadata } from "next";
import { ImportDepth } from "@/components/deeper";
import { Market } from "@/components/market";
import { Crumb, PageMain } from "@/components/page-main";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Import substitution",
  "ACIL native-starch design capacity of 23,100 MT a year set against 11,604 MT of maize starch imported into Bangladesh in 2023.",
  "/import-substitution",
);

export default function ImportSubstitutionPage() {
  return (
    <PageMain>
      <Crumb label="Import substitution" />
      <Market />
      <ImportDepth />
    </PageMain>
  );
}
