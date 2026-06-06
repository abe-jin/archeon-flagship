import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import FulcrumHero from "@/components/hero/FulcrumHero";
import ProofBar from "@/components/ProofBar";
import Works from "@/components/Works";
import CatalogHighlight from "@/components/CatalogHighlight";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>
        <FulcrumHero />
        <ProofBar />
        <Works />
        <CatalogHighlight />
        <Capabilities />
        <Services />
        <Process />
        <WhyUs />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
