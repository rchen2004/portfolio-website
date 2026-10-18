import { About } from "@/src/components/About";
import { Experience } from "@/src/components/Experience";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Projects } from "@/src/components/Projects";
import { Technologies } from "@/src/components/Technologies";
import { ThemeToggle } from "@/src/components/ThemeToggle";

// Spec §2. Neither the shell nor <main> may be positioned: the corner toggle is placed against the page itself.
// Column 1 at 1200px and up is left for the rail (step 8).
export default function Home() {
  return (
    <div className="mx-auto max-w-[1000px] xl:grid xl:max-w-[1180px] xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-x-15">
      <main
        id="top"
        className="grid max-w-[880px] min-w-0 gap-18 pt-[calc(max(16px,env(safe-area-inset-top))+44px)] pb-20 xl:col-start-2 xl:pt-14"
      >
        {/* Temporary (decisions.md, Phase 4): the corner toggle shows at every width until the rail exists. */}
        <ThemeToggle className="absolute top-[calc(max(16px,env(safe-area-inset-top))-11px)] right-[calc(max(16px,env(safe-area-inset-right))-11px)]" />
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
