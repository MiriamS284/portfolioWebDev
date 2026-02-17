"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

// Helper function to safely get text (handles both string and object formats)
const getText = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    return field[lang] || field.de || field.en || "";
  }
  return "";
};

export default function SnippetCard({ snippet }) {
  const { lang } = useLanguage();
  const slug = snippet.slug?.current;

  const title = getText(snippet.title, lang);
  const description = getText(snippet.description, lang);

  return (
    <Link
      href={`/snippets/${slug}`}
      className="group flex items-baseline gap-4 py-2 transition-colors"
    >
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
