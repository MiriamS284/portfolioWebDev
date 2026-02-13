"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import MenuDock from "./layout/MenuDock";
import HeroShowcase from "./HeroShowcase";
import HomeContentGrid from "./home/HomeContentGrid";
import HomeContactSection from "./home/HomeContactSection";
import Footer from "./layout/Footer";

const MERNWriteIntro = dynamic(() => import("./MERNWriteIntro"), {
  ssr: false,
});

export default function ClientHomePage({ projects, posts, snippets, thoughts }) {
  // Start mit "show" - Intro wird immer zuerst angezeigt (schwarzer Bildschirm)
  const [introState, setIntroState] = useState("show");
  const [isClient, setIsClient] = useState(false);

  // Sofort beim Client-Mount prüfen
  useLayoutEffect(() => {
    setIsClient(true);
    const hasSeenIntro = sessionStorage.getItem("intro_seen");
    if (hasSeenIntro) {
      setIntroState("done");
    }
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("intro_seen", "true");
    setIntroState("done");
  };

  // Vor Client-Hydration: Schwarzer Bildschirm
  if (!isClient) {
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{ background: "var(--bg)" }}
      />
    );
  }

  // Intro anzeigen
  if (introState === "show") {
    return <MERNWriteIntro onDone={handleIntroDone} logoSrc="/logo_no_text.png" />;
  }

  // Homepage
  return (
    <>
      <MenuDock />
      <main>
        <HeroShowcase />
        <HomeContentGrid
          projects={projects}
          posts={posts}
          snippets={snippets}
          thoughts={thoughts}
        />
        <HomeContactSection />
      </main>
      <Footer />
    </>
  );
}
