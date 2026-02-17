"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import SnippetCard from "@/app/_components/snippets/SnippetCard";
import SnippetSidebar from "@/app/_components/snippets/SnippetSidebar";

const texts = {
  de: {
    label: "Code Snippets",
    title: "Snippets",
    subtitle:
      "Nützliche Code-Beispiele und Patterns aus meiner täglichen Arbeit.",
    back: "Zurück",
    noResults: "Keine Snippets gefunden.",
    showing: "Zeige",
    of: "von",
    snippets: "Snippets",
  },
  en: {
    label: "Code Snippets",
    title: "Snippets",
    subtitle: "Useful code examples and patterns from my daily work.",
    back: "Back",
    noResults: "No snippets found.",
    showing: "Showing",
    of: "of",
    snippets: "snippets",
  },
};

export default function SnippetsPageClient({ snippets }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");

  // Filter snippets
  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const categoryMatch =
        activeCategory === "all" || snippet.category === activeCategory;
      const languageMatch =
        activeLanguage === "all" || snippet.language === activeLanguage;
      const difficultyMatch =
        activeDifficulty === "all" || snippet.difficulty === activeDifficulty;
      return categoryMatch && languageMatch && difficultyMatch;
    });
  }, [snippets, activeCategory, activeLanguage, activeDifficulty]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeLanguage !== "all" ||
    activeDifficulty !== "all";

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <BackLink href="/">{t.back}</BackLink>

          <div className="mb-12">
            <div
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--muted)", opacity: 0.5 }}
            >
              {t.label}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg max-w-2xl" style={{ color: "var(--muted)" }}>
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <SnippetSidebar
              snippets={snippets}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
              activeDifficulty={activeDifficulty}
              setActiveDifficulty={setActiveDifficulty}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {hasActiveFilters && (
                <div
                  className="mb-6 pb-4 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {t.showing}{" "}
                    <span style={{ color: "var(--ink)" }}>
                      {filteredSnippets.length}
                    </span>{" "}
                    {t.of} {snippets.length} {t.snippets}
                  </p>
                </div>
              )}

              {/* Snippets List */}
              {filteredSnippets.length > 0 ? (
                <div
                  className="divide-y"
                  style={{ borderColor: "var(--border)" }}
                >
                  {filteredSnippets.map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-16 rounded-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p className="text-lg mb-2" style={{ color: "var(--muted)" }}>
                    {t.noResults}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setActiveLanguage("all");
                      setActiveDifficulty("all");
                    }}
                    className="text-sm underline underline-offset-2 transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--muted)" }}
                  >
                    {texts[lang].back === "Zurück"
                      ? "Filter zurücksetzen"
                      : "Clear filters"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
