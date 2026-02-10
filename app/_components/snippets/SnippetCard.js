"use client";

import Link from "next/link";

const difficultyColors = {
  beginner: "var(--accent)",
  intermediate: "orange",
  advanced: "tomato",
};

export default function SnippetCard({ snippet }) {
  const slug = snippet.slug?.current;

  return (
    <Link href={`/snippets/${slug}`} className="group block py-6">
      <div className="flex items-center gap-3 mb-2">
        {snippet.language && (
          <span
            className="text-xs font-mono uppercase"
            style={{ color: "var(--accent)" }}
          >
            {snippet.language}
          </span>
        )}
        {snippet.difficulty && (
          <span
            className="text-xs font-mono"
            style={{
              color: difficultyColors[snippet.difficulty] || "var(--muted)",
              opacity: 0.7,
            }}
          >
            {snippet.difficulty}
          </span>
        )}
      </div>

      <h3
        className="text-lg font-semibold mb-2 transition-colors group-hover:text-[var(--accent)]"
        style={{ color: "var(--ink)" }}
      >
        {snippet.title}
        <span
          className="inline-block ml-2 opacity-0 group-hover:opacity-60 transition-all duration-200 group-hover:translate-x-1"
          style={{ color: "var(--muted)" }}
        >
          →
        </span>
      </h3>

      {snippet.description && (
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--muted)" }}
        >
          {snippet.description}
        </p>
      )}

      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {snippet.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-mono"
              style={{ color: "var(--muted)", opacity: 0.6 }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
