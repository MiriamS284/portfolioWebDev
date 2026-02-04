import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity/queries";
import MenuDock from "../_components/layout/MenuDock";
import Footer from "../_components/layout/Footer";
import Container from "../_components/shared/Container";
import ProjectGrid from "../_components/projects/ProjectGrid";

export const metadata = {
  title: "Projekte | Miriam Sparbrod",
  description:
    "Full-Stack Projekte – von Web-Anwendungen bis APIs. MERN Stack, Next.js, TypeScript und mehr.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery);

  return (
    <>
      <MenuDock />

      <main className="py-20 md:py-32" style={{ background: "var(--bg)" }}>
        <Container>
          <div className="mb-16">
            <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
              Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Projekte</h1>
            <p className="text-lg md:text-xl opacity-80 max-w-3xl">
              Eine Auswahl meiner Arbeiten – von Full-Stack Web-Anwendungen bis
              zu Backend-APIs.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </Container>
      </main>

      <Footer />
    </>
  );
}
