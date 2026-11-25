// Gemeinsamer Markdown → Portable-Text-Umwandler für die Seed-Skripte.
// Unterstützt: ### (H2), - (Aufzählung), 1. (nummeriert), > (Zitat), ``` (Code), Absätze.
import { randomUUID } from "crypto";

export function generateKey() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

export function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // H2 heading (### in source becomes H2 in Sanity)
    if (line.startsWith("### ")) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text: line.slice(4).trim(), marks: [] }],
      });
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || "text";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ _type: "code", _key: generateKey(), language, code: codeLines.join("\n") });
      i++;
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      while (i < lines.length && lines[i].startsWith("- ")) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: generateKey(), text: lines[i].slice(2).trim(), marks: [] }],
        });
        i++;
      }
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          listItem: "number",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: generateKey(), text: lines[i].replace(/^\d+\.\s/, "").trim(), marks: [] }],
        });
        i++;
      }
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "blockquote",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text: quoteLines.join(" "), marks: [] }],
      });
      continue;
    }

    // Regular paragraph
    const paragraphLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("> ") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text: paragraphLines.join(" "), marks: [] }],
      });
    }
  }

  return blocks;
}
