"use client";

import { useState } from "react";

export default function TechStackArchitecture() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const architecture = [
    {
      layer: "Presentation Layer",
      description: "User Interface & Client-Side",
      technologies: [
        { name: "HTML5", desc: "Semantic markup & structure" },
        { name: "CSS3", desc: "Styling, animations & layouts" },
        { name: "JavaScript", desc: "Core client-side programming" },
        { name: "TypeScript", desc: "Type-safe JavaScript superset" },
        { name: "React", desc: "Component-based UI library (meRn)" },
        { name: "Next.js", desc: "React framework with SSR/SSG" },
        { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
        { name: "Framer Motion", desc: "Production-ready animations" },
        { name: "Chakra UI", desc: "Accessible component library" },
      ],
    },
    {
      layer: "Web Server Layer",
      description: "HTTP Servers & Request Handling",
      technologies: [
        { name: "NGINX", desc: "High-performance web server & reverse proxy" },
        { name: "Express.js", desc: "Minimalist web framework (mErn)" },
        { name: "Windows Server", desc: "Windows-based server environment" },
        { name: "Linux (Ubuntu)", desc: "Production server OS" },
      ],
    },
    {
      layer: "Application Layer",
      description: "Business Logic & API Services",
      technologies: [
        { name: "Node.js", desc: "JavaScript runtime environment (merN)" },
        { name: "Express", desc: "Web application framework (mErn)" },
        { name: "PHP", desc: "Server-side scripting language" },
        { name: "NestJS", desc: "Progressive Node.js framework" },
        { name: "GraphQL", desc: "Query language for APIs" },
        { name: "REST APIs", desc: "RESTful web services" },
      ],
    },
    {
      layer: "Data Layer",
      description: "Databases & Content Management",
      technologies: [
        { name: "MongoDB", desc: "NoSQL document database (Mern)" },
        { name: "PostgreSQL", desc: "Advanced relational database" },
        { name: "MySQL", desc: "Popular relational database" },
        { name: "Redis", desc: "In-memory data structure store" },
        { name: "SQLite", desc: "Lightweight embedded database" },
        { name: "Sanity CMS", desc: "Headless CMS with GROQ (aktiv)" },
        { name: "Supabase", desc: "Open-source Firebase alternative" },
        { name: "Contentful", desc: "Enterprise headless CMS" },
        { name: "Strapi", desc: "Open-source headless CMS" },
      ],
    },
    {
      layer: "Infrastructure Layer",
      description: "Deployment & Cloud Services",
      technologies: [
        { name: "Vercel", desc: "Serverless deployment platform" },
        { name: "Docker", desc: "Container platform" },
        { name: "Kubernetes", desc: "Container orchestration" },
        { name: "AWS", desc: "Cloud infrastructure services" },
        { name: "GitHub Actions", desc: "CI/CD automation" },
      ],
    },
  ];

  const crossCutting = [
    {
      category: "Testing",
      items: [
        { name: "Jest", desc: "JavaScript testing framework" },
        { name: "Mocha", desc: "Feature-rich test framework" },
        { name: "Cypress", desc: "E2E testing framework" },
        { name: "Playwright", desc: "Cross-browser automation" },
        { name: "Lighthouse", desc: "Performance & quality audits" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "OWASP ZAP", desc: "Security testing tool" },
        { name: "Sentry", desc: "Error tracking & monitoring" },
        { name: "Helmet.js", desc: "Express security middleware" },
      ],
    },
    {
      category: "AI & Tools",
      items: [
        { name: "OpenAI API", desc: "GPT integration" },
        { name: "GitHub Copilot", desc: "AI pair programmer" },
        { name: "json:api", desc: "API specification standard" },
      ],
    },
  ];

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            Technical Expertise
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Software Architecture
          </h2>
          <p className="text-lg opacity-80 max-w-3xl">
            Full-Stack Entwicklung von der Presentation bis zur Infrastructure –
            visualisiert als professionelle Software-Architektur
          </p>
        </div>

        {/* Architecture Diagram - Desktop */}
        <div className="hidden lg:block mb-20">
          <div className="relative">
            {architecture.map((layer, idx) => (
              <div key={layer.layer} className="mb-8">
                {/* Layer Box */}
                <div
                  className="relative rounded-lg p-6 transition-all duration-300"
                  style={{
                    border: "2px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  {/* Layer Header */}
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--border)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ background: "var(--accent)" }}
                        />
                        <h3 className="text-xl font-bold font-mono">
                          {layer.layer}
                        </h3>
                      </div>
                      <p className="text-sm opacity-60 font-mono">
                        {layer.description}
                      </p>
                    </div>
                    <div
                      className="text-xs font-mono px-3 py-1 rounded"
                      style={{
                        background:
                          "color-mix(in oklch, var(--accent), transparent 90%)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      Layer {idx + 1}
                    </div>
                  </div>

                  {/* Technologies Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {layer.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredSkill(tech)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div
                          className="px-4 py-2.5 rounded text-sm font-mono text-center cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {tech.name}
                        </div>

                        {/* Tooltip */}
                        {hoveredSkill?.name === tech.name && (
                          <div
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 rounded text-xs font-mono whitespace-nowrap z-50 pointer-events-none"
                            style={{
                              background: "var(--ink)",
                              color: "var(--bg)",
                              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                              animation: "slideDown 0.2s ease-out",
                            }}
                          >
                            {tech.desc}
                            <div
                              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                              style={{
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid var(--ink)",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Arrow */}
                {idx < architecture.length - 1 && (
                  <div className="flex justify-center my-6">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-0.5 h-8"
                        style={{ background: "var(--border)" }}
                      />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ opacity: 0.6 }}
                      >
                        <path
                          d="M10 2 L10 18 M5 13 L10 18 L15 13"
                          stroke="var(--border)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram - Mobile (Stacked) */}
        <div className="lg:hidden space-y-6 mb-20">
          {architecture.map((layer) => (
            <div
              key={layer.layer}
              className="rounded-lg p-5"
              style={{
                border: "2px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ background: "var(--accent)" }}
                />
                <h3 className="text-base font-bold font-mono">{layer.layer}</h3>
              </div>
              <div className="space-y-2">
                {layer.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="px-3 py-2 rounded text-sm font-mono"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Cutting Concerns */}
        <div className="border-t border-[var(--border)] pt-16">
          <h3 className="text-2xl font-bold mb-8 font-mono">
            Cross-Cutting Concerns
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {crossCutting.map((section) => (
              <div
                key={section.category}
                className="rounded-lg p-6"
                style={{
                  border: "2px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <h4 className="text-lg font-bold mb-4 font-mono flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ background: "var(--accent)" }}
                  />
                  {section.category}
                </h4>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div
                        className="px-3 py-2 rounded text-sm font-mono cursor-pointer transition-all hover:scale-[1.02]"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {item.name}
                      </div>

                      {hoveredSkill?.name === item.name && (
                        <div
                          className="absolute left-0 bottom-full mb-2 px-4 py-2 rounded text-xs font-mono whitespace-nowrap z-50 pointer-events-none"
                          style={{
                            background: "var(--ink)",
                            color: "var(--bg)",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                          }}
                        >
                          {item.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -5px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </section>
  );
}
