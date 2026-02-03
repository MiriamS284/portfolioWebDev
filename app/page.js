"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroShowcase from "./_components/HeroShowcase";
import WhoIAm from "./_components/home/WhoIAm";
import FeaturedProjects from "./_components/home/FeaturedProjects";
import GardenPreview from "./_components/home/GardenPreview";
import CallToAction from "./_components/home/CallToAction";
import Footer from "./_components/layout/Footer";

const MERNWriteIntro = dynamic(() => import("./_components/MERNWriteIntro"), {
  ssr: false,
});

export default function Page() {
  const [introState, setIntroState] = useState("checking");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro_seen");

    requestAnimationFrame(() => {
      setIntroState(hasSeenIntro ? "done" : "show");
    });
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("intro_seen", "true");
    setIntroState("done");
  };

  if (introState === "checking") {
    return null;
  }

  if (introState === "show") {
    return <MERNWriteIntro onDone={handleIntroDone} logoSrc="/logo_side.png" />;
  }

  return (
    <>
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
