// app/sitemap.js
// Alle Seiten in beiden Sprachen mit hreflang-Alternativen.
// lastModified kommt bei Inhalten aus Sanity (_updatedAt); statische Seiten
// bekommen kein Datum, damit Suchmaschinen kein falsches "geändert" sehen.
import { client } from "@/lib/sanity";
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "@/lib/seo";

const contentQuery = `{
  "caseStudies": *[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt },
  "projects": *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt },
  "garden": *[_type == "gardenEntry" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt },
  "snippets": *[_type == "codeSnippet" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }
}`;

function entries(path, { changeFrequency = "monthly", priority = 0.5, lastModified } = {}) {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]));
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap() {
  const data = (await client.fetch(contentQuery)) || {};

  const staticPages = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/garden", changeFrequency: "weekly", priority: 0.5 },
    { path: "/snippets", changeFrequency: "monthly", priority: 0.4 },
    { path: "/imprint", changeFrequency: "yearly", priority: 0.2 },
    { path: "/privatepolicy", changeFrequency: "yearly", priority: 0.2 },
  ];

  const dynamic = [
    ["case-studies", data.caseStudies, 0.8],
    ["projects", data.projects, 0.7],
    ["garden", data.garden, 0.5],
    ["snippets", data.snippets, 0.4],
  ];

  return [
    ...staticPages.flatMap(({ path, ...o }) => entries(path, o)),
    ...dynamic.flatMap(([base, items, priority]) =>
      (items || []).map((item) =>
        entries(`/${base}/${item.slug}`, {
          priority,
          lastModified: item._updatedAt,
        }),
      ).flat(),
    ),
  ];
}
