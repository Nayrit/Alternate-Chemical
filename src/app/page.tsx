import { Hero } from "@/components/hero";
import { HomeChapters } from "@/components/home-chapters";
import { JsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <main id="content">
      <JsonLd />
      <Hero />
      <HomeChapters />
    </main>
  );
}
