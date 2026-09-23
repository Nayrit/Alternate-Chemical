import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Company } from "@/components/company";
import { ProcessFlow } from "@/components/process-flow";
import { Products } from "@/components/products";
import { Applications } from "@/components/applications";
import { Market } from "@/components/market";
import { Plant } from "@/components/plant";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Company />
        <ProcessFlow />
        <Products />
        <Applications />
        <Market />
        <Plant />
      </main>
      <Footer />
    </>
  );
}
