"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useLanguage } from "@/app/_context/LanguageProvider";

const texts = {
  de: {
    copy: "Kopieren",
    copied: "Kopiert!",
    raw: "Raw",
  },
  en: {
    copy: "Copy",
    copied: "Copied!",
    raw: "Raw",
  },
};

// Map language names to Prism language identifiers
const languageMap = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  css: "css",
  scss: "scss",
  html: "html",
  json: "json",
  markdown: "markdown",
  md: "markdown",
  bash: "bash",
  shell: "bash",
  python: "python",
  sql: "sql",
  graphql: "graphql",
  yaml: "yaml",
  go: "go",
  rust: "rust",
  php: "php",
};

export default function CodeBlock({
  code,
  language = "javascript",
  filename = null,
  showLineNumbers = true,
  showCopyButton = true,
  showRawButton = false,
  maxHeight = null,
  className = "",
}) {
  const { lang } = useLanguage();
  const t = texts[lang] || texts.de;
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  // Determine theme based on document theme
  const isDarkMode = typeof document !== "undefined"
    ? document.documentElement.getAttribute("data-theme") !== "light"
    : true;

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const prismLanguage = languageMap[language?.toLowerCase()] || language?.toLowerCase() || "text";

  const customStyle = {
    margin: 0,
    padding: "1.5rem",
    background: "transparent",
    fontSize: "0.875rem",
    lineHeight: "1.7",
  };

  const codeTagProps = {
    style: {
      fontFamily: "var(--font-mono), ui-monospace, 'SF Mono', Monaco, monospace",
    },
  };

  if (showRaw) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            {filename && (
              <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                {filename}
              </span>
            )}
            {language && (
              <span
                className="text-xs font-mono uppercase"
                style={{ color: "var(--accent)" }}
              >
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRaw(false)}
              className="text-xs font-mono px-2 py-1 transition-colors"
              style={{
                color: "var(--accent)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              Highlight
            </button>
            {showCopyButton && (
              <button
                onClick={handleCopy}
                className="text-xs font-mono px-2 py-1 transition-colors"
                style={{
                  color: copied ? "var(--accent)" : "var(--muted)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                }}
              >
                {copied ? t.copied : t.copy}
              </button>
            )}
          </div>
        </div>

        {/* Raw Code */}
        <pre
          className="overflow-x-auto"
          style={{
            padding: "1.5rem",
            maxHeight: maxHeight || "none",
          }}
        >
          <code
            className="text-sm font-mono leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            {code}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              {filename}
            </span>
          )}
          {language && (
            <span
              className="text-xs font-mono uppercase"
              style={{ color: "var(--accent)" }}
            >
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showRawButton && (
            <button
              onClick={() => setShowRaw(true)}
              className="text-xs font-mono px-2 py-1 transition-colors"
              style={{
                color: "var(--muted)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              {t.raw}
            </button>
          )}
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="text-xs font-mono px-2 py-1 transition-colors"
              style={{
                color: copied ? "var(--accent)" : "var(--muted)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              {copied ? t.copied : t.copy}
            </button>
          )}
        </div>
      </div>

      {/* Code with Syntax Highlighting */}
      <div
        className="overflow-x-auto"
        style={{ maxHeight: maxHeight || "none" }}
      >
        <SyntaxHighlighter
          language={prismLanguage}
          style={isDarkMode ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={customStyle}
          codeTagProps={codeTagProps}
          lineNumberStyle={{
            color: "var(--muted)",
            opacity: 0.5,
            minWidth: "2.5em",
            paddingRight: "1em",
            userSelect: "none",
          }}
        >
          {code || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
