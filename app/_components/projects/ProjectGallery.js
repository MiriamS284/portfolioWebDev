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
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8">
          Gallery
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={urlFor(image).width(800).height(600).url()}
                alt={image.alt?.[lang] || `Image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {image.caption?.[lang] && (
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-sm backdrop-blur-sm"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                  }}
                >
                  {image.caption[lang]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            style={{
              background: "rgba(0, 0, 0, 0.95)",
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh] w-full">
              <Image
                src={urlFor(selectedImage).width(1600).url()}
                alt={selectedImage.alt?.[lang] || ""}
                width={1600}
                height={1200}
                className="object-contain w-full h-full"
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
