import { resume } from "@/src/lib/resume";
import { RailScript } from "./RailScript";
import { ThemeToggle } from "./ThemeToggle";

// UI copy (spec §3), not resume content.
const LINKS = [
  ["about", "About"],
  ["technologies", "Technologies"],
  ["experience", "Experience"],
  ["projects", "Projects"],
] as const;

// Spec §6.6 and §6.9. display: none below 1200px, so it also leaves the accessibility tree. It spans the main and
// footer rows so it stays stuck to the end of the page.
export function Rail() {
  return (
    <nav
      aria-label="Sections"
      className="rail sticky top-[env(safe-area-inset-top)] col-start-1 row-span-2 self-start py-14 max-xl:hidden"
    >
      <div className="flex items-center justify-between">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center rounded-focus text-[24px]/[1.25] font-semibold text-charcoal no-underline"
        >
          {resume.basics.name}
        </a>
        <ThemeToggle />
      </div>
      <div className="relative mt-5">
        {/* Starts on About's center (8 + 29 / 2 - 16), matching the server's aria-current until RailScript runs. */}
        <span
          aria-hidden="true"
          className="rail-marker absolute top-0 left-0 h-8 w-[3px] rounded-marker bg-accent motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.2,0,0,1)]"
          style={{ transform: "translateY(6.5px)" }}
        />
        <ul className="list-none pl-[15px]">
          {LINKS.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={i === 0 ? "true" : undefined}
                className="block min-h-11 rounded-focus py-2 text-[20px]/[1.45] text-pebble no-underline transition-[color] duration-120 ease-[ease] hover:text-charcoal aria-[current=true]:text-charcoal"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <RailScript />
    </nav>
  );
}
