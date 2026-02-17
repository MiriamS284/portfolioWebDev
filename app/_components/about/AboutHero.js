"use client";

import { useLanguage } from "@/app/_context/LanguageProvider";
import Image from "next/image";

export default function AboutHero() {
  const { lang } = useLanguage();

  const content = {
    de: {
      greeting: "Hi, ich bin Miriam",
      subtitle: "Full-Stack Entwicklerin",
      block1: {
        title: "Von Sprache zu Code",
        paragraphs: [
          "Von der Übersetzung zur Web-Entwicklung – meine Reise begann mit einer Faszination für Sprachen. Sowohl die menschlichen als auch die digitale. Ich entwickle und transformiere Ideen mit Leidenschaft in digitale Experiences.",
          "Was mich antreibt? Die Fähigkeit, Bedürfnisse und Visionen in digitale Anwendungen zu übersetzen, Prozesse zu vereinfachen, effizienten Workflow zu gewährleisten.",
        ],
      },
      block2: {
        title: "Mein Ansatz",
        paragraphs: [
          "Mein Fokus liegt auf dem MERN Stack (MongoDB, Express, React, Node.js), mit dem ich nahtlose Full-Stack-Anwendungen entwickle. In den letzten zwei Jahren habe ich mich intensiv mit React und Next.js auseinandergesetzt.",
          "Besonders liegt mir die Entwicklung von SaaS-Lösungen am Herzen: Produkte, die echte Probleme lösen, skalierbar sind und Menschen in ihrer Arbeit unterstützen.",
        ],
      },
      keywords: ["MERN", "SaaS", "APIs", "Problemlöserin"],
    },
    en: {
      greeting: "Hi, I'm Miriam",
      subtitle: "Full-Stack Developer",
      block1: {
        title: "From Language to Code",
        paragraphs: [
          "From translation to web development – my journey began with a fascination for languages, both human and digital. I am passionate about developing and transforming ideas into digital experiences.",
          "What drives me? The ability to translate needs and visions into digital applications, simplify processes and ensure efficient workflows.",
        ],
      },
      block2: {
        title: "My Approach",
        paragraphs: [
          "My focus is on the MERN stack (MongoDB, Express, React, Node.js), which enables me to build seamless full-stack applications. Over the past two years, I've been working intensively with React and Next.js.",
          "I'm particularly passionate about developing SaaS solutions: products that solve real problems, scale effectively, and support people in their work.",
        ],
      },
      keywords: ["MERN", "SaaS", "APIs", "Problem Solver"],
    },
  };

  const text = content[lang] || content.de;

  return (
    <div className="space-y-12">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold mb-2">{text.greeting}</h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          {text.subtitle}
        </p>
      </header>

      {/* Image - klein, rund, Kopf sichtbar */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <Image
          src="/profil_3.jpg"
          alt="Miriam Sparbrod"
          fill
          className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
          style={{ objectPosition: "50% 15%" }}
          priority
        />
      </div>

      {/* Block 1 */}
      <section>
        <h2
          className="text-sm font-medium mb-4 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {text.block1.title}
        </h2>
        <div className="space-y-4">
          {text.block1.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Block 2 */}
      <section>
        <h2
          className="text-sm font-medium mb-4 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {text.block2.title}
        </h2>
        <div className="space-y-4">
          {text.block2.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Keywords as simple hashtags */}
      <div className="flex flex-wrap gap-4">
        {text.keywords.map((keyword) => (
          <span
            key={keyword}
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
