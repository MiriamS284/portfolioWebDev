"use client";

import Link from "next/link";

const texts = {
  de: {
    title: "Geschriebenes",
    viewAll: "Alle Beiträge",
  },
  en: {
    title: "Writing",
    viewAll: "All writing",
  },
};

export default function WritingColumn({ posts = [], lang = "de" }) {
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
        {posts.slice(0, 4).map((post) => (
          <WritingItem key={post._id} post={post} />
        ))}

        {/* View All Link */}
        <Link
          href="/blog"
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

function WritingItem({ post }) {
  const title = post.title || "Untitled";
  const excerpt = post.excerpt || "";
  const slug = post.slug?.current;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="flex items-center gap-1">
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
