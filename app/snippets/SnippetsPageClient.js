"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import SnippetCard from "@/app/_components/snippets/SnippetCard";

const texts = {
  de: {
    label: "Code Snippets",
    title: "Snippets",
    subtitle: "Nützliche Code-Beispiele und Patterns aus meiner täglichen Arbeit.",
    back: "Zurück",
    all: "Alle",
    filter: "Filter",
  },
  en: {
    label: "Code Snippets",
    title: "Snippets",
    subtitle: "Useful code examples and patterns from my daily work.",
    back: "Back",
    all: "All",
    filter: "Filter",
  },
};

export default function SnippetsPageClient({ snippets }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique languages for filter
  const languages = [...new Set(snippets.map((s) => s.language).filter(Boolean))];

  // Filter snippets
  const filteredSnippets =
    activeFilter === "all"
      ? snippets
      : snippets.filter((s) => s.language === activeFilter);

  return (
    <>
      <MenuDock />

      <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/">{t.back}</BackLink>

          {/* Header */}
          <div className="mb-12">
            <div
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--muted)", opacity: 0.5 }}
            >
              {t.label}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg" style={{ color: "var(--muted)" }}>
              {t.subtitle}
            </p>
          </div>

          {/* Filter */}
          {languages.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setActiveFilter("all")}
                className="text-xs font-mono px-3 py-1.5 transition-colors"
                style={{
                  color: activeFilter === "all" ? "var(--accent)" : "var(--muted)",
                  opacity: activeFilter === "all" ? 1 : 0.7,
                }}
              >
                {t.all}
              </button>
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => setActiveFilter(language)}
                  className="text-xs font-mono px-3 py-1.5 transition-colors"
                  style={{
                    color: activeFilter === language ? "var(--accent)" : "var(--muted)",
                    opacity: activeFilter === language ? 1 : 0.7,
                  }}
                >
                  {language}
                </button>
              ))}
            </div>
          )}

          {/* Snippets List */}
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>

          {filteredSnippets.length === 0 && (
            <p className="text-center py-12" style={{ color: "var(--muted)" }}>
              Keine Snippets gefunden.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
