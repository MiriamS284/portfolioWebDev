"use client";

import { useTranslations } from "next-intl";

export default function HeroShowcase() {
  const t = useTranslations("heroShowcase");

  const tags = ["SaaS", "MERN", "Next.js", "APIs", t("automation")];

  return (
    <section
      className="min-h-screen flex items-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="mx-auto max-w-2xl w-full px-6 py-16 md:py-24">
        <h1
          className="text-3xl md:text-4xl font-semibold mb-6 leading-tight"
          style={{ color: "var(--ink)" }}
        >
          {t("intro")}
        </h1>

        <p
          className="text-base mb-4 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {t("line1")}
        </p>

        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {t("line2")}
        </p>

        <p
          className="text-base mb-4 leading-relaxed"
          style={{ color: "var(--muted)", opacity: 0.8 }}
        >
          {t("philosophy1")}
        </p>

        <p
          className="text-base mb-10 leading-relaxed"
          style={{ color: "var(--muted)", opacity: 0.8 }}
        >
          {t("philosophy2")}
        </p>

        {/* Tags as simple hashtags */}
        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => (
            <span
              key={`hero-tag-${index}`}
              className="text-sm"
              style={{ color: "var(--muted)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
