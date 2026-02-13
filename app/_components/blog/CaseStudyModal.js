"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/sanity/portableText";

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function CaseStudyModal({ study, onClose }) {
  const { lang } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      style={{ background: "rgba(0, 0, 0, 0.9)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <CloseIcon />
        </button>

        <div
          className="p-8 md:p-12 pb-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--muted)" }}
            >
              {formatDate(study.publishedAt)}
            </span>
            {study.categories && study.categories.length > 0 && (
              <>
                <span style={{ color: "var(--border)" }}>|</span>
                {study.categories.map((cat, idx) => (
                  <span
                    key={`modal-cat-${idx}`}
                    className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      color: "var(--accent)",
                      background:
                        "color-mix(in oklch, var(--accent), transparent 90%)",
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </>
            )}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            {study.title?.[lang] || study.title?.de || study.title}
          </h1>

          {(study.excerpt?.[lang] || study.excerpt?.de) && (
            <p
              className="text-lg leading-relaxed mt-4"
              style={{ color: "var(--muted)" }}
            >
              {study.excerpt?.[lang] || study.excerpt?.de}
            </p>
          )}

          {study.author && (
            <p
              className="text-sm mt-6"
              style={{ color: "var(--muted)", opacity: 0.7 }}
            >
              {lang === "de" ? "Von" : "By"} {study.author}
            </p>
          )}
        </div>

        <div className="p-8 md:p-12">
          {(study.body?.[lang] || study.body?.de || study.body) ? (
            <div
              className="prose prose-invert max-w-none"
              style={{ color: "var(--ink)" }}
            >
              <PortableText
                value={study.body?.[lang] || study.body?.de || study.body}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p
              className="text-center py-12"
              style={{ color: "var(--muted)", opacity: 0.6 }}
            >
              {lang === "de" ? "Inhalt wird geladen..." : "Content loading..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
