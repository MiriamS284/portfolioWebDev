"use client";

import { useState } from "react";
import { useLanguage } from "@/app/_providers/LanguageProvider";

const content = {
  de: {
    label: "Building",
    title: "Woran ich gerade arbeite",
    projects: [
      {
        id: 1,
        title: "AI Automation Agents",
        status: "In Development",
        description: "KI-gestützte Workflow-Automatisierung für KMUs",
        logo: "🤖",
      },
      {
        id: 2,
        title: "Portfolio Redesign",
        status: "In Progress",
        description: "Neues Design-System mit Sanity CMS",
        logo: "✨",
      },
    ],
  },
  en: {
    label: "Building",
    title: "What I'm currently working on",
    projects: [
      {
        id: 1,
        title: "AI Automation Agents",
        status: "In Development",
        description: "AI-powered workflow automation for SMBs",
        logo: "🤖",
      },
      {
        id: 2,
        title: "Portfolio Redesign",
        status: "In Progress",
        description: "New design system with Sanity CMS",
        logo: "✨",
      },
    ],
  },
};

function BuildingCard({ project }) {
  return (
    <div
      className="group relative p-8 rounded-xl border transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo/Icon */}
      <div className="text-6xl mb-6">{project.logo}</div>

      {/* Status */}
      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono"
          style={{
            background: "color-mix(in oklch, var(--accent), transparent 90%)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-2xl md:text-3xl font-bold mb-3"
        style={{ color: "var(--ink)" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-base" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Card Spotlight */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.04), transparent 40%)",
        }}
      />
    </div>
  );
}

export default function BuildingSection() {
  const { lang } = useLanguage();
  const t = content[lang] || content.de;

  return (
    <section className="py-32 px-6" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div
            className="text-xs uppercase tracking-[0.3em] mb-3 font-mono"
            style={{ color: "var(--muted)", opacity: 0.6 }}
          >
            {t.label}
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            {t.title}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.map((project) => (
            <BuildingCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
