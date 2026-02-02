import Image from "next/image";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/sanity";
import { imagePresets } from "@/lib/sanity";

export default function GardenEntryContent({ entry }) {
  return (
    <>
      {entry.mainImage && (
        <div className="mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={imagePresets.hero(entry.mainImage).url()}
              alt={entry.mainImage.alt || entry.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText value={entry.body} components={portableTextComponents} />
      </div>
    </>
  );
}
