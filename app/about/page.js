import AboutHero from "../_components/about/AboutHero";
import TechStackArchitecture from "../_components/about/TechStackArchitecture";
import Footer from "../_components/layout/Footer";
import MenuDock from "../_components/layout/MenuDock";

export const metadata = {
  title: "Über mich | Miriam Sparbrod",
  description:
    "Full-Stack Entwicklerin mit Hintergrund in Sprachwissenschaft. Spezialisiert auf MERN Stack, SaaS-Lösungen und die Übersetzung von Ideen in Code.",
};

export default function AboutPage() {
  return (
    <>
      <MenuDock />

      <main>
        <AboutHero />
        <TechStackArchitecture />
      </main>

      <Footer />
    </>
  );
}
