"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function ImageHoverSequence({ images, alt = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovered || !images || images.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 600);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentIndex(0);
  };

  if (!images || images.length === 0) {
    return (
      <div
        className="w-full aspect-[4/3] rounded-lg flex items-center justify-center"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <span className="text-sm opacity-40 font-mono">No Image</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--surface)",
      }}
    >
      <Image
        src={urlFor(currentImage).width(800).height(600).url()}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.95,
        }}
      />

      {images.length > 1 && (
        <div
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded text-xs font-mono backdrop-blur-sm"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            color: "white",
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
