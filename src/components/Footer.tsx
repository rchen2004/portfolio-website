import { cacheLife } from "next/cache";
import { resume } from "@/src/lib/resume";

// Spec §6.8: the year is fixed at build time and changes on the next deploy. Cache Components needs the
// clock read inside a cache scope; the never-revalidating profile keeps the page fully static (no ISR).
async function buildYear() {
  "use cache";
  cacheLife({ revalidate: Infinity, expire: Infinity });
  return new Date().getFullYear();
}

// Spec §4.6, §6.8: outside <main>, in main's column. The link reuses the §6.1 underline style at 14px.
export async function Footer() {
  return (
    <footer className="flex max-w-[880px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-rule pt-6 pb-[max(32px,env(safe-area-inset-bottom))] text-[14px]/[1.45] text-pebble xl:col-start-2">
      <p>
        © {await buildYear()} {resume.basics.name}
      </p>
      <a href="#top" className="labeled-link text-[14px]">
        Back to top
      </a>
    </footer>
  );
}
