"use client";

import { useState } from "react";
import Container from "../shared/Container";

export default function AboutHero({ lang = "de" }) {
  const [currentLang, setCurrentLang] = useState(lang);

  const content = {
    de: {
      greeting: "Hi, ich bin Miriam",
      subtitle: "Full-Stack Entwicklerin · Sprachwissenschaftlerin",
      intro: [
        "Von der Linguistik zur Web-Entwicklung – meine Reise begann mit einer Faszination für Sprachen. Sowohl die menschlichen als auch die der Programmierung.",
        "Was mich antreibt? Die Fähigkeit, komplexe menschliche Geschichten und Bedürfnisse in digitale Anwendungen zu übersetzen, die Menschen weltweit verbinden. Ich übersetze nicht nur zwischen Deutsch und Englisch – ich übersetze Ideen in Code, Probleme in Lösungen, und Visionen in funktionierende Software.",
      ],
      approach: [
        "Mein Fokus liegt auf dem MERN Stack (MongoDB, Express, React, Node.js), mit dem ich nahtlose Full-Stack-Anwendungen entwickle. In den letzten zwei Jahren habe ich mich intensiv mit React und Next.js auseinandergesetzt und dabei dynamische, hochinteraktive Benutzeroberflächen geschaffen.",
        "Aktuell erweitere ich kontinuierlich meine Backend-Kenntnisse – API-Design, Datenbankarchitektur, dynamisches Routing und serverlose Funktionen gehören zu meinen täglichen Herausforderungen, denen ich mich mit Begeisterung stelle.",
      ],
      specialty: [
        "Besonders liegt mir die Entwicklung von SaaS-Lösungen am Herzen: Produkte, die echte Probleme lösen, skalierbar sind und Menschen in ihrer Arbeit unterstützen. Die Kombination aus meinem sprachlichen Hintergrund und technischem Know-how erlaubt es mir, sowohl mit Stakeholdern als auch mit Code zu 'sprechen' – eine Brücke zwischen Business-Anforderungen und technischer Umsetzung.",
      ],
    },
    en: {
      greeting: "Hi, I'm Miriam",
      subtitle: "Full-Stack Developer · Linguist",
      intro: [
        "From linguistics to web development – my journey began with a fascination for languages. Both human and programming ones.",
        "What drives me? The ability to translate complex human stories and needs into digital applications that connect people globally. I don't just translate between German and English – I translate ideas into code, problems into solutions, and visions into working software.",
      ],
      approach: [
        "My focus is on the MERN stack (MongoDB, Express, React, Node.js), which enables me to build seamless full-stack applications. Over the past two years, I've been working intensively with React and Next.js, creating dynamic, highly interactive user interfaces.",
        "Currently, I'm continuously expanding my backend knowledge – API design, database architecture, dynamic routing, and serverless functions are daily challenges I tackle with enthusiasm.",
      ],
      specialty: [
        "I'm particularly passionate about developing SaaS solutions: products that solve real problems, scale effectively, and support people in their work. The combination of my linguistic background and technical expertise allows me to 'speak' both with stakeholders and with code – bridging the gap between business requirements and technical implementation.",
      ],
    },
  };

  const text = content[currentLang];

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: "var(--bg)", color: "var(--ink)" }}
    >
      <Container>
        {/* Language Toggle */}
        <div className="flex justify-end mb-12">
          <div
            className="inline-flex rounded-lg p-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setCurrentLang("de")}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                currentLang === "de" ? "active" : ""
              }`}
              style={{
                background:
                  currentLang === "de" ? "var(--accent)" : "transparent",
                color: currentLang === "de" ? "var(--bg)" : "var(--ink)",
              }}
            >
              Deutsch
            </button>
            <button
              onClick={() => setCurrentLang("en")}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                currentLang === "en" ? "active" : ""
              }`}
              style={{
                background:
                  currentLang === "en" ? "var(--accent)" : "transparent",
                color: currentLang === "en" ? "var(--bg)" : "var(--ink)",
              }}
            >
              English
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">
              {text.greeting}
            </h1>
            <p
              className="text-xl md:text-2xl opacity-70"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              {text.subtitle}
            </p>
          </div>

          {/* Intro */}
          <div className="space-y-6 mb-12">
            {text.intro.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-lg md:text-xl leading-relaxed opacity-90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Approach */}
          <div
            className="p-8 rounded-2xl mb-12"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="space-y-6">
              {text.approach.map((paragraph, idx) => (
                <p key={idx} className="text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Specialty */}
          <div className="space-y-6">
            {text.specialty.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-lg md:text-xl leading-relaxed opacity-90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlight Keywords */}
          <div className="mt-12 flex flex-wrap gap-3">
            {[
              currentLang === "de" ? "Linguistin" : "Linguist",
              currentLang === "de" ? "MERN Stack" : "MERN Stack",
              currentLang === "de" ? "SaaS-Entwicklung" : "SaaS Development",
              currentLang === "de" ? "Backend & APIs" : "Backend & APIs",
              currentLang === "de" ? "Problemlöserin" : "Problem Solver",
            ].map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background:
                    "color-mix(in oklch, var(--accent), transparent 90%)",
                  border: "1px solid var(--border)",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
