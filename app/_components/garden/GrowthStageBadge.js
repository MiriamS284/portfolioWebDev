"use client";

import { LiaSeedlingSolid } from "react-icons/lia";
import { GiPlantRoots, GiSunflower } from "react-icons/gi";

const stages = {
  seedling: {
    icon: LiaSeedlingSolid,
    label: "Seedling",
    labelDe: "Saat",
    description: "Neue Idee",
  },
  budding: {
    icon: GiPlantRoots,
    label: "Growing",
    labelDe: "Wachsend",
    description: "In Entwicklung",
  },
  evergreen: {
    icon: GiSunflower,
    label: "Evergreen",
    labelDe: "Ausgereift",
    description: "Ausgereift",
  },
};

export default function GrowthStageBadge({ stage, showLabel = true }) {
  const current = stages[stage] || stages.seedling;
  const Icon = current.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{
        background: "var(--surface-2)",
        color: "var(--muted)",
        border: "1px solid var(--border)",
      }}
      title={`Growth stage: ${current.description}`}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
}

export { stages as growthStages };
