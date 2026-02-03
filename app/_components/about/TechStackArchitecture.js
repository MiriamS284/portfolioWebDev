"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_providers/LanguageProvider";

export default function TechStackArchitecture() {
  const { lang } = useLanguage(); // ✅ FIXED!
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const texts = {
    de: {
      header: "Technische Expertise",
      title: "Software-Architektur",
      subtitle:
        "Full-Stack Entwicklung von Presentation bis Infrastructure – visualisiert als professionelle Software-Architektur",
      crossCutting: "Querschnittliche Belange",
      layerLabel: "Schicht",
    },
    en: {
      header: "Technical Expertise",
      title: "Software Architecture",
      subtitle:
        "Full-stack development from presentation to infrastructure – visualized as professional software architecture",
      crossCutting: "Cross-Cutting Concerns",
      layerLabel: "Layer",
    },
  };
  const t = texts[lang] || texts.de;

  const architecture = [
    {
      layer: {
        de: "Presentation Layer",
        en: "Presentation Layer",
      },
      description: {
        de: "Benutzeroberfläche & Client-Side",
        en: "User Interface & Client-Side",
      },
      technologies: [
        {
          name: "HTML5",
          desc: {
            de: "Semantisches Markup & Struktur",
            en: "Semantic markup & structure",
          },
        },
        {
          name: "CSS3",
          desc: {
            de: "Styling, Animationen & Layouts",
            en: "Styling, animations & layouts",
          },
        },
        {
          name: "JavaScript",
          desc: {
            de: "Client-Side Programmierung",
            en: "Core client-side programming",
          },
        },
        {
          name: "TypeScript",
          desc: {
            de: "Typsicheres JavaScript",
            en: "Type-safe JavaScript superset",
          },
        },
        {
          name: "React",
          desc: {
            de: "Komponentenbasierte UI-Library (meRn)",
            en: "Component-based UI library (meRn)",
          },
        },
        {
          name: "Next.js",
          desc: {
            de: "React Framework mit SSR/SSG",
            en: "React framework with SSR/SSG",
          },
        },
        {
          name: "Tailwind CSS",
          desc: {
            de: "Utility-First CSS Framework",
            en: "Utility-first CSS framework",
          },
        },
        {
          name: "Framer Motion",
          desc: {
            de: "Produktionsreife Animationen",
            en: "Production-ready animations",
          },
        },
        {
          name: "Chakra UI",
          desc: {
            de: "Zugängliche Komponenten-Bibliothek",
            en: "Accessible component library",
          },
        },
      ],
    },
    {
      layer: {
        de: "Web Server Layer",
        en: "Web Server Layer",
      },
      description: {
        de: "HTTP Server & Request Handling",
        en: "HTTP Servers & Request Handling",
      },
      technologies: [
        {
          name: "NGINX",
          desc: {
            de: "Hochperformanter Webserver & Reverse Proxy",
            en: "High-performance web server & reverse proxy",
          },
        },
        {
          name: "Express.js",
          desc: {
            de: "Minimalistisches Web-Framework (mErn)",
            en: "Minimalist web framework (mErn)",
          },
        },
        {
          name: "Windows Server",
          desc: {
            de: "Windows-basierte Serverumgebung",
            en: "Windows-based server environment",
          },
        },
        {
          name: "Linux (Ubuntu)",
          desc: {
            de: "Produktions-Server Betriebssystem",
            en: "Production server OS",
          },
        },
      ],
    },
    {
      layer: {
        de: "Application Layer",
        en: "Application Layer",
      },
      description: {
        de: "Business-Logik & API-Services",
        en: "Business Logic & API Services",
      },
      technologies: [
        {
          name: "Node.js",
          desc: {
            de: "JavaScript Runtime-Umgebung (merN)",
            en: "JavaScript runtime environment (merN)",
          },
        },
        {
          name: "Express",
          desc: {
            de: "Web-Application Framework (mErn)",
            en: "Web application framework (mErn)",
          },
        },
        {
          name: "PHP",
          desc: {
            de: "Server-seitige Skriptsprache",
            en: "Server-side scripting language",
          },
        },
        {
          name: "NestJS",
          desc: {
            de: "Progressives Node.js Framework",
            en: "Progressive Node.js framework",
          },
        },
        {
          name: "GraphQL",
          desc: {
            de: "Query-Sprache für APIs",
            en: "Query language for APIs",
          },
        },
        {
          name: "REST APIs",
          desc: {
            de: "RESTful Webservices",
            en: "RESTful web services",
          },
        },
      ],
    },
    {
      layer: {
        de: "Data Layer",
        en: "Data Layer",
      },
      description: {
        de: "Datenbanken & Content Management",
        en: "Databases & Content Management",
      },
      technologies: [
        {
          name: "MongoDB",
          desc: {
            de: "NoSQL Dokumenten-Datenbank (Mern)",
            en: "NoSQL document database (Mern)",
          },
        },
        {
          name: "PostgreSQL",
          desc: {
            de: "Fortgeschrittene relationale Datenbank",
            en: "Advanced relational database",
          },
        },
        {
          name: "MySQL",
          desc: {
            de: "Beliebte relationale Datenbank",
            en: "Popular relational database",
          },
        },
        {
          name: "Redis",
          desc: {
            de: "In-Memory Datenstruktur-Speicher",
            en: "In-memory data structure store",
          },
        },
        {
          name: "SQLite",
          desc: {
            de: "Leichtgewichtige eingebettete Datenbank",
            en: "Lightweight embedded database",
          },
        },
        {
          name: "Sanity CMS",
          desc: {
            de: "Headless CMS mit GROQ (aktiv genutzt)",
            en: "Headless CMS with GROQ (actively used)",
          },
        },
        {
          name: "Supabase",
          desc: {
            de: "Open-Source Firebase Alternative",
            en: "Open-source Firebase alternative",
          },
        },
        {
          name: "Contentful",
          desc: {
            de: "Enterprise Headless CMS",
            en: "Enterprise headless CMS",
          },
        },
        {
          name: "Strapi",
          desc: {
            de: "Open-Source Headless CMS",
            en: "Open-source headless CMS",
          },
        },
      ],
    },
    {
      layer: {
        de: "Infrastructure Layer",
        en: "Infrastructure Layer",
      },
      description: {
        de: "Deployment & Cloud-Services",
        en: "Deployment & Cloud Services",
      },
      technologies: [
        {
          name: "Vercel",
          desc: {
            de: "Serverless Deployment-Plattform",
            en: "Serverless deployment platform",
          },
        },
        {
          name: "Docker",
          desc: {
            de: "Container-Plattform",
            en: "Container platform",
          },
        },
        {
          name: "Kubernetes",
          desc: {
            de: "Container-Orchestrierung",
            en: "Container orchestration",
          },
        },
        {
          name: "AWS",
          desc: {
            de: "Cloud-Infrastruktur-Services",
            en: "Cloud infrastructure services",
          },
        },
        {
          name: "GitHub Actions",
          desc: {
            de: "CI/CD Automatisierung",
            en: "CI/CD automation",
          },
        },
      ],
    },
  ];

  const crossCutting = [
    {
      category: "Testing",
      items: [
        {
          name: "Jest",
          desc: {
            de: "JavaScript Testing-Framework",
            en: "JavaScript testing framework",
          },
        },
        {
          name: "Mocha",
          desc: {
            de: "Feature-reiches Test-Framework",
            en: "Feature-rich test framework",
          },
        },
        {
          name: "Cypress",
          desc: {
            de: "E2E Testing-Framework",
            en: "E2E testing framework",
          },
        },
        {
          name: "Playwright",
          desc: {
            de: "Cross-Browser Automatisierung",
            en: "Cross-browser automation",
          },
        },
        {
          name: "Lighthouse",
          desc: {
            de: "Performance & Qualitäts-Audits",
            en: "Performance & quality audits",
          },
        },
      ],
    },
    {
      category: "Security",
      items: [
        {
          name: "OWASP ZAP",
          desc: {
            de: "Sicherheitstest-Tool",
            en: "Security testing tool",
          },
        },
        {
          name: "Sentry",
          desc: {
            de: "Fehler-Tracking & Monitoring",
            en: "Error tracking & monitoring",
          },
        },
        {
          name: "Helmet.js",
          desc: {
            de: "Express Security-Middleware",
            en: "Express security middleware",
          },
        },
      ],
    },
    {
      category: "AI & Tools",
      items: [
        {
          name: "Claude Code",
          desc: {
            de: "KI-gestütztes Coding",
            en: "AI-powered coding",
          },
        },
        {
          name: "GitHub Copilot",
          desc: {
            de: "KI-Pair-Programmer",
            en: "AI pair programmer",
          },
        },
        {
          name: "json:api",
          desc: {
            de: "API-Spezifikations-Standard",
            en: "API specification standard",
          },
        },
      ],
    },
  ];

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            {t.header}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h2>
          <p className="text-lg opacity-80 max-w-3xl">{t.subtitle}</p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block mb-20">
          <div className="relative">
            {architecture.map((layer, idx) => (
              <div key={idx} className="mb-8">
                <div
                  className="relative rounded-lg p-6 transition-all duration-300 hover:border-[var(--accent)]"
                  style={{
                    border: "2px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--border)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ background: "var(--accent)" }}
                        />
                        <h3 className="text-xl font-bold font-mono">
                          {layer.layer[lang] || layer.layer.de}
                        </h3>
                      </div>
                      <p className="text-sm opacity-60 font-mono">
                        {layer.description[lang] || layer.description.de}
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
                      {t.layerLabel} {idx + 1}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {layer.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredSkill(tech)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div
                          className="px-4 py-2.5 rounded text-sm font-mono text-center cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-[var(--accent)]"
                          style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {tech.name}
                        </div>

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
                            {tech.desc[lang] || tech.desc.de}
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

        {/* Mobile */}
        <div className="lg:hidden space-y-6 mb-20">
          {architecture.map((layer, idx) => (
            <div
              key={idx}
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
                <h3 className="text-base font-bold font-mono">
                  {layer.layer[lang] || layer.layer.de}
                </h3>
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

        {/* Cross-Cutting */}
        <div className="border-t border-[var(--border)] pt-16">
          <h3 className="text-2xl font-bold mb-8 font-mono">
            {t.crossCutting}
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
                          {item.desc[lang] || item.desc.de}
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
