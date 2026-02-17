"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

const tabConfig = {
  html: { label: "HTML", language: "html" },
  css: { label: "CSS", language: "css" },
  js: { label: "JavaScript", language: "javascript" },
};

export default function MultiPanelCode({
  htmlCode,
  cssCode,
  jsCode,
  showLineNumbers = true,
}) {
  // Determine which tabs are available
  const availableTabs = [];
  if (htmlCode) availableTabs.push("html");
  if (cssCode) availableTabs.push("css");
  if (jsCode) availableTabs.push("js");

  const [activeTab, setActiveTab] = useState(availableTabs[0] || "html");

  if (availableTabs.length === 0) {
    return null;
  }

  const getCode = () => {
    switch (activeTab) {
      case "html":
        return htmlCode;
      case "css":
        return cssCode;
      case "js":
        return jsCode;
      default:
        return "";
    }
  };

  const getLanguage = () => {
    return tabConfig[activeTab]?.language || "text";
  };

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Tabs Header */}
      <div
        className="flex border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {availableTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-sm font-mono transition-colors relative"
            style={{
              color: activeTab === tab ? "var(--accent)" : "var(--muted)",
              background: activeTab === tab ? "var(--bg)" : "transparent",
            }}
          >
            {tabConfig[tab].label}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--accent)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code Panel */}
      <div style={{ background: "var(--bg)" }}>
        <CodeBlock
          code={getCode()}
          language={getLanguage()}
          showLineNumbers={showLineNumbers}
          showRawButton={true}
          className="rounded-none border-0"
        />
      </div>
    </div>
  );
}

// Accordion version for mobile
export function MultiPanelCodeAccordion({
  htmlCode,
  cssCode,
  jsCode,
  showLineNumbers = true,
}) {
  const [expandedPanels, setExpandedPanels] = useState({
    html: true,
    css: false,
    js: false,
  });

  const togglePanel = (panel) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  const panels = [
    { key: "html", label: "HTML", code: htmlCode, language: "html" },
    { key: "css", label: "CSS", code: cssCode, language: "css" },
    { key: "js", label: "JavaScript", code: jsCode, language: "javascript" },
  ].filter((panel) => panel.code);

  if (panels.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {panels.map((panel) => (
        <div
          key={panel.key}
          className="rounded-xl overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Accordion Header */}
          <button
            onClick={() => togglePanel(panel.key)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
            style={{ background: "var(--surface)" }}
          >
            <span
              className="text-sm font-mono"
              style={{ color: "var(--accent)" }}
            >
              {panel.label}
            </span>
            <span
              className="transition-transform"
              style={{
                transform: expandedPanels[panel.key] ? "rotate(180deg)" : "rotate(0deg)",
                color: "var(--muted)",
              }}
            >
              ▼
            </span>
          </button>

          {/* Accordion Content */}
          {expandedPanels[panel.key] && (
            <div style={{ background: "var(--bg)" }}>
              <CodeBlock
                code={panel.code}
                language={panel.language}
                showLineNumbers={showLineNumbers}
                className="rounded-none border-0"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
