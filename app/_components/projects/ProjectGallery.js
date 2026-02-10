"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectGallery({ images }) {
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="text-xs uppercase tracking-[0.3em] mb-8"
          style={{ color: "var(--muted)", opacity: 0.5 }}
        >
          Gallery
        </div>

        {/* Grid - clean, no rounded corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={urlFor(image).width(800).height(600).url()}
                alt={image.alt?.[lang] || `Image ${idx + 1}`}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
              {image.caption?.[lang] && (
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    color: "white",
                  }}
                >
                  {image.caption[lang]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox - minimal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 cursor-pointer"
            style={{
              background: "rgba(0, 0, 0, 0.95)",
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full">
              <Image
                src={urlFor(selectedImage).width(1600).url()}
                alt={selectedImage.alt?.[lang] || ""}
                width={1600}
                height={1200}
                className="object-contain w-full h-full"
              />

              {/* Close hint */}
              <div
                className="absolute top-4 right-4 text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Click to close
              </div>

              {/* Caption */}
              {selectedImage.caption?.[lang] && (
                <div
                  className="absolute bottom-4 left-4 text-sm font-mono"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {selectedImage.caption[lang]}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
