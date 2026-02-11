"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/app/_context/LanguageProvider";
import {
  FadeInOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/app/_components/shared/ParallaxSection";

export default function TechStackArchitecture() {
  const { lang } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const texts = {
    de: {
      header: "Technische Expertise",
      title: "Tech Stack",
      subtitle:
        "Mit welchen Sprachen, Franeworks, Tools & Infrastrukturen ich arbeite",
      crossCutting: "Querschnittliche Belange",
      layerLabel: "Schicht",
    },
    en: {
      header: "Technical Expertise",
      title: "Tech Stack",
      subtitle:
        "Programming Languages, Frameworks, Tools & Infrastructures I work with",
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
      category: "AI & Automation",
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

  const toolsResources = [
    {
      category: {
        de: "Animation & Motion",
        en: "Animation & Motion",
      },
      items: [
        {
          name: "Framer Motion",
          desc: {
            de: "Production-ready React Animations",
            en: "Production-ready React animations",
          },
          url: "https://www.framer.com/motion/",
        },
        {
          name: "GSAP",
          desc: {
            de: "Professionelle JavaScript Animationen",
            en: "Professional JavaScript animations",
          },
          url: "https://greensock.com/gsap/",
        },
        {
          name: "Three.js",
          desc: {
            de: "3D WebGL Library",
            en: "3D WebGL library",
          },
          url: "https://threejs.org/",
        },
        {
          name: "React Spring",
          desc: {
            de: "Spring-Physics basierte Animationen",
            en: "Spring-physics based animations",
          },
          url: "https://www.react-spring.dev/",
        },
      ],
    },
    {
      category: {
        de: "UI & Design Tools",
        en: "UI & Design Tools",
      },
      items: [
        {
          name: "Figma",
          desc: {
            de: "Collaborative Design Tool",
            en: "Collaborative design tool",
          },
          url: "https://www.figma.com/",
        },
        {
          name: "Excalidraw",
          desc: {
            de: "Virtuelle Whiteboard-Skizzen",
            en: "Virtual whiteboard sketching",
          },
          url: "https://excalidraw.com/",
        },
        {
          name: "Lucide Icons",
          desc: {
            de: "Beautiful Open-Source Icons",
            en: "Beautiful open-source icons",
          },
          url: "https://lucide.dev/",
        },
        {
          name: "Coolors",
          desc: {
            de: "Farbpaletten-Generator",
            en: "Color palette generator",
          },
          url: "https://coolors.co/",
        },
      ],
    },
    {
      category: {
        de: "Developer Tools",
        en: "Developer Tools",
      },
      items: [
        {
          name: "VS Code",
          desc: {
            de: "Hauptentwicklungsumgebung",
            en: "Primary development environment",
          },
          url: "https://code.visualstudio.com/",
        },
        {
          name: "Postman",
          desc: {
            de: "API Testing & Development",
            en: "API testing & development",
          },
          url: "https://www.postman.com/",
        },
        {
          name: "Git",
          desc: {
            de: "Versionskontrolle",
            en: "Version control system",
          },
          url: "https://git-scm.com/",
        },
        {
          name: "ESLint",
          desc: {
            de: "JavaScript Code Linting",
            en: "JavaScript code linting",
          },
          url: "https://eslint.org/",
        },
        {
          name: "Prettier",
          desc: {
            de: "Code Formatter",
            en: "Code formatter",
          },
          url: "https://prettier.io/",
        },
      ],
    },
    {
      category: {
        de: "Learning & Documentation",
        en: "Learning & Documentation",
      },
      items: [
        {
          name: "MDN Web Docs",
          desc: {
            de: "Web-Entwicklungs-Dokumentation",
            en: "Web development documentation",
          },
          url: "https://developer.mozilla.org/",
        },
        {
          name: "React Docs",
          desc: {
            de: "Offizielle React Dokumentation",
            en: "Official React documentation",
          },
          url: "https://react.dev/",
        },
        {
          name: "Stack Overflow",
          desc: {
            de: "Developer Community Q&A",
            en: "Developer community Q&A",
          },
          url: "https://stackoverflow.com/",
        },
        {
          name: "DevDocs",
          desc: {
            de: "API-Dokumentation zusammengeführt",
            en: "API documentation aggregator",
          },
          url: "https://devdocs.io/",
        },
      ],
    },
    {
      category: {
        de: "Performance & Analytics",
        en: "Performance & Analytics",
      },
      items: [
        {
          name: "Lighthouse",
          desc: {
            de: "Performance Auditing",
            en: "Performance auditing",
          },
          url: "https://developer.chrome.com/docs/lighthouse/",
        },
        {
          name: "Bundle Analyzer",
          desc: {
            de: "Webpack Bundle Visualisierung",
            en: "Webpack bundle visualization",
          },
          url: "https://www.npmjs.com/package/webpack-bundle-analyzer",
        },
        {
          name: "WebPageTest",
          desc: {
            de: "Website Performance Testing",
            en: "Website performance testing",
          },
          url: "https://www.webpagetest.org/",
        },
      ],
    },
    {
      category: {
        de: "Productivity",
        en: "Productivity",
      },
      items: [
        {
          name: "Notion",
          desc: {
            de: "Projekt- & Wissensmanagement",
            en: "Project & knowledge management",
          },
          url: "https://www.notion.so/",
        },
        {
          name: "Linear",
          desc: {
            de: "Issue Tracking für Software Teams",
            en: "Issue tracking for software teams",
          },
          url: "https://linear.app/",
        },
        {
          name: "Raycast",
          desc: {
            de: "Productivity Launcher (macOS)",
            en: "Productivity launcher (macOS)",
          },
          url: "https://www.raycast.com/",
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInOnScroll>
          <div className="mb-16">
            <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
              {t.header}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h2>
            <p className="text-lg opacity-80 max-w-3xl">{t.subtitle}</p>
          </div>
        </FadeInOnScroll>

        <div className="hidden lg:block mb-20">
          <div className="relative">
            {architecture.map((layer, idx) => (
              <FadeInOnScroll key={idx} delay={idx * 0.1}>
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-lg p-6 transition-all duration-300"
                    style={{
                      border: "2px solid var(--border)",
                      background: "var(--surface)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--border)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: idx * 0.1 + 0.2,
                              type: "spring",
                            }}
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

                    <StaggerChildren
                      staggerDelay={0.03}
                      className="grid grid-cols-3 gap-3"
                    >
                      {layer.technologies.map((tech) => (
                        <StaggerItem key={tech.name}>
                          <div
                            className="relative group"
                            onMouseEnter={() => setHoveredSkill(tech)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.03, y: -2 }}
                              className="px-4 py-2.5 rounded text-sm font-mono text-center cursor-pointer transition-colors"
                              style={{
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              {tech.name}
                            </motion.div>

                            {hoveredSkill?.name === tech.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 rounded text-xs font-mono whitespace-nowrap z-50 pointer-events-none"
                                style={{
                                  background: "var(--ink)",
                                  color: "var(--bg)",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
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
                              </motion.div>
                            )}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </motion.div>

                  {idx < architecture.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center my-6"
                    >
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
                    </motion.div>
                  )}
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-6 mb-20">
          {architecture.map((layer, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 0.05}>
              <div
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
                  {layer.technologies.map((tech, techIdx) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: techIdx * 0.03 }}
                      className="px-3 py-2 rounded text-sm font-mono"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {tech.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.2}>
          <div className="border-t border-[var(--border)] pt-16">
            <h3 className="text-2xl font-bold mb-8 font-mono">
              {t.crossCutting}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {crossCutting.map((section, sectionIdx) => (
                <FadeInOnScroll
                  key={section.category}
                  delay={sectionIdx * 0.1}
                  direction="up"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg p-6 h-full"
                    style={{
                      border: "2px solid var(--border)",
                      background: "var(--surface)",
                    }}
                  >
                    <h4 className="text-lg font-bold mb-4 font-mono flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-2 h-2 rounded-sm"
                        style={{ background: "var(--accent)" }}
                      />
                      {section.category}
                    </h4>
                    <StaggerChildren staggerDelay={0.05} className="space-y-2">
                      {section.items.map((item) => (
                        <StaggerItem key={item.name}>
                          <div
                            className="relative group"
                            onMouseEnter={() => setHoveredSkill(item)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="px-3 py-2 rounded text-sm font-mono cursor-pointer"
                              style={{
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              {item.name}
                            </motion.div>

                            {hoveredSkill?.name === item.name && (
                              <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-4 py-2 rounded text-xs font-mono whitespace-nowrap z-50 pointer-events-none"
                                style={{
                                  background: "var(--ink)",
                                  color: "var(--bg)",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                                }}
                              >
                                {item.desc[lang] || item.desc.de}
                              </motion.div>
                            )}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Tools & Resources Section */}
        <FadeInOnScroll delay={0.3}>
          <div className="border-t border-[var(--border)] pt-16 mt-16">
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-4 font-mono">
                {lang === "de" ? "Tools & Ressourcen" : "Tools & Resources"}
              </h3>
              <p className="text-lg opacity-70">
                {lang === "de"
                  ? "Nützliche Werkzeuge, Libraries und Ressourcen, die ich täglich nutze"
                  : "Useful tools, libraries, and resources I use daily"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsResources.map((section, sectionIdx) => (
                <FadeInOnScroll
                  key={section.category[lang] || section.category.de}
                  delay={sectionIdx * 0.1}
                  direction="up"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg p-6 h-full"
                    style={{
                      border: "2px solid var(--border)",
                      background: "var(--surface)",
                    }}
                  >
                    {/* Category Header - OHNE Icon */}
                    <h4 className="text-lg font-bold mb-4 font-mono flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-2 h-2 rounded-sm"
                        style={{ background: "var(--accent)" }}
                      />
                      {section.category[lang] || section.category.de}
                    </h4>

                    {/* Tools List */}
                    <StaggerChildren staggerDelay={0.05} className="space-y-3">
                      {section.items.map((item) => (
                        <StaggerItem key={item.name}>
                          <motion.a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, x: 4 }}
                            className="block group"
                          >
                            <div
                              className="px-4 py-3 rounded-lg transition-all duration-200"
                              style={{
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="font-mono font-medium text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">
                                    {item.name}
                                  </div>
                                  <div
                                    className="text-xs leading-relaxed"
                                    style={{
                                      color: "var(--muted)",
                                      opacity: 0.7,
                                    }}
                                  >
                                    {item.desc[lang] || item.desc.de}
                                  </div>
                                </div>
                                <svg
                                  className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  style={{ color: "var(--accent)" }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </div>
                            </div>
                          </motion.a>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
