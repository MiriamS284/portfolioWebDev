import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity/queries";
import Footer from "@/app/_components/layout/Footer";
import ProjectGrid from "@/app/_components/projects/ProjectGrid";
import ProjectsHeader from "@/app/_components/projects/ProjectsHeader";
import BackLink from "@/app/_components/shared/BackLink";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.projects" });
  return pageMetadata({
    locale,
    path: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery);

  return (
    <>

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
