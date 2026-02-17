import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity/queries";
import MenuDock from "../_components/layout/MenuDock";
import Footer from "../_components/layout/Footer";
import ProjectGrid from "../_components/projects/ProjectGrid";
import ProjectsHeader from "../_components/projects/ProjectsHeader";

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
        className="py-20 md:py-32 px-6 md:ml-[280px] md:pt-[120px]"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <ProjectsHeader />
          <ProjectGrid projects={projects} />
        </div>
      </main>

      <Footer />
    </>
  );
}
