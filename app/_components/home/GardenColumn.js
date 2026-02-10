"use client";

import Link from "next/link";

const texts = {
  de: {
    title: "Digitaler Garten",
    viewAll: "Zum Garten",
  },
  en: {
    title: "Digital Garden",
    viewAll: "Visit garden",
  },
};

const stageEmoji = {
  seedling: "🌱",
  budding: "🌿",
  evergreen: "🌳",
};

export default function GardenColumn({ entries = [], lang = "de" }) {
  const t = texts[lang] || texts.de;

  return (
    <div>
      {/* Header */}
      <h2
        className="text-sm mb-6"
        style={{ color: "var(--muted)" }}
      >
        {t.title}
      </h2>

      {/* List */}
      <div className="space-y-5">
        {entries.slice(0, 4).map((entry) => (
          <GardenItem key={entry._id} entry={entry} />
        ))}

        {/* View All Link */}
        <Link
          href="/garden"
          className="group inline-block"
        >
          <span
            className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--ink)" }}
          >
            {t.viewAll}
          </span>
        </Link>
      </div>
    </div>
  );
}

function GardenItem({ entry }) {
  const title = entry.title || "Untitled";
  const excerpt = entry.excerpt || "";
  const slug = entry.slug?.current;
  const stage = entry.growthStage || "seedling";
  const emoji = stageEmoji[stage] || "🌱";

  return (
    <Link href={`/garden/${slug}`} className="group block">
      <div className="flex items-center gap-1">
        <span className="text-xs mr-1">{emoji}</span>
        <span
          className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </span>
        <span
          className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "var(--muted)" }}
        >
          ↗
        </span>
      </div>
      {excerpt && (
        <p
          className="text-sm mt-1 leading-relaxed line-clamp-2"
          style={{ color: "var(--muted)" }}
        >
          {excerpt}
        </p>
      )}
    </Link>
  );
}
