// Explicit ".ts" and the JSON import attribute are required because next.config.ts imports this file,
// and Next 16 on Node 24 loads the config with Node's native TypeScript support (no path aliases, no bundler).
import { z } from "zod";
import raw from "../../data/resume.json" with { type: "json" };
import {
  resumeSchema,
  type Experience,
  type Project,
} from "../../data/schema.ts";

function parseResume(data: unknown) {
  const result = resumeSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `data/resume.json is invalid:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

export const resume = parseResume(raw);

/** Served from public/resume.pdf, a separately exported file (not generated from resume.json). */
export const RESUME_PDF = "/resume.pdf";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-01" -> { month: "Jan", year: "2026" } */
function parseYearMonth(ym: string) {
  const [year, month] = ym.split("-");
  return { month: MONTHS[Number(month) - 1], year };
}

/** Same year: "Jan - Jun 2026". Different years: "Sep 2025 - Present". A null or missing end is "Present". */
export function formatDateRange(
  start: string,
  end: string | null | undefined,
): string {
  const s = parseYearMonth(start);
  if (!end) return `${s.month} ${s.year} - Present`;
  if (end === start) return `${s.month} ${s.year}`;
  const e = parseYearMonth(end);
  if (s.year === e.year) return `${s.month} - ${e.month} ${e.year}`;
  return `${s.month} ${s.year} - ${e.month} ${e.year}`;
}

/** The text to show for an item's dates: its `dateLabel` override, otherwise derived from the dates. */
export function displayDate(item: Experience | Project): string {
  return item.dateLabel ?? formatDateRange(item.startDate, item.endDate);
}

/** Current (null endDate) first, then newest endDate, then newest startDate. Returns a new array. */
export function sortByDate<
  T extends { startDate: string; endDate: string | null },
>(items: readonly T[]): T[] {
  return [...items].sort(
    (a, b) =>
      Number(b.endDate === null) - Number(a.endDate === null) ||
      (b.endDate ?? "").localeCompare(a.endDate ?? "") ||
      b.startDate.localeCompare(a.startDate),
  );
}
