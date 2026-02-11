"use client";

import Image from "next/image";
import Link from "next/link";
import { imagePresets } from "@/lib/sanity";
import { LiaSeedlingSolid } from "react-icons/lia";
import { GiPlantRoots } from "react-icons/gi";
import CategoryBadge from "../shared/CategoryBadge";
import GrowthStageBadge from "./GrowthStageBadge";
import { formatDate } from "@/lib/utils/formatDate";

export default function GardenCard({ entry }) {
  return (
    <Link
      href={`/garden/${entry.slug.current}`}
      className="group block rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
      style={{
        background: "var(--surface)",
        boxShadow: "var(--shadow-soft)",
        border: "1px solid var(--border)",
      }}
    >
      {entry.mainImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagePresets.card(entry.mainImage).url()}
            alt={entry.mainImage.alt || entry.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap items-center">
          <GrowthStageBadge stage={entry.growthStage} />
          {entry.categories?.length > 0 &&
            entry.categories
              .slice(0, 2)
              .map((cat) => <CategoryBadge key={cat} title={cat} />)}
        </div>

        <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-strong)] transition-colors">
          {entry.title}
        </h2>

        {entry.excerpt && (
          <p className="text-sm opacity-75 line-clamp-3 mb-4">
            {entry.excerpt}
          </p>
        )}

        <div
          className="flex items-center gap-3 text-xs"
          style={{ color: "var(--muted)" }}
        >
          <span className="inline-flex items-center gap-1">
            <LiaSeedlingSolid className="w-3.5 h-3.5" />
            {formatDate(entry.plantedAt)}
          </span>
          {entry.lastTended && (
            <>
              <span style={{ opacity: 0.4 }}>•</span>
              <span className="inline-flex items-center gap-1">
                <GiPlantRoots className="w-3.5 h-3.5" />
                {formatDate(entry.lastTended)}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
