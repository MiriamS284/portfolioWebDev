import MenuDock from "./layout/MenuDock";
import HeroShowcase from "./HeroShowcase";
import HomeContentGrid from "./home/HomeContentGrid";
import HomeContactSection from "./home/HomeContactSection";
import Footer from "./layout/Footer";

// Startseite ohne Intro: Inhalt wird direkt serverseitig gerendert (SEO, schneller erster Eindruck).
export default function ClientHomePage({ projects, posts, snippets, thoughts }) {
  return (
    <>
      <MenuDock />
      <main>
        <HeroShowcase />
        <HomeContentGrid
          projects={projects}
          posts={posts}
          snippets={snippets}
          thoughts={thoughts}
        />
        <HomeContactSection />
      </main>
      <Footer />
    </>
  );
}
