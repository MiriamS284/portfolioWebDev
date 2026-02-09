"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MenuDock from "./layout/MenuDock";
import HeroShowcase from "./HeroShowcase";
import WhoIAm from "./home/WhoIAm";
import FeaturedProjectsClient from "./home/FeaturedProjectsClient";
import GardenPreview from "./home/GardenPreview";
import CallToAction from "./home/CallToAction";
import Footer from "./layout/Footer";

const MERNWriteIntro = dynamic(() => import("./MERNWriteIntro"), {
  ssr: false,
});

export default function ClientHomePage({ projects }) {
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
      <MenuDock />
      <main>
        <HeroShowcase />
        <WhoIAm />
        <FeaturedProjectsClient projects={projects} />
        {/* <GardenPreview /> */}
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
