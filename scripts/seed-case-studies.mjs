/**
 * Seed Case Studies as drafts in Sanity
 *
 * Usage:
 *   node scripts/seed-case-studies.mjs --dry-run   # Preview without writing
 *   node scripts/seed-case-studies.mjs             # Create drafts in Sanity
 *   node scripts/seed-case-studies.mjs --only=slug # Only process one slug
 *
 * Requires SANITY_API_TOKEN in .env.local (never commit this token!)
 */

import { createClient } from "@sanity/client";
import { generateKey, markdownToPortableText } from "./lib/markdown-to-portable-text.mjs";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // File not found is OK in dry-run mode
  }
}

loadEnv(join(__dirname, "..", ".env.local"));

const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_SLUG = process.argv.find(a => a.startsWith("--only="))?.slice(7);

// ─── Sanity Client ───────────────────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Case Study Data ─────────────────────────────────────────────────────────
// Single source of truth: docs/relaunch/case-studies.md

// Leistungsbereiche = category-Dokumente (Typ wird auch vom Digital Garden genutzt).
// Sie werden nur angelegt, wenn sie noch nicht existieren (createIfNotExists),
// Änderungen im Studio bleiben also erhalten.
const LEISTUNGSBEREICHE = {
  "fachanwendungen-und-crm": { de: "Fachanwendungen und CRM", en: "Business applications and CRM" },
  "portale-und-plattformen": { de: "Portale und Plattformen", en: "Portals and platforms" },
  "mobile-anwendungen": { de: "Mobile Anwendungen", en: "Mobile applications" },
  "abloesung-bestehender-systeme": { de: "Ablösung bestehender Systeme", en: "Replacing existing systems" },
  "ki-und-automatisierung": { de: "KI und Automatisierung", en: "AI and automation" },
  "wartung-und-weiterentwicklung": { de: "Wartung und Weiterentwicklung", en: "Maintenance and further development" },
};

const categoryId = (slug) => `category-leistung-${slug}`;

function buildCategoryDocuments() {
  return Object.entries(LEISTUNGSBEREICHE).map(([slug, t]) => ({
    _id: categoryId(slug),
    _type: "category",
    title: t.de,
    titleEn: t.en,
    slug: { _type: "slug", current: slug },
    description: "Leistungsbereich (Case Studies)",
  }));
}

function parseCaseStudies(markdown) {
  return markdown
    .split(/^# Case Study \d+\s*$/m)
    .slice(1)
    .map((chunk) => {
      const slug = chunk.match(/^slug:\s*(\S+)/m)?.[1];
      const categories = (chunk.match(/^categories:\s*(.+)$/m)?.[1] || "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      for (const c of categories)
        if (!LEISTUNGSBEREICHE[c]) throw new Error(`${slug}: unknown category "${c}"`);
      const fields = {};
      const parts = chunk.split(/^## (title|excerpt|body)\.(de|en)\s*$/m);
      for (let i = 1; i < parts.length; i += 3) {
        const [field, lang, value] = [parts[i], parts[i + 1], parts[i + 2]];
        fields[field] ??= {};
        fields[field][lang] = value.replace(/\n---\s*$/, "").trim();
      }
      if (!slug) throw new Error("Case study without slug");
      for (const f of ["title", "excerpt", "body"])
        for (const l of ["de", "en"])
          if (!fields[f]?.[l]) throw new Error(`${slug}: missing ${f}.${l}`);
      if (fields.title.de.length > 100 || fields.title.en.length > 100)
        throw new Error(`${slug}: title longer than 100 characters`);
      if (fields.excerpt.de.length > 200 || fields.excerpt.en.length > 200)
        throw new Error(`${slug}: excerpt longer than 200 characters`);
      return { slug, categories, ...fields };
    });
}

const caseStudies = parseCaseStudies(
  readFileSync(join(__dirname, "..", "docs", "relaunch", "case-studies.md"), "utf8")
);

// ─── Build Sanity Documents ──────────────────────────────────────────────────

function buildDocuments() {
  return caseStudies.map((cs) => ({
    _id: `drafts.${cs.slug}`,
    _type: "blogPost",
    title: { de: cs.title.de, en: cs.title.en },
    slug: { _type: "slug", current: cs.slug },
    excerpt: { de: cs.excerpt.de, en: cs.excerpt.en },
    body: { de: markdownToPortableText(cs.body.de), en: markdownToPortableText(cs.body.en) },
    categories: cs.categories.map((c) => ({
      _type: "reference",
      _ref: categoryId(c),
      _key: generateKey(),
    })),
  }));
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  if (!DRY_RUN && !process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN in .env.local (required for write)");
    process.exit(1);
  }

  let documents = buildDocuments();

  if (ONLY_SLUG) {
    documents = documents.filter((d) => d.slug.current === ONLY_SLUG);
    if (documents.length === 0) {
      console.error(`No case study found with slug: ${ONLY_SLUG}`);
      process.exit(1);
    }
  }

  console.log(`\n📄 ${documents.length} Case Stud${documents.length === 1 ? "y" : "ies"} prepared\n`);
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (no changes)" : "LIVE (will create drafts)"}\n`);

  for (const doc of documents) {
    console.log(`─────────────────────────────────────────────────────────`);
    console.log(`ID:    ${doc._id}`);
    console.log(`Slug:  ${doc.slug.current}`);
    console.log(`Title: ${doc.title.de}`);
        console.log(`Body DE: ${doc.body.de.length} blocks`);
    console.log(`Body EN: ${doc.body.en.length} blocks`);
    console.log(`Leistungsbereiche: ${doc.categories.map((c) => c._ref.replace("category-leistung-", "")).join(", ")}`);
  }

  console.log(`─────────────────────────────────────────────────────────\n`);

  if (DRY_RUN) {
    console.log("🔍 DRY RUN complete. Run without --dry-run to create drafts.\n");
    return;
  }

  console.log("Creating drafts in Sanity...\n");

  const transaction = client.transaction();
  for (const cat of buildCategoryDocuments()) transaction.createIfNotExists(cat);
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  try {
    const result = await transaction.commit();
    console.log(`✅ Created ${result.documentIds.length} drafts:\n`);
    for (const id of result.documentIds) {
      console.log(`   ${id}`);
    }
    console.log("\nOpen Sanity Studio to review and publish.\n");
  } catch (error) {
    console.error("❌ Error creating documents:", error.message);
    process.exit(1);
  }
}

main();
