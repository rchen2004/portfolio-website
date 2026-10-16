# Phase 3: Backend (Project Scaffold)

Status: done (2026-10-16). Branch: `phase-3-scaffold`. Not committed, not deployed. Vercel not touched.

## What I did
- **Node 24 pin.** Added `.nvmrc` (`24`) and `"engines": { "node": "24.x" }` to `package.json`. Ran `npm install --package-lock-only` so the lockfile root records the engine too (see Decisions for the side effect).
- **Formatting.** Ran Prettier on `data/` and `src/lib/`. Only whitespace and wrapping changed: short arrays are now on one line, and long lines wrap at 80 characters. The parsed `data/resume.json` is identical before and after: `util.isDeepStrictEqual` is true, and so is a `JSON.stringify` comparison, so key order is also unchanged. No resume text changed.
- **`"type": "module"`.** Added to `package.json`. This silences the `MODULE_TYPELESS_PACKAGE_JSON` warning from `check:data`. Checked with it in place:
  - the only tracked JS config is `eslint.config.mjs`, which is ESM by extension and is unaffected;
  - there are no `.js` or `.cjs` files outside `node_modules`;
  - `next.config.ts` loads and still validates `resume.json`;
  - typecheck, lint, format:check, check:data and build all pass on a clean `.next`;
  - `next dev` starts and `/` returns HTTP 200.
- **Validation still fails the build.** Test: I set Scout's `startDate` to `"Sept 2025"`, ran `next build`, then restored the file byte for byte. The build exits with code 1:
  ```
  Error: data/resume.json is invalid:
  ✖ Use "YYYY-MM", e.g. "2026-01"
    → at experience[0].startDate
  ✖ endDate is before startDate
    → at experience[0].endDate
  ```
- **Vercel readiness (no `vercel.json` or `vercel.ts`, so the Next.js preset applies):**
  - Install: Vercel detects npm from `package-lock.json`.
  - Build: `npm run build` (`next build`).
  - Output: the Next.js builder handles `.next` itself. Don't set an output directory; there is no `output: "export"`.
  - Node: Vercel reads `engines.node` `24.x`, which overrides the project's Node version setting. No other config is needed.
  - `next.config.ts`: none of its settings should fail on Vercel, so I didn't change it.
    - `cacheComponents` and `partialPrefetching` are stable Next 16.4 options. Both routes prerender as static (`○`).
    - `experimental.agentFeedback` only affects `next dev`, which writes a managed block into `AGENTS.md`. It does nothing during `next build`.
    - The Turbopack `*.css` rule uses `@tailwindcss/turbopack`. That package is a devDependency, and Vercel installs devDependencies by default.
    - The config imports `./src/lib/resume.ts`. Vercel's build therefore validates `resume.json` too, and `next typegen` in CI does the same.
- **README.** Replaced the create-next-app text with a short project README: what the site is, Node 24 and npm, a table of the scripts, where content lives, and links to `plan.md` and `docs/`. The only facts about Ryan in it are his name and that the site is his portfolio.

## Decisions
- **Kept `"type": "module"`.** It passed every check I ran, and the repo has no CommonJS `.js` files. Tradeoff: any `.js` config added later (for example a CommonJS `postcss.config.js`) must be ESM or use `.cjs`.
- **Lockfile sync.** `npm install --package-lock-only` added `engines` to the lockfile root. It also added six `inBundle`, optional entries under `@tailwindcss/oxide-wasm32-wasi/node_modules/` (`@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, `tslib`). These are bundled inside an optional WASM fallback package, and npm on some platforms writes them out. No resolved dependency version changed, and `npm ci --dry-run` passes. If they cause noise in review, reverting just those entries is safe.
- **No change to `next.config.ts`.** Nothing in it is broken.

## Files changed
- `.nvmrc` (new)
- `package.json` (`type`, `engines`)
- `package-lock.json` (root `engines` and the bundled optional entries above)
- `data/resume.json`, `data/schema.ts`, `src/lib/resume.ts`, `src/lib/resume.check.ts` (Prettier, whitespace only)
- `README.md` (rewritten)
- `AGENTS.md`: `next dev` rewrote it during my dev-server check. I reverted it with `git checkout`, so it is unchanged.

## Verification (Node 24.21.0, npm 11.19.0, clean `.next`)
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass ("All matched files use Prettier code style!")
- `npm run check:data`: pass, with no warning now
- `npm run build`: pass. `/` and `/_not-found` are static.
- `npm ci --dry-run`: pass (exit 0). It warns that `unrs-resolver@1.12.2` has a postinstall script that npm's `allowScripts` doesn't cover yet. This is a warning, not an error.
- `npm ls --depth=0`: no missing or invalid packages.

## Owner checklist: connect Vercel
1. Go to https://vercel.com/new and sign in with GitHub.
2. Import the Git repository `rchen2004/portfolio-website`. If it isn't listed, give the Vercel GitHub app access to it.
3. Project name: `rchen2004`. This gives `rchen2004.vercel.app`.
4. Framework Preset: **Next.js** (auto-detected). Leave Root Directory, Build Command, Output Directory and Install Command at their defaults. No environment variables are needed.
5. Click Deploy. The first deploy builds from the default branch.
6. Confirm the production branch is `main`. Depending on the dashboard version, it is under Settings → Environments → Production (Branch Tracking) or Settings → Git. Every other branch and every PR then gets a preview URL.
7. Settings → Deployment Protection: confirm **Vercel Authentication** is on and its scope is **Standard Protection**. That is the default, and it protects previews but leaves production public.
8. To verify, open a preview URL in a private window. It should redirect to a Vercel login. `rchen2004.vercel.app` should load without one.
9. Optional: in GitHub branch protection for `main`, require the `CI / check` job.

## Open questions
1. **Resolved (2026-10-16): `featured` removed; see the follow-up below.** ~~`featured` is still in the schema, data and helpers.~~ The Phase 2 checkpoint approved removing it, along with `featuredExperience` and `compactExperience` and their checks in `resume.check.ts`. It wasn't in this task, so I left it. When should it be removed: before Phase 4 Experience, or as a separate task now?
2. **`AGENTS.md` and `experimental.agentFeedback`.** With the flag on, every `next dev` run rewrites `AGENTS.md`. Next's own text says to commit it to keep the tree clean. Should the rewritten `AGENTS.md` be committed, or should the flag be turned off? Turning it off is a one-line change in `next.config.ts`, which I own, but the owner enabled it on purpose.
3. **Resolved (2026-10-16): bumped to `^24` (24.19.2); see the follow-up below.** ~~`@types/node` is `^20`~~ while the runtime is Node 24. Nothing fails now. Bumping it to `^24` would type Node 24 APIs correctly. Approve the bump?

## Skills used
- `ponytail` (active): kept to the smallest change; no new dependencies and no config files beyond `.nvmrc`.
- `vercel:*`: checked. I didn't use `vercel:deploy`, `vercel:status` or `vercel:env`, because the brief says not to touch Vercel and there is no CLI.

## Follow-up (2026-10-16): `featured` removed, `@types/node` bumped
Owner-approved. Not committed.
- **`featured` removed** (spec §6.4 and §11 #6; decisions.md "`featured` removed"):
  - Deleted the field from `data/schema.ts` and from Babel Street and Verisk in `data/resume.json`.
  - Deleted the `featuredExperience` and `compactExperience` helpers in `src/lib/resume.ts`, along with their checks and imports in `src/lib/resume.check.ts`. `sortByDate` stays: Frontend uses it to order all experiences by date.
  - The experience object is a `strictObject`, so if someone adds `featured` back to `resume.json`, the build now fails with an unrecognized-key error.
  - The parsed `resume.json` is identical to the original once the two `featured` keys are removed. Both `util.isDeepStrictEqual` and a `JSON.stringify` comparison are true, so key order is unchanged. No other content changed.
  - Grep (excluding `node_modules`, `.next`, `.git` and `docs/`): `src/app/` has no references. The only remaining mentions are in `.claude/agents/portfolio-backend.md` and `.claude/agents/portfolio-design.md`. Those are agent config files that I neither own nor may edit, so I left them unchanged.
- **`@types/node` bumped to `^24`.** `npm i -D @types/node@^24` installed **24.19.2** and saved the range as `^24.19.2`. I changed the range to `^24` in `package.json` and in the lockfile root so it matches the approved range and the repo's major-only style. Lockfile changes:
  - the `@types/node` entry: 20.19.43 → 24.19.2;
  - its own dependency `undici-types`: 6.21.0 → 7.24.6. This is required by `@types/node` 24 and can't be avoided.
  - Nothing else changed. `npm ci --dry-run` exits 0.
- **AGENTS.md:** I didn't run `next dev`, and `AGENTS.md` is unchanged.
- **Verification (Node 24.21.0, clean `.next`):** typecheck, lint, format:check, check:data and build all pass. `/` and `/_not-found` are static.
- **Files changed:** `data/resume.json`, `data/schema.ts`, `src/lib/resume.ts`, `src/lib/resume.check.ts`, `package.json`, `package-lock.json`, this file.
- **Open question:** `docs/decisions.md` (the "`featured` removed" entry) still says "still present as of 2026-10-16", and the `.claude/agents/*` files still describe featured and compact cards. Whoever owns those files should update them.
