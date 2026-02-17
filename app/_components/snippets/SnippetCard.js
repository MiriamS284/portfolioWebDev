"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const difficultyConfig = {
  beginner: { color: "#22c55e", label: { de: "Einsteiger", en: "Beginner" } },
  intermediate: { color: "#f59e0b", label: { de: "Fortgeschritten", en: "Intermediate" } },
  advanced: { color: "#ef4444", label: { de: "Experte", en: "Advanced" } },
};

const snippetTypeConfig = {
  single: { icon: "", label: { de: "Single", en: "Single" } },
  "multi-panel": { icon: "", label: { de: "Multi-Panel", en: "Multi-Panel" } },
};

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

  // Handle both simple strings and bilingual objects
  const title = getText(snippet.title, lang);
  const description = getText(snippet.description, lang);

  const difficulty = difficultyConfig[snippet.difficulty];
  const snippetType = snippetTypeConfig[snippet.snippetType];

  return (
    <Link href={`/snippets/${slug}`} className="group block py-6">
      {/* Meta Row */}
      <div className="flex items-center flex-wrap gap-2 mb-2">
        {/* Language Badge */}
        {snippet.language && (
          <span
            className="text-xs font-mono uppercase px-2 py-0.5 rounded"
            style={{
              color: "var(--accent)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {snippet.language}
          </span>
        )}

        {/* Category Badge */}
        {snippet.category && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              color: "var(--muted)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {snippet.category}
          </span>
        )}

        {/* Snippet Type Badge */}
        {snippetType && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              color: "var(--muted)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {snippetType.icon} {snippetType.label[lang]}
          </span>
        )}

        {/* Difficulty Badge */}
        {difficulty && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              color: difficulty.color,
              background: `${difficulty.color}15`,
              border: `1px solid ${difficulty.color}30`,
            }}
          >
            {difficulty.label[lang]}
          </span>
        )}

        {/* Featured Badge */}
        {snippet.featured && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              color: "var(--accent-strong)",
              background: "var(--accent)15",
              border: "1px solid var(--accent)30",
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold mb-2 transition-colors group-hover:text-[var(--accent)]"
        style={{ color: "var(--ink)" }}
      >
        {title}
        <span
          className="inline-block ml-2 opacity-0 group-hover:opacity-60 transition-all duration-200 group-hover:translate-x-1"
          style={{ color: "var(--muted)" }}
        >

        </span>
      </h3>

      {/* Description */}
      {description && (
        <p
          className="text-sm leading-relaxed mb-3 line-clamp-2"
          style={{ color: "var(--muted)" }}
        >
          {description}
        </p>
      )}

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {snippet.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-mono"
              style={{ color: "var(--muted)", opacity: 0.6 }}
            >
              #{tag}
            </span>
          ))}
          {snippet.tags.length > 4 && (
            <span
              className="text-xs font-mono"
              style={{ color: "var(--muted)", opacity: 0.4 }}
            >
              +{snippet.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
