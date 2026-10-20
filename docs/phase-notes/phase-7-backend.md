# Phase 7: Backend (Launch README)

## What I did

- Added an "Updating the site" section to `README.md` (plan Phase 7, "Document how to update content in a short README"). It covers the live URL and deploys, one recipe per common `resume.json` edit, the photo, PDF and favicon, the pre-push checks, adding a custom domain later, and a pointer for AI agents.
- Checked each step against the code:
  - Required fields come from `data/schema.ts` (strict objects; `highlights` needs at least one entry; `endDate` is `null` for a current role).
  - `npm run check:data` (`src/lib/resume.check.ts`) fails if a job or project `dateLabel` differs from the label derived from its dates, and if a `logo`, `basics.image.src` or `resume.pdf` file is missing from `public/`. The README says to leave `dateLabel` out on jobs and projects.
  - Experience is sorted by `sortByDate`; projects and technologies render in file order.
  - `TECH_ICONS` in `src/components/icons.tsx` is `Record<TechnologyIcon, ReactNode>`, so a new enum key without an SVG fails typecheck.
  - The hero framing (`object-[50%_76%]` in `src/components/Hero.tsx`) is tuned for the current photo, so the README says to check it after a swap.
  - `src/app/apple-icon.tsx` draws its own copy of the icon, so a favicon change must be copied there too. `npm run build:favicon` rebuilds only `favicon.ico`.
  - `SITE_URL` (`src/lib/site.ts`) reads `VERCEL_PROJECT_PRODUCTION_URL` and is used by `metadataBase` (canonical and OG URLs), `sitemap.ts`, `robots.ts` and the JSON-LD. A custom domain needs no code change.

## Decisions

- No custom domain section beyond "add it in Vercel, then redeploy", per the owner's 2026-10-20 choice to launch on `https://rchen2004.vercel.app`.
- No content in `resume.json` changed.

## Files changed

- `README.md`
- `docs/phase-notes/phase-7-backend.md` (this file)

## Checks

- `npm run format:check`: see the summary returned to the coordinator.

## Open questions

1. `plan.md` §7 "Definition of Done" still says "The site is live on a custom domain." The 2026-10-20 decision (no domain for launch) supersedes it. The coordinator may want to update that line in `plan.md`.

Skills used: none fit (README writing only; no deploy was run).
