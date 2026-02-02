import Container from "../shared/Container";

export default function WhoIAm() {
  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container size="default">
        <div className="max-w-3xl mx-auto text-center">
          {/* Subtitle */}
          <div className="text-xs uppercase tracking-[0.3em] opacity-60 mb-6">
            Full-Stack Entwicklerin · Sprachwissenschaftlerin
          </div>

          {/* Main Statement */}
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-balance">
            Ich übersetze nicht nur Sprachen, sondern auch{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-strong), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              komplexe Ideen in funktionale, schöne Anwendungen
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            Mit einem Hintergrund in Sprachwissenschaft und Übersetzung bringe
            ich eine einzigartige Perspektive in die Web-Entwicklung: Die
            Fähigkeit, zwischen technischen Anforderungen und menschlichen
            Bedürfnissen zu vermitteln.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[var(--border)]">
            <Stat number="3+" label="Jahre Erfahrung" />
            <Stat number="15+" label="Projekte" />
            <Stat number="2" label="Sprachen (DE/EN)" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ color: "var(--accent)" }}
      >
        {number}
      </div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}
