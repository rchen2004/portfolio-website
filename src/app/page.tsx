import { resume } from "@/src/lib/resume";

// Phase 3 placeholder that proves the tokens are wired. Replaced by the Hero in Phase 4.
const swatches = [
  ["paper", "bg-paper"],
  ["white", "bg-white"],
  ["charcoal", "bg-charcoal"],
  ["pebble", "bg-pebble"],
  ["accent", "bg-accent"],
  ["accent-deep", "bg-accent-deep"],
  ["rule", "bg-rule"],
] as const;

export default function Home() {
  return (
    <main className="mx-auto max-w-[880px] px-4 py-15">
      <h1 className="text-4xl font-bold tracking-[-0.015em] text-balance md:text-5xl">
        {resume.basics.name}
      </h1>
      <ul className="mt-8 flex flex-wrap gap-3" aria-label="Color tokens">
        {swatches.map(([name, bg]) => (
          <li key={name} className="text-[15px] text-pebble">
            <span
              className={`block size-12 rounded-card border border-rule ${bg}`}
            />
            {name}
          </li>
        ))}
      </ul>
    </main>
  );
}
