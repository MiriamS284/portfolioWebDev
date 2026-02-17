"use client";

import MenuDock from "../_components/layout/MenuDock";
import Footer from "../_components/layout/Footer";
import BackLink from "../_components/shared/BackLink";
import AboutHero from "../_components/about/AboutHero";
import TechStackArchitecture from "../_components/about/TechStackArchitecture";

export default function AboutPage() {
  return (
    <>
      <MenuDock />
      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <BackLink href="/">Index</BackLink>
          <AboutHero />
          <TechStackArchitecture />
        </div>
      </main>
      <Footer />
    </>
  );
}
