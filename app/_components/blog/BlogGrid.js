import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 opacity-60">
        <p>Noch keine Blog-Posts vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
