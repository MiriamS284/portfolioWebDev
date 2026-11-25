import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { pageMetadata, notFoundMetadata, pick } from "@/lib/seo";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import MenuDock from "@/app/_components/layout/MenuDock";
import Footer from "@/app/_components/layout/Footer";
import ProjectHero from "@/app/_components/projects/ProjectHero";
import ProjectContent from "@/app/_components/projects/ProjectContent";
import ProjectGallery from "@/app/_components/projects/ProjectGallery";
import ProjectNav from "@/app/_components/projects/ProjectNav";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    const t = await getTranslations({ locale, namespace: "seo" });
    return notFoundMetadata(t("notFound"));
  }

  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: pick(project.title, locale) || "Project",
    description: pick(project.tagline, locale),
    images: project.coverImage?.asset
      ? [urlFor(project.coverImage).width(1200).height(630).url()]
      : undefined,
  });
}

export const revalidate = 60;

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) notFound();

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
