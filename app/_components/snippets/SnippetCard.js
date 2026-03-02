"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

// Helper function to safely get text (handles both string and object formats)
const getText = (field, locale) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    return field[locale] || field.de || field.en || "";
  }
  return "";
};

export default function SnippetCard({ snippet }) {
  const locale = useLocale();
  const slug = snippet.slug?.current;

  const title = getText(snippet.title, locale);
  const description = getText(snippet.description, locale);

  return (
    <Link
      href={`/snippets/${slug}`}
      className="group flex items-baseline gap-3 py-2 transition-colors"
    >
      {/* Icon */}
      {snippet.icon && (
        <span className="text-base flex-shrink-0">{snippet.icon}</span>
      )}

      {/* Title */}
      <span
        className="group-hover:text-[var(--accent)] transition-colors"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </span>

      {/* Subtle description on larger screens */}
      {description && (
        <span
          className="hidden sm:inline text-sm truncate max-w-[200px]"
          style={{ color: "var(--muted)" }}
        >
          — {description}
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
