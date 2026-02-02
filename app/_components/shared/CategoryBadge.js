export default function CategoryBadge({ title }) {
  return (
    <span
      className="text-xs px-3 py-1 rounded-full"
      style={{
        background: "color-mix(in oklch, var(--accent), transparent 85%)",
        color: "var(--ink)",
      }}
    >
      {title}
    </span>
  );
}
