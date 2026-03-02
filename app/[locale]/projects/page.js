import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity/queries";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import ProjectGrid from "@/app/_components/projects/ProjectGrid";
import ProjectsHeader from "@/app/_components/projects/ProjectsHeader";
import BackLink from "@/app/_components/shared/BackLink";

export const metadata = {
  title: "Projekte | Miriam Sparbrod",
  description:
    "Full-Stack Projekte von Miriam Sparbrod, spezialisiert auf MERN Stack, Next.js und moderne Web-Anwendungen. Entdecken Sie innovative SaaS-Lösungen für B2B.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery);

  return (
    <>
      <MenuDock />

      <main
        className="py-20 md:py-32 px-6"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto max-w-2xl">
          <BackLink href="/">Index</BackLink>
          <ProjectsHeader />
          <ProjectGrid projects={projects} />
        </div>
      </main>

      <Footer />
    </>
  );
}
