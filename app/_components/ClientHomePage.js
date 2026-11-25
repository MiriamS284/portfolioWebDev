import HeroShowcase from "./HeroShowcase";
import HomeContentGrid from "./home/HomeContentGrid";
import HomeContactSection from "./home/HomeContactSection";
import HomeSections from "./home/HomeSections";
import Footer from "./layout/Footer";

// Startseite ohne Intro: Inhalt wird direkt serverseitig gerendert (SEO, schneller erster Eindruck).
export default function ClientHomePage({ projects, posts, thoughts }) {
  return (
    <>
      <main>
        <HeroShowcase />
        <HomeContentGrid
          projects={projects}
          posts={posts}
          thoughts={thoughts}
        />
        <HomeSections />
        <HomeContactSection />
      </main>
      <Footer />
    </>
  );
}
