// ─── BLOG POSTS ─────────────────────────────

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

// ─── PROJECT QUERIES ───

// All Projects
export const projectsQuery = `*[_type == "project"] | order(featured desc, order asc, completedAt desc) {
  _id,
  title,
  slug,
  tagline,
  coverImage,
  logo,
  demoGif,
  images,
  mediaType,
  technologies,
  projectType,
  status,
  featured,
  links,
  year,
  duration,
  completedAt
}`;

// Featured Projects (für Homepage)
export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc)[0...3] {
  _id,
  title,
  slug,
  tagline,
  coverImage,
  logo,
  mediaType,
  technologies,
  links
}`;

// Single Project
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  tagline,
  coverImage,
  logo,
  demoGif,
  videoDemo,
  images,
  mediaType,
  description,
  technologies,
  projectType,
  role,
  duration,
  teamSize,
  features,
  challenges,
  learnings,
  results,
  links,
  status,
  featured,
  completedAt,
  year,
  "nextProject": *[_type == "project" && _id != ^._id] | order(order asc)[0] {
    _id,
    title,
    slug,
    coverImage
  },
  "prevProject": *[_type == "project" && _id != ^._id] | order(order desc)[0] {
    _id,
    title,
    slug,
    coverImage
  }
}`;

// ─── CODE SNIPPETS ──────────────────────────

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

// ─── GARDEN ENTRIES ─────────────────────────

// Alle Garden Entries
export const allGardenEntriesQuery = `
  *[_type == "gardenEntry"] | order(lastTended desc, plantedAt desc) {
    _id,
    title,
    slug,
    plantedAt,
    lastTended,
    excerpt,
    mainImage,
    growthStage,
    "author": author->name,
    "categories": categories[]->title
  }
`;

// Einzelner Garden Entry
export const gardenEntryBySlugQuery = `
  *[_type == "gardenEntry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    plantedAt,
    lastTended,
    excerpt,
    mainImage,
    body,
    growthStage,
    seo,
    "author": author->{name, image, bio},
    "categories": categories[]->{title, slug, color},
    "connectedNotes": connectedNotes[]->{
      title,
      slug,
      excerpt,
      growthStage
    }
  }
`;

// Entries nach Growth Stage
export const gardenEntriesByStageQuery = `
  *[_type == "gardenEntry" && growthStage == $stage] | order(lastTended desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    growthStage,
    lastTended,
    plantedAt,
    "categories": categories[]->title
  }
`;
