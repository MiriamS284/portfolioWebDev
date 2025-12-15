// app/page.js
"use client";
import { useState } from "react";
import MenuDock from "./_components/MenuDock";
import HeroShowcase from "./_components/HeroShowcase";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <MenuDock onOpenMenu={() => setMenuOpen(true)} />

      {/* deine Intro/Hero Sektionen */}
      <HeroShowcase />

      {/* hier später dein echtes Offcanvas/Overlay-Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,.75))",
            backdropFilter: "blur(8px)",
          }}
        />
      )}
    </main>
  );
}
