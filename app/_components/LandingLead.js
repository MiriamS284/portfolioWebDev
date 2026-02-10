"use client";

import Image from "next/image";

export default function LandingLead() {
  return (
    <section
      className="px-6 py-16 md:py-24"
      style={{
        background: "oklch(0.98 0.02 230)",
        color: "oklch(0.22 0.03 250)",
      }}
    >
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
        {/* Left: Logo card */}
        <div
          className="relative rounded-3xl overflow-clip shadow-xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,.06), 0 25px 60px rgba(0,0,0,.08)",
          }}
        >
          <div className="relative aspect-4/5">
            <Image
              src="/logo_side.png"
              alt="Marke"
              fill
              className="object-contain opacity-95"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div
              className="relative w-20 h-20 rounded-full overflow-clip shadow"
              style={{ boxShadow: "0 10px 24px rgba(0,0,0,.10)" }}
            >
              <Image
                src="/profil.jpg"
                alt="Miriam Sparbrod"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Miriam Sparbrod</h2>
              <p className="text-sm opacity-80">
                Full-Stack Entwicklerin · Linguistin · Übersetzerin
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
            <p>
              Ich verbinde Sprachwissenschaft und moderne Web-Technologien, um
              digitale Produkte zu bauen, die klar, schnörkellos und wirksam
              sind. Mein Fokus liegt auf Architektur, Performance, Accessibility
              und Internationalisierung.
            </p>
            <p>
              Von Konzept über Prototyp bis Launch: Ich übersetze komplexe
              Inhalte in ausdrucksstarke, belastbare Interfaces..
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
