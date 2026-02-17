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
    back: "Snippets",
    usage: "Verwendung",
    explanation: "Erklärung",
    dependencies: "Abhängigkeiten",
  },
  en: {
    back: "Snippets",
    usage: "Usage",
    explanation: "Explanation",
    dependencies: "Dependencies",
  },
};

// Helper function to safely get text (handles both string and object formats)
const getText = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    if (Array.isArray(field)) return field;
    return field[lang] || field.de || field.en || "";
  }
  return "";
};

// Helper function to extract code from Sanity's code field type
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

  const title = getText(snippet.title, lang);
  const description = getText(snippet.description, lang);
  const explanation = getText(snippet.explanation, lang);

  const mainCode = getCodeContent(snippet.code);
  const usageCode = getCodeContent(snippet.usage);

  const isMultiPanel =
    snippet.snippetType === "multi-panel" ||
    (snippet.htmlCode || snippet.cssCode || snippet.jsCode);

  const showPreview = snippet.showLivePreview && isMultiPanel;

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/snippets">{t.back}</BackLink>

          {/* Header */}
          <header className="mb-12">
            {/* Meta line */}
            <div
              className="text-sm mb-4 font-mono"
              style={{ color: "var(--muted)" }}
            >
              {snippet.language}
              {snippet.category && ` · ${snippet.category}`}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h1>

            {/* Description */}
            {description && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {description}
              </p>
            )}
          </header>

          {/* Preview Image */}
          {snippet.previewImage?.asset && (
            <section className="mb-12">
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <Image
                  src={urlFor(snippet.previewImage).width(1200).url()}
                  alt={title}
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
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t.explanation}
              </h2>
              <div className="prose prose-sm max-w-none leading-relaxed">
                {Array.isArray(explanation) ? (
                  <PortableText
                    value={explanation}
                    components={portableTextComponents}
                  />
                ) : (
                  <p style={{ color: "var(--muted)" }}>{explanation}</p>
                )}
              </div>
            </section>
          )}

          {/* Usage Example */}
          {usageCode.code && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t.usage}
              </h2>
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
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t.dependencies}
              </h2>

              <div
                className="p-4 rounded-lg font-mono text-sm"
                style={{ background: "var(--surface)" }}
              >
                <span style={{ color: "var(--muted)" }}>$</span>{" "}
                npm install {snippet.dependencies.join(" ")}
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
