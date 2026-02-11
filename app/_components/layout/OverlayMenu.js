"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../../_context/LanguageProvider";

function MobileLanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("de")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: lang === "de" ? "var(--accent)" : "transparent",
          color: lang === "de" ? "var(--bg)" : "var(--ink)",
          opacity: lang === "de" ? 1 : 0.5,
          border: lang === "de" ? "none" : "1px solid var(--border)",
        }}
      >
        DE
      </button>
      <button
        onClick={() => setLang("en")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: lang === "en" ? "var(--accent)" : "transparent",
          color: lang === "en" ? "var(--bg)" : "var(--ink)",
          opacity: lang === "en" ? 1 : 0.5,
          border: lang === "en" ? "none" : "1px solid var(--border)",
        }}
      >
        EN
      </button>
    </div>
  );
}

export default function OverlayMenu({ open, onClose, autoCloseMs = 8000 }) {
  const { lang } = useLanguage();
  const firstLinkRef = useRef(null);
  const rootRef = useRef(null);

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
    about: lang === "de" ? "Über mich" : "About",
    projects: lang === "de" ? "Projekte" : "Projects",
    projectsSub:
      lang === "de" ? "Case Studies & Arbeiten" : "Case Studies & Work",
    garden: lang === "de" ? "Digital Garden" : "Digital Garden",
    gardenSub: lang === "de" ? "Gedanken die wachsen" : "Growing thoughts",
    blog: "Case - Studies & Tutorials",
    blogSub: lang === "de" ? "Artikel & Tutorials" : "Articles & Tutorials",
    snippets: "Code Snippets",
    snippetsSub:
      lang === "de"
        ? "Wiederverwendbare Code-Beispiele"
        : "Reusable code examples",
    contact: lang === "de" ? "Kontakt" : "Contact",
    contactSub:
      lang === "de"
        ? "Lass uns über eine Zusammenarbeit sprechen"
        : "Let's work together",
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
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-lg"
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.08 } }}
            exit={{ y: 20, opacity: 0 }}
            className="relative z-[81] mx-auto max-w-5xl px-6 py-12 md:py-16"
          >
            <div className="flex items-center justify-between text-[var(--ink)]">
              <div className="lg:hidden">
                <MobileLanguageSwitcher />
              </div>

              <div
                className="text-xs tracking-[0.5em] uppercase opacity-70 hidden lg:block"
                aria-hidden
              >
                M&nbsp;E&nbsp;N&nbsp;U
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 active:bg-white/15"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
                aria-label="Menü schließen"
              >
                <span className="hidden lg:inline">Schließen (Esc)</span>
                <span className="lg:hidden flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </span>
              </button>
            </div>

            <nav className="mt-12 space-y-8 md:space-y-10">
              <MenuLink href="/" refEl={firstLinkRef} onClose={onClose}>
                {L.home}
              </MenuLink>

              <MenuLink href="/about" onClose={onClose}>
                {L.about}
              </MenuLink>

              <div>
                <MenuLink href="/projects" onClose={onClose}>
                  {L.projects}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {L.projectsSub}
                </div>
              </div>

              <div>
                <MenuLink href="/garden" onClose={onClose}>
                  {L.garden}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {L.gardenSub}
                </div>
              </div>

              <div>
                <MenuLink href="/case-studies" onClose={onClose}>
                  {L.blog}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {L.blogSub}
                </div>
              </div>

              <div>
                <MenuLink href="/snippets" onClose={onClose}>
                  {L.snippets}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {L.snippetsSub}
                </div>
              </div>

              <div>
                <MenuLink href="/contact" onClose={onClose}>
                  {L.contact}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {L.contactSub}
                </div>
              </div>
            </nav>
          </motion.div>

          <style jsx>{`
            .menu-link {
              display: inline-block;
              font-weight: 700;
              letter-spacing: -0.01em;
              color: var(--ink);
              font-size: clamp(32px, 5.5vw, 64px);
              line-height: 1.05;
              position: relative;
              transition: all 0.3s cubic-bezier(0.2, 0.7, 0, 1);
            }
            .menu-link::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -8px;
              width: 0;
              height: 3px;
              background: var(--accent);
              transition: width 0.4s cubic-bezier(0.2, 0.7, 0, 1);
            }
            .menu-link:hover {
              color: var(--accent-strong);
              transform: translateX(8px);
            }
            .menu-link:hover::after {
              width: 60%;
            }
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
      className="menu-link focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
      ref={refEl}
    >
      {children}
    </Link>
  );
}
