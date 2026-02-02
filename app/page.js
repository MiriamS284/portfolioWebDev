"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MenuDock from "./_components/layout/MenuDock";
import HeroShowcase from "./_components/HeroShowcase";
import WhoIAm from "./_components/home/WhoIAm";
import FeaturedProjects from "./_components/home/FeaturedProjects";
import GardenPreview from "./_components/home/GardenPreview";
import CallToAction from "./_components/home/CallToAction";
import Footer from "./_components/layout/Footer";

const CinematicIntro = dynamic(() => import("./_components/CinematicIntro"), {
  ssr: false,
});

export default function Page() {
  // Prüfe Client-side ob Intro schon gesehen
  const [introState, setIntroState] = useState("checking"); // checking | show | done

  useEffect(() => {
    // Nur 1x ausführen - kein setState direkt
    const hasSeenIntro = sessionStorage.getItem("intro_seen");

    // Delay setState um Race Condition zu vermeiden
    requestAnimationFrame(() => {
      setIntroState(hasSeenIntro ? "done" : "show");
    });
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("intro_seen", "true");
    setIntroState("done");
  };

  // Während Check: zeige nichts (flicker vermeiden)
  if (introState === "checking") {
    return null;
  }

  // Intro zeigen
  if (introState === "show") {
    return <CinematicIntro onDone={handleIntroDone} logoSrc="/logo_side.png" />;
  }

  // Normale Homepage
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
