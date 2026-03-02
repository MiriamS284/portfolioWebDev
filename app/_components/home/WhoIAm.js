"use client";

import Container from "../shared/Container";
import { useTranslations, useLocale } from "next-intl";

const tags = {
  de: [
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
  en: [
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
    "#DigitalSolutions",
  ],
};

export default function WhoIAm() {
  const t = useTranslations("whoIAm");
  const locale = useLocale();
  const currentTags = tags[locale] || tags.de;

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
            {t("eyebrow")}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-balance">
            {t("headline")}{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-strong), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("headlineAccent")}
            </span>
          </h2>

          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            {t("description")}
          </p>

          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {currentTags.map((tag, index) => (
              <span key={`whoiam-tag-${index}`}> {tag}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
