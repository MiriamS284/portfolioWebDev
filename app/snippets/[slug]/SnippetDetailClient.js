"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/sanity/portableText";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";
import CodeBlock from "@/app/_components/snippets/CodeBlock";
import MultiPanelCode from "@/app/_components/snippets/MultiPanelCode";
import LivePreview from "@/app/_components/snippets/LivePreview";
import RelatedSnippets from "@/app/_components/snippets/RelatedSnippets";

const texts = {
  de: {
    back: "Zurück zu Snippets",
    usage: "Verwendung",
    explanation: "Erklärung",
    dependencies: "Abhängigkeiten",
    installCommand: "Installation",
  },
  en: {
    back: "Back to Snippets",
    usage: "Usage",
    explanation: "Explanation",
    dependencies: "Dependencies",
    installCommand: "Installation",
  },
};

const difficultyConfig = {
  beginner: { color: "#22c55e", label: { de: "Einsteiger", en: "Beginner" } },
  intermediate: { color: "#f59e0b", label: { de: "Fortgeschritten", en: "Intermediate" } },
  advanced: { color: "#ef4444", label: { de: "Experte", en: "Advanced" } },
};

export default function SnippetDetailClient({ snippet }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  // Handle bilingual content
  const title = typeof snippet.title === "object"
    ? snippet.title[lang] || snippet.title.de || snippet.title.en
    : snippet.title;

  const description = typeof snippet.description === "object"
    ? snippet.description[lang] || snippet.description.de || snippet.description.en
    : snippet.description;

  const explanation = typeof snippet.explanation === "object"
    ? snippet.explanation[lang] || snippet.explanation.de || snippet.explanation.en
    : snippet.explanation;

  const difficulty = difficultyConfig[snippet.difficulty];

  // Determine if this is a multi-panel snippet
  const isMultiPanel = snippet.snippetType === "multi-panel" ||
    (snippet.htmlCode || snippet.cssCode || snippet.jsCode);

  // Show live preview if enabled and has multi-panel code
  const showPreview = snippet.showLivePreview && isMultiPanel;

  return (
    <>
      <MenuDock />

      <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/snippets">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
            {/* Meta Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              {/* Language Badge */}
              {snippet.language && (
                <span
                  className="text-xs font-mono uppercase px-3 py-1 rounded-lg"
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
                  className="text-xs font-mono px-3 py-1 rounded-lg"
                  style={{
                    color: "var(--muted)",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {snippet.category}
                </span>
              )}

              {/* Difficulty Badge */}
              {difficulty && (
                <span
                  className="text-xs font-mono px-3 py-1 rounded-lg"
                  style={{
                    color: difficulty.color,
                    background: `${difficulty.color}15`,
                    border: `1px solid ${difficulty.color}30`,
                  }}
                >
                  {difficulty.label[lang]}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

            {/* Description */}
            {description && (
              <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                {description}
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

          {/* Code Section */}
          <section className="mb-12">
            {isMultiPanel ? (
              <MultiPanelCode
                htmlCode={snippet.htmlCode}
                cssCode={snippet.cssCode}
                jsCode={snippet.jsCode}
              />
            ) : snippet.code ? (
              <CodeBlock
                code={snippet.code}
                language={snippet.language}
                showRawButton={true}
              />
            ) : null}
          </section>

          {/* Live Preview */}
          {showPreview && (
            <section className="mb-12">
              <LivePreview
                htmlCode={snippet.htmlCode}
                cssCode={snippet.cssCode}
                jsCode={snippet.jsCode}
              />
            </section>
          )}

          {/* Explanation */}
          {explanation && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.explanation}</h2>
              <div
                className="prose prose-sm max-w-none"
                style={{ color: "var(--muted)" }}
              >
                {Array.isArray(explanation) ? (
                  <PortableText value={explanation} components={portableTextComponents} />
                ) : (
                  <p className="leading-relaxed">{explanation}</p>
                )}
              </div>
            </section>
          )}

          {/* Usage Example */}
          {snippet.usage && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.usage}</h2>
              <CodeBlock
                code={snippet.usage}
                language={snippet.language || "javascript"}
                showLineNumbers={false}
              />
            </section>
          )}

          {/* Dependencies */}
          {snippet.dependencies && snippet.dependencies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.dependencies}</h2>

              {/* Install Command */}
              <div
                className="mb-4 p-4 rounded-xl font-mono text-sm"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--muted)" }}>$</span>{" "}
                <span style={{ color: "var(--ink)" }}>
                  npm install {snippet.dependencies.join(" ")}
                </span>
              </div>

              {/* Dependency List */}
              <div className="flex flex-wrap gap-2">
                {snippet.dependencies.map((dep, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-mono px-3 py-1.5 rounded-lg transition-colors hover:border-[var(--accent)]"
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
          <RelatedSnippets snippets={snippet.relatedSnippets} />
        </article>
      </main>

      <Footer />
    </>
  );
}
