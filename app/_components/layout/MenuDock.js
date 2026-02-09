"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OverlayMenu from "./OverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MenuDock({ logoSrc = "/logo_no_text.png" }) {
  const [menuHovered, setMenuHovered] = useState(false);

  useEffect(() => {
    if (!menuHovered) return;
    const onKey = (e) => e.key === "Escape" && setMenuHovered(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuHovered]);

  return (
    <>
      <div className="fixed left-3 top-4 sm:left-4 sm:top-5 md:left-6 md:top-6 z-50 select-none">
        <Link href="/" className="block group mb-8">
          <Image
            src={logoSrc}
            alt="Home"
            width={200}
            height={200}
            priority
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 transition-transform duration-300 group-hover:scale-110"
            style={{
              display: "block",
              objectFit: "contain",
              opacity: 0.96,
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,.35))",
            }}
          />
        </Link>

        <div className="flex flex-col items-center gap-6">
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

          <div
            className="w-[1px] h-8"
            style={{ background: "var(--border)", opacity: 0.5 }}
          />

          <LanguageSwitcher />
        </div>
      </div>

      <OverlayMenu open={menuHovered} onClose={() => setMenuHovered(false)} />
    </>
  );
}
