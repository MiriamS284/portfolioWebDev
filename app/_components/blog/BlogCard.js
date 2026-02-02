import Image from "next/image";
import Link from "next/link";
import { imagePresets } from "@/lib/sanity";
import CategoryBadge from "../shared/CategoryBadge";
import { formatDate } from "@/lib/utils/formatDate";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
      style={{
        background: "var(--surface)",
        boxShadow: "var(--shadow-soft)",
        border: "1px solid var(--border)",
      }}
    >
      {post.mainImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagePresets.card(post.mainImage).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {post.categories?.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat} title={cat} />
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-strong)] transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm opacity-75 line-clamp-3 mb-4">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-3 text-xs opacity-60">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
