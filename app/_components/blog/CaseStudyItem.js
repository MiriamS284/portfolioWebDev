"use client";

import Link from "next/link";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function CaseStudyItem({ study, isLast }) {
  const { lang } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const slug = study.slug?.current;

  return (
    <>
      <Link
        href={`/blog/${slug}`}
        className="group block py-8"
      >
        {/* Title + Date */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h2
            className="text-xl md:text-2xl font-semibold transition-colors duration-200"
            style={{ color: "var(--ink)" }}
          >
            <span className="group-hover:text-[var(--accent)] transition-colors">
              {study.title}
            </span>
            <span
              className="inline-block ml-2 opacity-0 group-hover:opacity-70 transition-all duration-200 group-hover:translate-x-1"
              style={{ color: "var(--muted)" }}
            >
              →
            </span>
          </h2>
          <span
            className="text-xs font-mono flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.6 }}
          >
            {formatDate(study.publishedAt)}
          </span>
        </div>

        {/* Categories - minimal */}
        {study.categories && study.categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {study.categories.map((cat, idx) => (
              <span
                key={`${study._id}-cat-${idx}`}
                className="text-xs font-mono"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {study.excerpt && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {study.excerpt}
          </p>
        )}
      </Link>

      {!isLast && (
        <hr
          className="border-0 h-px"
          style={{ background: "var(--border)", opacity: 0.5 }}
        />
      )}
    </>
  );
}
