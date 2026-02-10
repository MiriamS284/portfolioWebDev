"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* kleine Cookie-Utils ohne extra Lib */
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : "";
}
function setCookie(name, value, days) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [showBanner, setShowBanner] = useState(false);

  // Banner erst anzeigen, wenn Section im Viewport ist (und noch kein Consent existiert)
  useEffect(() => {
    if (getCookie("cookie_consent")) return;
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowBanner(true);
      },
      { root: null, threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accept = () => {
    setCookie("cookie_consent", "accepted", 365);
    setShowBanner(false);
  };
  const reject = () => {
    setCookie("cookie_consent", "denied", 365);
    setShowBanner(false);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-6 py-16 bg-white text-[oklch(0.22_0.03_250)]"
    >
      <div className="mx-auto max-w-6xl space-y-16">
      
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            className="md:col-span-3 order-2 md:order-1 text-base leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p>
              Herzlich Willkommen! Als Sprachwissenschaftlerin, Übersetzerin und
              Full-Stack-Entwicklerin vereine ich die Kunst der Sprache mit der
              Präzision moderner Technologie. Ich übersetze komplexe Ideen in
              funktionale, ästhetische Anwendungen – mit Fokus auf Performance,
              Zugänglichkeit und internationale Inhalte.
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-2 order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <Image
              src="/profil.jpg"
              alt="Profil Miriam Sparbrod"
              width={300}
              height={300}
              className="rounded-full shadow-lg"
              priority
            />
          </motion.div>
        </div>

        {/* Block 2 */}
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            className="md:col-span-2 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/sign_2.png"
              alt="Signatur"
              width={360}
              height={360}
              className="rounded-xl"
            />
          </motion.div>

          <motion.div
            className="md:col-span-3 text-base leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <p>
              Willkommen in meinem digitalen Garten – einem lebendigen Raum für
              Ideen, Konzepte und Projekte. Hier dokumentiere ich Entwürfe und
              Reflexionen transparent und lade zum Mitdenken und Mitgestalten
              ein.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cookie-Banner */}
      {showBanner && (
        <div className="fixed bottom-5 right-5 z-50 bg-[oklch(0.22_0.03_250)] text-white p-4 rounded-lg shadow-xl">
          <p className="text-sm">
            Diese Website nutzt Cookies, um das Nutzererlebnis zu verbessern.
          </p>
          <div className="mt-2 flex gap-3 justify-center">
            <button
              onClick={accept}
              className="px-4 py-2 rounded-md bg-white/15 hover:bg-white/25 transition"
            >
              Akzeptieren
            </button>
            <button
              onClick={reject}
              className="px-4 py-2 rounded-md ring-1 ring-white/40 hover:bg-white/10 transition"
            >
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
