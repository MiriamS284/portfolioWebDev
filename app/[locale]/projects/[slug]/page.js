import { client } from "@/lib/sanity";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import ProjectHero from "@/app/_components/projects/ProjectHero";
import ProjectContent from "@/app/_components/projects/ProjectContent";
import ProjectGallery from "@/app/_components/projects/ProjectGallery";
import ProjectNav from "@/app/_components/projects/ProjectNav";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title?.de || "Project"} | Miriam Sparbrod`,
    description: project.tagline?.de || project.tagline?.en || "",
  };
}

export const revalidate = 60;

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <>
      <MenuDock />

      <main style={{ background: "var(--bg)" }}>
        <ProjectHero project={project} />
        <ProjectContent project={project} />
        <ProjectGallery images={project.images} />
        <ProjectNav
          prevProject={project.prevProject}
          nextProject={project.nextProject}
        />
      </main>

      <Footer />
    </>
  );
}
