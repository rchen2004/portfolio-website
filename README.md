# Ryan Chen: Portfolio

Personal portfolio site for Ryan Chen. Built with Next.js (App Router), TypeScript and Tailwind CSS v4, and deployed on Vercel as a static site. There is no server-side code.

## Requirements

- Node 24 (pinned in `.nvmrc` and `package.json` `engines`). With nvm: `nvm use`.
- npm (the repo uses `package-lock.json`). Install with `npm ci`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at http://localhost:3000 |
| `npm run build` | Production build (also validates `data/resume.json`) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types, then run `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run check:data` | Self-check for the resume data helpers |
| `npm run build:favicon` | Rebuild `src/app/favicon.ico` (16, 32, 48 px) from `src/app/icon.svg`; run after changing the icon |

CI (`.github/workflows/ci.yml`) runs typecheck, lint, format:check, check:data and build on every push and pull request.

## Where content lives

- `data/resume.json` holds all site text. Edit it and push; the site rebuilds.
- `data/schema.ts` is the Zod schema for it. A malformed edit fails the build with an error naming the bad field.
- `public/resume.pdf` is the downloadable resume, served at `/resume.pdf`. To update it, replace the file with one of the same name.
- `src/lib/` loads and validates the data and holds the helpers (dates, sorting).

## Updating the site

### Live site and deploys

- Live at **https://rchen2004.vercel.app** (Vercel project `rchen2004`, connected through the GitHub integration).
- Pushing or merging to `main` deploys production. Every other branch and pull request gets a preview URL, which needs a Vercel login to open.

### Common edits

All text lives in `data/resume.json`. The build checks it against `data/schema.ts` and stops with the name of the bad field if something is wrong.

- **Change a bullet or the tagline.** Edit the string in place: bullets are the `highlights` arrays, the tagline is `basics.tagline` (it is also the page's meta description and the link-preview text). Keep straight quotes in JSON and escape any `"` inside a string as `\"`.
- **Add or remove a job.** Add or delete an object in `experience`. Required: `company`, `title`, `startDate` (`"YYYY-MM"`), `endDate` (`"YYYY-MM"`, or `null` for a current role, shown as "Present") and at least one `highlights` entry. Optional: `links` (`[{ "label": ..., "url": ... }]`) and `logo`. Jobs are sorted by date on the page, so their order in the file does not matter.
- **Add or remove a project.** Same idea in `projects`. Required: `name`, `technologies` (a list of strings), `startDate`, `endDate` and `highlights`. Optional: `links`. Projects appear in file order.
- **Dates vs `dateLabel`.** Leave `dateLabel` out: the site builds the label from the dates (for example `"Jan - Jun 2026"` or `"Sep 2025 - Present"`). On jobs and projects, `npm run check:data` fails if a `dateLabel` does not match what the dates would produce. Education's `dateLabel` (for example `"Expected Dec 2026"`) is free text.
- **Company logo.** Put the image in `public/` and set `"logo": "/file-name.jpg"` (a path starting with `/`). `npm run check:data` fails if the file is missing.
- **Add a technology.** Add `{ "name": ..., "icon": ... }` to `technologies` (shown in file order). The `icon` value must be one of the keys in the `technologyIcon` list in `data/schema.ts`. For a new key you must also add its SVG to `TECH_ICONS` in `src/components/icons.tsx`; that map is typed by the schema list, so a key without an SVG fails `npm run typecheck` (and CI). The existing icons come from [Simple Icons](https://simpleicons.org) (24 x 24, one path); copy the pattern of the entries already there.
- **Change the photo.** Replace `public/hero.jpg` with a 4:5 crop, about 1350 x 1688, keeping the same file name. Update `basics.image.alt` if the photo changes. The hero frames it with `object-[50%_76%]` in `src/components/Hero.tsx`, tuned for the current photo, so check the framing on desktop and mobile.
- **Update the resume PDF.** Replace `public/resume.pdf` with a file of the same name. Keep it matching `resume.json`, since both are public.
- **Change the favicon.** Edit `src/app/icon.svg`, then run `npm run build:favicon` to rebuild `src/app/favicon.ico`. The Apple touch icon is drawn separately in `src/app/apple-icon.tsx`, so copy the same change there.

### Before you push

Run `npm run check:data` and `npm run build`. CI also runs these (plus typecheck, lint and format:check) on every push and pull request, so a red check on GitHub means the same thing.

### Adding a custom domain later

Add the domain in Vercel under the project's Settings, then Domains, and follow its DNS steps. No code change is needed: `SITE_URL` in `src/lib/site.ts` reads `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets to the production domain on every build. It is used for the canonical and Open Graph URLs, the sitemap, robots.txt and the JSON-LD. Redeploy `main` once after adding the domain so those pick it up.

### Notes for AI agents

Read `CLAUDE.md`, the agent definitions in `.claude/agents/` and `docs/decisions.md` before changing anything.

## Project docs

- [`plan.md`](plan.md): the project plan and phases.
- [`docs/decisions.md`](docs/decisions.md): approved decisions (wins over `plan.md` on conflict).
- [`docs/design-spec.md`](docs/design-spec.md): the approved design spec.
- [`docs/phase-notes/`](docs/phase-notes/): a summary of each phase, per agent.
