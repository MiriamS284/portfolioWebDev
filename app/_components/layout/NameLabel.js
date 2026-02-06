"use client";

import Link from "next/link";

export default function NameLabel() {
  return (
    <div
      className="fixed left-3 top-4 sm:left-4 sm:top-5 md:left-6 md:top-6 z-50 select-none"
      style={{
        paddingLeft: "180px",
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
            opacity: 0.9,
            transition: "opacity 0.3s ease",
          }}
          className="group-hover:opacity-100"
        >
          MIRIAM SPARBROD
        </span>
      </Link>
    </div>
  );
}
