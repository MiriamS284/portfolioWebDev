"use client";

import Link from "next/link";

export default function GardenCard({ entry }) {
  return (
    <Link
      href={`/garden/${entry.slug.current}`}
      className="group flex items-baseline gap-4 py-2 transition-colors"
    >
      {/* Title */}
      <span
        className="group-hover:text-[var(--accent)] transition-colors"
        style={{ color: "var(--ink)" }}
      >
        {entry.title}
      </span>

      {/* Subtle excerpt on larger screens */}
      {entry.excerpt && (
        <span
          className="hidden sm:inline text-sm truncate max-w-[200px]"
          style={{ color: "var(--muted)" }}
        >
          — {entry.excerpt}
        </span>
      )}

      {/* Arrow on hover */}
      <span
        className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity text-sm"
        style={{ color: "var(--muted)" }}
      >
        →
      </span>
    </Link>
  );
}
