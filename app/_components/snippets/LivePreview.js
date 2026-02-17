"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/app/_context/LanguageProvider";

const texts = {
  de: {
    preview: "Live-Vorschau",
    refresh: "Aktualisieren",
    fullscreen: "Vollbild",
    exitFullscreen: "Beenden",
  },
  en: {
    preview: "Live Preview",
    refresh: "Refresh",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit",
  },
};

export default function LivePreview({
  htmlCode = "",
  cssCode = "",
  jsCode = "",
  minHeight = "300px",
}) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;
  const [key, setKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate the complete HTML document for the iframe
  const srcdoc = useMemo(() => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset styles */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      padding: 1rem;
    }
    /* User CSS */
    ${cssCode || ""}
  </style>
</head>
<body>
  ${htmlCode || ""}
  <script>
    try {
      ${jsCode || ""}
    } catch (e) {
      console.error('Preview Error:', e);
    }
  </script>
</body>
</html>
    `.trim();
  }, [htmlCode, cssCode, jsCode]);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: "var(--bg)" }}
      >
        {/* Fullscreen Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            {t.preview}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="text-xs font-mono px-3 py-1.5 rounded transition-colors"
              style={{
                color: "var(--muted)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              {t.refresh}
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-xs font-mono px-3 py-1.5 rounded transition-colors"
              style={{
                color: "var(--accent)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              {t.exitFullscreen}
            </button>
          </div>
        </div>

        {/* Fullscreen Preview */}
        <div className="flex-1">
          <iframe
            key={key}
            srcDoc={srcdoc}
            sandbox="allow-scripts"
            title="Live Preview"
            className="w-full h-full border-0"
            style={{ background: "white" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          {t.preview}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="text-xs font-mono px-3 py-1.5 rounded transition-colors hover:opacity-80"
            style={{
              color: "var(--muted)",
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            {t.refresh}
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-xs font-mono px-3 py-1.5 rounded transition-colors hover:opacity-80"
            style={{
              color: "var(--muted)",
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            {t.fullscreen}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div
        className="overflow-auto"
        style={{
          minHeight,
          background: "white",
        }}
      >
        <iframe
          key={key}
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          title="Live Preview"
          className="w-full border-0"
          style={{
            minHeight,
            background: "white",
          }}
        />
      </div>
    </div>
  );
}
