# Phase 4: Backend (Data for the Core Sections)

Status: **pending owner approval of the diff** (2026-10-18). Branch: `phase-4-sections`. Not committed. Review with `git diff -- data src/lib`.

## What I did
Applied the approved data shape from spec §11 (#1 to #5, #8 and #9):
- **`basics.greeting`**: a required string, set to "Hello, I'm Ryan."
- **Instagram**: `{ network: "Instagram", url: "https://www.instagram.com/ryan.chen2" }` is now the last entry in `basics.profiles`, so the profiles are LinkedIn, GitHub, Instagram. `profiles[].network` is now `z.enum(["LinkedIn", "GitHub", "Instagram"])`, so a typo fails the build.
- **`technologies`**: a new top-level array of strict `{ name, icon }` objects with `.min(1)` (not fixed at 10). The 10 entries follow the decisions.md order: Java, Python, TypeScript, C++, HTML, CSS, SQL, React.js, Tailwind, Next.js.
  - `icon` is an enum of `openjdk, python, typescript, cplusplus, html5, css, database, react, tailwindcss, nextdotjs`. Java uses `openjdk` (owner decision, recorded in decisions.md, "Java icon").
- **`experience[].logo`**: an optional site-root path (`/...`), with no `alt`, because the logo is decorative. Set to Scout `/neuscout_logo.jpg`, Babel Street `/babelstreet_logo.jpg`, Verisk `/verisk_analytics_logo.jpg` and Ventus Health `/ventus.jpg`.
- **`basics.image`**: `{ src: "/Professional.jpg", alt: "Ryan at the Golden Gate Bridge" }`. The schema field already existed; only the data is new.
- **`projects[].image`**: removed from the schema. No project used it.
- **`RESUME_PDF`**: `export const RESUME_PDF = "/resume.pdf"` in `src/lib/resume.ts`.
- **`resume.check.ts`**: every path in the data (the photo, the four logos and `RESUME_PDF`) must exist under `public/`.
- **`skills` removed (owner decision, 2026-10-18).** The owner said: "since we dont use the skills section, we can just remove that and purely have technologies... just the highlighted is fine." No full-skills dropdown. I removed:
  - the `skills` object from `resume.json` and from the schema;
  - the root `superRefine` that checked `technologies` names against `skills`;
  - its self-check in `resume.check.ts`. The image-existence check stays.

  `technologies` is unchanged (10 entries, `{ name, icon }`, `.min(1)`). **The full skills list (languages, frameworks, tools) now exists only in the resume PDF (`public/resume.pdf`).** Nothing else in the repo (outside `node_modules`, `.next` and `docs/`) referenced `skills`.

## Content integrity
- With the additions removed (greeting, image, the Instagram profile, `technologies` and the four `logo` keys), and with `skills` removed from `main`'s copy, the parsed new `resume.json` is `util.isDeepStrictEqual` to `main`. No existing text, date or link changed. The `skills` removal is an owner-requested content removal.
- All new values come from decisions.md ("Greeting", "Hero content", "Skills", "Photo alt text", "Assets supplied").
- `public/` was not touched. The phone number stays in the PDF (decisions.md, "Resume PDF keeps the phone").

## Decisions
- **Shared `sitePath`.** I factored the `/...` regex out of `image` so that `logo` reuses it. Side effect: the example path in the error message changed from `/images/headshot.jpg` to `/Professional.jpg`.
- **Key placement.** `greeting` sits after `name`, `image` after `email`, `logo` after `title`, and `technologies` after `education` (where `skills` used to be). This only affects readability.
- **Exported types.** Added `Technology`, `TechnologyIcon` and `Profile` for Frontend's icon maps.

## Files changed
- `data/schema.ts`
- `data/resume.json`
- `src/lib/resume.ts`
- `src/lib/resume.check.ts`
- `docs/phase-notes/phase-4-backend.md` (this file)

The working tree also has changes to `docs/decisions.md`, `docs/design-spec.md` and `plan.md` that I did not make (the Phase 4 decisions and the `openjdk` spec update). They agree with this diff. `AGENTS.md` is unchanged; I did not run `next dev`.

## Verification (clean run, Node 24)
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass ("resume helpers: all checks passed")
- `npm run build`: pass. `/` and `/_not-found` are static.

## Open questions
1. **`docs/decisions.md` is stale.** Its "Unused data" entry says to keep the full `skills` lists in `resume.json`. The 2026-10-18 owner decision supersedes that. I do not own the file, so the main session should mark that entry as superseded.
2. **Spec §11 versus §6.3 icon slugs.** §6.3 and §13 now say `openjdk`, which matches the enum. If Design ever switches HTML or CSS to the Devicon `css3` fallback, the enum needs a new key. That would be a one-line schema change.
3. **Frontend handoff.** Frontend should read `resume.basics.greeting`, `basics.image`, `basics.profiles` (in array order), `technologies`, `experience[].logo` and `RESUME_PDF` from `@/src/lib/resume`, and must not hardcode any of them.

## Skills used
- `ponytail` (active): smallest diff, no new dependencies.
- No `vercel:*` skill fit this task (data only, no deploy).
