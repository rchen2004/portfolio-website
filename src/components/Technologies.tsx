import { resume } from "@/src/lib/resume";
import { TechIcon } from "./icons";

// Spec §4.3, §6.3. From 600px: 5 + 5. Under 600px: rows of 3/4/3 on a 12-column grid with no column gap.
// shortcut: the nth-child spans (4, then 3 for items 4 to 7) only fit exactly 10 items; if the list
// changes length, fall back to a plain 3-column grid with no spans until the layout is revisited.
export function Technologies() {
  return (
    <section id="technologies" aria-labelledby="technologies-heading">
      <h2
        id="technologies-heading"
        className="mb-6 text-[24px]/[1.25] font-bold text-balance"
      >
        Technologies
      </h2>
      <ul className="grid grid-cols-5 gap-x-4 gap-y-7 max-sm:grid-cols-12 max-sm:gap-x-0">
        {resume.technologies.map(({ name, icon }) => (
          // Hover is detected on the <li>, which never moves; only the inner wrapper lifts (no edge flicker).
          // Not interactive: no link, no tabindex, default cursor. Tailwind's hover variants sit under (hover: hover).
          <li
            key={name}
            className="group cursor-default max-sm:col-span-4 max-sm:nth-[n+4]:nth-[-n+7]:col-span-3"
          >
            {/* The logo (currentColor) and the name both take the wrapper's color, so the whole item turns Accent. */}
            <div className="flex flex-col items-center gap-2.5 text-center transition-[translate,color] duration-180 ease-[cubic-bezier(0.2,0,0,1),ease] group-hover:text-accent motion-safe:group-hover:-translate-y-1">
              <TechIcon name={icon} className="size-9" />
              <span className="text-[15px]/[1.45] font-semibold">{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
