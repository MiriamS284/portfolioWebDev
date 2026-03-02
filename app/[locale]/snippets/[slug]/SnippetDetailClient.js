"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { urlFor } from "@/lib/sanity/image";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import BackLink from "@/app/_components/shared/BackLink";

// Category labels
const categoryLabels = {
  "react-hooks": "React Hooks",
  components: "Components",
  forms: "Forms & Validation",
  pdf: "PDF Generation",
  api: "API Integration",
  animations: "Animations",
  performance: "Performance",
  utilities: "Utilities",
  dataviz: "Data Visualization",
  auth: "Authentication",
};

// Helper function to safely get text (handles both string and object formats)
const getText = (field, locale) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    if (Array.isArray(field)) return field;
    return field[locale] || field.de || field.en || "";
  }
  return "";
};

export default function SnippetDetailClient({ snippet }) {
  const locale = useLocale();
  const t = useTranslations("snippetDetail");

  const title = getText(snippet.title, locale);
  const description = getText(snippet.description, locale);
  const highlights = getText(snippet.highlights, locale);
  const difficultyLabel = snippet.difficulty
    ? t(`difficulty.${snippet.difficulty}`)
    : null;

  // Check if there are any demo links
  const hasDemoLinks =
    snippet.demoLinks?.liveDemoUrl ||
    snippet.demoLinks?.codepenUrl ||
    snippet.demoLinks?.stackblitzUrl;

  return (
    <>
      <MenuDock />

      <main
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          {/* Back Link */}
          <BackLink href="/snippets" />

          {/* Header */}
          <header className="mb-12">
            {/* Meta line */}
            <div
              className="text-sm mb-4 font-mono flex items-center gap-2"
              style={{ color: "var(--muted)" }}
            >
              {snippet.icon && <span>{snippet.icon}</span>}
              {categoryLabels[snippet.category] || snippet.category}
              {difficultyLabel && (
                <>
                  <span>·</span>
                  <span>{difficultyLabel}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h1>

            {/* Description */}
            {description && (
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {description}
              </p>
            )}

            {/* GitHub Button */}
            {snippet.githubUrl && (
              <a
                href={snippet.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  background: "var(--surface)",
                  color: "var(--ink)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.color = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t("viewOnGithub")}
              </a>
            )}
          </header>

          {/* Demo GIF */}
          {snippet.demoGif?.asset && (
            <section className="mb-12">
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <Image
                  src={urlFor(snippet.demoGif).url()}
                  alt={title}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </section>
          )}

          {/* Screenshot Fallback */}
          {!snippet.demoGif?.asset && snippet.screenshot?.asset && (
            <section className="mb-12">
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <Image
                  src={urlFor(snippet.screenshot).width(800).url()}
                  alt={title}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </section>
          )}

          {/* Highlights / Features */}
          {highlights && highlights.length > 0 && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("highlights")}
              </h2>
              <ul className="space-y-2">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base">
                    <span style={{ color: "var(--muted)" }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technologies */}
          {snippet.technologies && snippet.technologies.length > 0 && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("technologies")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {snippet.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-mono"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Installation */}
          {snippet.installCommand && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("installation")}
              </h2>
              <div
                className="p-4 rounded-lg font-mono text-sm"
                style={{ background: "var(--surface)" }}
              >
                <span style={{ color: "var(--muted)" }}>$</span>{" "}
                {snippet.installCommand}
              </div>
            </section>
          )}

          {/* Demo Links */}
          {hasDemoLinks && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("demos")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {snippet.demoLinks.liveDemoUrl && (
                  <a
                    href={snippet.demoLinks.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
                  >
                    {t("liveDemo")} →
                  </a>
                )}
                {snippet.demoLinks.codepenUrl && (
                  <a
                    href={snippet.demoLinks.codepenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
                  >
                    {t("codepen")} →
                  </a>
                )}
                {snippet.demoLinks.stackblitzUrl && (
                  <a
                    href={snippet.demoLinks.stackblitzUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
                  >
                    {t("stackblitz")} →
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Used In */}
          {snippet.usedIn && snippet.usedIn.length > 0 && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("usedIn")}
              </h2>
              <ul className="space-y-1">
                {snippet.usedIn.map((project, index) => (
                  <li
                    key={index}
                    className="text-base"
                    style={{ color: "var(--muted)" }}
                  >
                    {project}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Stats */}
          {(snippet.stats?.linesOfCode || snippet.stats?.fileSize) && (
            <section className="mb-12">
              <h2
                className="text-sm font-medium mb-4 pb-2 border-b"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t("stats")}
              </h2>
              <div
                className="flex gap-6 text-sm"
                style={{ color: "var(--muted)" }}
              >
                {snippet.stats.linesOfCode && (
                  <span>
                    ~{snippet.stats.linesOfCode} {t("lines")}
                  </span>
                )}
                {snippet.stats.fileSize && <span>{snippet.stats.fileSize}</span>}
              </div>
            </section>
          )}

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <section className="mb-12">
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-mono"
                    style={{ color: "var(--muted)" }}
                  >
                    #{tag}
                  </span>
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
