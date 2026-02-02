import Link from "next/link";
import Container from "../shared/Container";

export default function GardenPreview() {
  // Später: Daten aus Sanity holen
  const entries = [
    {
      id: 1,
      title: "React Server Components verstehen",
      stage: "evergreen",
      emoji: "🌳",
      excerpt:
        "Ein tiefer Einblick in RSC und deren Vorteile für moderne Web-Apps",
    },
    {
      id: 2,
      title: "OKLCH: Die Zukunft von CSS-Farben",
      stage: "budding",
      emoji: "🌿",
      excerpt: "Warum OKLCH besser ist als RGB/HSL und wie man es nutzt",
    },
    {
      id: 3,
      title: "TypeScript Utility Types",
      stage: "seedling",
      emoji: "🌱",
      excerpt: "Erste Notizen zu Pick, Omit, Partial und anderen Helpers",
    },
  ];

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container size="large">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            Digital Garden
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Gedanken die wachsen
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Mein digitaler Garten ist ein lebendiger Raum für Ideen, die sich
            entwickeln und mit anderen vernetzt werden. Keine perfekten Artikel,
            sondern organische Notizen die wachsen.
          </p>
        </div>

        {/* Entries */}
        <div className="space-y-6 mb-12">
          {entries.map((entry) => (
            <GardenEntryRow key={entry.id} entry={entry} />
          ))}
        </div>

        {/* View All Link */}
        <div>
          <Link
            href="/garden"
            className="inline-flex items-center gap-2 text-lg font-medium hover:text-[var(--accent-strong)] transition-colors"
          >
            Zum Digital Garden
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l3-3-3-3m6 0H6" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function GardenEntryRow({ entry }) {
  return (
    <Link
      href={`/garden/${entry.id}`}
      className="group flex items-start gap-6 p-6 rounded-2xl transition-all hover:bg-[var(--surface)]"
    >
      {/* Emoji */}
      <div className="text-4xl flex-shrink-0">{entry.emoji}</div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-strong)] transition-colors">
          {entry.title}
        </h3>
        <p className="text-sm opacity-75">{entry.excerpt}</p>
      </div>

      {/* Arrow */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}
