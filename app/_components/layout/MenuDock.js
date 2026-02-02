"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import OverlayMenu from "./OverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MenuDock({
  top = 24,
  logoSrc = "/logo_light.png",
  showLanguage = true,
}) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lang");
        if (saved === "en" || saved === "de") return saved;
      } catch {}
    }
    return "de";
  });
  const logoRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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

  return (
    <>
      <div
        className="fixed left-4 z-50 select-none"
        style={{ top }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <button
          type="button"
          aria-label="Menü öffnen"
          onClick={() => setOpen(true)}
          style={{ background: "transparent" }}
        >
          <span
            ref={logoRef}
            className="inline-block will-change-transform"
            style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,.35))" }}
          >
            <Image
              src={logoSrc}
              alt="Logo"
              width={200}
              height={200}
              priority
              style={{ display: "block", objectFit: "contain", opacity: 0.96 }}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-1 cursor-pointer"
          aria-label="Menü öffnen"
          style={{ background: "transparent" }}
        >
          <div
            style={{
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
          <div className="relative mt-2 h-[16px] w-[128px]">
            <span
              aria-hidden
              className="absolute left-0 right-0 h-[2px]"
              style={{
                top: 0,
                background: "color-mix(in oklch, var(--ink), transparent 75%)",
                transformOrigin: "left center",
              }}
            />
            <span
              aria-hidden
              className="absolute left-0 h-[2px]"
              style={{
                top: 10,
                width: "70%",
                background: "color-mix(in oklch, var(--ink), transparent 82%)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </button>

        {showLanguage && <LanguageSwitcher value={lang} onChange={setLang} />}
      </div>

      <OverlayMenu open={open} onClose={() => setOpen(false)} lang={lang} />
    </>
  );
}
