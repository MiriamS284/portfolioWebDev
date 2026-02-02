import Link from "next/link";
import Container from "../shared/Container";

export default function FeaturedProjects() {
  // Später: Daten aus Sanity holen
  const projects = [
    {
      id: 1,
      title: "B2B SaaS Platform",
      description:
        "Personal Trainer Management System mit Next.js, Supabase & Tailwind",
      tags: ["Next.js", "React", "Supabase"],
      slug: "b2b-saas-platform",
    },
    {
      id: 2,
      title: "Portfolio mit CMS",
      description:
        "Modernes Portfolio mit Sanity Headless CMS & Digital Garden",
      tags: ["Next.js", "Sanity", "OKLCH"],
      slug: "portfolio-cms",
    },
    {
      id: 3,
      title: "React Component Library",
      description: "Wiederverwendbare UI-Komponenten nach DRY-Prinzipien",
      tags: ["React", "TypeScript", "Storybook"],
      slug: "component-library",
    },
  ];

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--surface)", color: "var(--ink)" }}
    >
      <Container size="large">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            Featured Work
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ausgewählte Projekte
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Von Konzept über Prototyp bis Launch – hier sind einige meiner
            liebsten Arbeiten
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-lg font-medium hover:text-[var(--accent-strong)] transition-colors"
          >
            Alle Projekte ansehen
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l3-3-3-3m6 0H6" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl p-8 transition-all surface-card"
    >
      {/* Tags */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: "color-mix(in oklch, var(--accent), transparent 90%)",
              color: "var(--ink)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent-strong)] transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm opacity-75 leading-relaxed">
        {project.description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-60 group-hover:opacity-100 group-hover:gap-3 transition-all">
        View Project
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 12l4-4-4-4" />
        </svg>
      </div>
    </Link>
  );
}
