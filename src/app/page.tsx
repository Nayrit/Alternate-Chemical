import { Hero } from "@/components/hero";
import { HomeSummary } from "@/components/home-summary";
import { JsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <main id="content">
      <JsonLd />
      <Hero />
      <HomeSummary />
    </main>
  );
}
