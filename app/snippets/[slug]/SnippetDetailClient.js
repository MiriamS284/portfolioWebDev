"use client";

import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/sanity/portableText";
import { urlFor } from "@/lib/sanity/image";
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
    preview: "Vorschau",
  },
  en: {
    back: "Back to Snippets",
    usage: "Usage",
    explanation: "Explanation",
    dependencies: "Dependencies",
    installCommand: "Installation",
    preview: "Preview",
  },
};

const difficultyConfig = {
  beginner: { color: "#22c55e", label: { de: "Einsteiger", en: "Beginner" } },
  intermediate: { color: "#f59e0b", label: { de: "Fortgeschritten", en: "Intermediate" } },
  advanced: { color: "#ef4444", label: { de: "Experte", en: "Advanced" } },
};

// Helper function to safely get text (handles both string and object formats)
const getText = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    // Check if it's an array (Portable Text)
    if (Array.isArray(field)) return field;
    return field[lang] || field.de || field.en || "";
  }
  return "";
};

// Helper function to extract code from Sanity's code field type
// Sanity code plugin stores: { _type: "code", language: "jsx", code: "..." }
const getCodeContent = (codeField) => {
  if (!codeField) return { code: "", language: "" };
  if (typeof codeField === "string") return { code: codeField, language: "" };
  if (typeof codeField === "object" && codeField !== null) {
    return {
      code: codeField.code || "",
      language: codeField.language || "",
    };
  }
  return { code: "", language: "" };
};

export default function SnippetDetailClient({ snippet }) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;

  // Handle both simple strings and bilingual objects
  const title = getText(snippet.title, lang);
  const description = getText(snippet.description, lang);
  const explanation = getText(snippet.explanation, lang);

  // Extract code from Sanity's code field type
  const mainCode = getCodeContent(snippet.code);
  const usageCode = getCodeContent(snippet.usage);

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

          {/* Preview Image (optional) */}
          {snippet.previewImage?.asset && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.preview}</h2>
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src={urlFor(snippet.previewImage).width(1200).url()}
                  alt={`${title} - Preview`}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
              </div>
            </section>
          )}

          {/* Code Section */}
          <section className="mb-12">
            {isMultiPanel ? (
              <MultiPanelCode
                htmlCode={snippet.htmlCode}
                cssCode={snippet.cssCode}
                jsCode={snippet.jsCode}
              />
            ) : mainCode.code ? (
              <CodeBlock
                code={mainCode.code}
                language={mainCode.language || snippet.language}
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
          {usageCode.code && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">{t.usage}</h2>
              <CodeBlock
                code={usageCode.code}
                language={usageCode.language || snippet.language || "javascript"}
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
