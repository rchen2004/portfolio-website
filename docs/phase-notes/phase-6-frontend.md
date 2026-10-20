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

## Pre-cropped hero photo (audit fixes 1 and 3), 2026-10-19

Agent: Frontend. Branch `phase-6-polish`. Uses Backend's uncommitted `public/hero.jpg` (1350x1688) and `basics.image.src: "/hero.jpg"`. Not committed. `AGENTS.md` was not touched. I stopped the server and every headless Chrome I started.

### What I did

- `src/components/Hero.tsx`: removed the transform and `transform-origin`. Kept `fill`, `object-cover` and the frame (4:3 below 720px, 4:5 at 720px and up). Set `sizes="(min-width: 720px) 280px, 100vw"` and added `fetchPriority="high"` next to `preload`. The preload `<link>` now carries `fetchpriority="high"` too.
- **`object-position` is `50% 76%`, not 78%.** I compared the 4:3 frame at 390 pixel by pixel with the old crop (`light-390.png`) at 75 to 80%. The mean absolute difference was 10.4 at 75%, **4.6 at 76%**, 10.5 at 77%, 14.2 at 78% and 19.1 at 80%. A difference of 4.6 is resampling noise; the 4:5 frame at 1440 scores 4.59 against the old crop. At 78% the face sits visibly higher than before. By eye, 76% gives the same face position and zoom as the old crop at both widths.
- Shots (scratchpad `shots/`): `hero-precrop-{390,1440}.png`, plus `cmp-{390,1440}.png` side-by-side images.

### CI checks

`typecheck`, `lint`, `format:check`, `check:data` and `build` all pass (run after the 76% change).

### Lighthouse 13.5.0, Chrome 155 headless, median of 3, light (scratchpad `audit2/`)

| Preset  | Perf / A11y / BP / SEO | LCP (element: hero `<img>`)   | Total transfer          |
| ------- | ---------------------- | ----------------------------- | ----------------------- |
| Mobile  | 97 / 100 / 100 / 100   | 2.58 s (was 2.54 s)           | 256 KB (was 317 KB)     |
| Desktop | 100 / 100 / 100 / 100  | 0.57 s (was 0.55 s)           | 246 KB (was 307 KB)     |

- The LCP-discovery insight now passes. Simulated mobile LCP did not move: on localhost the image phases take about 6 ms each, so the simulated time comes from elsewhere on the critical path, not from the photo's bytes.
- Photo transferred (WebP, measured with CDP): **390 at DPR 2: 58.1 KB (`w=828`)**, down from 209.5 KB. **1440 at DPR 1: 42.0 KB (`w=640`)**, down from 103.1 KB. Lighthouse mobile (412 at DPR 1.75) gets 51.7 KB (`w=750`).

### Files changed

- `src/components/Hero.tsx`
- `docs/phase-notes/phase-6-frontend.md` (this section)

Skills used: `frontend-design` (preloaded). No new dependencies.

### Open questions

- Spec §5 says `50% 78%`. Design should change it to `50% 76%`, or say whether to keep 78%.
- Desktop still gets the 640w file, not 384w: the bare `100vw` makes Next drop every width below 640. Writing `calc(100vw)` would bring back 384w (about 21 KB, about -21 KB). That is a one-token change; does the owner want it?

- **Follow-up (owner approved):** `sizes` is now `(min-width: 720px) 280px, calc(100vw)`; `object-position` stays at 76%. All five checks pass and the build prints no `sizes` warnings. From `next start`: 1440 at DPR 1 picks `w=384`, 20.7 KB (was 42.0 KB); 390 at DPR 2 picks `w=828`, 58.1 KB (unchanged). One Lighthouse 13.5.0 run each: mobile 97/100/100/100 (LCP 2.58 s), desktop 100/100/100/100 (LCP 0.53 s).

## QA screenshots for Design, and Safari-on-iPhone checklist, 2026-10-19

Agent: Frontend. Branch `phase-6-polish` at 3d40139. No source files changed. I ran `next build` and `next start`, and took the screenshots in Chrome 155 headless over CDP. The server and Chrome were stopped afterwards. `AGENTS.md` was not touched.

### What I did

- I captured 76 PNGs in the scratchpad `qa6/` folder, with an `index.md` there: full pages at 9 widths in both themes, the hover, focus, active, open and mid-animation states at 390 and 1440, a no-JS page, 200% zoom and forced colors. Every shot listed in the task was captured.
- **No-JS check:** `<html>` gets no `data-theme`, both toggles are `display: none`, and nothing in `<main>` is at opacity 0.
- **Forced colors** (Chrome's emulation works headless): the timeline dots and connector and the rail's current-section marker disappear, because they are background colors. Text, borders, underlines, icons and focus rings remain. Design decides whether that matters.

### Safari-on-iPhone checklist (owner, on a Vercel preview)

1. **Hero blur-in:** on first load the words blur in one after another and the links fade in after them. Look for no flicker, no layout jump, and no text left blurred.
2. **Theme toggle:** tap the moon and the page goes dark with a short fade. Reload or reopen the tab: it should still be dark. Tap again and it returns to light.
3. **Opening a timeline card:** tap Babel Street. It opens and Scout closes. Safari will probably snap open with no height animation; that is acceptable. The chevron should still rotate.
4. **Scroll correction:** scroll down, then tap Ventus (the last card) while Scout is open above. When it settles, Ventus's header should be in view, not pushed above the top of the screen.
5. **No sticky hover:** after tapping a hero icon, the theme toggle, a technology or a repo link and coming back, there should be no leftover Accent circle, color or lift.
6. **Notch and corner toggle:** in portrait and in landscape, the corner moon or sun should sit clear of the notch or Dynamic Island and the rounded corners. In landscape, check that the side text is not under the notch either.
7. **Link preview:** paste the URL into Messages (or share it). The card should show "Ryan Chen", the tagline and the light preview image, not a blank or cropped one.
8. **Home Screen icon:** Share, then "Add to Home Screen". The icon should be the Charcoal tile with the "R", and have no black corners.
9. **Private Browsing:** open the site in a private tab. It loads light and the toggle still works for the visit. It may not be remembered after closing, which is expected.
10. **Smooth scroll and Back to top:** "Back to top" scrolls to the top and the page does not jump. With Settings > Accessibility > Motion > Reduce Motion on, the scroll jumps instantly, the hero shows with no blur-in, and the cards snap open.

### Files changed

- `docs/phase-notes/phase-6-frontend.md` (this section)

Skills used: `frontend-design` (preloaded). No new dependencies; nothing installed.

### Open questions

- Forced colors hides the timeline dots and connector and the rail marker. Should they get a `forced-colors` fallback (for example `CanvasText`), or is that acceptable? This is for Design.

## Forced-colors fix and logo check (Design QA must-fix), 2026-10-19

Agent: Frontend. Branch `phase-6-polish`. Not committed. `AGENTS.md` was not touched. The server and headless Chrome were stopped afterwards.

### What I did

- **Forced colors:** I added Design's `@media (forced-colors: active)` block, unlayered, at the end of `src/app/globals.css`. Design's selectors already match the code: the connector is `.timeline .entry:not(:last-child)::before`, the dot is `.timeline .dot`, and the marker is `.rail-marker`. Its `bg-accent` utility is layered, so the unlayered rule wins. In the recaptured `forced-colors-{light,dark}-1440.png`:
  - the dots show in CanvasText;
  - the open Scout dot and the rail marker show in Highlight;
  - the connector shows in GrayText, which Chrome's emulated black palette draws in green.
- **Normal mode is unchanged:** I compared all 18 full pages pixel by pixel against the shots taken before the fix, using the same capture method.
  - At 320 and 390 they are identical.
  - At the other widths the only differences are inside the hero photo's rectangle (for example cols 1010 to 1289, rows 56 to 405 at 1440). The mean difference is 0.32 out of 255 and the largest is 7. Nothing outside the photo changed.
  - A second capture on the same build is identical, so the photo difference comes from the image being re-encoded after the rebuild, not from the CSS. The new rule only applies inside the forced-colors media query.
- **Logos:** the logos are fine in normal use. The blank logos came from how the capture works. `next/image` lazy-loads by default, and Chrome's beyond-the-viewport capture does not trigger lazy loading.
  - I recaptured all 18 full pages and the 4 Ventus-open shots after scrolling through each page first.
  - Every `<img>` reported loaded. Babel Street, Verisk and Ventus show at 320 and 390 in both themes.
  - I did not change any loading behavior.

### Checks

`typecheck`, `lint`, `format:check`, `check:data` and `build`: see the summary returned to the coordinator. All passed.

### Files changed

- `src/app/globals.css` (the forced-colors block)
- `docs/phase-notes/phase-6-frontend.md` (this section)

Skills used: `frontend-design` (preloaded). No new dependencies.

### Open questions

- None.
