import { client } from "@/lib/sanity";
import { featuredProjectsQuery } from "@/lib/sanity/queries";
import ClientHomePage from "./_components/ClientHomePage";

export const metadata = {
  title: "Miriam Sparbrod | Full-Stack Entwicklerin",
  description:
    "Full-Stack Entwicklerin spezialisiert auf MERN Stack, Next.js und moderne Web-Anwendungen. Von der Linguistik zur Web-Entwicklung.",
};

export const revalidate = 60;

export default async function Page() {
  const projects = await client.fetch(featuredProjectsQuery);

  return <ClientHomePage projects={projects || []} />;
}
