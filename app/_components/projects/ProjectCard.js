"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/_context/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import ProjectModal from "./ProjectModal";

// SVG Icons
const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function ProjectCard({ project, size = "normal" }) {
  const { lang } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = project.title?.[lang] || project.title?.de || "Untitled";
  const tagline = project.tagline?.[lang] || project.tagline?.de;

  // Cycle through images on hover
  useEffect(() => {
    if (!isHovered || !project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isHovered, project.images]);

  const getCurrentMedia = () => {
    if (isHovered && project.images && project.images.length > 0) {
      return project.images[currentImageIndex];
    }
    return project.logo || project.coverImage;
  };

  const currentMedia = getCurrentMedia();

  // Status display
  const getStatusDisplay = () => {
    switch (project.status) {
      case "prod":
        return { label: "LIVE", color: "var(--accent)" };
      case "dev":
        return { label: "DEV", color: "var(--muted)" };
      case "archived":
        return { label: "ARCHIVED", color: "var(--muted)" };
      default:
        return null;
    }
  };

  const status = getStatusDisplay();

  // Card height based on size
  const getMinHeight = () => {
    switch (size) {
      case "large":
        return "400px";
      case "wide":
        return "280px";
      default:
        return "320px";
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className="group block text-left w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
      >
        <div
          className="relative p-6 md:p-8 rounded-xl border transition-all duration-300 hover:border-opacity-100 h-full flex flex-col"
          style={{
            background: "var(--surface)",
            borderColor: isHovered ? "var(--accent)" : "var(--border)",
            minHeight: getMinHeight(),
          }}
        >
          {/* Top Row: Status + Links */}
          <div className="flex items-center justify-between mb-4">
            {/* Status Badge */}
            {status && (
              <span
                className="text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider"
                style={{
                  color: status.color,
                  background: `color-mix(in oklch, ${status.color}, transparent 90%)`,
                  border: `1px solid ${status.color}`,
                }}
              >
                {status.label}
              </span>
            )}

            {/* Links */}
            <div className="flex items-center gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg transition-all hover:scale-110"
                  style={{
                    color: "var(--muted)",
                    background: "var(--bg)",
                  }}
                  title="GitHub"
                >
                  <GithubIcon />
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg transition-all hover:scale-110"
                  style={{
                    color: "var(--accent)",
                    background: "color-mix(in oklch, var(--accent), transparent 90%)",
                  }}
                  title={lang === "de" ? "Live ansehen" : "View Live"}
                >
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>

          {/* Media Area */}
          <div
            className={`relative mb-4 flex items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ${
              isHovered
                ? "flex-[2]"
                : "flex-1"
            } ${
              size === "large" ? "min-h-[200px]" : "min-h-[120px]"
            }`}
            style={{
              background: isHovered ? "var(--bg)" : "transparent",
            }}
          >
            {currentMedia ? (
              <div className="relative w-full h-full min-h-[inherit]">
                <Image
                  src={urlFor(currentMedia)
                    .width(isHovered ? 800 : 400)
                    .height(isHovered ? 600 : 300)
                    .fit("max")
                    .url()}
                  alt={title}
                  fill
                  className="transition-all duration-500 object-contain"
                  sizes={isHovered ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                {/* Image counter on hover */}
                {isHovered && project.images && project.images.length > 1 && (
                  <div
                    className="absolute bottom-2 right-2 px-2 py-1 rounded text-[10px] font-mono"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                    }}
                  >
                    {currentImageIndex + 1}/{project.images.length}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="w-full h-full min-h-[inherit] flex items-center justify-center rounded-lg"
                style={{ background: "var(--bg)" }}
              >
                <span
                  className="text-5xl font-bold opacity-20"
                  style={{ color: "var(--muted)" }}
                >
                  {title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Title & Tagline */}
          <div className={`transition-all duration-300 ${isHovered ? "mt-2" : "mt-auto"}`}>
            <h3
              className={`font-bold mb-1 leading-tight group-hover:text-[var(--accent)] transition-all duration-300 ${
                isHovered
                  ? "text-base"
                  : size === "large" ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
              }`}
              style={{ color: "var(--ink)" }}
            >
              {title}
            </h3>

            {/* Tagline - hide on hover to save space */}
            {tagline && size !== "normal" && !isHovered && (
              <p
                className="text-sm leading-relaxed line-clamp-2 mb-3"
                style={{ color: "var(--muted)" }}
              >
                {tagline}
              </p>
            )}

            {/* Tech Stack - compact on hover */}
            {project.stack && project.stack.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 transition-all duration-300 ${isHovered ? "mt-1" : "mt-2"}`}>
                {project.stack.slice(0, isHovered ? 3 : (size === "large" ? 5 : 3)).map((tech, idx) => (
                  <span
                    key={`${project._id}-stack-${idx}`}
                    className={`font-mono px-2 py-0.5 rounded transition-all duration-300 ${
                      isHovered ? "text-[8px]" : "text-[10px]"
                    }`}
                    style={{
                      color: "var(--muted)",
                      background: "var(--bg)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > (isHovered ? 3 : (size === "large" ? 5 : 3)) && (
                  <span
                    className={`font-mono px-2 py-0.5 ${isHovered ? "text-[8px]" : "text-[10px]"}`}
                    style={{ color: "var(--muted)", opacity: 0.5 }}
                  >
                    +{project.stack.length - (isHovered ? 3 : (size === "large" ? 5 : 3))}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.03), transparent 40%)",
            }}
          />
        </div>
      </div>

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
