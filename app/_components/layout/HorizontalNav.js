"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/_context/LanguageProvider";

const content = {
  de: {
    links: [
      { label: "ÜBER MICH", href: "/about" },
      { label: "PROJEKTE", href: "/projects" },
      { label: "CASE STUDIES", href: "/blog" },
    ],
  },
  en: {
    links: [
      { label: "ABOUT", href: "/about" },
      { label: "PROJECTS", href: "/projects" },
      { label: "CASE STUDIES", href: "/blog" },
    ],
  },
};

export default function HorizontalNav() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const t = content[lang] || content.de;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="hidden lg:block fixed top-4 left-0 right-0 sm:top-5 md:top-6 z-40 pointer-events-none transition-opacity duration-300"
      style={{
        paddingLeft: "200px",
        paddingRight: "24px",
        opacity: scrolled ? 0 : 1,
      }}
    >
      <div
        className="flex items-center justify-end gap-12"
        style={{
          pointerEvents: scrolled ? "none" : "auto",
        }}
      >
        {t.links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group transition-opacity hover:opacity-100"
              style={{
                opacity: isActive ? 1 : 0.9,
              }}
            >
              <span
                style={{
                  color: isActive ? "var(--accent)" : "var(--ink)",
                  fontWeight: 700,
                  letterSpacing: "0.5em",
                  fontSize: 11,
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
