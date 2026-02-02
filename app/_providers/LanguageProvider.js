"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  lang: "de",
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
  // lazy init from localStorage (avoids setState-in-effect + hydration issues)
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("lang");
        if (saved === "en" || saved === "de") return saved;
      } catch {}
    }
    return "de";
  });

  // persist & update <html lang="">
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
