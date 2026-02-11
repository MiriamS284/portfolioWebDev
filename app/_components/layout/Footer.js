import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 px-6"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        zIndex: 4,
        isolation: "isolate",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider opacity-70">
              Miriam Sparbrod
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Full-Stack Entwicklerin
            </p>
            <p className="text-sm opacity-70 leading-relaxed mt-2">
              Ich übersetze komplexe Ideen in performante Web - Anwendungen.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider opacity-70">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/about">Über mich</FooterLink>
              <FooterLink href="/projects">Projekte</FooterLink>
              <FooterLink href="/garden">Digital Garden</FooterLink>
              <FooterLink href="/case-studies">Case Studies</FooterLink>
              <FooterLink href="/snippets">Code Snippets</FooterLink>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider opacity-70">
              Connect
            </h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="mailto:sparbrod.webdev@gmail.com" external>
                Email
              </FooterLink>
              <FooterLink href="https://github.com/MiriamS284" external>
                GitHub
              </FooterLink>
              <FooterLink
                href="https://www.linkedin.com/in/miriam-sparbrod/"
                external
              >
                LinkedIn
              </FooterLink>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <div>© {currentYear} Miriam Sparbrod. All rights reserved.</div>
          <div className="flex gap-6">
            <Link
              href="/imprint"
              className="hover:opacity-100 transition-opacity"
            >
              Impressum
            </Link>
            <Link
              href="/privacy"
              className="hover:opacity-100 transition-opacity"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, external = false }) {
  const props = external
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : { href };

  return (
    <Link
      {...props}
      className="text-sm opacity-70 hover:opacity-100 hover:text-[var(--accent-strong)] transition-all"
    >
      {children}
    </Link>
  );
}
