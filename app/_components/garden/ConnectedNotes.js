import Link from "next/link";
import GrowthStageBadge from "./GrowthStageBadge";

export default function ConnectedNotes({ notes }) {
  if (!notes || notes.length === 0) return null;

  return (
    <aside
      className="mt-16 p-6 rounded-2xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🔗</span>
        <span>Connected Notes</span>
      </h3>
      <p className="text-sm opacity-70 mb-4">
        Diese Gedanken sind miteinander verbunden und ergänzen sich gegenseitig.
      </p>
      <div className="space-y-3">
        {notes.map((note) => (
          <Link
            key={note.slug.current}
            href={`/garden/${note.slug.current}`}
            className="block p-4 rounded-lg transition-colors"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GrowthStageBadge stage={note.growthStage} />
                </div>
                <div className="font-medium text-sm hover:text-[var(--accent-strong)] transition-colors">
                  {note.title}
                </div>
                {note.excerpt && (
                  <div className="text-xs opacity-70 mt-1 line-clamp-2">
                    {note.excerpt}
                  </div>
                )}
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-40 flex-shrink-0 mt-1"
              >
                <path d="M6 12l4-4-4-4" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
