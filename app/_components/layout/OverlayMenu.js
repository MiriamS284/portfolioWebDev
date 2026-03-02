"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { MobileThemeSwitcher } from "./ThemeSwitcher";

function MobileLanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLocale("de")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: locale === "de" ? "var(--accent)" : "transparent",
          color: locale === "de" ? "var(--bg)" : "var(--ink)",
          opacity: locale === "de" ? 1 : 0.5,
          border: locale === "de" ? "none" : "1px solid var(--border)",
        }}
      >
        DE
      </button>
      <button
        onClick={() => switchLocale("en")}
        className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
        style={{
          background: locale === "en" ? "var(--accent)" : "transparent",
          color: locale === "en" ? "var(--bg)" : "var(--ink)",
          opacity: locale === "en" ? 1 : 0.5,
          border: locale === "en" ? "none" : "1px solid var(--border)",
        }}
      >
        EN
      </button>
    </div>
  );
}

export default function OverlayMenu({ open, onClose, autoCloseMs = 8000 }) {
  const t = useTranslations("menu");
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
    let timer = setTimeout(onClose, autoCloseMs);
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(onClose, autoCloseMs);
    };
    const el = rootRef.current || document;
    el.addEventListener("mousemove", reset);
    el.addEventListener("keydown", reset);
    el.addEventListener("click", reset);
    el.addEventListener("focusin", reset);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("mousemove", reset);
      el.removeEventListener("keydown", reset);
      el.removeEventListener("click", reset);
      el.removeEventListener("focusin", reset);
    };
  }, [open, onClose, autoCloseMs]);

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
              <div className="lg:hidden flex items-center gap-4">
                <MobileLanguageSwitcher />
                <MobileThemeSwitcher />
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
                className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                aria-label={t("closeMenu")}
              >
                <span className="hidden lg:inline">
                  {t("close")}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <nav className="mt-12 space-y-8 md:space-y-10">
              <MenuLink href="/" refEl={firstLinkRef} onClose={onClose}>
                Home
              </MenuLink>

              <MenuLink href="/about" onClose={onClose}>
                {t("about")}
              </MenuLink>

              <div>
                <MenuLink href="/projects" onClose={onClose}>
                  {t("projects")}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {t("projectsSub")}
                </div>
              </div>

              <div>
                <MenuLink href="/garden" onClose={onClose}>
                  {t("garden")}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {t("gardenSub")}
                </div>
              </div>

              <div>
                <MenuLink href="/case-studies" onClose={onClose}>
                  {t("blog")}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {t("blogSub")}
                </div>
              </div>

              <div>
                <MenuLink href="/snippets" onClose={onClose}>
                  {t("snippets")}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {t("snippetsSub")}
                </div>
              </div>

              <div>
                <MenuLink href="/contact" onClose={onClose}>
                  {t("contact")}
                </MenuLink>
                <div className="mt-2 text-sm opacity-60 tracking-wide">
                  {t("contactSub")}
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
