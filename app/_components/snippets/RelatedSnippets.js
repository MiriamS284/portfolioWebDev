"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

const texts = {
  de: { title: "Verwandte Snippets" },
  en: { title: "Related Snippets" },
};

const getText = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    return field[lang] || field.de || field.en || "";
  }
  return "";
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
      <h2
        className="text-sm font-medium mb-4 pb-2"
        style={{ color: "var(--muted)" }}
      >
        {t.title}
      </h2>

      <div className="space-y-1">
        {snippets.map((snippet) => {
          const slug = snippet.slug?.current;
          const title = getText(snippet.title, lang);

          return (
            <Link
              key={snippet._id}
              href={`/snippets/${slug}`}
              className="group flex items-center gap-3 py-2 transition-colors"
            >
              <span
                className="text-sm font-mono"
                style={{ color: "var(--muted)" }}
              >
                {snippet.language}
              </span>
              <span
                className="group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--ink)" }}
              >
                {title}
              </span>
              <span
                className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity text-sm"
                style={{ color: "var(--muted)" }}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
