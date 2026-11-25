// Gemeinsame SEO-Bausteine: Metadaten pro Seite und Sprache, JSON-LD.
// Canonical, hreflang und Open Graph werden hier einheitlich gesetzt,
// damit jede Seite in beiden Sprachen korrekt auffindbar ist.

export const SITE_URL = "https://miriamsparbrod.dev";
export const SITE_NAME = "Miriam Sparbrod";
export const LOCALES = ["de", "en"];
export const DEFAULT_LOCALE = "de";

const OG_LOCALE = { de: "de_DE", en: "en_GB" };

/** Wert aus { de, en } oder title_de/title_en passend zur Sprache. */
export function pick(value, locale) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] || value[DEFAULT_LOCALE] || "";
}

/** hreflang-Alternativen für einen Pfad ohne Sprachpräfix ("" = Startseite). */
export function languageAlternates(path = "") {
  return {
    de: `/de${path}`,
    en: `/en${path}`,
    "x-default": `/${DEFAULT_LOCALE}${path}`,
  };
}

/**
 * Metadaten für eine Seite.
 * @param {object} o
 * @param {string} o.locale
 * @param {string} o.path        Pfad ohne Sprachpräfix, z. B. "/contact"
 * @param {string} o.title       Seitentitel ohne Namenszusatz
 * @param {boolean} [o.absoluteTitle] Titel unverändert übernehmen
 * @param {string} o.description
 * @param {string} [o.type]      "website" | "article"
 * @param {string[]} [o.images]  absolute Bild-URLs (sonst greift opengraph-image)
 * @param {object} [o.article]   { publishedTime, modifiedTime }
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  absoluteTitle = false,
  description,
  type = "website",
  images,
  article,
}) {
  const fullTitle = absoluteTitle || !title ? title : `${title} – ${SITE_NAME}`;
  const url = `/${locale}${path}`;
  // Eigenes Bild der Seite, sonst das allgemeine Vorschaubild der Sprache.
  // (Setzt eine Unterseite openGraph, erbt sie das Bild aus app/[locale] nicht.)
  const ogImages = images?.length
    ? images
    : [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME }];

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale] || OG_LOCALE.de,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: ogImages,
      ...(type === "article" && article ? article : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages,
    },
  };
}

/** Metadaten für nicht gefundene Inhalte: nicht indexieren. */
export function notFoundMetadata(title) {
  return { title, robots: { index: false, follow: true } };
}

/** JSON-LD sicher serialisieren (verhindert </script>-Ausbruch). */
export function jsonLd(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const SAME_AS = [
  "https://github.com/MiriamS284",
  "https://www.linkedin.com/in/miriam-sparbrod/",
];

/** Startseite: Angebot (ProfessionalService) und Person dahinter. */
export function homeJsonLd({ locale, name, jobTitle, description, services }) {
  const personId = `${SITE_URL}/#person`;
  const serviceId = `${SITE_URL}/#service`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name,
        url: `${SITE_URL}/${locale}`,
        description,
        logo: `${SITE_URL}/logo_no_text.png`,
        image: `${SITE_URL}/${locale}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          postalCode: "04626",
          addressLocality: "Vollmershain",
          addressRegion: "Thüringen",
          addressCountry: "DE",
        },
        areaServed: { "@type": "Country", name: locale === "en" ? "Germany" : "Deutschland" },
        availableLanguage: ["de", "en"],
        founder: { "@id": personId },
        sameAs: SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "en" ? "Services" : "Leistungen",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        jobTitle,
        url: `${SITE_URL}/${locale}/about`,
        worksFor: { "@id": serviceId },
        sameAs: SAME_AS,
      },
    ],
  };
}

/** FAQ als FAQPage. */
export function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.title,
      acceptedAnswer: { "@type": "Answer", text: i.text },
    })),
  };
}
