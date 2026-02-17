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

function SnippetItem({ snippet, lang }) {
  // Handle bilingual content
  const title = typeof snippet.title === "object"
    ? snippet.title[lang] || snippet.title.de || snippet.title.en
    : snippet.title || "Untitled";

  const description = typeof snippet.description === "object"
    ? snippet.description[lang] || snippet.description.de || snippet.description.en
    : snippet.description || "";

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
