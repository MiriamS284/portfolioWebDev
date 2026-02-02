import Image from "next/image";
import { imagePresets } from "@/lib/sanity";
import CategoryBadge from "../shared/CategoryBadge";
import GrowthStageBadge from "./GrowthStageBadge";
import { formatDate } from "@/lib/utils/formatDate";

export default function GardenEntryHeader({ entry }) {
  return (
    <header>
      {/* Growth Stage & Categories */}
      <div className="flex gap-2 mb-6 flex-wrap items-center">
        <GrowthStageBadge stage={entry.growthStage} />
        {entry.categories?.length > 0 &&
          entry.categories.map((cat) => (
            <CategoryBadge key={cat.slug.current} title={cat.title} />
          ))}
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl font-bold mb-6"
        style={{
          textShadow: "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
        }}
      >
        {entry.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {entry.author && (
          <div className="flex items-center gap-3">
            {entry.author.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={imagePresets.avatar(entry.author.image).url()}
                  alt={entry.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-medium opacity-80">{entry.author.name}</span>
          </div>
        )}
        <span className="opacity-40">•</span>
        <div className="flex items-center gap-2 opacity-70">
          <span>🌱 Planted</span>
          <time dateTime={entry.plantedAt}>{formatDate(entry.plantedAt)}</time>
        </div>
        {entry.lastTended && (
          <>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-2 opacity-70">
              <span>🌿 Last tended</span>
              <time dateTime={entry.lastTended}>
                {formatDate(entry.lastTended)}
              </time>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
