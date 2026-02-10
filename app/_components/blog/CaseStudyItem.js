"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import CaseStudyModal from "./CaseStudyModal";

export default function CaseStudyItem({ study, isLast }) {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer py-8 transition-all duration-300"
      >
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h2
            className="text-xl md:text-2xl font-bold transition-colors duration-300"
            style={{
              color: isHovered ? "var(--accent)" : "var(--ink)",
            }}
          >
            {study.title}
          </h2>
          <span
            className="text-xs font-mono flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.6 }}
          >
            {formatDate(study.publishedAt)}
          </span>
        </div>

        {study.categories && study.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {study.categories.map((cat, idx) => (
              <span
                key={`${study._id}-cat-${idx}`}
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                style={{
                  color: "var(--muted)",
                  background: "var(--surface)",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: isHovered ? "200px" : "0",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p
            className="text-base leading-relaxed pt-2"
            style={{ color: "var(--muted)" }}
          >
            {study.excerpt}
          </p>
          <span
            className="inline-block mt-4 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            {lang === "de" ? "Case Study lesen →" : "Read Case Study →"}
          </span>
        </div>
      </div>

      {!isLast && (
        <hr className="border-0 h-px" style={{ background: "var(--border)" }} />
      )}

      {isModalOpen && (
        <CaseStudyModal study={study} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
