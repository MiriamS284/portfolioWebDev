"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OverlayMenu from "./OverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MenuDock({ logoSrc = "/logo_no_text.png" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Mobile Header - Always fixed and centered */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Logo + Name - Name fades on scroll */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoSrc}
              alt="Home"
              width={120}
              height={120}
              priority
              className="w-10 h-10 sm:w-12 sm:h-12"
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,.25))",
              }}
            />
            {/* Name - always visible on mobile */}
            <span
              className="text-sm sm:text-base font-semibold tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              Miriam Sparbrod
            </span>
          </Link>

          {/* Hamburger - always visible */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="relative w-9 h-9 flex items-center justify-center rounded-md transition-colors active:bg-white/10"
            style={{
              background: "transparent",
            }}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-1">
              <span
                className="block w-5 h-[2px] rounded-full"
                style={{ background: "var(--ink)" }}
              />
              <span
                className="block w-5 h-[2px] rounded-full"
                style={{ background: "var(--ink)" }}
              />
              <span
                className="block w-3 h-[2px] rounded-full"
                style={{ background: "var(--ink)" }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Desktop Sidebar - Logo and Menu always visible */}
      <div className="hidden lg:block fixed left-6 top-6 z-50 select-none">
        <Link href="/" className="block group mb-8">
          <Image
            src={logoSrc}
            alt="Home"
            width={200}
            height={200}
            priority
            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44 transition-transform duration-300 group-hover:scale-110"
            style={{
              display: "block",
              objectFit: "contain",
              opacity: 0.96,
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,.35))",
            }}
          />
        </Link>

        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer group"
            style={{ background: "transparent" }}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
          >
            <div
              className="transition-opacity group-hover:opacity-100"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.5em",
                fontSize: 11,
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              MENU
            </div>
          </button>

          <div
            className="w-[1px] h-8"
            style={{ background: "var(--border)", opacity: 0.5 }}
          />

          <LanguageSwitcher />
        </div>
      </div>

      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
