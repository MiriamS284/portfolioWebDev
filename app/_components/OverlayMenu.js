"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function OverlayMenu({
  open,
  onClose,
  lang = "de",
  autoCloseMs = 6000, // 6s Inaktivität
}) {
  const firstLinkRef = useRef(null);
  const rootRef = useRef(null);

  // Esc + Fokus auf ersten Link
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => firstLinkRef.current?.focus?.());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
    };
  }, [open, onClose]);

  // Auto-Close bei Inaktivität
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    let t = setTimeout(onClose, autoCloseMs);
    const reset = () => {
      clearTimeout(t);
      t = setTimeout(onClose, autoCloseMs);
    };
    const el = rootRef.current || document;
    el.addEventListener("mousemove", reset);
    el.addEventListener("keydown", reset);
    el.addEventListener("click", reset);
    el.addEventListener("focusin", reset);
    return () => {
      clearTimeout(t);
      el.removeEventListener("mousemove", reset);
      el.removeEventListener("keydown", reset);
      el.removeEventListener("click", reset);
      el.removeEventListener("focusin", reset);
    };
  }, [open, onClose, autoCloseMs]);

  const L = {
    about: lang === "de" ? "Über mich" : "About me",
    cases: "Case Studies",
    casesSub: "Prod & Dev Mode",
    garden: lang === "de" ? "Digitaler Garden" : "Digital Garden",
    contact: lang === "de" ? "Kontakt" : "Contact",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md"
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.06 } }}
            exit={{ y: 20, opacity: 0 }}
            className="relative z-[81] mx-auto max-w-5xl px-6 py-12 md:py-16"
          >
            <div className="flex items-center justify-between text-[var(--ink)]">
              <div
                className="text-xs tracking-[0.5em] uppercase opacity-80"
                aria-hidden
              >
                M&nbsp;E&nbsp;N&nbsp;U
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded px-3 py-1 text-sm ring-1 ring-[color-mix(in oklch,var(--ink),transparent_80%)] hover:bg-white/5"
              >
                Esc
              </button>
            </div>

            <nav className="mt-10 space-y-7 md:space-y-9">
              {/* Über mich */}
              <MenuLink href="/about" refEl={firstLinkRef} onClose={onClose}>
                {L.about}
              </MenuLink>

              {/* Case Studies + Sub */}
              <div>
                <MenuLink href="/projects" onClose={onClose}>
                  {L.cases}
                </MenuLink>
                <div className="mt-2 text-sm opacity-70 tracking-wide">
                  {L.casesSub}
                </div>
              </div>

              {/* Digitaler Garden + (Blog) */}
              <div>
                <MenuLink href="/garden" onClose={onClose}>
                  {L.garden}
                </MenuLink>
                <div className="mt-2 text-sm opacity-70 tracking-wide">
                  {L.gardenSub}
                </div>
              </div>

              {/* Kontakt UNTER dem Garden-Block */}
              <MenuLink href="/contact" onClose={onClose}>
                {L.contact}
              </MenuLink>
            </nav>
          </motion.div>

          <style>{`
            .menu-link {
              display: inline-block;
              font-weight: 700;
              letter-spacing: .02em;
              color: var(--ink);
              font-size: clamp(28px, 5vw, 56px);
              line-height: 1.05;
              position: relative;
            }
            .menu-link .underline-outer,
            .menu-link .underline-inner {
              position: absolute; left: 0; height: 2px; transform-origin: left center;
              transform: scaleX(.28);
              transition: transform 260ms cubic-bezier(.2,.7,0,1);
            }
            .menu-link .underline-outer { top: 100%; width: 100%; background: color-mix(in oklch, var(--ink), transparent 75%); }
            .menu-link .underline-inner { top: calc(100% + 6px); width: 68%; background: color-mix(in oklch, var(--ink), transparent 82%); }
            .menu-link:hover { transform: translateX(4px); transition: transform 220ms cubic-bezier(.2,.7,0,1) }
            .menu-link:hover .underline-outer { transform: scaleX(1) }
            .menu-link:hover .underline-inner { transform: scaleX(1) }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuLink({ href, children, onClose, refEl }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="menu-link focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in oklch,var(--ink),transparent_65%)] rounded"
      ref={refEl}
    >
      <span>{children}</span>
      <span className="underline-outer" aria-hidden />
      <span className="underline-inner" aria-hidden />
    </Link>
  );
}
