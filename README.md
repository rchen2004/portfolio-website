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

## Project docs

- [`plan.md`](plan.md): the project plan and phases.
- [`docs/decisions.md`](docs/decisions.md): approved decisions (wins over `plan.md` on conflict).
- [`docs/design-spec.md`](docs/design-spec.md): the approved design spec.
- [`docs/phase-notes/`](docs/phase-notes/): a summary of each phase, per agent.
