import Image from "next/image";
import { displayDate, resume, sortByDate } from "@/src/lib/resume";
import { Icon } from "./icons";
import { TimelineScript } from "./TimelineScript";

// Spec §4.4, §6.4. The dot, connector, height animation and reveal styles live in globals.css ("Timeline").
// No headings inside <summary> (§9.3): the company is plain text.
export function Experience() {
  const entries = sortByDate(resume.experience);
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="mb-6 text-[24px]/[1.25] font-bold text-balance"
      >
        Experience
      </h2>
      <ol className="timeline grid list-none gap-5 pl-9 md:gap-6 md:pl-12">
        {entries.map((job, i) => {
          // The 54px indent (40px logo + 14px gap) only applies when there is a logo (§6.4).
          const indent = job.logo ? "md:ml-[54px]" : "";
          return (
            <li key={job.company} className="entry relative">
              <span className="dot" aria-hidden="true" />
              {/* The first card in sorted order opens on load (§6.4), whichever company that is. */}
              <details
                name="experience"
                open={i === 0}
                className="group min-w-0 rounded-card border border-rule bg-white p-6 md:p-7"
              >
                <summary className="group/summary block cursor-pointer list-none rounded-focus [&::-webkit-details-marker]:hidden">
                  {/* The {" "} nodes are not rendered in flex layout; they keep words apart in the accessible name. */}
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                    <span className="flex min-w-0 items-center gap-3.5">
                      {job.logo && (
                        <Image
                          src={job.logo}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 flex-none rounded-logo border border-rule object-contain"
                        />
                      )}{" "}
                      <span className="text-[18px]/[1.3] font-semibold transition-colors duration-120 ease-[ease] group-hover/summary:text-accent md:text-[21px]/[1.3]">
                        {job.company}
                      </span>
                    </span>{" "}
                    {/* Dates and chevron wrap as one unit, so the chevron always ends the row. */}
                    <span className="ml-auto flex items-center gap-x-4">
                      <span className="text-[15px]/[1.45] text-pebble">
                        {displayDate(job)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-1 size-[9px] flex-none [transform:rotate(45deg)_translateY(-3px)] border-r-2 border-b-2 border-pebble ease-[cubic-bezier(0.2,0,0,1)] group-open:[transform:rotate(-135deg)_translateY(-1px)] motion-safe:transition-transform motion-safe:duration-200"
                      />
                    </span>
                  </span>{" "}
                  <span
                    className={`mt-0.5 block text-[15px]/[1.45] text-pebble ${indent}`}
                  >
                    {job.title}
                  </span>
                </summary>
                {/* padding-top, not margin: a margin would leak past the clipped box and jump at the end of a close (§6.4). */}
                <ul
                  className={`grid list-disc gap-2 pt-4 pl-5 text-base/[1.6] marker:text-pebble md:text-[17px]/[1.6] ${indent}`}
                >
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {job.links && (
                  <div className={`mt-3 flex flex-wrap gap-x-5 ${indent}`}>
                    {job.links.map(({ label, url }) => (
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
              </details>
            </li>
          );
        })}
      </ol>
      <TimelineScript />
    </section>
  );
}
