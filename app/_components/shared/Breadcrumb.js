"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Breadcrumb({ section, title }) {
  const t = useTranslations("breadcrumb");
  const sectionLabel = t(section) || section;

  return (
    <div
      className="mb-12 flex items-center gap-2 text-sm font-mono"
      style={{ color: "var(--muted)" }}
    >
      <Link
        href={`/${section}`}
        className="hover:opacity-100 transition-opacity opacity-60"
      >
        {sectionLabel}
      </Link>
      <span className="opacity-40">/</span>
      <span className="opacity-60">{title}</span>
    </div>
  );
}
