"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LiaSeedlingSolid } from "react-icons/lia";
import { GiPlantRoots, GiSunflower } from "react-icons/gi";

const stageIcons = {
  seedling: LiaSeedlingSolid,
  budding: GiPlantRoots,
  evergreen: GiSunflower,
};

export default function ThoughtsColumn({ thoughts = [], locale = "de" }) {
  const t = useTranslations("thoughts");

  return (
    <div>
      {/* Header */}
      <h2 className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        {t("title")}
      </h2>

      {/* List */}
      <div className="space-y-5">
        {thoughts.slice(0, 4).map((thought) => (
          <ThoughtItem key={thought._id} thought={thought} locale={locale} />
        ))}

        {/* View All Link */}
        <Link href="/garden" className="group inline-block">
          <span
            className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--ink)" }}
          >
            {t("viewAll")}
          </span>
        </Link>
      </div>
    </div>
  );
}

function ThoughtItem({ thought, locale = "de" }) {
  const title = (locale === "en" ? thought.title_en : thought.title_de) || "Untitled";
  const excerpt = (locale === "en" ? thought.excerpt_en : thought.excerpt_de) || "";
  const slug = thought.slug?.current;
  const stage = thought.growthStage || "seedling";
  const StageIcon = stageIcons[stage] || LiaSeedlingSolid;

  return (
    <Link href={`/garden/${slug}`} className="group block">
      <div className="flex items-center gap-1">
        <StageIcon
          className="w-3.5 h-3.5 mr-1 flex-shrink-0"
          style={{ color: "var(--muted)", opacity: 0.7 }}
        />
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
