import Image from "next/image";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/sanity";
import { imagePresets } from "@/lib/sanity";

export default function BlogPostContent({ post }) {
  return (
    <>
      {/* Featured Image */}
      {post.mainImage && (
        <div className="mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={imagePresets.hero(post.mainImage).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </>
  );
}
