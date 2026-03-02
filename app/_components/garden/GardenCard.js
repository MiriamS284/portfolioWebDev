"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function GardenCard({ entry }) {
  const locale = useLocale();

  const title = locale === "en" ? entry.title_en : entry.title_de;
  const excerpt = locale === "en" ? entry.excerpt_en : entry.excerpt_de;

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
        {title}
      </span>

      {/* Subtle excerpt on larger screens */}
      {excerpt && (
        <span
          className="hidden sm:inline text-sm truncate max-w-[200px]"
          style={{ color: "var(--muted)" }}
        >
          — {excerpt}
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
