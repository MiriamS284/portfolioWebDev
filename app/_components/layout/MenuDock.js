"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OverlayMenu from "./OverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";

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
      <div
        className="fixed left-4 top-6 z-50 select-none"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <Link href="/" className="block mb-8 group">
          <span
            ref={logoRef}
            className="inline-block will-change-transform transition-transform duration-300 group-hover:scale-110"
            style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,.35))" }}
          >
            <Image
              src={logoSrc}
              alt="Home"
              width={160}
              height={160}
              priority
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
              style={{ display: "block", objectFit: "contain", opacity: 0.96 }}
            />
          </span>
        </Link>

        <div className="mb-8" onMouseEnter={() => setMenuHovered(true)}>
          <button
            type="button"
            className="cursor-pointer"
            style={{ background: "transparent" }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.6em",
                fontSize: 11.5,
                textTransform: "uppercase",
                WebkitTextStroke:
                  "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
              }}
            >
              M&nbsp;E&nbsp;N&nbsp;U
            </div>
          </button>
        </div>

        <LanguageSwitcher />
      </div>

      <OverlayMenu open={menuHovered} onClose={() => setMenuHovered(false)} />
    </>
  );
}
