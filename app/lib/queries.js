// ============================================
// GROQ QUERIES für Sanity
// ============================================

// ─── BLOG POSTS ─────────────────────────────

// Alle Blog-Posts holen (mit Author & Categories)
export const allPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title
  }
`;

// Einzelner Blog-Post (mit vollem Content)
export const postBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    seo,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, slug, color}
  }
`;

// Nur die neuesten 3 Posts (für Homepage)
export const featuredPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->name
  }
`;

// ─── PROJECTS ───────────────────────────────

// Alle Projekte
export const allProjectsQuery = `
  *[_type == "project"] | order(order asc, completedAt desc) {
    _id,
    title,
    slug,
    tagline,
    coverImage,
    technologies,
    projectType,
    featured,
    status
  }
`;

// Einzelnes Projekt (vollständig)
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    coverImage,
    images,
    description,
    technologies,
    projectType,
    role,
    duration,
    teamSize,
    features,
    challenges,
    links,
    status,
    completedAt
  }
`;

// Nur Featured Projects (für Homepage)
export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(order asc)[0...3] {
    _id,
    title,
    slug,
    tagline,
    coverImage,
    technologies,
    projectType
  }
`;

// ─── CODE SNIPPETS ──────────────────────────

// Alle Code Snippets
export const allSnippetsQuery = `
  *[_type == "codeSnippet"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    language,
    tags,
    difficulty,
    featured
  }
`;

// Einzelnes Code Snippet
export const snippetBySlugQuery = `
  *[_type == "codeSnippet" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category,
    language,
    code,
    tags,
    explanation,
    usage,
    dependencies,
    difficulty,
    "relatedSnippets": relatedSnippets[]->{
      title,
      slug,
      language
    }
  }
`;

// Featured Snippets (für Homepage)
export const featuredSnippetsQuery = `
  *[_type == "codeSnippet" && featured == true] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    description,
    language,
    tags
  }
`;

// ─── AUTHOR ─────────────────────────────────

// Deine Author-Daten
export const authorQuery = `
  *[_type == "author"][0] {
    name,
    slug,
    image,
    bio,
    email,
    github,
    linkedin
  }
`;