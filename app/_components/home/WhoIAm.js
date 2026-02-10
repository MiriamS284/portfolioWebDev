"use client";

import Container from "../shared/Container";
import { useLanguage } from "@/app/_context/LanguageProvider";

const content = {
  de: {
    eyebrow: "Full-Stack Entwicklerin",
    headline: "Ich baue",
    headlineAccent: "B2B-Webanwendungen und SaaS-Plattformen",
    description:
      "Projektbezogen, vom ersten Meeting bis zum Live-System. Ich verstehe Anforderungen zu erfassen und technisch umzusetzen.",
    tags: [
      "#B2BSaaS",
      "#FullStack",
      "#WebAnwendungen",
      "#AIAgents",
      "#Automatisierung",
      "#ProcessOptimization",
      "#WebDev",
      "#SoftwareDevelopment",
      "DigitaleTransformation",
      "#Problemlöserin",
      "#TechfürBusiness",
      "#AgileDevlopment",
    ],
  },
  en: {
    eyebrow: "Full-Stack Developer",
    headline: "I build",
    headlineAccent: "B2B web applications and SaaS platforms",
    description:
      "Project-focused, from first meeting to live system. I understand how to capture requirements and implement them technically.",
    tags: [
      "#B2BSaaS",
      "#FullStack",
      "#WebApplications",
      "#AIAutomation",
      "#AIIntegration",
      "#ProcessOptimization",

      "#SoftwareDevelopment",
      "#DigitalTransformation",
      "#ProblemSolver",
      "#TechForBusiness",
      "#AgilDevlopment",
      "#ProblemSolver",
      "#TechfürBusiness",
      "#DigitalSolutions",
    ],
  },
};

export default function WhoIAm() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        zIndex: 2,
        isolation: "isolate",
      }}
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

          {t.tags && (
            <div className="flex flex-wrap gap-3 mt-8">
              {t.tags.map((tag, index) => (
                <span key={`whoiam-tag-${index}`}> {tag}</span>
              ))}
            </div>
          )}
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
