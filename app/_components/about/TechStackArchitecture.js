"use client";

import { useTranslations } from "next-intl";

export default function TechStackArchitecture() {
  const t = useTranslations("techStack");

  // Architecture layers - vollständig
  const architecture = [
    {
      layer: "Presentation",
      technologies: [
        {
          name: "HTML5",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        },
        {
          name: "CSS3",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
          name: "JavaScript",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        { name: "TypeScript", url: "https://www.typescriptlang.org/" },
        { name: "React", url: "https://react.dev/" },
        { name: "Next.js", url: "https://nextjs.org/" },
        { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
        { name: "Framer Motion", url: "https://www.framer.com/motion/" },
        { name: "Chakra UI", url: "https://chakra-ui.com/" },
      ],
    },
    {
      layer: "Web Server",
      technologies: [
        { name: "NGINX", url: "https://nginx.org/" },
        { name: "Express.js", url: "https://expressjs.com/" },
        {
          name: "Windows Server",
          url: "https://www.microsoft.com/en-us/windows-server",
        },
        { name: "Linux (Ubuntu)", url: "https://ubuntu.com/" },
      ],
    },
    {
      layer: "Application",
      technologies: [
        { name: "Node.js", url: "https://nodejs.org/" },
        { name: "Express", url: "https://expressjs.com/" },
        { name: "PHP", url: "https://www.php.net/" },
        { name: "NestJS", url: "https://nestjs.com/" },
        { name: "GraphQL", url: "https://graphql.org/" },
        { name: "REST APIs", url: "https://restfulapi.net/" },
      ],
    },
    {
      layer: "Data",
      technologies: [
        { name: "MongoDB", url: "https://www.mongodb.com/" },
        { name: "PostgreSQL", url: "https://www.postgresql.org/" },
        { name: "MySQL", url: "https://www.mysql.com/" },
        { name: "Redis", url: "https://redis.io/" },
        { name: "SQLite", url: "https://www.sqlite.org/" },
        { name: "Sanity CMS", url: "https://www.sanity.io/" },
        { name: "Supabase", url: "https://supabase.com/" },
        { name: "Contentful", url: "https://www.contentful.com/" },
        { name: "Strapi", url: "https://strapi.io/" },
      ],
    },
    {
      layer: "Infrastructure",
      technologies: [
        { name: "Vercel", url: "https://vercel.com/" },
        { name: "Docker", url: "https://www.docker.com/" },
        { name: "Kubernetes", url: "https://kubernetes.io/" },
        { name: "AWS", url: "https://aws.amazon.com/" },
        { name: "GitHub Actions", url: "https://github.com/features/actions" },
      ],
    },
  ];

  const crossCutting = [
    {
      name: "Testing",
      items: [
        { name: "Jest", url: "https://jestjs.io/" },
        { name: "Mocha", url: "https://mochajs.org/" },
        { name: "Cypress", url: "https://www.cypress.io/" },
        { name: "Playwright", url: "https://playwright.dev/" },
        {
          name: "Lighthouse",
          url: "https://developer.chrome.com/docs/lighthouse/",
        },
      ],
    },
    {
      name: "Security",
      items: [
        { name: "OWASP ZAP", url: "https://www.zaproxy.org/" },
        { name: "Sentry", url: "https://sentry.io/" },
        { name: "Helmet.js", url: "https://helmetjs.github.io/" },
      ],
    },
    {
      name: "AI & Automation",
      items: [
        { name: "Claude Code", url: "https://claude.ai/" },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "json:api", url: "https://jsonapi.org/" },
      ],
    },
  ];

  const tools = [
    {
      category: "Animation",
      items: [
        { name: "Framer Motion", url: "https://www.framer.com/motion/" },
        { name: "GSAP", url: "https://greensock.com/gsap/" },
        { name: "Three.js", url: "https://threejs.org/" },
        { name: "React Spring", url: "https://www.react-spring.dev/" },
      ],
    },
    {
      category: "Design",
      items: [
        { name: "Figma", url: "https://www.figma.com/" },
        { name: "Excalidraw", url: "https://excalidraw.com/" },
        { name: "Lucide Icons", url: "https://lucide.dev/" },
        { name: "Coolors", url: "https://coolors.co/" },
      ],
    },
    {
      category: "Dev Tools",
      items: [
        { name: "VS Code", url: "https://code.visualstudio.com/" },
        { name: "Postman", url: "https://www.postman.com/" },
        { name: "Git", url: "https://git-scm.com/" },
        { name: "ESLint", url: "https://eslint.org/" },
        { name: "Prettier", url: "https://prettier.io/" },
      ],
    },
    {
      category: "Learning",
      items: [
        { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
        { name: "React Docs", url: "https://react.dev/" },
        { name: "Stack Overflow", url: "https://stackoverflow.com/" },
        { name: "DevDocs", url: "https://devdocs.io/" },
      ],
    },
    {
      category: "Performance",
      items: [
        {
          name: "Lighthouse",
          url: "https://developer.chrome.com/docs/lighthouse/",
        },
        {
          name: "Bundle Analyzer",
          url: "https://www.npmjs.com/package/webpack-bundle-analyzer",
        },
        { name: "WebPageTest", url: "https://www.webpagetest.org/" },
      ],
    },
    {
      category: "Productivity",
      items: [
        { name: "Notion", url: "https://www.notion.so/" },
        { name: "Linear", url: "https://linear.app/" },
        { name: "Raycast", url: "https://www.raycast.com/" },
      ],
    },
  ];

  return (
    <div className="mt-16 space-y-16">
      <header>
        <h2
          className="text-sm font-medium mb-2 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("title")}
        </h2>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          {t("subtitle")}
        </p>
      </header>

      <div className="space-y-0">
        {architecture.map((layer, idx) => (
          <div key={layer.layer} className="relative">
            <div
              className="py-5 px-4 border-l-2 border-r-2 first:border-t-2 last:border-b-2 first:rounded-t-lg last:rounded-b-lg"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--muted)", opacity: 0.5 }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--ink)" }}
                >
                  {layer.layer}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 pl-8">
                {layer.technologies.map((tech) => (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--muted)" }}
                  >
                    {tech.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3
          className="text-sm font-medium mb-6 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("crossCutting")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {crossCutting.map((concern) => (
            <div key={concern.name}>
              <span
                className="text-xs font-medium block mb-3"
                style={{ color: "var(--ink)" }}
              >
                {concern.name}
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {concern.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-sm font-medium mb-6 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t("tools")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((section) => (
            <div key={section.category}>
              <span
                className="text-xs font-medium block mb-3"
                style={{ color: "var(--ink)" }}
              >
                {section.category}
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
