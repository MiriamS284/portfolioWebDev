"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NameLabel() {
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
    <div
      className="hidden lg:block fixed left-3 top-4 sm:left-4 sm:top-5 md:left-6 md:top-6 z-40 select-none transition-opacity duration-300"
      style={{
        paddingLeft: "180px",
        opacity: scrolled ? 0 : 1,
        pointerEvents: scrolled ? "none" : "auto",
      }}
    >
      <Link href="/" className="group block">
        <span
          style={{
            color: "var(--ink)",
            fontWeight: 700,
            letterSpacing: "0.5em",
            fontSize: 11,
            textTransform: "uppercase",
            transition: "opacity 0.3s ease",
          }}
          className="group-hover:opacity-100 opacity-90"
        >
          MIRIAM SPARBROD
        </span>
      </Link>
    </div>
  );
}
