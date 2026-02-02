import MenuDock from "./_components/layout/MenuDock";
import HeroShowcase from "./_components/HeroShowcase";
import WhoIAm from "./_components/home/WhoIAm";
import FeaturedProjects from "./_components/home/FeaturedProjects";
import GardenPreview from "./_components/home/GardenPreview";
import CallToAction from "./_components/home/CallToAction";
import Footer from "./_components/layout/Footer";

export const metadata = {
  title: "Miriam Sparbrod – Full-Stack Entwicklerin",
  description:
    "Sprachwissenschaftlerin & Full-Stack Entwicklerin. Ich übersetze komplexe Ideen in funktionale, schöne Anwendungen.",
};

export default function Page() {
  return (
    <>
      <MenuDock />

      <main>
        <HeroShowcase />
        <WhoIAm />
        <FeaturedProjects />
        <GardenPreview />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
