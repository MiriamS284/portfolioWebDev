import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Abschnitte unter dem Index-Raster. Bewusst im bestehenden Stil:
// Label wie "Index" in HomeContentGrid, Listen wie in ProjectsColumn. Keine neuen Gestaltungselemente.

function Section({ id, label, children }) {
  return (
    <section id={id} className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <h2
          className="text-sm font-medium mb-8 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
}

function ItemList({ items, numbered = false }) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={item.title}>
          <h3 className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            {numbered && (
              <span className="font-mono mr-2" style={{ color: "var(--muted)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            {item.title}
          </h3>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function TextLink({ href, children }) {
  return (
    <span
      className="text-sm font-medium underline underline-offset-2 decoration-1 transition-colors hover:text-[var(--accent)]"
      style={{ color: "var(--ink)" }}
    >
      {href.startsWith("#") ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>}
    </span>
  );
}

export default async function HomeSections() {
  const t = await getTranslations("homeSections");

  return (
    <>
      <Section id="leistungen" label={t("services.title")}>
        <ItemList items={t.raw("services.items")} />
      </Section>

      <Section id="vorgehen" label={t("approach.title")}>
        <ItemList items={t.raw("approach.items")} numbered />
        <p className="text-sm mt-8 leading-relaxed" style={{ color: "var(--muted)" }}>
          {t("approach.note")}
        </p>
      </Section>

      <Section id="grundsaetze" label={t("principles.title")}>
        <ItemList items={t.raw("principles.items")} />
      </Section>

      <Section id="zusammenarbeit" label={t("collaboration.title")}>
        <ItemList items={t.raw("collaboration.items")} />
        <div className="mt-8">
          <TextLink href="#kontakt">{t("collaboration.cta")} →</TextLink>
        </div>
      </Section>

      <Section id="profil" label={t("profile.title")}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {t("profile.text")}
        </p>
        <div className="mt-6">
          <TextLink href="/about">{t("profile.link")} →</TextLink>
        </div>
      </Section>

      <Section id="faq" label={t("faq.title")}>
        <ItemList items={t.raw("faq.items")} />
      </Section>
    </>
  );
}
