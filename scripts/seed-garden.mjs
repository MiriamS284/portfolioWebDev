/**
 * Digital-Garden-Beiträge als Entwürfe in Sanity anlegen
 *
 * Usage:
 *   node scripts/seed-garden.mjs --dry-run      # Vorschau ohne Schreiben
 *   node scripts/seed-garden.mjs                # Entwürfe anlegen/aktualisieren
 *   node scripts/seed-garden.mjs --only=slug    # nur einen Beitrag
 *
 * Quelle: docs/garden/garden-entries.md
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

const STAGES = ["seedling", "budding", "evergreen"];

const entryId = (slug) => `garden-${slug}`;

// ─── Markdown einlesen ───────────────────────────────────────────────────────

function parseEntries(markdown) {
  const entries = markdown
    .split(/^# Entry \d+\s*$/m)
    .slice(1)
    .map((chunk) => {
      const slug = chunk.match(/^slug:\s*(\S+)/m)?.[1];
      const stage = chunk.match(/^stage:\s*(\S+)/m)?.[1] || "seedling";
      const connected = (chunk.match(/^connected:\s*(.+)$/m)?.[1] || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const fields = {};
      const parts = chunk.split(/^## (title|excerpt|body)\.(de|en)\s*$/m);
      for (let i = 1; i < parts.length; i += 3) {
        fields[`${parts[i]}_${parts[i + 1]}`] = parts[i + 2].replace(/\n---\s*$/, "").trim();
      }
      if (!slug) throw new Error("Entry without slug");
      if (!STAGES.includes(stage)) throw new Error(`${slug}: unknown stage "${stage}"`);
      for (const f of ["title_de", "title_en", "excerpt_de", "excerpt_en", "body_de", "body_en"])
        if (!fields[f]) throw new Error(`${slug}: missing ${f}`);
      if (fields.title_de.length > 100 || fields.title_en.length > 100)
        throw new Error(`${slug}: title longer than 100 characters`);
      return { slug, stage, connected, ...fields };
    });

  const slugs = new Set(entries.map((e) => e.slug));
  for (const e of entries)
    for (const c of e.connected)
      if (!slugs.has(c)) throw new Error(`${e.slug}: connected note "${c}" not found`);
  return entries;
}

const entries = parseEntries(
  readFileSync(join(__dirname, "..", "docs", "garden", "garden-entries.md"), "utf8")
);

// ─── Sanity-Dokumente ────────────────────────────────────────────────────────

function buildDocument(e, authorId, existing) {
  const now = new Date().toISOString();
  return {
    _id: `drafts.${entryId(e.slug)}`,
    _type: "gardenEntry",
    title_de: e.title_de,
    title_en: e.title_en,
    slug: { _type: "slug", current: e.slug },
    ...(authorId ? { author: { _type: "reference", _ref: authorId } } : {}),
    growthStage: e.stage,
    // Pflanzdatum bleibt beim erneuten Einspielen erhalten
    plantedAt: existing?.plantedAt || now,
    lastTended: now,
    excerpt_de: e.excerpt_de,
    excerpt_en: e.excerpt_en,
    body_de: markdownToPortableText(e.body_de),
    body_en: markdownToPortableText(e.body_en),
    // Schwache Referenzen, damit sie auch auf noch unveröffentlichte Notizen zeigen dürfen
    connectedNotes: e.connected.map((c) => ({
      _type: "reference",
      _ref: entryId(c),
      _key: generateKey(),
      _weak: true,
      _strengthenOnPublish: { type: "gardenEntry" },
    })),
  };
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  let selected = entries;
  if (ONLY_SLUG) {
    selected = entries.filter((e) => e.slug === ONLY_SLUG);
    if (!selected.length) {
      console.error(`No garden entry found with slug: ${ONLY_SLUG}`);
      process.exit(1);
    }
  }

  console.log(`\n🌱 ${selected.length} Garden-Beitr${selected.length === 1 ? "ag" : "äge"}`);
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (no changes)" : "LIVE (will create drafts)"}\n`);
  for (const e of selected) {
    console.log(`─ ${e.slug} [${e.stage}]`);
    console.log(`  ${e.title_de}`);
    console.log(`  Blöcke DE/EN: ${markdownToPortableText(e.body_de).length}/${markdownToPortableText(e.body_en).length}`);
    console.log(`  Verknüpft: ${e.connected.join(", ") || "–"}`);
  }

  if (DRY_RUN) {
    console.log("\n🔍 DRY RUN complete. Run without --dry-run to create drafts.\n");
    return;
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN in .env.local (required for write)");
    process.exit(1);
  }

  // Autor ist im Schema Pflichtfeld: den ersten vorhandenen Autor verwenden
  const authorId = await client.fetch(`*[_type == "author" && !(_id in path("drafts.**"))][0]._id`);
  if (!authorId) console.warn("⚠ Kein Autor gefunden – bitte im Studio nachtragen.");

  const transaction = client.transaction();
  for (const e of selected) {
    const existing = await client.fetch(
      `*[_id in [$draft, $published]] | order(_updatedAt desc)[0]{ plantedAt }`,
      { draft: `drafts.${entryId(e.slug)}`, published: entryId(e.slug) }
    );
    transaction.createOrReplace(buildDocument(e, authorId, existing));
  }

  const result = await transaction.commit();
  console.log(`\n✅ ${result.results.length} Entwürfe angelegt. Jetzt im Studio prüfen und veröffentlichen.\n`);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
