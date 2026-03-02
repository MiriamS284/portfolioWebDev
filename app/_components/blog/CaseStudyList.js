"use client";

import { useTranslations } from "next-intl";
import CaseStudyItem from "./CaseStudyItem";

export default function CaseStudyList({ studies }) {
  const t = useTranslations("caseStudies");

  if (!studies || studies.length === 0) {
    return (
      <div className="py-20">
        <p style={{ color: "var(--muted)", opacity: 0.6 }}>
          {t("noStudies")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <hr
        className="border-0 h-px mb-0"
        style={{ background: "var(--border)" }}
      />

      {studies.map((study, index) => (
        <CaseStudyItem
          key={study._id}
          study={study}
          isLast={index === studies.length - 1}
        />
      ))}

      <hr
        className="border-0 h-px mt-0"
        style={{ background: "var(--border)" }}
      />
    </div>
  );
}
