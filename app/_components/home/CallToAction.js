import Link from "next/link";
import Container from "../shared/Container";

export default function CallToAction() {
  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
        color: "var(--ink)",
        zIndex: 3,
        isolation: "isolate",
      }}
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Lass uns zusammenarbeiten
          </h2>
          <p className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed">
            Du hast ein Projekt im Kopf? Brauchst Unterstützung bei der
            Entwicklung? Oder möchtest einfach über Tech und Code sprechen?
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="rounded-2xl px-8 py-4 text-base font-medium transition-all"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              Kontakt aufnehmen
            </Link>
            <Link
              href="/projects"
              className="rounded-2xl px-8 py-4 text-base font-medium transition-all"
              style={{
                border: "1px solid var(--border)",
                background: "transparent",
              }}
            >
              Projekte ansehen
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
