"use client";

import { useTranslations } from "next-intl";

export default function ProjectsHeader() {
  const t = useTranslations("projects");

  return (
    <header className="mb-12">
      <h1
        className="text-2xl font-semibold mb-2"
        style={{ color: "var(--ink)" }}
      >
        {t("title")}
      </h1>
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {t("description")}
      </p>
    </header>
  );
}
