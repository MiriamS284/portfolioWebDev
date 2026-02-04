"use client";

import { useLanguage } from "@/app/_providers/LanguageProvider";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/sanity/portableText";

export default function ProjectContent({ project }) {
  const { lang } = useLanguage();

  const texts = {
    de: {
      description: "Projektbeschreibung",
      features: "Hauptfunktionen",
      challenges: "Herausforderungen & Lösungen",
      results: "Ergebnisse",
      learnings: "Key Learnings",
    },
    en: {
      description: "Project Description",
      features: "Key Features",
      challenges: "Challenges & Solutions",
      results: "Results",
      learnings: "Key Learnings",
    },
  };

  const t = texts[lang] || texts.de;

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-4xl px-6">
        {/* Description */}
        {project.description?.[lang] && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">{t.description}</h2>
            <div className="prose prose-invert max-w-none">
              <PortableText
                value={project.description[lang]}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">{t.features}</h2>
            <div className="space-y-6">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {feature.feature?.[lang] || feature.feature?.de}
                  </h3>
                  <p className="opacity-80">
                    {feature.description?.[lang] || feature.description?.de}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {project.challenges?.[lang] && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">{t.challenges}</h2>
            <div className="prose prose-invert max-w-none">
              <PortableText
                value={project.challenges[lang]}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {project.results?.[lang] && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">{t.results}</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              {project.results[lang]}
            </p>
          </div>
        )}

        {/* Learnings */}
        {project.learnings?.[lang] && project.learnings[lang].length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">{t.learnings}</h2>
            <ul className="space-y-3">
              {project.learnings[lang].map((learning, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-lg opacity-90"
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
