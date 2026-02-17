"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import { PortableText } from "@portabletext/react";

// Projekt-spezifische PortableText Komponenten mit einheitlichem Styling
const projectTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--ink)" }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--ink)" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-medium mt-4 mb-2" style={{ color: "var(--ink)" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-medium mt-4 mb-2" style={{ color: "var(--ink)" }}>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-2 pl-4 my-4 italic text-base"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={!value.href?.startsWith("/") ? "noopener noreferrer" : undefined}
        className="underline hover:text-[var(--accent)] transition-colors"
        style={{ color: "var(--ink)" }}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded text-sm font-mono"
        style={{ background: "var(--surface)", color: "var(--ink)" }}
      >
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-4 ml-4" style={{ color: "var(--muted)" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 my-4 ml-4 list-decimal list-inside" style={{ color: "var(--muted)" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed flex items-start gap-2">
        <span style={{ color: "var(--accent)" }}>•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
};

export default function ProjectContent({ project }) {
  const { lang } = useLanguage();

  const texts = {
    de: {
      description: "Beschreibung",
      features: "Funktionen",
      challenges: "Herausforderungen",
      results: "Ergebnisse",
      learnings: "Learnings",
    },
    en: {
      description: "Description",
      features: "Features",
      challenges: "Challenges",
      results: "Results",
      learnings: "Learnings",
    },
  };

  const t = texts[lang] || texts.de;

  return (
    <section className="py-12" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6 space-y-16">
        {/* Description */}
        {project.description?.[lang] && (
          <div>
            <h2
              className="text-sm font-medium mb-6 pb-2 border-b"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {t.description}
            </h2>
            <div>
              <PortableText
                value={project.description[lang]}
                components={projectTextComponents}
              />
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h2
              className="text-sm font-medium mb-6 pb-2 border-b"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {t.features}
            </h2>
            <div className="space-y-6">
              {project.features.map((feature, idx) => (
                <div key={idx}>
                  <h3
                    className="text-base font-medium mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {feature.feature?.[lang] || feature.feature?.de}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {feature.description?.[lang] || feature.description?.de}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {project.challenges?.[lang] && (
          <div>
            <h2
              className="text-sm font-medium mb-6 pb-2 border-b"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {t.challenges}
            </h2>
            <div>
              <PortableText
                value={project.challenges[lang]}
                components={projectTextComponents}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {project.results?.[lang] && (
          <div>
            <h2
              className="text-sm font-medium mb-6 pb-2 border-b"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {t.results}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {project.results[lang]}
            </p>
          </div>
        )}

        {/* Learnings */}
        {project.learnings?.[lang] && project.learnings[lang].length > 0 && (
          <div>
            <h2
              className="text-sm font-medium mb-6 pb-2 border-b"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {t.learnings}
            </h2>
            <ul className="space-y-2">
              {project.learnings[lang].map((learning, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--accent)" }}>→</span>
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
