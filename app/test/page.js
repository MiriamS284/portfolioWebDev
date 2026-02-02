import { client } from "@/app/lib/sanity";
import { allPostsQuery } from "@/app/lib/queries";

export default async function TestPage() {
  const posts = await client.fetch(allPostsQuery);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Sanity Connection Test</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-black">
        {JSON.stringify(posts, null, 2)}
      </pre>
    </div>
  );
}
