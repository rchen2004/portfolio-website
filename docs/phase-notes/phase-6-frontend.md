# Phase 6: Frontend

## Java logo outline (owner pick, 2026-10-19)

Agent: Frontend. Branch `phase-6-polish`. Date 2026-10-19. Not committed.

### What I did
- Added `stroke="currentColor"`, `strokeWidth={1.78}` and `strokeLinejoin="round"` to the Java path (Devicon cup) in `TECH_ICONS`, inside the existing `scale(0.1875)` group. 1.78 path units = 0.5 * 128 / 36, so the outline is 0.5px at 36px. A one-line comment says why. No other icon changed. The font stays Figtree.
- The stroke uses currentColor, so it follows the wrapper color: Charcoal at rest, Accent on hover, in both themes. Measured stroke color: `rgb(36, 32, 29)` light, `rgb(237, 234, 230)` dark.
- **Fit:** the stroked bounds are 17.08 to 110.92 (x) and 0.70 to 127.30 (y) in the 128-unit box, so the logo stays inside the 36px box with no clipping (about 0.2px to spare at the top and bottom).

### Decisions
- None beyond the owner's pick.

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass

`next start` only; the server was stopped afterwards. `AGENTS.md`, `docs/design-spec.md` and `docs/decisions.md` were not touched.

Screenshots (scratchpad `shots/`): `tech-java-0.5-{light,dark}-2x.png`.

### Files changed
- `src/components/icons.tsx`

Skills used: `frontend-design` (preloaded). No new dependencies.

### Open questions
- None.

## Audit (Lighthouse, axe, keyboard, contrast, image, font), 2026-10-19

Agent: Frontend. Branch `phase-6-polish`. Audit only: no source files changed. I built the working tree, including Backend's uncommitted SEO files, and served it with `next start` on port 3100. Afterwards I stopped the server and closed every Chrome I started. `AGENTS.md` was not touched.

Tools: `lighthouse@13.5.0` (npx), `axe-core@4.14.0` (npm pack into the scratchpad), Chrome 155 headless, and a small Chrome DevTools Protocol script I wrote in Node 24 (built-in WebSocket). Nothing was added to `package.json`. Reports and raw JSON: scratchpad `audit/` (`lh-{mobile,desktop}-{1,2,3}.report.{json,html}`, `lh-mobile-dark-a11y.*`, `axe-results.json`, `keyboard.json`, `contrast.json`, `precrop/`).

### Lighthouse (median of 3, light)

| Preset                                                         | Performance     | Accessibility | Best Practices | SEO |
| -------------------------------------------------------------- | --------------- | ------------- | -------------- | --- |
| Mobile                                                         | 97 (96, 97, 97) | 100           | 100            | 100 |
| Desktop                                                        | 100             | 100           | 100            | 100 |
| Mobile, dark (`localStorage.theme="dark"`, accessibility only) | n/a             | 100           | n/a            | n/a |

Dark was confirmed from the run's full-page screenshot.

| Metric (median) | Mobile                                                  | Desktop |
| --------------- | ------------------------------------------------------- | ------- |
| LCP             | 2.54 s (2.51 to 2.79)                                   | 0.55 s  |
| LCP element     | Hero photo `<img alt="Ryan at the Golden Gate Bridge">` | same    |
| FCP             | 0.91 s                                                  | 0.25 s  |
| CLS             | 0                                                       | 0       |
| TBT             | 40 ms                                                   | 0 ms    |
| Total transfer  | 317 KB (15 requests)                                    | 307 KB  |

Breakdown (mobile): script 146 KB (6 files), image 117 KB (photo 112 KB), HTML 25 KB, font 20 KB, CSS 7 KB. LCP is the only metric under 0.9. It is driven by the photo's size: the simulated resource load takes most of the time.

Lighthouse insights (none affect the score now):

- Image delivery: 50 KB could be saved on mobile and 93 KB on desktop (see Image).
- The photo preload has no `fetchpriority="high"`.
- 53 KB of unused JS in two Next/React chunks, and 14 KB of legacy polyfills (`Array.prototype.at`, `flat`, `Object.hasOwn` and others) in the framework chunk.
- The CSS is render-blocking (7 KB, about 100 ms simulated).

### axe-core 4.14.0

Checked at 390 (DPR 2) and 1440, light and dark, with Scout open and with Ventus open (8 configurations), after scrolling so every reveal had run.

- **Violations: none** in any configuration.
- **Incomplete (manual check): `color-contrast`**, up to 3 nodes in each Scout-open configuration and 1 node in the 390 Ventus-open configurations. The nodes are the open card's company name and its dates, and at 390 also the "NUMAC" repo link. The reason: "background color could not be determined due to a pseudo element" (the timeline connector pseudo-elements). The contrast sweep below checked these by hand: they pass, at 5.0:1 or higher.

### Keyboard (scripted Tab)

- **390:** theme toggle, then 5 hero links, Scout summary, NUMAC, 3 Stones App, 3 Stones Web, Babel Street, Verisk, Ventus, 3 project GitHub links, Back to top (17 stops). This matches §9.4.
- **1440:** skip link, name, theme toggle, then the 4 rail links, then the same order as 390 (23 stops). This matches §9.4.
- Every stop matches `:focus-visible` and shows a solid 2px ring in Charcoal (`rgb(36,32,29)` light, `rgb(237,234,230)` dark), with a 2px offset (4px on summaries). Round controls have `border-radius: 50%` and text controls have 4px. There are no elements without a ring. The only `outline: none` is `main:focus`, which the owner approved.
- After smooth scroll settles, every focused element is in the viewport and is not covered (checked with `elementFromPoint`).
- There is no focus trap. Tab past "Back to top" leaves the page.
- Enter and Space both toggle a summary. When Ventus opens, Scout closes and its repo links leave the tab order.
- The skip link shows at (16,16), 129x44. Enter moves focus to `main#top` with no ring, and the next Tab goes to the first hero link.

### Contrast (computed colors, both themes)

92 to 106 checks per state: every visible text node, link underline, SVG icon, chevron and rail marker. Backgrounds are composited up the ancestor chain, including the 10% Accent hover circle. States: rest at 390 and 1440, plus forced `:hover` and `:active` at 1440 and forced `:active` at 390. **0 below threshold.** Lowest values:

- Text: light 4.97 (Accent "Java" on hover, on Paper); dark 5.04 (Accent company name on hover, on White).
- Non-text: hovered toggle and hero icon on the circle, 4.30 light and 4.91 dark (3:1 needed). Underlines 4.97 / 5.04. Rail marker 4.97 / 5.57. Chevron 7.1 / 6.22.
- The focus ring uses the Charcoal value, 14.5:1 or higher on Paper and 13.3:1 or higher on cards.

These match spec §9.1 to within rounding.

### Image

| Viewport    | Frame   | `currentSrc` | Transferred (WebP) |
| ----------- | ------- | ------------ | ------------------ |
| 390, DPR 2  | 358x269 | `w=1920`     | 209.5 KB           |
| 1440, DPR 1 | 280x350 | `w=1080`     | 103.1 KB           |

- **Cause:** the `srcset` starts at 1080w. Next drops every width below `deviceSizes[0] x 1.6` = 1024, because `sizes` contains `160vw`. That rule also applies to the 448px desktop slot, so the 640w file that slot needs is never offered.
- **Pre-cropped copy:** I derived the visible region from the §5 transform. Desktop shows source x 413..1763, y 877..2565 (1350x1688, 4:5). The mobile 4:3 view (y 1390..2403) sits inside that region, so **one 4:5 pre-crop** with about `object-position: 50% 76%` and no transform covers both. The sample is `audit/precrop/precrop-1350x1688.jpg`, checked by eye but not compared side by side with the rendered frame.
  - With the pre-crop: about 52.6 KB at 390 DPR 2 (750w), down from 209.5 KB (-157 KB), and about 20.8 KB at 1440 DPR 1 (384w, if `sizes` lets Next offer it), down from 103.1 KB (-82 KB).
  - So yes, it would help meaningfully.

### Font

- **One Figtree file is downloaded:** a variable latin-subset WOFF2 covering 400, 600 and 700. It is 20,184 B on disk and 20.5 KB transferred, and it is preloaded.
- The build also emits a 10,228 B latin-ext file. It is in the CSS under `unicode-range` but never downloaded, because no latin-ext characters are on the page.
- The fallback is size-adjusted Arial, so CLS is 0.
- `src/app/_fonts/*.woff` (15.0 KB and 15.2 KB) are used only server-side by the OG image and are never sent to visitors.

### CI checks

`typecheck`, `lint`, `format:check`, `check:data` and `build`: all pass.

### Recommended fixes (owner decides)

1. **Pre-cropped hero photo.** Backend makes the file; Frontend changes the `sizes` and object-position. Effort: small. Gain: -157 KB on phones and -82 KB on desktop, which is half the page weight on mobile; mobile LCP should drop well under 2.5 s. Design must confirm the crop by eye at 4:3 and 4:5.
2. **If there is no pre-crop, fix `sizes` alone.** Express the mobile branch without a bare `NNNvw` token (for example `calc(160vw)`), so Next offers the smaller widths again. Effort: one line. Gain: about -60 KB on desktop. Mobile stays about the same, since the 1.6x zoom genuinely needs about 1250px.
3. **`fetchPriority="high"` on the photo** (or check whether Next 16's `preload` can emit it). Effort: one prop. Gain: small; it clears the LCP-discovery insight.
4. **Legacy polyfills (14 KB).** Set a modern `browserslist`. Effort: config, Backend-owned. Gain: small. Needs a check that Safari targets still pass.
5. **Unused JS (53 KB)** is the Next/React runtime. No reasonable fix for a static page without dropping client components; I recommend leaving it.

### Files changed

- `docs/phase-notes/phase-6-frontend.md` (this section only)

Skills used: `frontend-design` (preloaded). No new dependencies.

### Open questions

- Does the owner want the pre-crop (fix 1), which Backend makes, or the `sizes`-only fix (2)?
- Fix 4 touches config Backend owns.
