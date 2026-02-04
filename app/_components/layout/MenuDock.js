"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OverlayMenu from "./OverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function MenuDock({ logoSrc = "/logo_light.png" }) {
  const [menuHovered, setMenuHovered] = useState(false);
  const logoRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    el.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = logoRef.current;
    if (!el) return;
    el.style.transform = `translate(0px, 0px)`;
  }, []);

  useEffect(() => {
    if (!menuHovered) return;
    const onKey = (e) => e.key === "Escape" && setMenuHovered(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuHovered]);

  return (
    <>
      {/* Left Dock: Logo + Menu + Language */}
      <div
        className="fixed left-3 top-4 sm:left-4 sm:top-5 md:left-6 md:top-6 z-50 select-none"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Logo */}
        <Link href="/" className="block mb-6 group">
          <span
            ref={logoRef}
            className="inline-block will-change-transform transition-transform duration-300 group-hover:scale-110"
            style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,.35))" }}
          >
            <Image
              src={logoSrc}
              alt="Home"
              width={200}
              height={200}
              priority
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44"
              style={{ display: "block", objectFit: "contain", opacity: 0.96 }}
            />
          </span>
        </Link>

        {/* Navigation Controls - vertikale Linie als Trenner */}
        <div className="flex flex-col items-start gap-8">
          {/* Menu Button */}
          <div onMouseEnter={() => setMenuHovered(true)}>
            <button
              type="button"
              className="cursor-pointer group"
              style={{ background: "transparent" }}
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
          </div>

          {/* Separator Line */}
          <div
            className="w-[1px] h-8 ml-2"
            style={{ background: "var(--border)" }}
          />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Right Top: Theme Switcher */}
      <div className="fixed right-4 top-4 sm:right-5 sm:top-5 md:right-6 md:top-6 z-50">
        <ThemeSwitcher />
      </div>

      <OverlayMenu open={menuHovered} onClose={() => setMenuHovered(false)} />
    </>
  );
}
