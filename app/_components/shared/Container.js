export default function Container({
  children,
  size = "default",
  className = "",
}) {
  const sizes = {
    small: "max-w-3xl",
    default: "max-w-4xl",
    large: "max-w-6xl",
    full: "max-w-7xl",
  };

  return (
    <div className={`mx-auto px-6 ${sizes[size]} ${className}`}>{children}</div>
  );
}
