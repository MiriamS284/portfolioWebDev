// Kategorie-/Leistungsbereich-Titel passend zur Sprache.
// Akzeptiert Objekte ({ title, titleEn }) und ältere String-Projektionen.
export function categoryTitle(cat, locale) {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  return (locale === "en" && cat.titleEn) || cat.title || "";
}
