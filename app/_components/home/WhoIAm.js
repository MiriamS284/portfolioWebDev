"use client";

import Container from "../shared/Container";
import { useLanguage } from "@/app/_context/LanguageProvider";

const content = {
  de: {
    eyebrow: "Full-Stack Entwicklerin",
    headline: "Ich verwandle Ideen in",
    headlineAccent: "intuitive, leistungsstarke Webanwendungen",
    description:
      "Von der Übersetzung zur Softwareentwicklung: Ich bringe die Fähigkeit mit, zwischen verschiedenen Welten zu vermitteln – zwischen Nutzerbedürfnissen und technischer Umsetzung, zwischen Vision und funktionierendem Produkt.",
    stats: {
      experience: { number: "3+", label: "Jahre Entwicklung" },
      projects: { number: "15+", label: "Projekte" },
      languages: { number: "2", label: "Sprachen (DE/EN)" },
    },
  },
  en: {
    eyebrow: "Full-Stack Developer",
    headline: "I transform ideas into",
    headlineAccent: "intuitive, high-performance web applications",
    description:
      "From translation to software development: I bring the ability to bridge different worlds – between user needs and technical implementation, between vision and working product.",
    stats: {
      experience: { number: "3+", label: "Years of Development" },
      projects: { number: "15+", label: "Projects" },
      languages: { number: "2", label: "Languages (DE/EN)" },
    },
  },
};

export default function WhoIAm() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container size="default">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-6">
            {t.eyebrow}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-balance">
            {t.headline}{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-strong), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.headlineAccent}
            </span>
          </h2>

          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            {t.description}
          </p>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[var(--border)]">
            <Stat
              number={t.stats.experience.number}
              label={t.stats.experience.label}
            />
            <Stat
              number={t.stats.projects.number}
              label={t.stats.projects.label}
            />
            <Stat
              number={t.stats.languages.number}
              label={t.stats.languages.label}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ color: "var(--accent)" }}
      >
        {number}
      </div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}
