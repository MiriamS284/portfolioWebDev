"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

const texts = {
  de: {
    back: "Zurück zu Snippets",
    copy: "Kopieren",
    copied: "Kopiert!",
    usage: "Verwendung",
    explanation: "Erklärung",
    dependencies: "Abhängigkeiten",
    related: "Verwandte Snippets",
  },
  en: {
    back: "Back to Snippets",
    copy: "Copy",
    copied: "Copied!",
    usage: "Usage",
    explanation: "Explanation",
    dependencies: "Dependencies",
    related: "Related Snippets",
  },
};

const difficultyLabels = {
  de: { beginner: "Einsteiger", intermediate: "Fortgeschritten", advanced: "Experte" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

export default function SnippetDetailClient({ snippet }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (snippet.code) {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <MenuDock />

      <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/snippets">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-4">
              {snippet.language && (
                <span
                  className="text-xs font-mono uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {snippet.language}
                </span>
              )}
              {snippet.difficulty && (
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  {difficultyLabels[lang]?.[snippet.difficulty] || snippet.difficulty}
                </span>
              )}
              {snippet.category && (
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  {snippet.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{snippet.title}</h1>

            {/* Description */}
            {snippet.description && (
              <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                {snippet.description}
              </p>
            )}

            {/* Tags */}
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {snippet.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono"
                    style={{ color: "var(--muted)", opacity: 0.7 }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Code Block */}
          {snippet.code && (
            <section className="mb-12">
              <div
                className="relative overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 text-xs font-mono px-3 py-1.5 transition-colors"
                  style={{
                    background: "var(--bg)",
                    color: copied ? "var(--accent)" : "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {copied ? t.copied : t.copy}
                </button>

                {/* Code */}
                <pre className="p-6 overflow-x-auto">
                  <code
                    className="text-sm font-mono leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    {snippet.code}
                  </code>
                </pre>
              </div>
            </section>
          )}

          {/* Explanation */}
          {snippet.explanation && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.explanation}</h2>
              <div
                className="prose prose-sm max-w-none leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                <p>{snippet.explanation}</p>
              </div>
            </section>
          )}

          {/* Usage */}
          {snippet.usage && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.usage}</h2>
              <pre
                className="p-4 overflow-x-auto text-sm font-mono"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--ink)",
                }}
              >
                {snippet.usage}
              </pre>
            </section>
          )}

          {/* Dependencies */}
          {snippet.dependencies && snippet.dependencies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.dependencies}</h2>
              <div className="flex flex-wrap gap-2">
                {snippet.dependencies.map((dep, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-mono px-3 py-1"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Related Snippets */}
          {snippet.relatedSnippets && snippet.relatedSnippets.length > 0 && (
            <section className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-semibold mb-6">{t.related}</h2>
              <div className="space-y-3">
                {snippet.relatedSnippets.map((related, idx) => (
                  <Link
                    key={idx}
                    href={`/snippets/${related.slug?.current}`}
                    className="group flex items-center gap-3"
                  >
                    <span
                      className="text-xs font-mono uppercase"
                      style={{ color: "var(--accent)", opacity: 0.8 }}
                    >
                      {related.language}
                    </span>
                    <span
                      className="text-sm font-medium transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--ink)" }}
                    >
                      {related.title}
                    </span>
                    <span
                      className="text-xs opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ color: "var(--muted)" }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
