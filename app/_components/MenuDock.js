"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* ---------- Einzelne Sprach-Option mit Twin-Underline ---------- */
function LangOption({ code, label, active, onHover, onLeave, onSelect }) {
  const [isHover, setIsHover] = useState(false);

  const enter = () => {
    setIsHover(true);
    onHover?.(code);
  };
  const leave = () => {
    setIsHover(false);
    onLeave?.();
  };

  const s1 = active || isHover ? 1 : 0.35; // obere Linie
  const s2 = active || isHover ? 1 : 0.2; // untere kürzere Linie

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active ? "true" : "false"}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={() => onSelect?.(code)}
      className="relative px-1 py-1"
      style={{
        color: "var(--ink)",
        fontWeight: 600,
        textTransform: "uppercase",
        WebkitTextStroke:
          "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
        fontSize: 12,
        letterSpacing: "0.35em",
        transition: "opacity .18s ease",
        opacity: active ? 1 : 0.9,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: label }} />

      {/* Twin underline */}
      <span
        aria-hidden
        className="absolute left-0 right-0"
        style={{ bottom: -6, height: 10 }}
      >
        <span
          style={{
            display: "block",
            width: "100%",
            height: 2,
            background: "color-mix(in oklch, var(--ink), transparent 60%)",
            transform: `scaleX(${s1})`,
            transformOrigin: "left center",
            transition: "transform 220ms cubic-bezier(.2,.7,0,1)",
            opacity: 0.95,
          }}
        />
        <span style={{ display: "block", height: 6 }} />
        <span
          style={{
            display: "block",
            width: "66%",
            height: 2,
            background: "color-mix(in oklch, var(--ink), transparent 72%)",
            transform: `scaleX(${s2})`,
            transformOrigin: "left center",
            transition: "transform 260ms cubic-bezier(.2,.7,0,1)",
            opacity: 0.85,
          }}
        />
      </span>
    </button>
  );
}

/* ---------- Language Inline Switcher (steht direkt unter MENU) ---------- */
function LanguageInlineSwitcher({ initial = "de", onChange }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);

  // initial aus localStorage (ohne setState im Effect)
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "de") return saved;
    }
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    onChange?.(lang);
  }, [lang, onChange]);

  const ink = useMemo(() => "var(--ink)", []);

  return (
    <div
      className="relative mt-6"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Vertikaler Handle: LANGUAGE */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-pointer"
        style={{ background: "transparent" }}
      >
        <span
          style={{
            display: "inline-block",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            color: ink,
            fontWeight: 600,
            textTransform: "uppercase",
            WebkitTextStroke:
              "0.35px color-mix(in oklch, var(--bg), transparent 40%)",
            fontSize: 11.5,
            letterSpacing: "0.5em",
          }}
        >
          L&nbsp;A&nbsp;N&nbsp;G&nbsp;U&nbsp;A&nbsp;G&nbsp;E
        </span>
      </button>

      {/* Horizontaler Picker rechts vom Handle */}
      {open && (
        <div
          role="menu"
          aria-label="Sprache auswählen"
          className="absolute top-1 left-[72px] flex items-center gap-4"
          style={{ color: ink }}
        >
          <LangOption
            code="en"
            label="E&nbsp;N&nbsp;G"
            active={lang === "en"}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onSelect={setLang}
          />
          <span
            aria-hidden
            style={{
              width: 18,
              height: 1,
              background: "color-mix(in oklch, var(--ink), transparent 70%)",
            }}
          />
          <LangOption
            code="de"
            label="D&nbsp;E&nbsp;U"
            active={lang === "de"}
            onHover={setHover}
            onLeave={() => setHover(null)}
            onSelect={setLang}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- MenuDock (Logo, MENU, LANGUAGE) ---------- */
export default function MenuDock({
  onOpenMenu,
  logoSrc = "/logo_light.png",
  offsetTop = 24,
}) {
  const dockRef = useRef(null);
  const logoRef = useRef(null);
  const [menuHover, setMenuHover] = useState(false); // ersetzt styled-jsx Hover

  // Magnetic Hover fürs Logo (performant – kein State nötig)
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxPull = 10;
      const pull = Math.max(0, 1 - Math.min(dist / 240, 1));
      tx = (dx / 240) * maxPull * pull;
      ty = (dy / 240) * maxPull * pull;
    };

    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ink = useMemo(() => "var(--ink)", []);
  const border = useMemo(
    () => "color-mix(in oklch, var(--ink), transparent 82%)",
    []
  );

  const handleOpen = () => {
    onOpenMenu?.();
  };

  return (
    <>
      <div
        ref={dockRef}
        className="fixed z-50 select-none"
        style={{ left: 16, top: offsetTop }}
      >
        {/* Logo (größer) */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Menü öffnen"
          className="relative block"
          style={{ background: "transparent" }}
        >
          <span
            ref={logoRef}
            className="inline-block will-change-transform"
            style={{
              display: "inline-block",
              filter: "drop-shadow(0 8px 28px rgba(0,0,0,.35))",
            }}
          >
            <Image
              src={logoSrc}
              alt=""
              width={180}
              height={180}
              priority
              style={{
                display: "block",
                objectFit: "contain",
                opacity: 0.96,
              }}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={handleOpen}
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
          onFocus={() => setMenuHover(true)}
          onBlur={() => setMenuHover(false)}
          className="mt-4 cursor-pointer"
          aria-label="Menü öffnen"
          style={{ background: "transparent" }}
        >
          <div
            style={{
              color: ink,
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
                background: border,
                transform: `scaleX(${menuHover ? 1 : 0.35})`,
                transformOrigin: "left center",
                transition: "transform 300ms cubic-bezier(.2,.7,0,1)",
              }}
            />
            <span
              aria-hidden
              className="absolute left-0 h-[2px]"
              style={{
                top: 10,
                width: "70%",
                background: border,
                transform: `scaleX(${menuHover ? 1 : 0.2})`,
                transformOrigin: "left center",
                transition: "transform 360ms cubic-bezier(.2,.7,0,1)",
              }}
            />
          </div>
        </button>

        {/* LANGUAGE direkt darunter */}
        <LanguageInlineSwitcher initial="de" />
      </div>

      {/* Reduced motion safeguard */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important }
        }
      `}</style>
    </>
  );
}
