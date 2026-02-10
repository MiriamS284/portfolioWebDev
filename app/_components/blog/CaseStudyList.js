"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import CaseStudyItem from "./CaseStudyItem";

export default function CaseStudyList({ studies }) {
  const { lang } = useLanguage();

  if (!studies || studies.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ color: "var(--muted)", opacity: 0.6 }}>
          {lang === "de"
            ? "Noch keine Case Studies vorhanden."
            : "No case studies available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
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
