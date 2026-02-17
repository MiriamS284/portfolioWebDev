"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import SnippetCard from "@/app/_components/snippets/SnippetCard";

const texts = {
  de: {
    title: "Snippets",
    subtitle: "Code-Beispiele und Patterns aus meiner Arbeit.",
    back: "Index",
  },
  en: {
    title: "Snippets",
    subtitle: "Code examples and patterns from my work.",
    back: "Index",
  },
};

export default function SnippetsPageClient({ snippets }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  // Group snippets by language for subtle organization
  const groupedByLanguage = snippets.reduce((acc, snippet) => {
    const language = snippet.language || "Other";
    if (!acc[language]) acc[language] = [];
    acc[language].push(snippet);
    return acc;
  }, {});

  // Sort languages alphabetically
  const sortedLanguages = Object.keys(groupedByLanguage).sort();

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <BackLink href="/">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-16">
            <h1 className="text-2xl font-semibold mb-3">{t.title}</h1>
            <p className="text-base" style={{ color: "var(--muted)" }}>
              {t.subtitle}
            </p>
          </header>

          {/* Snippets grouped by language */}
          <div className="space-y-12">
            {sortedLanguages.map((language) => (
              <section key={language}>
                <h2
                  className="text-sm font-medium mb-4 pb-2 border-b"
                  style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                >
                  {language}
                </h2>
                <div className="space-y-1">
                  {groupedByLanguage[language].map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
