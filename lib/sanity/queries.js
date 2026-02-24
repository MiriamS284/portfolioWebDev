// ─── CASE STUDIES (formerly Blog Posts) ─────────────────────────────
// Schema supports bilingual content: title.de/en, excerpt.de/en, body.de/en

export const allPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title {
      de,
      en
    },
    slug,
    excerpt {
      de,
      en
    },
    mainImage {
      ...,
      alt {
        de,
        en
      }
    },
    publishedAt,
    "author": author->{ name, image },
    "categories": categories[]->{ title, slug }
  }
`;

export const postBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title {
      de,
      en
    },
    slug,
    excerpt {
      de,
      en
    },
    body {
      de,
      en
    },
    mainImage {
      ...,
      alt {
        de,
        en
      }
    },
    publishedAt,
    seo {
      metaTitle {
        de,
        en
      },
      metaDescription {
        de,
        en
      }
    },
    "author": author->{ name, image },
    "categories": categories[]->{ title, slug }
  }
`;

export const featuredPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title {
      de,
      en
    },
    slug,
    publishedAt,
    excerpt {
      de,
      en
    },
    mainImage {
      ...,
      alt {
        de,
        en
      }
    },
    "author": author->name
  }
`;

// ─── PROJECT QUERIES ───

// All Projects (complete data for cards and modal)
export const projectsQuery = `*[_type == "project"] | order(featured desc, order asc, completedAt desc) {
  _id,
  title,
  slug,
  tagline,
  problem,
  solution,
  stack,
  coverImage,
  logo,
  demoGif,
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
  status,
  featured,
  links,
  year,
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
    logo,
    coverImage
  },
  "prevProject": *[_type == "project" && _id != ^._id] | order(order desc)[0] {
    _id,
    title,
    slug,
    logo,
    coverImage
  }
}`;

// ─── CODE SNIPPETS (GitHub-linked) ──────────────────────────

// All Snippets - For overview page
export const allSnippetsQuery = `
  *[_type == "codeSnippet"] | order(featured desc, publishedAt desc) {
    _id,
    icon,
    title {
      de,
      en
    },
    slug,
    description {
      de,
      en
    },
    category,
    useCase,
    githubUrl,
    demoGif,
    technologies,
    difficulty,
    featured,
    tags
  }
`;

// Single Snippet - Full detail for detail page
export const snippetBySlugQuery = `
  *[_type == "codeSnippet" && slug.current == $slug][0] {
    _id,
    icon,
    title {
      de,
      en
    },
    slug,
    description {
      de,
      en
    },
    category,
    useCase,
    githubUrl,
    demoLinks {
      liveDemoUrl,
      codepenUrl,
      stackblitzUrl
    },
    demoGif,
    screenshot,
    highlights {
      de,
      en
    },
    technologies,
    dependencies {
      required,
      devDependencies
    },
    installCommand,
    tags,
    difficulty,
    stats {
      linesOfCode,
      fileSize
    },
    usedIn,
    browserSupport {
      modern,
      ie11,
      mobile
    },
    featured,
    publishedAt,
    lastUpdated
  }
`;

// Featured Snippets - For homepage
export const featuredSnippetsQuery = `
  *[_type == "codeSnippet" && featured == true] | order(publishedAt desc)[0...4] {
    _id,
    icon,
    title {
      de,
      en
    },
    slug,
    description {
      de,
      en
    },
    category,
    githubUrl,
    technologies
  }
`;

// Snippet Categories - For sidebar filter
export const snippetCategoriesQuery = `
  array::unique(*[_type == "codeSnippet"].category)
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
