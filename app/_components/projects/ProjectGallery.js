"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/app/_context/LanguageProvider";

export default function ProjectGallery({ images }) {
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  const texts = {
    de: { gallery: "Galerie", close: "Klicken zum Schließen" },
    en: { gallery: "Gallery", close: "Click to close" },
  };

  const t = texts[lang] || texts.de;

  return (
    <section className="py-12" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <h2
          className="text-sm font-medium mb-6 pb-2 border-b"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          {t.gallery}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 cursor-pointer"
            style={{ background: "rgba(0, 0, 0, 0.95)" }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Image
                src={urlFor(selectedImage).width(1600).url()}
                alt={selectedImage.alt?.[lang] || ""}
                width={1600}
                height={1200}
                className="object-contain w-full h-full"
              />

              <div
                className="absolute top-4 right-4 text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {t.close}
              </div>

              {selectedImage.caption?.[lang] && (
                <div
                  className="absolute bottom-4 left-4 text-sm"
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
