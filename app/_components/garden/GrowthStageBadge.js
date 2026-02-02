export default function GrowthStageBadge({ stage }) {
  const stages = {
    seedling: {
      emoji: "🌱",
      label: "Seedling",
      description: "Neue Idee",
      bg: "oklch(0.92 0.02 140)",
    },
    budding: {
      emoji: "🌿",
      label: "Budding",
      description: "In Entwicklung",
      bg: "oklch(0.85 0.06 140)",
    },
    evergreen: {
      emoji: "🌳",
      label: "Evergreen",
      description: "Ausgereift",
      bg: "oklch(0.78 0.10 140)",
    },
  };

  const current = stages[stage] || stages.seedling;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
      style={{
        background: current.bg,
        color: "oklch(0.25 0.03 260)",
      }}
      title={`Growth stage: ${current.description}`}
    >
      <span aria-hidden="true">{current.emoji}</span>
      <span>{current.label}</span>
    </span>
  );
}
