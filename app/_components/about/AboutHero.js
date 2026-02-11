"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FadeInOnScroll,
  StaggerChildren,
  StaggerItem,
} from "@/app/_components/shared/ParallaxSection";

export default function AboutHero() {
  const { lang } = useLanguage();
  const containerRef = useRef(null);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const content = {
    de: {
      greeting: "Hi, ich bin Miriam",
      subtitle: "Full-Stack Entwicklerin",

      block1: {
        title: "Von Sprache zu Code",
        paragraphs: [
          "Von der Linguistik zur Web-Entwicklung – meine Reise begann mit einer Faszination für Sprachen. Sowohl die menschlichen als auch die der Programmierung.",
          "Was mich antreibt? Die Fähigkeit, komplexe menschliche Geschichten und Bedürfnisse in digitale Anwendungen zu übersetzen, die Menschen weltweit verbinden.",
        ],
      },

      block2: {
        title: "Mein Ansatz",
        paragraphs: [
          "Mein Fokus liegt auf dem MERN Stack (MongoDB, Express, React, Node.js), mit dem ich nahtlose Full-Stack-Anwendungen entwickle. In den letzten zwei Jahren habe ich mich intensiv mit React und Next.js auseinandergesetzt.",
          "Besonders liegt mir die Entwicklung von SaaS-Lösungen am Herzen: Produkte, die echte Probleme lösen, skalierbar sind und Menschen in ihrer Arbeit unterstützen.",
        ],
      },

      keywords: [
        "Linguistin",
        "MERN Stack",
        "SaaS-Entwicklung",
        "Backend & APIs",
        "Problemlöserin",
      ],
      caption: "Full-Stack Entwicklerin & Sprachwissenschaftlerin",
    },
    en: {
      greeting: "Hi, I'm Miriam",
      subtitle: "Full-Stack Developer",

      block1: {
        title: "From Language to Code",
        paragraphs: [
          "From linguistics to web development – my journey began with a fascination for languages. Both human and programming ones.",
          "What drives me? The ability to translate complex human stories and needs into digital applications that connect people globally.",
        ],
      },

      block2: {
        title: "My Approach",
        paragraphs: [
          "My focus is on the MERN stack (MongoDB, Express, React, Node.js), which enables me to build seamless full-stack applications. Over the past two years, I've been working intensively with React and Next.js.",
          "I'm particularly passionate about developing SaaS solutions: products that solve real problems, scale effectively, and support people in their work.",
        ],
      },

      keywords: [
        "Linguist",
        "MERN Stack",
        "SaaS Development",
        "Backend & APIs",
        "Problem Solver",
      ],
      caption: "Full-Stack Developer & Linguist",
    },
  };

  const text = content[lang] || content.de;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 px-6 md:ml-[280px] overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div style={{ y: textY, opacity }} className="space-y-12">
            <FadeInOnScroll delay={0.1}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                style={{ color: "var(--ink)" }}
              >
                {text.greeting}
              </h1>
              <p
                className="text-lg md:text-xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em",
                }}
              >
                {text.subtitle}
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--ink)" }}
              >
                {text.block1.title}
              </h2>
              <div className="space-y-4">
                {text.block1.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--ink)" }}
                >
                  {text.block2.title}
                </h2>
                <div className="space-y-4">
                  {text.block2.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base md:text-lg leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>

            <StaggerChildren
              staggerDelay={0.08}
              className="flex flex-wrap gap-3"
            >
              {text.keywords.map((keyword) => (
                <StaggerItem key={keyword}>
                  <span
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background:
                        "color-mix(in oklch, var(--accent), transparent 90%)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {keyword}
                  </span>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </motion.div>

          <div className="sticky top-24 lg:top-32">
            <FadeInOnScroll delay={0.4} direction="right">
              <div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <motion.div
                  style={{
                    y: imageY,
                    scale: imageScale,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/profil_3.jpg"
                    alt="Miriam Sparbrod"
                    fill
                    className="object-cover transition-all duration-700 ease-out"
                    style={{
                      filter: isImageHovered
                        ? "grayscale(0%) contrast(1)"
                        : "grayscale(100%) contrast(1.1)",
                    }}
                    priority
                  />
                </motion.div>

                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4))",
                    opacity: isImageHovered ? 0.3 : 1,
                  }}
                />

                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(600px circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 50%)",
                    opacity: isImageHovered ? 1 : 0,
                  }}
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.6}>
              <p
                className="text-sm text-center mt-4"
                style={{ color: "var(--muted)", opacity: 0.6 }}
              >
                {text.caption}
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
          zIndex: -1,
        }}
      />
    </section>
  );
}
