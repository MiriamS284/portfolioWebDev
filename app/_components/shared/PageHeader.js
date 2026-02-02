export default function PageHeader({ title, subtitle }) {
  return (
    <header className="py-20 md:py-28">
      <h1
        className="text-5xl md:text-7xl font-bold mb-6"
        style={{
          textShadow: "0 1px 0 rgba(0,0,0,.22), 0 18px 36px rgba(0,0,0,.28)",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl opacity-80 max-w-2xl">{subtitle}</p>
      )}
    </header>
  );
}
