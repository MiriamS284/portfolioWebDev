"use client";

import Footer from "../_components/layout/Footer";
import AboutHero from "../_components/about/AboutHero";
import TechStackArchitecture from "../_components/about/TechStackArchitecture";

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <TechStackArchitecture />
      </main>
      <Footer />
    </>
  );
}
