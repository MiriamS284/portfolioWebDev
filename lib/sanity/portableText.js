import Image from "next/image";
import { urlFor } from "./image";

export const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Blog image"}
          width={1200}
          height={675}
          className="w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-center mt-2 opacity-70">{value.caption}</p>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const LinkComponent = "a";
      return (
        <LinkComponent
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--accent-strong)] transition-colors"
        >
          {children}
        </LinkComponent>
      );
    },
    code: ({ children }) => (
      <code
        className="px-2 py-1 rounded text-sm font-mono"
        style={{ background: "var(--surface-2)" }}
      >
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 pl-6 py-2 my-6 italic"
        style={{ borderColor: "var(--accent)" }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6">{children}</ol>
    ),
  },
};
