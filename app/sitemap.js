// app/sitemap.js
import { client } from "@/lib/sanity";
import {
  allPostsQuery,
  allGardenEntriesQuery,
  allSnippetsQuery,
  projectsQuery,
} from "@/lib/sanity/queries";

const BASE_URL = "https://miriamsparbrod.dev";
const locales = ["de", "en"];

function generateLocalizedUrls(path, options = {}) {
  const { changeFrequency = "monthly", priority = 0.5 } = options;

  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        de: `${BASE_URL}/de${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  }));
}

export default async function sitemap() {
  const [posts, gardenEntries, snippets, projects] = await Promise.all([
    client.fetch(allPostsQuery),
    client.fetch(allGardenEntriesQuery),
    client.fetch(allSnippetsQuery),
    client.fetch(projectsQuery),
  ]);

  // Static pages
  const staticPages = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { path: "/case-studies", changeFrequency: "monthly", priority: 0.7 },
    { path: "/garden", changeFrequency: "weekly", priority: 0.6 },
    { path: "/snippets", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/imprint", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privatepolicy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticUrls = staticPages.flatMap(
    ({ path, changeFrequency, priority }) =>
      generateLocalizedUrls(path, { changeFrequency, priority }),
  );

  // Dynamic content pages
  const caseStudyUrls = posts.flatMap(({ slug }) =>
    generateLocalizedUrls(`/case-studies/${slug.current}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const gardenUrls = gardenEntries.flatMap(({ slug }) =>
    generateLocalizedUrls(`/garden/${slug.current}`, {
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  const snippetUrls = snippets.flatMap(({ slug }) =>
    generateLocalizedUrls(`/snippets/${slug.current}`, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const projectUrls = projects.flatMap(({ slug }) =>
    generateLocalizedUrls(`/projects/${slug.current}`, {
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    ...staticUrls,
    ...caseStudyUrls,
    ...gardenUrls,
    ...snippetUrls,
    ...projectUrls,
  ];
}
