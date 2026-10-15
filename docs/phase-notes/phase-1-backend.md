# Phase 1 — Backend: Data Layer

Status: **applied** (2026-10-15). Branch: `phase-1-data-layer`. Not committed.

The approved proposal is implemented with the amendments from the Phase 1 brief and `docs/decisions.md` ("Phase 1 Decisions (2026-10-15)").

## What I did
- **Schema (`data/schema.ts`, Zod 4).** Every object uses `z.strictObject`, so an unknown key fails at any level.
  - `yearMonth` dates use the `"YYYY-MM"` format. `endDate: null` means a current role.
  - `featured` defaults to `false`. It exists on experiences only.
  - `links` is an optional `{ label, url }[]` on experiences and projects.
  - `image` is an optional `{ src, alt }` on projects and on `basics`. `src` must be a site-root path, for example `/images/headshot.jpg`. `alt` must not be empty.
  - `dateLabel` is an optional override.
  - A refine rejects an `endDate` that is before its `startDate`.
  - `phone` is not in the schema.
  - Exported types: `Resume`, `Experience`, `Project`, `Education`, `Link`, `Image`.
- **Data (`data/resume.json`), structure only, no wording changes:**
  - Removed `basics.phone`.
  - Added `"featured": true` to Babel Street and Verisk.
  - Added the three Scout repo links and one `GitHub` link to each project, with the exact URLs from decisions.md.
  - Kept all `dateLabel` values.
  - Added no `image` entries.
- **Loader and helpers (`src/lib/resume.ts`):**
  - `resume`: the parsed, typed data. It throws `data/resume.json is invalid:` followed by `z.prettifyError` output.
  - `formatDateRange(start, end)`: a null or missing end gives "Present". Same year gives "Jan - Jun 2026". Different years give "Sep 2025 - Present". The same month gives "Mar 2026".
  - `displayDate(item)`: returns the item's `dateLabel` if it has one, otherwise `formatDateRange`.
  - `sortByDate(items)`: current roles first, then newest `endDate`, then newest `startDate`. It returns a new array.
  - `featuredExperience()` / `compactExperience()`.
- **Self-check (`src/lib/resume.check.ts`, run with `npm run check:data`):**
  - Plain `node` with `node:assert`, no test framework.
  - Asserts that `formatDateRange` reproduces every existing experience and project `dateLabel`.
  - Also covers the Present, cross-year and same-month cases, the sort order, and the featured/compact split.
- **Build-time validation:** `next.config.ts` has `import "./src/lib/resume.ts";`. Every `next build` and `next dev` therefore parses the JSON, even before any page imports it. I kept all existing config options.
- **Dependency:** `zod@^4.6.7` is now in `dependencies`.

## Decisions I made
- **Loader imports use `.ts` and `with { type: "json" }`.** The Next 16 docs (`01-app/03-api-reference/05-config/02-typescript.md`) say `next.config.ts` may load through Node's native TypeScript resolver on Node 22.18+. That resolver does not support path aliases or extensionless imports. So the loader uses relative paths, explicit `.ts` and a JSON import attribute. Both loading routes work:
  - the config loader: confirmed by the build and both demos;
  - Turbopack, through `@/src/lib/resume`: I added a temporary import in `app/page.tsx`, built, saw "Sep 2025 - Present" in the HTML, then reverted the file.
  - No `prebuild` script was needed.
- **Added `"allowImportingTsExtensions": true` to `tsconfig.json`.** `tsc` needs it for the `.ts` import paths. It is allowed because `noEmit` is already set. This is the only change outside the planned files.
- **Added `displayDate`.** It applies the approved "`dateLabel` overrides" rule, so Frontend does not have to write that logic again.
- **Months use a fixed English array, not `Intl`.** The output is then the same on every build machine.

## Files changed
- `data/schema.ts` (new)
- `data/resume.json`
- `src/lib/resume.ts` (new)
- `src/lib/resume.check.ts` (new)
- `next.config.ts` (one import added)
- `tsconfig.json` (`allowImportingTsExtensions`)
- `package.json` (`zod` dependency, `check:data` script), `package-lock.json`
- `docs/phase-notes/phase-1-backend.md` (this file)

## Verification
- `npm run build`: passes with the real data.
- `npx tsc --noEmit`: passes.
- `npm run lint`: passes.
- `npm run check:data`: prints `resume helpers: all checks passed`. Node also prints a harmless `MODULE_TYPELESS_PACKAGE_JSON` warning because `package.json` has no `"type"`.
- `data/resume.json` was restored byte-for-byte after each demo (checked with `cmp`). `git diff data/resume.json` shows only the intended changes.

### Demo 1: Verisk `"endDate": "2025-6"`, then `npm run build` (exit 1)
```
▲ Next.js 16.4.1 (Turbopack)
⨯ Failed to load next.config.ts, see more info here https://nextjs.org/docs/messages/next-config-error

> Build error occurred
Error: data/resume.json is invalid:
✖ Use "YYYY-MM", e.g. "2026-01"
  → at experience[1].endDate
    at parseResume (C:\Users\yvelt\portfolio-website\my-nextjs-app\src\lib\resume.ts:44:15)
    at Object.<anonymous> (C:\Users\yvelt\portfolio-website\my-nextjs-app\src\lib\resume.ts:48:16)
```

### Demo 2: `"featured"` changed to `"featurd"` on Babel Street, then `npm run build` (exit 1)
```
▲ Next.js 16.4.1 (Turbopack)
⨯ Failed to load next.config.ts, see more info here https://nextjs.org/docs/messages/next-config-error

> Build error occurred
Error: data/resume.json is invalid:
✖ Unrecognized key: "featurd"
  → at experience[0]
    at parseResume (C:\Users\yvelt\portfolio-website\my-nextjs-app\src\lib\resume.ts:44:15)
    at Object.<anonymous> (C:\Users\yvelt\portfolio-website\my-nextjs-app\src\lib\resume.ts:48:16)
```
The line numbers in the stack trace are from Next's transpiled config, not from the source file. The field path in the message is the part that matters.

## For Frontend
- Import from `@/src/lib/resume`, for example `import { resume, displayDate, featuredExperience } from "@/src/lib/resume"`.
- Types are in `@/data/schema`.

## Skills used
- `ponytail` (minimal-change mode) was active for the whole session.
- No other skill fit this task.

## Open questions
1. **Phone in git history.** The phone number is no longer in `resume.json`, but it is still in commit `3c3c389`. If the repo will be public, do you want the history rewritten before you push?
2. **`dateLabel` removal.** This is still open in decisions.md. The self-check proves the derived ranges match the stored labels, so you can delete the experience and project `dateLabel`s whenever you want. The education label ("Expected Dec 2026") must stay.
3. **Folder layout.** The app is still in `app/` at the root, but `plan.md` targets `src/app/`. Moving it is Frontend's job. Nothing here depends on that choice.
