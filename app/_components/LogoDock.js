"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LogoDock({
  src = "/logo_light.png",
  size = 220,
  pop = true,
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let hovering = false;
    let raf = 0,
      tx = 0,
      ty = 0,
      dx = 0,
      dy = 0;

    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      inner.style.transform = "translate3d(0,0,0) scale(1)";
    };
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      tx = Math.max(-24, Math.min(24, mx * 0.15));
      ty = Math.max(-24, Math.min(24, my * 0.15));
    };

    const loop = () => {
      dx += (tx - dx) * 0.18;
      dy += (ty - dy) * 0.18;
      if (hovering)
        inner.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.06)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed z-50 left-4 top-4"
      style={{
        width: size,
        height: size,
        background: "transparent",
        transform: pop ? "scale(1.12)" : "scale(1)",
        transition: "transform .5s cubic-bezier(.2,.8,0,1)",
      }}
    >
      <Link
        href="/"
        aria-label="Zur Startseite"
        className="block w-full h-full"
      >
        <div
          ref={innerRef}
          className="relative w-full h-full will-change-transform"
          style={{ filter: "drop-shadow(0 10px 24px rgba(0,0,0,.35))" }}
        >
          <Image src={src} alt="" fill priority className="object-contain" />
        </div>
      </Link>
    </div>
  );
}
