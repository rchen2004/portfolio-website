import { About } from "@/src/components/About";
import { Experience } from "@/src/components/Experience";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Projects } from "@/src/components/Projects";
import { Rail } from "@/src/components/Rail";
import { Technologies } from "@/src/components/Technologies";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { personJsonLd } from "@/src/lib/site";

// Spec §2. Neither the shell nor <main> may be positioned: the corner toggle is placed against the page itself.
export default function Home() {
  return (
    <div className="mx-auto max-w-[1000px] xl:grid xl:max-w-[1180px] xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-x-15">
      {/* Spec §6.7: first tab stop at 1200px and up, hidden until focused. Fixed when focused, so it takes no
          grid cell and shows at the window's top left from any scroll position. */}
      <a
        href="#top"
        className="fixed top-[max(16px,env(safe-area-inset-top))] left-[max(16px,env(safe-area-inset-left))] z-10 labeled-link bg-white px-3 py-2 not-focus:sr-only max-xl:hidden"
      >
        Skip to content
      </a>
      <Rail />
      {/* tabIndex -1: the skip link (and other #top links) move focus here, not just the scroll position. */}
      <main
        id="top"
        tabIndex={-1}
        className="grid max-w-[880px] min-w-0 gap-18 pt-[calc(max(16px,env(safe-area-inset-top))+44px)] pb-20 xl:col-start-2 xl:pt-14"
      >
        {/* Spec §6.9: the corner instance, below 1200px only; at 1200px and up the rail has the toggle. */}
        <ThemeToggle className="absolute top-[calc(max(16px,env(safe-area-inset-top))-11px)] right-[calc(max(16px,env(safe-area-inset-right))-11px)] xl:hidden" />
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
      </main>
      <Footer />
      {/* Backend-owned structured data (decisions.md, "SEO ownership"); the string is already "<"-escaped. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
    </div>
  );
}
