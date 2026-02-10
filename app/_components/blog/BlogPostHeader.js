import Image from "next/image";
import { imagePresets } from "@/lib/sanity";
import CategoryBadge from "../shared/CategoryBadge";
import { formatDate } from "@/lib/utils/formatDate";

export default function BlogPostHeader({ post }) {
  return (
    <header>
      {post.categories?.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {post.categories.map((cat) => (
            <CategoryBadge key={cat.slug.current} title={cat.title} />
          ))}
        </div>
      )}

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl font-bold mb-6"
        style={{
          textShadow: "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
        }}
      >
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm opacity-70">
        {post.author && (
          <div className="flex items-center gap-3">
            {post.author.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={imagePresets.avatar(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-medium">{post.author.name}</span>
          </div>
        )}
        <span>•</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </div>
    </header>
  );
}
