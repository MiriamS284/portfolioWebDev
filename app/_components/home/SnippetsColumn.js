"use client";

import Link from "next/link";

const texts = {
  de: {
    title: "Code-Fragmente",
    viewAll: "Alle Code-Fragmente",
  },
  en: {
    title: "Snippets",
    viewAll: "All snippets",
  },
};

const difficultyLabel = {
  beginner: { icon: "", color: "#22c55e" },
  intermediate: { icon: "", color: "#f59e0b" },
  advanced: { icon: "", color: "#ef4444" },
};

export default function SnippetsColumn({ snippets = [], lang = "de" }) {
  const t = texts[lang] || texts.de;

  return (
    <div>
      <h2 className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        {t.title}
      </h2>

      {/* List */}
      <div className="space-y-5">
        {snippets.slice(0, 4).map((snippet) => (
          <SnippetItem key={snippet._id} snippet={snippet} lang={lang} />
        ))}

        {/* View All Link */}
        <Link href="/snippets" className="group inline-block">
          <span
            className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--ink)" }}
          >
            {t.viewAll}
          </span>
        </Link>
      </div>
    </div>
  );
}

// Helper function to safely get text (handles both string and object formats)
const getText = (field, lang, fallback = "") => {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    return field[lang] || field.de || field.en || fallback;
  }
  return fallback;
};

function SnippetItem({ snippet, lang }) {
  // Handle both simple strings and bilingual objects
  const title = getText(snippet.title, lang, "Untitled");
  const description = getText(snippet.description, lang, "");

  const slug = snippet.slug?.current;
  const language = snippet.language || "";

  return (
    <Link href={`/snippets/${slug}`} className="group block">
      <div className="flex items-center gap-1">
        {language && (
          <span
            className="text-xs font-mono mr-1"
            style={{ color: "var(--accent)", opacity: 0.8 }}
          >
            {language}
          </span>
        )}
        <span
          className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </span>
        <span
          className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "var(--muted)" }}
        >

        </span>
      </div>
      {description && (
        <p
          className="text-sm mt-1 leading-relaxed line-clamp-2"
          style={{ color: "var(--muted)" }}
        >
          {description}
        </p>
      )}
    </Link>
  );
}
