// Self-check for the resume helpers. Run: npm run check:data (plain Node 24, no test framework).
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resume, formatDateRange, sortByDate, RESUME_PDF } from "./resume.ts";
import { personJsonLd, SITE_URL } from "./site.ts";

// Every site path in resume.json, plus the PDF, must exist in public/.
for (const src of [
  RESUME_PDF,
  resume.basics.image?.src,
  ...resume.experience.map((e) => e.logo),
]) {
  if (src) assert.ok(existsSync(`public${src}`), `missing public${src}`);
}

// The derived range must reproduce every existing dateLabel, so the overrides stay optional.
for (const item of [...resume.experience, ...resume.projects]) {
  if (item.dateLabel !== undefined) {
    assert.equal(
      formatDateRange(item.startDate, item.endDate),
      item.dateLabel,
      `${"company" in item ? item.company : item.name}`,
    );
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

// JSON-LD: script-safe, the expected keys only, and never the email.
assert.ok(!personJsonLd.includes("<"), "JSON-LD must escape <");
assert.ok(!personJsonLd.includes(resume.basics.email), "JSON-LD leaks email");
const person = JSON.parse(personJsonLd);
assert.deepEqual(Object.keys(person).sort(), [
  "@context",
  "@type",
  "alumniOf",
  "image",
  "knowsAbout",
  "name",
  "sameAs",
  "url",
]);
assert.equal(person.url, SITE_URL);
assert.equal(person.name, resume.basics.name);

console.log("resume helpers: all checks passed");
