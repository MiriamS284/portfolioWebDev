"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SnippetSidebar({
  snippets,
  activeCategory,
  setActiveCategory,
  activeLanguage,
  setActiveLanguage,
  activeDifficulty,
  setActiveDifficulty,
}) {
  const t = useTranslations("snippets");
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate counts
  const totalCount = snippets.length;

  // Get unique categories with counts
  const categoryMap = snippets.reduce((acc, snippet) => {
    if (snippet.category) {
      acc[snippet.category] = (acc[snippet.category] || 0) + 1;
    }
    return acc;
  }, {});
  const categories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  // Get unique languages with counts
  const languageMap = snippets.reduce((acc, snippet) => {
    if (snippet.language) {
      acc[snippet.language] = (acc[snippet.language] || 0) + 1;
    }
    return acc;
  }, {});
  const languages = Object.entries(languageMap).sort((a, b) => b[1] - a[1]);

  // Get difficulties with counts
  const difficultyMap = snippets.reduce((acc, snippet) => {
    if (snippet.difficulty) {
      acc[snippet.difficulty] = (acc[snippet.difficulty] || 0) + 1;
    }
    return acc;
  }, {});

  const hasActiveFilters = activeCategory !== "all" || activeLanguage !== "all" || activeDifficulty !== "all";

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveLanguage("all");
    setActiveDifficulty("all");
  };

  const FilterButton = ({ isActive, onClick, children, count }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left text-sm"
      style={{
        background: isActive ? "var(--surface)" : "transparent",
        color: isActive ? "var(--accent)" : "var(--muted)",
        border: isActive ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span
          className="text-xs font-mono"
          style={{ opacity: 0.6 }}
        >
          {count}
        </span>
      )}
    </button>
  );

  const sidebarContent = (
    <>
      {/* All Snippets */}
      <div className="mb-6">
        <FilterButton
          isActive={activeCategory === "all" && activeLanguage === "all" && activeDifficulty === "all"}
          onClick={clearFilters}
          count={totalCount}
        >
          {t("allSnippets")}
        </FilterButton>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full mb-6 text-xs font-mono px-3 py-2 rounded-lg transition-colors"
          style={{
            color: "var(--accent)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {t("clear")}
        </button>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {t("categories")}
          </h3>
          <div className="space-y-1">
            {categories.map(([category, count]) => (
              <FilterButton
                key={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(activeCategory === category ? "all" : category)}
                count={count}
              >
                {category}
              </FilterButton>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {t("languages")}
          </h3>
          <div className="space-y-1">
            {languages.map(([language, count]) => (
              <FilterButton
                key={language}
                isActive={activeLanguage === language}
                onClick={() => setActiveLanguage(activeLanguage === language ? "all" : language)}
                count={count}
              >
                {language}
              </FilterButton>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty */}
      {Object.keys(difficultyMap).length > 0 && (
        <div className="mb-6">
          <h3
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {t("difficulty")}
          </h3>
          <div className="space-y-1">
            {["beginner", "intermediate", "advanced"].map((diff) => {
              const count = difficultyMap[diff];
              if (!count) return null;
              return (
                <FilterButton
                  key={diff}
                  isActive={activeDifficulty === diff}
                  onClick={() => setActiveDifficulty(activeDifficulty === diff ? "all" : diff)}
                  count={count}
                >
                  {t(diff)}
                </FilterButton>
              );
            })}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            {t("filters")}
            {hasActiveFilters && (
              <span
                className="ml-2 px-2 py-0.5 rounded text-xs"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Active
              </span>
            )}
          </span>
          <span
            className="transition-transform"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--muted)",
            }}
          >
            ▼
          </span>
        </button>

        {/* Mobile Expanded Content */}
        {isExpanded && (
          <div
            className="mt-4 p-4 rounded-lg"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {sidebarContent}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block sticky top-24 self-start"
        style={{
          minWidth: "220px",
          maxWidth: "280px",
        }}
      >
        <div
          className="p-5 rounded-xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
