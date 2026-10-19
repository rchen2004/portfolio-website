# Phase 6: Backend (SEO, Link Preview and Icons)

Status: **built, not committed** (2026-10-19). Branch: `phase-6-polish`. These files in `src/app/` are covered by the owner-approved exception in decisions.md ("SEO ownership").

## What I did
- **`SITE_URL`** (`src/lib/site.ts`): `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "rchen2004.vercel.app"}`. On Vercel this is the production domain on every deployment, so previews also point canonical URLs at production.
- **Metadata** (`src/app/layout.tsx`): replaced the temporary Phase 3 export. It sets `metadataBase`, `title` = `basics.name`, `description` = `basics.tagline`, `alternates.canonical` "/", `openGraph` (`website`, url, siteName, title, description) and `twitter.card` `summary_large_image`. No new text. Next adds `og:image` and `twitter:image` (with alt, type and size) from `opengraph-image.tsx`.
- **OG image** (`src/app/opengraph-image.tsx`): follows §16.1, 1200 x 630, prerendered at build. Alt is `${name}. ${tagline}`.
  - Fonts: static Figtree 400 and 700 latin **WOFF** from `@fontsource/figtree@5.3.0` (jsDelivr). I checked the WOFF magic bytes. The files are in `src/app/_fonts/` with the OFL as `OFL.txt`. They are read with `readFile` at module load, so there is no network access at build.
- **Sitemap and robots**: `src/app/sitemap.ts` has one entry, `${SITE_URL}/`, with no `lastModified`. `src/app/robots.ts` allows all and lists the sitemap URL.
- **Icons** (§16.2):
  - `src/app/icon.svg`: verbatim from the spec, including the `prefers-color-scheme` dark swap.
  - `src/app/apple-icon.tsx`: `ImageResponse` draws the same path at 180 x 180. The tile is square and light. Every pixel has alpha 255 (checked with sharp `stats`).
  - `src/app/favicon.ico`: **made to spec**. It replaces the create-next-app ICO and contains 16, 32 and 48 px images. It is the light SVG with `rx="8"`, rasterized by the `sharp` that Next already installs. No new dependency, and no `icon.tsx` fallback is needed.
- **Charcoal tile (owner choice, 2026-10-19, via the coordinator).**
  - Light: tile `#24201D`, glyph `#F4F3F0`.
  - `icon.svg` dark swap: tile `#EDEAE6`, glyph `#1A1816`.
  - `apple-icon.tsx` and `favicon.ico` use the light pair.
- **`scripts/build-favicon.mjs`** (`npm run build:favicon`; approved, was open question 3). It rebuilds `favicon.ico` from `icon.svg` by dropping the dark media query and rasterizing the light rules, so there are no colors to keep in sync. It is listed in the README scripts table.
- **JSON-LD `Person`** (`src/lib/site.ts`, `personJsonLd`): has `name`, `url`, `image` (absolute photo URL), `sameAs` (profile URLs), `alumniOf` (`CollegeOrUniversity` per `education`) and `knowsAbout` (technology names). It has no email and no jobTitle. The value is serialized once with `<` escaped to `<`. `src/app/page.tsx` renders it in a `<script type="application/ld+json">`.
- **Self-check** (`src/lib/resume.check.ts`) asserts that the JSON-LD:
  - contains no `<`;
  - contains no email;
  - has exactly the eight expected keys;
  - has `url === SITE_URL` and `name === basics.name`.

## Decisions
- **WOFF instead of TTF** for the OG fonts. The brief allowed this. Satori reads WOFF, and the Fontsource files are pinned and small (about 15 KB each). Spec §16.1 names TTF, so Design should note the change.
- **The JSON-LD builder returns the escaped string**, not an object. The self-check then tests the escaping that ships, and `page.tsx` only renders it.
- **`alumniOf` for a current student.** schema.org has no "attending" property, and spec §11 suggested `alumniOf`. The data is only the institution name.

## Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass (after `prettier --write` on `resume.check.ts`)
- `npm run check:data`: pass
- `npm run build`: pass. Every route is static (`○`): `/`, `/apple-icon`, `/icon.svg`, `/opengraph-image`, `/robots.txt` and `/sitemap.xml`.

These were fetched from `next start` (port 3123), and the server was stopped afterwards. `next dev` was not used, and `AGENTS.md` was not touched.

| Path | Status | Content-Type |
|---|---|---|
| `/` | 200 | text/html; charset=utf-8 |
| `/opengraph-image` | 200 | image/png (1200 x 630) |
| `/icon.svg` | 200 | image/svg+xml |
| `/apple-icon` | 200 | image/png (180 x 180, opaque) |
| `/sitemap.xml` | 200 | application/xml |
| `/robots.txt` | 200 | text/plain |
| `/favicon.ico` | 200 | image/x-icon |

**`<head>` as built:**
- `<title>Ryan Chen</title>`, the description, and canonical `https://rchen2004.vercel.app`;
- `og:title`, `og:description`, `og:url`, `og:site_name` and `og:type` `website`;
- `og:image` with alt, type and 1200 x 630;
- `twitter:card` `summary_large_image`, with `twitter:title`, `twitter:description` and `twitter:image` inherited;
- icons: favicon.ico (`sizes="48x48"`, set by Next), icon.svg (`sizes="any"`), and apple-touch-icon 180 x 180.

The JSON-LD script is in the body, once.

After the Charcoal change I reran all five checks. All pass, and every route is still static. `/icon.svg`, `/apple-icon` and `/favicon.ico` return 200, and the served ICO is byte-identical to the built one.

Shots (scratchpad `shots/`; `apple-icon.png`, `icon.svg` and `fav48-zoom.png` are the Charcoal versions): `og.png`, `apple-icon.png`, `icon.svg`, plus `favicon-{16,32,48}.png` and `fav{16,48}-zoom.png`. The "R" reads at 16px.

## Files changed
- New: `src/lib/site.ts`, `src/app/opengraph-image.tsx`, `src/app/apple-icon.tsx`, `src/app/icon.svg`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/_fonts/` (two WOFFs and `OFL.txt`)
- New: `scripts/build-favicon.mjs`
- Changed: `package.json` (the `build:favicon` script), `README.md` (scripts table), `src/app/layout.tsx` (metadata only), `src/app/page.tsx` (JSON-LD script only), `src/lib/resume.check.ts`, `src/app/favicon.ico` (replaced)

## Open questions
1. **Design: accept WOFF** in place of the TTFs named in §16.1. The rendering matches the spec.
2. **Design: record the Charcoal tile** in spec §16.2 and decisions.md (I don't own those files). In light, the glyph contrast is 14.5:1. In dark, the contrast of Paper-dark `#1A1816` on Charcoal-dark `#EDEAE6` is Design's figure to confirm.
3. **Real-browser tab check** (§16.2): Chrome and Firefox with the OS in light and dark mode, and the ICO in Safari. I only checked rasterized PNGs.

Skills used: none fit beyond the Next docs in `node_modules/next/dist/docs` (metadata file conventions, `opengraph-image`, `app-icons`, `sitemap`, `robots`).
