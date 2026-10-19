# Phase 6: Design notes

## QA plan

Visual QA of the built site against `docs/design-spec.md`, in light and dark. Read-only: mismatches are listed for Frontend, and spec changes happen only for owner-approved decisions.

1. **Widths:** 320, 390, 768, 1199, 1200 and 1440px, in both themes.
2. **Per section, in page order** (Hero, About, Technologies, Experience, Projects, Footer, plus the rail and skip link): tokens (color, type size and weight, spacing), layout and wrapping, and icon sizes against the spec.
3. **States:** hover (under `hover: hover`), `:focus-visible` rings (circle on round controls, 4px radius elsewhere), pressed, the open accordion card, and the theme toggle in both placements.
4. **Motion:** the hero blur-in, the accordion height, and the hover lifts with motion on, then the same with `prefers-reduced-motion: reduce`.
5. **Contrast:** spot-check §9.1's pairs in both themes against the built CSS values.
6. **Phase 6 changes:** once picked, check the chosen font and the thicker Java cup against the spec, and check that Backend's metadata work causes no visible change.
7. **Output:** one list of mismatches, each with the section, width, theme, expected value and built value, ranked must-fix or nice-to-have.

## What I did (2026-10-19)

- Added "Phase 6 Decisions (in progress)" to `docs/decisions.md` with the owner's 2026-10-19 answers: font demo first, thicker Java cup, test tools, SEO ownership, title and description, and the accepted defaults.
- Checked the stale `skills` entry Backend flagged (`phase-4-backend.md` open question 1). Both "Skills" and "Unused data" (Phase 2) already carry the 2026-10-18 superseded notes, so no edit was needed.

## Owner picks after the Font Lab demo (2026-10-19)

- **Font: closed.** Figtree stays, unchanged. Spec §1.2 not edited. `decisions.md`: the "demo first" entry is marked superseded by a new "Font: Figtree kept" entry.
- **Java cup stroke: closed.** 0.5px `currentColor` stroke at 36px = `stroke-width="1.78"` in the 128-unit box, `stroke-linejoin="round"`, Java path only, follows the hover Accent. Spec §6.3 (table row and a stroke build note), §13 (icons row) and §15 (logos note) updated. The `decisions.md` entry now has the width. Contrast is unchanged in both themes, because stroke and fill share `currentColor`.

## Link preview and icons spec (2026-10-19)

- Added spec §16: the Open Graph image (§16.1) and the favicon, Apple icon and ICO (§16.2), for Backend's SEO files. Added one Phase 6 entry in `decisions.md`.
- Design defaults chosen: light-only OG image with no photo; a stroked "R" instead of "RC" (two letters don't fit at 16px); an Accent tile; `icon.svg` switches with `prefers-color-scheme`.
- I could not render the icon to check it at 16px (no raster tool in this session). The geometry is pixel-aligned on paper; check it in the built tab during QA.

## Favicon tile, OG fonts and audit (2026-10-19)

- **Favicon tile: closed (owner picked Charcoal).** Spec §16.2: tile text, `icon.svg` colors (light `#24201D` / `#F4F3F0`, dark `#EDEAE6` / `#1A1816`), the dark-mode note and contrast (about 14.5:1 light, 14.7:1 dark). §16 intro no longer lists open owner choices. New `decisions.md` entry "Favicon tile: Charcoal"; the earlier "Link preview and icons spec" entry is marked superseded for the tile.
- **OG fonts: accepted.** §16.1 now says "static TTF or WOFF" and names `@fontsource/figtree@5.3.0`. New `decisions.md` entry "OG fonts: static WOFF".
- **Frontend audit:** recorded in `decisions.md` (Lighthouse 97 mobile performance, 100 elsewhere, no axe violations). No spec change; the photo fix waits for the owner.

## Decisions made

- None of my own. Both changes are the owner's picks. I chose to write "do not use `non-scaling-stroke`" in §6.3, so the 0.5px holds through either Devicon rendering path (own 128 viewBox or the `scale(0.1875)` group).

## Files changed

- `docs/decisions.md`
- `docs/design-spec.md` (§5, §6.3, §13, §15, §16.1, §16.2)
- `docs/phase-notes/phase-6-design.md` (this file)

## Skills used

`frontend-design` (preloaded). No 21st lookups.

## Open questions

1. **QA plan source:** the coordinator asked for the QA plan "from your kickoff report", but that report was not in my context. The plan above is restated from my role file and `plan.md` Phase 6. Replace it if the kickoff version differed.
2. **`CLAUDE.md` conflict:** the SEO exception gives Backend files in `src/app/`, which `CLAUDE.md` assigns to Frontend. `decisions.md` now records it; `CLAUDE.md` itself is unchanged. The owner decides whether to note it there.
4. ~~**Favicon tile color:**~~ Closed 2026-10-19: Charcoal (spec §16.2).
5. ~~**Figtree TTFs:**~~ Closed 2026-10-19: static WOFF from `@fontsource/figtree@5.3.0` accepted (spec §16.1).
6. ~~**Apple icon format:**~~ Closed 2026-10-19: §16.2 now names `apple-icon.tsx` (`ImageResponse`, 180 x 180, square, opaque, light Charcoal pair).
7. ~~**Hero photo fix:**~~ Closed 2026-10-19: pre-crop, spec §5.
8. ~~**Pre-crop recheck:**~~ Closed 2026-10-19: Frontend matched the old mobile framing pixel for pixel at 76%.
9. ~~**§13 photo row:**~~ Closed 2026-10-19: the row now names `/hero.jpg`, no transform, and `sizes` per §5.

## Hero pre-crop check (2026-10-19)

- **4:5 (1440px): pass.** The sample matches the live 280 x 350 frame: face centered, hair at about 49% of the height, hoodie at about 26% to 79% of the width, logo at about 85% of the height.
- **4:3 (390px): pass with `object-position: 50% 78%`.** At full width the 4:3 frame shows about 60% of the file's height. 78% puts the hair about a third of the way down and the logo near the bottom, as in today's shot. No separate mobile crop is needed.
- Spec §5 rewritten (pre-crop, no transform, `sizes` `(min-width: 720px) 280px, 100vw`, old values kept for reference). §16.2 Apple icon reworded. Two new `decisions.md` entries; "Phase 6 audit" marked superseded for the photo fix.

## Hero photo final values (2026-10-19, owner approved)

- Spec §5: source `/hero.jpg`, `object-position: 50% 76%`, `fill` + `preload` + `fetchPriority="high"`, `sizes` `(min-width: 720px) 280px, calc(100vw)`. §12 photo line updated to match. "Hero photo: pre-cropped" entry in `decisions.md` updated to these values.
- **Result:** photo bytes 58KB on phones, down from 210KB; Lighthouse 97 mobile and 100 desktop, with the mobile LCP limited by render, not the photo.

## Full visual QA (2026-10-19)

Reviewed the 76 PNGs in the session scratchpad `qa6/` (HEAD 3d40139) against spec §1 to §16, and read `globals.css` and `Experience.tsx` where a screenshot left a doubt. Read-only: no source or spec edits.

**Pass or fail by area**

| Area | Result |
|---|---|
| Layout at 320, 390, 600, 720, 768, 1199, 1200, 1440, 1920 | Pass. Rail appears at 1200 only; Technologies grid is 3/4/3 below 600px and 5+5 from 600px; the hero switches at 720px; the timeline header wraps as §6.4 says |
| Type, spacing, tokens, both themes | Pass |
| Hover, focus, pressed | Pass: soft circle, lift, card border and shadow, 2px underline, round 52px rings, 4px-offset summary ring, Accent deep on `:active` |
| Open card, mid-animation, blur-in at 300ms | Pass. The connector ends at the last dot when Ventus is open |
| No JS, 200% zoom | Pass. Both toggles are hidden with no JS, and the 200% zoom layout matches 720 |
| Forced colors | **Fail**: the dots, the connector and the rail marker disappear |
| Phase 6 changes (pre-cropped photo, Java stroke) | Pass, no regression. The favicon is not in the screenshots |

**Must-fix (Frontend, `globals.css`, unlayered so it beats `bg-accent`).** Shown in `forced-colors-light-1440.png` and `forced-colors-dark-1440.png`:

```css
@media (forced-colors: active) {
  .timeline .dot,
  .timeline .entry:not(:last-child)::before,
  .rail-marker { forced-color-adjust: none; }
  .timeline .dot { background-color: CanvasText; }
  .timeline .entry:has(> details[open]) > .dot { background-color: Highlight; box-shadow: none; }
  .timeline .entry:not(:last-child)::before { background-color: GrayText; }
  .rail-marker { background-color: Highlight; }
}
```

The ring is dropped because it is a mix of the Accent color, which is not a system color. The open card is marked by Highlight on its dot, and the chevron still shows it too.

**Nice-to-have**
- The spec text in §6.7 is wrong: the focused skip link also overlaps the rail's name box at 1440, by about 18 x 7px (`focus-skip-link-*-1440.png`). It does not cover the "Ryan Chen" text, and the skip link is the top layer. Only the spec wording needs fixing, which needs the owner.
- In the full-page shots, some company logos are blank (Babel Street, Verisk and Ventus at 320; Verisk and Ventus at `full-dark-390`). That comes from `next/image` lazy loading during a full-page capture. They load in `nojs-light-390`. Confirm once by scrolling on a real phone.

**Not checked:** real Safari and iOS, Firefox, a screen reader, Windows High Contrast on real hardware (only Chrome's emulation), the favicon in a real tab at 16px (light and dark), and the ICO in Safari.

3. ~~**Font and Java cup:** after the owner picks a font and a stroke width, I update spec §1.2 (type) and §6.3, §13 and §15 (Java), with the related `decisions.md` entries.~~ Closed 2026-10-19: Figtree kept (no §1.2 change); Java stroke 0.5px applied to §6.3, §13 and §15.
