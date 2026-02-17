"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const texts = {
  de: {
    title: "Verwandte Snippets",
  },
  en: {
    title: "Related Snippets",
  },
};

const difficultyConfig = {
  beginner: { color: "#22c55e", label: { de: "Einsteiger", en: "Beginner" } },
  intermediate: { color: "#f59e0b", label: { de: "Fortgeschritten", en: "Intermediate" } },
  advanced: { color: "#ef4444", label: { de: "Experte", en: "Advanced" } },
};

export default function RelatedSnippets({ snippets }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  if (!snippets || snippets.length === 0) {
    return null;
  }

  return (
    <section
      className="pt-8 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <h2 className="text-xl font-semibold mb-6">{t.title}</h2>

      {/* Grid on Desktop, Horizontal Scroll on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <RelatedSnippetCard key={snippet._id} snippet={snippet} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function RelatedSnippetCard({ snippet, lang }) {
  const slug = snippet.slug?.current;

  // Handle bilingual content
  const title = typeof snippet.title === "object"
    ? snippet.title[lang] || snippet.title.de || snippet.title.en
    : snippet.title;

  const difficulty = difficultyConfig[snippet.difficulty];

  return (
    <Link
      href={`/snippets/${slug}`}
      className="group block p-4 rounded-xl transition-all hover:translate-y-[-2px]"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Meta Row */}
      <div className="flex items-center gap-2 mb-2">
        {snippet.language && (
          <span
            className="text-xs font-mono uppercase"
            style={{ color: "var(--accent)" }}
          >
            {snippet.language}
          </span>
        )}
        {snippet.category && (
          <span
            className="text-xs font-mono"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {snippet.category}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-sm font-medium mb-2 line-clamp-2 transition-colors group-hover:text-[var(--accent)]"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h3>

      {/* Difficulty */}
      {difficulty && (
        <span
          className="inline-block text-xs font-mono px-2 py-0.5 rounded"
          style={{
            color: difficulty.color,
            background: `${difficulty.color}15`,
          }}
        >
          {difficulty.label[lang]}
        </span>
      )}
    </Link>
  );
}
