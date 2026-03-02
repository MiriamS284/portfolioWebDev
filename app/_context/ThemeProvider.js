"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  useCallback,
} from "react";

const ThemeContext = createContext();

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", callback);
  };
}

function getSnapshot() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot() {
  return "dark";
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark") return;
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getSnapshot();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
