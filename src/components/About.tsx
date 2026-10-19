import { resume } from "@/src/lib/resume";

// Spec §4.2, §6.2: no card, no border; main's 72px grid gap separates it from the hero.
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <h2
        id="about-heading"
        className="mb-2 text-[15px]/[1.45] font-semibold text-balance text-pebble"
      >
        About
      </h2>
      <p className="max-w-[68ch] text-[16px]/[1.55]">{resume.basics.summary}</p>
    </section>
  );
}
