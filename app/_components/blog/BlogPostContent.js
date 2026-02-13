"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/sanity";
import { imagePresets } from "@/lib/sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function BlogPostContent({ post }) {
  const { lang } = useLanguage();

  return (
    <>
      {post.mainImage && (
        <div className="mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={imagePresets.hero(post.mainImage).url()}
              alt={post.mainImage.alt?.[lang] || post.mainImage.alt?.de || post.title?.[lang] || post.title?.de || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText
          value={post.body?.[lang] || post.body?.de || post.body}
          components={portableTextComponents}
        />
      </div>
    </>
  );
}
