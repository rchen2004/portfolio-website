// Self-check for the resume helpers. Run: npm run check:data (plain Node 24, no test framework).
import assert from "node:assert/strict";
import { resume, formatDateRange, sortByDate, featuredExperience, compactExperience } from "./resume.ts";

// The derived range must reproduce every existing dateLabel, so the overrides stay optional.
for (const item of [...resume.experience, ...resume.projects]) {
  if (item.dateLabel !== undefined) {
    assert.equal(formatDateRange(item.startDate, item.endDate), item.dateLabel, `${"company" in item ? item.company : item.name}`);
  }
}

assert.equal(formatDateRange("2025-09", null), "Sep 2025 - Present");
assert.equal(formatDateRange("2025-09", undefined), "Sep 2025 - Present");
assert.equal(formatDateRange("2025-11", "2026-02"), "Nov 2025 - Feb 2026");
assert.equal(formatDateRange("2026-03", "2026-03"), "Mar 2026");

assert.deepEqual(
  sortByDate([
    { startDate: "2023-01", endDate: "2023-05" },
    { startDate: "2024-01", endDate: null },
    { startDate: "2024-02", endDate: "2024-06" },
    { startDate: "2024-04", endDate: "2024-06" },
  ]).map((d) => d.startDate),
  ["2024-01", "2024-04", "2024-02", "2023-01"],
);

assert.deepEqual(featuredExperience().map((e) => e.company), ["Babel Street", "Verisk Analytics Inc."]);
assert.deepEqual(compactExperience().map((e) => e.company), ["Scout", "Ventus Health"]);

console.log("resume helpers: all checks passed");
