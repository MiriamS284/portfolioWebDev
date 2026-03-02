"use client";

import { useTranslations } from "next-intl";

export default function CaseStudiesHeader() {
  const t = useTranslations("caseStudies");

  return (
    <header className="mb-16">
      <h1 className="text-2xl font-semibold mb-3">{t("title")}</h1>
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {t("description")}
      </p>
    </header>
  );
}
