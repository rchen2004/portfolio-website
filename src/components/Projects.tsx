import { displayDate, resume } from "@/src/lib/resume";
import { Icon } from "./icons";

// Spec §4.5, §6.5. The hover lift lives in globals.css ("Project cards"): hover is read on the <li>, the
// <article> moves. The card is not a link: no overlay, no tabindex, default cursor; only the GitHub link responds.
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2
        id="projects-heading"
        className="mb-6 text-[24px]/[1.25] font-bold text-balance"
      >
        Projects
      </h2>
      <ul className="projects grid list-none gap-5">
        {resume.projects.map((project) => (
          <li key={project.name}>
            <article className="min-w-0 cursor-default rounded-card border border-rule bg-white p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h3 className="text-[18px]/[1.3] font-semibold text-balance md:text-[21px]/[1.3]">
                  {project.name}
                </h3>
                <span className="text-[15px]/[1.45] text-pebble">
                  {displayDate(project)}
                </span>
              </div>
              <p className="mt-0.5 text-[15px]/[1.45] text-pebble">
                {project.technologies.join(", ")}
              </p>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-base/[1.6] marker:text-pebble md:text-[17px]/[1.6]">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {project.links && (
                <div className="mt-3 flex flex-wrap gap-x-5">
                  {project.links.map(({ label, url }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className="labeled-link"
                    >
                      <Icon name="brand-github" className="size-[18px]" />
                      {label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
