# Phase 3: Frontend (Project Scaffold)

## What I did
- Moved the app from `app/` to `src/app/` with `git mv`. `@/*` still maps to `./*`; imports use `@/src/lib/resume`. Nothing else in code or config referenced the root `app/`. `next.config.ts` needed no change. Removed the stale `.next/` (it held route types for the old `app/` path and broke `tsc`).
- Wrote the tokens into `src/app/globals.css`: plain `@theme` with the seven colors, four radii, `--shadow-card-hover`, Figtree as `--font-sans`, and only `sm` 600 / `md` 720 / `xl` 1200 breakpoints. One `html[data-theme="dark"]` block redefines the colors, the shadow and `color-scheme`. Removed the `prefers-color-scheme` block. Body is Paper on Charcoal, 16px, 17px from 720px.
- `src/app/layout.tsx`: Figtree (400/600/700, latin, swap) replaces Geist. `lang="en"` and `suppressHydrationWarning` on `<html>`. Title is `basics.name` and description is `basics.tagline`, both from the loader.
- `src/app/page.tsx`: a placeholder that shows `basics.name` as an h1 in Figtree 700 and a row of the seven token swatches.
- Prettier 3.9.10 and prettier-plugin-tailwindcss 0.8.1, pinned exactly. Added `.prettierrc`, `.prettierignore`, and the scripts `format` / `format:check`.
- Added the `typecheck` script: `next typegen && tsc --noEmit`.
- Added `.github/workflows/ci.yml`. It runs on push and pull_request: checkout, setup-node (`.nvmrc`, npm cache), `npm ci`, typecheck, lint, format:check, check:data, build.

## Decisions
- **`--color-*: initial`.** This removes Tailwind's default palette, so only the seven tokens exist (spec §1.1: "No other colors"). One side effect: `--color-white` is the card-surface token, and there is no `black` utility.
- **Body size is set on `body`, not `html`.** `rem` stays at the browser default. The spec's px spacing (4px steps) stays exact, and the visitor's font-size setting still applies. This matches `design-preview.html`, which also sets 17px/16px on `body`.
- **`typecheck` runs `next typegen` first.** `LayoutProps` and the route validators are generated into `.next/types`. In CI, typecheck runs before build, so a plain `tsc` would fail on a clean checkout.
- **Prettier `endOfLine: "auto"`.** This checkout has `core.autocrlf=true` (CRLF on disk), and CI checks out LF. With the default `lf`, every file fails locally.
- **`.prettierignore`** covers `.next`, `node_modules`, `package-lock.json` and `public`. It also covers:
  - `docs/`, `plan.md`, `CLAUDE.md` and `README.md`, because they are approved prose and reformatting them would churn reviewed diffs;
  - `AGENTS.md`, which `next dev` rewrites;
  - `.claude/` and `.mcp.json`, which are agent and tool config and not app code.
- **Prettier defaults otherwise** (printWidth 80, double quotes).

## Files changed
- `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/favicon.ico` (moved from `app/`)
- `package.json`, `package-lock.json` (two dev dependencies and three scripts)
- `.prettierrc`, `.prettierignore`, `.github/workflows/ci.yml` (new)

## Verification
- `npm run typecheck`: pass (on a clean `.next`)
- `npm run lint`: pass
- `npm run format:check`: **fail** on 4 Backend files (see Open questions)
- `npm run check:data`: pass. Node prints a `MODULE_TYPELESS_PACKAGE_JSON` warning for `resume.check.ts`; it is not an error.
- `npm run build`: pass. `/` and `/_not-found` are prerendered as static.

## Open questions / handoffs
1. **Backend: run `npm run format`** (or `npx prettier --write data src/lib`). `data/resume.json`, `data/schema.ts`, `src/lib/resume.ts` and `src/lib/resume.check.ts` don't match Prettier: Backend wraps lines at about 110 characters, and short arrays sit on multiple lines. They are Backend's files, so I didn't format them. CI's `format:check` fails until this is done. The only changes are whitespace and line wrapping.
2. **Backend: add `.nvmrc` (Node 24).** `setup-node` in CI fails until it exists.
3. **Backend (optional):** add `"type": "module"` to `package.json` to silence the `check:data` warning. It needs a check that nothing else relies on CommonJS.
4. `README.md` still says "edit `app/page.tsx`" (create-next-app boilerplate). Whoever owns the README should update or replace it.
5. Metadata is temporary. Backend owns SEO in Phase 6.
6. The theme toggle and its blocking `<head>` script are not added. They belong to Phase 4 (spec §6.9). Until then, `data-theme` is never set and the site is always light.

## Skills used
- `frontend-design`: read it; this phase only wires tokens and makes no new visual decisions.
- `21st-ui`: checked; not used, because there are no components this phase.
