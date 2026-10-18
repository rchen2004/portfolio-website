# Phase 4: Design notes

Agent: Design. Branch `phase-4-sections`. Date 2026-10-18. Not committed.

## What I did

Recorded the owner's four answers of 2026-10-18 and brought the docs in line with them. No visual rule changed: the only spec change is the Java icon slug. The rest is wording cleanup.

1. **Java icon:** the spec now names Simple Icons `openjdk` for Java (v16.35.0 has no `java`; it returns 404). The visible name stays "Java".
2. **Resume PDF keeps the phone:** recorded as the one exception to the Phase 1 "Phone" rule. The phone stays off every page and out of `resume.json`.
3. **Theme toggle built with the Hero:** the toggle (§6.9) and its blocking `<head>` script are part of the Hero task. The rail nav and skip link are the final task, after the Footer.
4. **Build order:** Backend data, Hero (with page shell and toggle), About, Technologies, Experience, Projects, Footer, then the rail nav and skip link. Motion is built with each component in Phase 4.

## Decisions made

- None of my own. All four are owner decisions, recorded in `docs/decisions.md` under "Phase 4 Decisions (in progress)".
- Superseded and update notes: the Phase 1 "Phone" entry gets an `*Updated (2026-10-18)*` note pointing to the PDF exception. The "Phase 4 build order" entry states that it supersedes `plan.md`'s page-order list and its Phase 5 motion line. No other older entry conflicts.
- §15 (21st scouting): the rejection reasons that quoted rules that have since changed now give the current reason, with the old reason marked *History*. Every pick is still "None", with no new dependencies.

## Files changed

- `docs/decisions.md`: the Phase 1 "Phone" note, plus the new "Phase 4 Decisions (in progress)" section (4 entries).
- `docs/design-spec.md`:
  - §6.3: the table row and the Java build note now name `openjdk`.
  - §13: the Simple Icons row now names `openjdk` and gives the reason.
  - §1.5: the stale "§1.1 sentence" reference is reworded; §1.1 already lists both shadows.
  - §15: the table's outdated reasons are restated as current reasons with history notes; the variant-picks update and the Logos paragraph are adjusted to match.
- `plan.md`: in Phase 4, the build list is now the 8 steps and motion is built with each component. In Phase 5, the motion line now says it is built in Phase 4.
- `docs/phase-notes/phase-4-design.md`: this file.

Skills used: `frontend-design` (preloaded). No 21st lookups were needed; nothing in §15 was re-scouted.

## Per-section QA checklist (for each Phase 4 review)

I check each step against the spec in **light and dark**, and again with **reduced motion** on. Each item names the spec section.

### Step 2: Hero, page shell, theme toggle
- [ ] Shell: below 1200px, one column, max 1000px with 16px side padding, main capped at 880px. At 1200px and up: grid `220px minmax(0,1fr)`, 60px gap, max 1180px (§2). No nav of any kind below 1200px.
- [ ] Main padding: top 60px below 1200px (56px at 1200px and up), bottom 80px. Sections 72px apart (§1.3).
- [ ] Figtree 400/600/700. Greeting 36/48px, 700, line-height 1.1, -0.015em. Tagline 21/24px. Body text 16px below 720px, 17px from 720px (§1.2).
- [ ] Layout: below 720px, photo first, full width, 4:3, then the text with 20px gaps. From 720px: text left, photo 280 x 350 right, 40px gap, aligned to the top (§4.1).
- [ ] Photo crop matches the preview at both aspect ratios: face centered, zoomed, not a tall sliver (`fill`) (§5).
- [ ] Hero links: one row of five, icon-only, 44px targets, 24px Tabler outline icons, 8px gap, pulled left 10px so the first glyph lines up with the text. No box at rest, no underline, no tooltip. All five look the same size (§6.1).
- [ ] Hover: 10% Accent soft circle plus Accent icon, no movement. Pressed: Accent deep. Keyboard focus: the ring only (2px Charcoal, 2px offset), no circle (§6.1, §8).
- [ ] Load: words blur in one by one (700ms, 45ms stagger), the link row fades in at 700ms, and the photo is static. The text ends crisp, with no leftover blur. Line breaks match the unsplit text at 320, 390, 720 and 1200px (§7 rule 5).
- [ ] Reduced motion: the hero is fully visible on the first frame.
- [ ] Toggle below 1200px: 44px round button, glyph 16px from the window's top and right edges, scrolls away, never overlaps the photo, at least an 11px gap. First tab stop (§2, §6.9).
- [ ] Toggle at 1200px and up: not built yet; it moves into the rail in step 8. Flag it if Frontend places it anywhere else in the meantime.
- [ ] Toggle: `moon` in light and `sun` in dark, 22px. Soft-circle hover, Accent deep when pressed, focus ring.
- [ ] Theme: the first visit is light whatever the OS setting; a click switches, and a reload keeps the choice with no flash of the wrong theme. The 240ms color fade happens only during the switch; under reduced motion the switch is instant (§6.9).
- [ ] Dark: the photo is unchanged and the toggle's focus ring is light.

### Step 3: About
- [ ] The h2 "About" is 15px/600 Pebble, with 8px to the text. The text is 16px/1.55, max 68ch. No card and no border (§4.2).

### Step 4: Technologies
- [ ] 10 items in data order. The logo is 36px Charcoal (light in dark), with the name 15px/600 centered underneath, 10px gap (§6.3).
- [ ] Java shows the `openjdk` mark. HTML and CSS look like a pair (otherwise use the Devicon `css3` fallback). The SQL `database` icon matches the weight of the filled logos.
- [ ] Below 600px: rows of 3, 4 and 3, no column gap, 28px between rows, and no name wraps at 320px. From 600px: 5 + 5, gaps 28px between rows and 16px between columns (§4.3).
- [ ] Hover (pointer only): the contents rise 4px and the name turns Accent; the logo stays Charcoal; no flicker at the bottom edge. Not focusable, default cursor. Reduced motion: name color only.

### Step 5: Experience
- [ ] Order: Scout, Babel Street, Verisk, Ventus Health. Scout is open on load, set from the sort result (§4.4, §6.4).
- [ ] Cards: White, 1px Rule border, 12px radius, padding 28px (24px below 720px). The logo is 40px with an 8px radius and a Rule border. The title is indented 54px from 720px; no indent below.
- [ ] Dates are on the right; on narrow screens they wrap under the company name. The chevron points down when closed and up when open (200ms).
- [ ] Only one card is open at a time. The opening and closing height animates over 320ms, with no jump at the end of a close. Reduced motion: snaps.
- [ ] Dots: 12px, centered on the logo. Only the open card's dot is Accent, with the soft ring. The line runs exactly from the first dot to the last dot, with any card open, including the last.
- [ ] Scout's three repo links: labeled, 18px icon, Accent underline, 2px underline on hover.
- [ ] Scroll correction: opening a card below the open one keeps the clicked summary in view.
- [ ] Reveal: only entries below the fold at load fade up (320ms). Under reduced motion, or without JS, every entry is visible.
- [ ] Summary focus ring at a 4px offset, clear of the logo. Company names turn Accent on hover.

### Step 6: Projects
- [ ] Three identical cards in data order; no images. The h3 name and the date wrap correctly. The tech list is plain text; highlights have no indent; GitHub link 12px below (§6.5).
- [ ] Hover (pointer only): the border turns Pebble, the card lifts 3px with the hover shadow (75% black in dark). Cursor is default, no stretched link, no lift on keyboard focus. Reduced motion: border and shadow only.

### Step 7: Footer
- [ ] A real `<footer>` outside `<main>`. "© <year> Ryan Chen" on the left and "Back to top" on the right, 14px Pebble. 1px Rule top border, padding 24px top and 32px bottom; the two parts wrap with an 8px row gap. The link is at least 44px tall (§4.6, §6.8).

### Step 8: Rail nav and skip link
- [ ] Only at 1200px and up: `display: none` below. Sticky, padding 56px top and bottom. "Ryan Chen" 24px/600 with the toggle at the right of the same 44px row (§6.6, §6.9).
- [ ] Links: 20px Pebble, current one Charcoal with `aria-current`, 44px tall. The 3 x 32px Accent marker slides in 200ms (instant under reduced motion). The current section follows the 35% line and the bottom-of-page rule, and updates after an accordion toggle.
- [ ] Skip link: the first tab stop, visible on focus (White, Charcoal, the focus ring, at least 44px tall), and it goes to `#top` (§6.7).
- [ ] Tab order at 1200px and up: skip link, name, toggle, rail links, then the content (§9.4).
- [ ] Only one toggle instance is visible and focusable at any width; resize across 1199/1200px to check.

### Every step, in both themes
- [ ] No colors outside the seven tokens. Contrast pairs as in §9.1; the lowest is Accent on White, 5.0:1 in dark.
- [ ] Visible focus on every focusable element; every target at least 44px.
- [ ] No horizontal scroll at 320px.

## Screenshots I need for each review

Full-page screenshots at **320, 390, 768, 1199, 1200 and 1440px** wide, each in **light and dark** (12 per step). Then one set with **`prefers-reduced-motion: reduce`** emulated, at 390 and 1440px in both themes, plus a short screen recording (or a frame strip) of the hero load and one accordion open, with reduced motion off.

Extra states where a step has them:
- Hover on one item of each kind (hero link, toggle, technology, project card, link) at 1440px.
- Keyboard focus on one item of each kind.
- Experience: the Scout card open (the default) and the last card open, to check the line ends at the last dot.

1199 and 1200px together show the rail and toggle handover. 768px is the tablet hero. 320px is the narrowest fit: the hero row, the Technologies 3/4/3 rows, and the dates wrapping in the cards.

## Open questions

1. **`plan.md` Phase 5 dark mode line:** it still reads "Dark mode: approved and specified in Phase 2". The toggle is now built in Phase 4 with the Hero. I was told to edit only Phase 5's motion line, so I left it. Should it also say "built in Phase 4"?
2. **`docs/design-directions.md` (line 890)** still lists Java as `java` in the Phase 2 icon table, and line 16 says "No phone number anywhere". It is a historical Phase 2 document and wasn't in my allowed edits, so I left it. Add a one-line note pointing to `decisions.md`, or leave it as history?
3. **Step 2 toggle at 1200px and up:** the rail is built in step 8, so between steps 2 and 8 the desktop toggle has no home. Should the corner toggle stay at every width until step 8 (Design's suggestion), or should desktop have no toggle until then?

---

## Update 2026-10-18: owner answers

### What I did

1. **Skills list removed (owner decision):** `skills` leaves `resume.json`; `technologies` is the only skills data, the full list lives only in the resume PDF, and there is no "show all skills" control. Recorded in `decisions.md` (Phase 4) and applied to the spec's §11 and §14 lines that said `skills` stays. §4.3 and §6.3 never referenced `skills`, so they are unchanged. No visual rule changed.
2. **Open question 1 (approved):** `plan.md` Phase 5's dark mode line now says it is built in Phase 4 with the Hero.
3. **Open question 2:** `docs/design-directions.md` is left as history. No change.
4. **Open question 3 (approved), temporary build-order note:** from step 2 until step 8, the corner toggle shows at **every width**, including 1200px and up. In step 8 it moves into the rail at 1200px and up, per spec §6.9, which is unchanged. This replaces the step 2 checklist item "Toggle at 1200px and up: not built yet": in steps 2 to 7 I now check that the corner toggle appears at 1200px and up too, and in step 8 that it leaves the corner there.

### Decisions made

- None of my own. Superseded notes added to the Phase 2 "Skills" entry (its data part) and "Unused data" (its `skills` part; `education` still stays).
- Spec §11: the "Drift risk" bullet (`skills` vs `technologies`) is deleted, since only one list remains. The SEO note now says `knowsAbout` would come from `technologies`.

### Files changed

- `docs/decisions.md`: two superseded notes, a `plan.md` note on "Phase 4 build order", and two new Phase 4 entries ("Skills list removed", "Theme toggle placement until the rail exists").
- `docs/design-spec.md`: §11 heading and two bullets reworded, the drift-risk bullet removed; §14 row 2 marked superseded.
- `plan.md`: Phase 5 dark mode line.
- `docs/phase-notes/phase-4-design.md`: this update.

Skills used: `frontend-design` (preloaded). No 21st lookups needed.

### Open questions

- None new. Backend owns the `skills` removal in `data/resume.json`, `data/schema.ts` and `src/lib/`; I did not touch them.

---

## Step 2 QA (2026-10-18): Hero, page shell, theme toggle

Read-only review of the uncommitted step 2 build. Sources: Frontend's 25 screenshots (light and dark at 320, 390, 768, 1199, 1200, 1440; reduced motion; the 300ms blur-in frame; hover, focus, active; the preview at 1440), plus `globals.css`, `layout.tsx`, `page.tsx`, `Hero.tsx`, `ThemeToggle.tsx` and `icons.tsx`. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups.

### Results

| Item | Result | Evidence |
|---|---|---|
| Shell (§2) | Pass | `page.tsx:8-11`; 1199 and 1200 shots |
| Main padding, 72px gaps (§1.3) | Pass | `page.tsx:11` |
| Type (§1.2) | Pass | `Hero.tsx:53,56`; `globals.css:59-69`; `layout.tsx:6-11` |
| Hero layout (§4.1) | Pass | 320/390/768 shots |
| Photo crop (§5) | Pass | `light-1440` vs `preview-1440`: face centered at about 60% height, same zoom; 4:3 on mobile |
| Hero links: row, size, pull, no box, no tooltip | Pass | `Hero.tsx:59-85` |
| Hero links: all five look the same size | **Fail** | `light-390`, `light-1440`: LinkedIn and Instagram read smaller than file and mail; `icons.tsx:24,41` |
| Hover, pressed, focus (ring only) | Pass | `hover-*`, `active-light-390`, `focus-*` |
| Load motion | Pass | `globals.css:109-142`; `anim-300ms-390` |
| Reduced motion | Pass | `reduce-0ms-390`, `reduce-1440` |
| Toggle below 1200px | Pass | `page.tsx:14`; 11px gap; first tab stop |
| Toggle at 1200px and up (temporary corner) | Pass | 1200 and 1440 shots. Gap is 7px (accepted below) |
| Toggle icons, hover, pressed, focus | Pass | `focus-toggle-*`, `active-light-390` |
| Theme: head script, first visit light, fade | Pass | `layout.tsx:21,28`; `ThemeToggle.tsx:19-36` |
| Dark: photo unchanged, light ring | Pass | `dark-*`, `focus-dark-390` |
| Tokens only, no 320px scroll | Pass | `globals.css` uses the 7 tokens and `color-mix()` of them |

### Must-fix for Frontend

1. **Optical scales** (`icons.tsx`): LinkedIn **0.90**, Instagram **0.90**, GitHub **0.92**. Keep file-text 0.95, mail 1.00, moon and sun 1.0. LinkedIn and Instagram share the same 18-unit rounded frame, so they must use the same value. At 0.90 the frame is 16.2px, which roughly matches mail's area (18 x 14). GitHub's sparse outline needs slightly more. Then check by eye at 24px and send a crop of the row in both themes.
2. **`viewport-fit=cover`:** add `export const viewport: Viewport = { viewportFit: "cover" }` in `src/app/layout.tsx` (Frontend owns it). Without it, the spec's safe-area formulas (§1.3, §2) do nothing.

### Rulings on Frontend's questions

1. **Ring shape:** use a circle on round controls. The ring follows the shape of the control and of its hover circle. A square ring around a round target would look like a mistake. This needs the owner's approval, because the spec says "4px radius".
2. **Scales:** values given above. Under §6.1, Frontend and Design tune these by eye, so the owner does not need to decide. The owner can still look at them.
3. **7px gap at 1200px and up, toggle far from the content:** accepted for now. It ends in step 8, so no change is needed and the owner does not need to decide.
4. **`viewport-fit`:** Frontend adds it now (must-fix 2). It is a rendering setting, not SEO metadata.

**Deviations:** `fill` meets §5's intent, and §12 already asks for `fill`. `preload` is Next 16's name for `priority`. The link row as a `<div>` is fine: the spec does not require a list, and the preview uses a `<div>`.

### Spec clarifications (proposed; not edited)

- §5: replace "`height: auto` is required" with "use `fill`; the img fills the frame at 100% x 100%". §5 and §12 currently contradict each other. Rename `priority` to `preload` in §5 and §12.
- §1.4, §6.1, §8, §9.2: the ring follows the control's shape (a circle on the 44px round controls, a 4px radius elsewhere). Pending the owner's approval.
- §6.1: replace the starting-value table with the tuned scales once they are confirmed.
- §2: state that `viewport-fit=cover` is required. §4.6: footer bottom padding `max(32px, env(safe-area-inset-bottom))`.
- §6.9: the fade class should also cover `::before` and `::after`, in case Experience draws its dots or line with pseudo-elements (check in step 5).

### Not checked

Lighthouse (LCP and CLS), real touch devices, Safari and Firefox, a device with a notch, and the `theme-fade` timing (only `aria-pressed` and `data-theme` were confirmed).

### Follow-up (2026-10-18): open items closed

- **Must-fix 1 (scales):** closed. Frontend confirmed by eye: file-text 0.95, mail 1.00, linkedin 0.90, github 0.92 (also Scout's and the project links), instagram 0.90; moon and sun 1.0. Now the values in §6.1 (and §6.9).
- **Must-fix 2 (`viewport-fit=cover`):** closed. Frontend added it in `layout.tsx`; §2 now states it is required.
- **Ruling 1 (ring shape):** closed. Owner approved (2026-10-18); see "Focus ring follows the control's shape" in `decisions.md`. Applied to §1.4, §6.1, §6.9, §8 and §9.2.
- **Spec clarifications:** all applied. §5 uses `fill` instead of `height: auto`; §5 and §12 say `preload`; §4.6 footer bottom padding is `max(32px, env(safe-area-inset-bottom))`; §6.9's fade class covers `::before` and `::after`.

Files changed: `docs/design-spec.md` (§1.4, §2, §4.6, §5, §6.1, §6.9, §8, §9.2, §12), `docs/decisions.md` (one Phase 4 entry), this file. Skills used: `frontend-design` (preloaded). No 21st lookups.

**Step 2 passed QA after the fixes.**

---

## Step 3 QA (2026-10-18): About

Read-only review of the uncommitted step 3 build. Sources: `about-{light,dark}-{320,390,768,1200,1440}.png`, `src/components/About.tsx`, `src/app/page.tsx`, Frontend's measurements. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups.

| Item | Result | Evidence |
|---|---|---|
| h2 "About" 15px/600, line-height 1.45 (21.75px), Pebble, `text-wrap: balance` (§1.2, §4.2) | Pass | `About.tsx:9`; all 10 shots |
| 8px heading-to-text gap (§4.2) | Pass | `mb-2`; measured |
| Text 16px/1.55 (24.8px), Charcoal, max 68ch (§1.2, §4.2) | Pass | `About.tsx:13`; 697.41px cap; wraps short of it at 768/1200/1440 |
| 72px gap under the hero (§1.3, §4.2) | Pass | `page.tsx:12` `gap-18`; 1200 shot: photo bottom 406 to heading 478 |
| No card, no border (§4.2) | Pass | shots |
| `aria-labelledby` to the h2 (§6.2, §9.4) | Pass | `About.tsx:6-8` |
| Content from `basics.summary`, not hardcoded | Pass | `About.tsx:13` |
| Contrast, both themes (§9.1): Pebble on Paper 6.3 / 6.8, Charcoal on Paper 14.5 / 14.7 | Pass | tokens only |
| No 320px horizontal scroll | Pass | `about-*-320` |

**16px vs the 17px body:** intended. §1.2 gives "About text" its own row, 16px at both sizes, separate from "Body, highlights" (17px from 720px); `decisions.md` asks for "smaller text" in About. Setting 16px on the `<p>` is correct, and it makes the 68ch cap resolve against 16px as wanted.

**Must-fix:** none. **Step 3 passes.**

Not checked: reduced motion (About has no motion), real devices, Safari and Firefox.

---

## Step 4 QA (2026-10-18): Technologies

Read-only review. Sources: `tech-{light,dark}-{320,390,600,768,1200,1440}.png`, `tech-hover-{light,dark}-1440.png`, `tech-icons-2x.png`, `Technologies.tsx`, `TechIcon` in `icons.tsx`, Frontend's step 4 measurements. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups (§15 picks none).

| Item | Result | Evidence |
|---|---|---|
| 10 items, data order; logo 36px currentColor; name 15px/600 centered; 10px gap; h2 24px/700 with 24px below (§1.2, §6.3) | Pass | `Technologies.tsx:12,24-26`; measurements |
| Java shows `openjdk` | Pass | `icons.tsx:101` |
| HTML and CSS read as a pair | **Fail** | `tech-icons-2x`: CSS is a full tile (84% ink) and pairs with the TypeScript tile, not the HTML shield |
| SQL weight close to the filled logos | Pass | `tech-icons-2x`: sits between React and C++ |
| Under 600px 3/4/3, no column gap, 28px rows, no wraps at 320; from 600px 5 + 5, 28/16 gaps (§4.3) | Pass | 320/390/600 shots; measurements |
| Hover: 4px lift on the inner wrapper, Accent name, Charcoal logo, no edge flicker, pointer only; reduced motion color only (§6.3, §7) | Pass | `tech-hover-*`; measured 4px and 0px |
| Not focusable, default cursor (§6.3, §8) | Pass | `Technologies.tsx:20-22` |
| Tokens only; Accent on Paper 4.9 / 5.5 (§9.1); no 320px scroll | Pass | shots |

### Must-fix for Frontend

1. **CSS logo:** use §6.3's fallback, Devicon `css3-plain` (MIT, pinned version), `fill: currentColor`. Keep the data key `css` (no schema or Backend change); swap only the path in `TECH_ICONS` and note the source in a comment. Devicon uses a 128-unit viewBox while `TechIcon` is fixed at `0 0 24 24`, so wrap the path in `<g transform="scale(0.1875)">`. Send a 2x crop of HTML and CSS side by side, both themes.

### Rulings on Frontend's questions

1. **HTML and CSS:** switch (must-fix 1). §6.3 already approves the fallback when they look too different, so no new owner decision; I record the switch and update the §6.3 table row once the crop is confirmed.
2. **Java:** accept as built, no scale. The mark already fills the 36px height (29 x 36), so scaling would overflow the box without adding ink; its lightness is the line art itself. If the owner wants a heavier, more recognizable mark, the only option is Devicon `java-plain` (the cup). Simple Icons dropped the Java logo under Oracle's brand policy, so that is an owner call that would reverse the 2026-10-18 `openjdk` decision.
3. **SQL stroke:** §6.3 meant 2 in Lucide's 24-unit grid (3px at 36px), as built. The rule's purpose is weight close to the filled logos; a literal 2px is lighter. No `non-scaling-stroke`.
4. **General optical scaling:** none. React and Tailwind are wide and short by nature and already span the full 36px width; the names anchor each cell. Re-check by eye after the CSS swap removes the second heavy tile.

### Spec clarifications (proposed; not edited)

- §6.3 SQL note: "stroke width 2 in Lucide's 24-unit grid (3px at 36px); do not use `non-scaling-stroke`".
- §4.3 Fit: the narrowest cell at 320px is 72px (3 of 12 columns of 288px), not "about 80px". The names still fit.
- §6.3 table: CSS becomes Devicon `css3-plain` after must-fix 1.

Not checked: real hover on touch devices, Safari and Firefox.

### Follow-up (2026-10-18): logo decisions and spec fixes

- **Java:** Devicon `java-plain` (the cup), v2.16.0, MIT; the owner left the choice to the orchestrator. Data key `java`. Supersedes the `openjdk` entry. This reverses ruling 2 above ("accept as built").
- **CSS:** Devicon `css3-plain` shield, v2.16.0, MIT; recorded as a decision because the owner asked whether HTML and CSS should match (answer: matching shields). Data key stays `css`.
- Both checked at the jsDelivr v2.16.0 path: one path each, `viewBox="0 0 128 128"`, with a brand fill to strip for `currentColor`.
- **Spec edits:** §6.3 (logo source line, table, build notes, SQL stroke note), §4.3 (narrowest cell 72px), §6.1 (solid logos line), §11 #3 (`icon` keys), §12 (Technologies logos), §13 (logo row), §15 (Logos paragraph).
- `docs/decisions.md`: "Java icon" marked superseded; two new Phase 4 entries.
- Not mine to change: `data/resume.json` still has `"icon": "openjdk"`; Backend renames it to `java`, and Frontend renames the `TECH_ICONS` key and swaps the path.

- **Technology hover (owner decision):** the logo turns Accent with the name, so the whole item goes Accent. Reduced motion keeps the color change and drops the movement. Spec §6.3 (hover, reduced motion, contrast), §7 (technology lift row) and §9.1 (new "Accent logo" row in both tables: 4.9:1 light, 5.5:1 dark, 3:1 non-text). The "Technology item hover: Lift" decision is marked updated, and there is a new Phase 4 entry. This replaces the step 4 checklist item "the logo stays Charcoal". Frontend: move the hover `color` from the name to the inner wrapper.

**Step 4 passes QA after the CSS fix, with Java pending Frontend's swap to `java-plain` and the logo hover color pending Frontend.**

Skills used: `frontend-design` (preloaded). No 21st lookups.

---

## Step 5 QA (2026-10-18): Experience

Read-only review. Sources: `exp-{light,dark}-{320,390,768,1200,1440}.png` (light 320/390/768 checked through `clip-*` crops), `exp-open2-*`, `exp-hover-light-1440`, `exp-focus-light-390`, `exp-focus-link-light-390`, `exp-mid-anim-1440`, `clip-{320,390,768}`; `Experience.tsx`, `TimelineScript.tsx`, the `globals.css` timeline block and `labeled-link`; Frontend's step 5 measurements. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups (§15 picks none).

| Item | Result | Evidence |
|---|---|---|
| Order, Scout open from the sort result (§4.4, §6.4) | Pass | `Experience.tsx:9,28`; `[T,F,F,F]` |
| Card, logo, 54px indent from 720px only | Pass | measurements; 390 vs 768 crops |
| Dates right, wrap under the name; chevron down/up, 200ms | Pass | `clip-320/390`; `exp-open2-*` |
| One open; 320ms height; no jump on close; reduced motion snaps | Pass | `exp-mid-anim-1440`; snap numbers |
| Dots 12px, centered on the logo | **Fail (1px)** | dot center 48/44 vs logo center 49/45 |
| Only the open dot Accent with ring; line first dot to last, any card open | Pass | joins 0 at all widths, mid-animation too |
| Repo links: labeled, 18px, Accent underline, 2px on hover (§6.1) | Pass | `labeled-link`; hover measured |
| Scroll correction | Pass | anchoring-off test, 24px final |
| Reveal; reduced motion and no JS show all | Pass | measurements |
| Summary ring 4px offset; company Accent on hover | Pass | `exp-focus-light-390`, `exp-hover-light-1440` |
| No headings in summary; names read once (§9.3) | Pass | AX names |
| Tokens, contrast, 320px no scroll | Pass | shots |

### Must-fix for Frontend
1. Dot `top: 43px` (39px under 720px); connector `top: 49px` (45px under 720px). Heights unchanged.

### Rulings
1. **Dot offset:** move it (must-fix 1). §6.4's stated rule is "center lines up with the logo's center"; 42/38 is an arithmetic slip that left out the 1px border. Verisk at 320 (two-line name, 4.4px lower) is accepted: a fixed `top` can't follow it and it occurs at one width only.
2. **Repo link row gap:** keep `gap: 0 20px`. The 44px targets already separate wrapped lines (`clip-320`); a 20px row gap would loosen the list beyond the 12px above it.
3. **`overflow-clip-margin: 4px`:** keep. The 4px stays inside the 24/28px card padding, never reaches the border, and isn't visible in `exp-mid-anim-1440`. Visible focus rings win.
4. **Frontend's choices:** accepted. Dates and chevron as one wrapping group meet "the chevron stays at the end of the row". Row gap 2px, column gap 16px, chevron 20px from the dates match the preview. `labeled-link` matches §6.1 and is the one style for Projects and the footer link.

### Spec clarifications (proposed; not edited)
- §6.4 dot: `top: 43px` / `39px`, center 49px / 45px (1px border + padding + 20px); §6.4 line: connector starts at 49px / 45px.
- §6.4 header row: `gap: 2px 16px`; dates and chevron form one non-wrapping group with `margin-left: auto`, chevron 20px after the dates; on wrap both drop to the next line, right-aligned.
- §6.4 repo links: "`gap: 0 20px`" instead of "a 20px gap".
- §6.4 CSS block: add `overflow-clip-margin: 4px` with the reason.
These restate the built values, so the owner only needs to OK the wording; the dot value restores the spec's own intent.

Not checked: the dark repo-link underline at 2x (downscaled shots read pale; send a crop), Safari and Firefox (`::details-content` fallback), real touch devices.

**Step 5 passes QA after must-fix 1.**

### Follow-up (2026-10-18): open items closed
- **Must-fix 1 (dot):** closed. Frontend set 43/39px with the connector at 49/45px and re-measured a 0px offset at every width. The one exception is Verisk at 320px, where the name wraps; that was accepted in ruling 1.
- **Spec clarifications:** the owner approved all four (relayed by the coordinator). They are applied in §6.4: the dot and connector values, the header row `gap: 2px 16px` with the dates and chevron grouped, the repo links `gap: 0 20px`, and `overflow-clip-margin: 4px` with its reason in the CSS block. No other section repeats these values; §10 was checked. There is one `decisions.md` entry, "Timeline clarifications from step 5 QA".
- **Dark repo-link underline:** closed. The coordinator checked it at 2x: Accent `#E56B60` on White `#24211E`, 5.0:1, and it reads clearly.

Files changed: `docs/design-spec.md` (§6.4), `docs/decisions.md` (one Phase 4 entry), this file. Not committed.

**Step 5 passes QA.**

---

## Step 6 QA (2026-10-18): Projects

Read-only review. Sources: `proj-light-{320,390}`, `proj-dark-{320,768}`, `proj-hover-{light,dark}-1440`, `proj-link-hover-light-1440`, `proj-focus-light-390`; `Projects.tsx`, the "Project cards" block in `globals.css`, Frontend's step 6 measurements. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups (§15 picks none).

| Item | Result | Evidence |
|---|---|---|
| `<ul>` of 3 `<li><article>`, data order, 20px gap, no images (§4.5) | Pass | `Projects.tsx:15-18`; measured 20px |
| Card White, 1px Rule, 12px radius, 28/24px padding (§6.5) | Pass | `Projects.tsx:18`; measurements |
| Header: h3 21/18px 600, date meta, `gap: 2px 16px`, wraps under the name (§6.5) | Pass | `proj-*-320`: Fakebook and Reversi wrap |
| Tech plain text 2px below; highlights 16px, no indent; link row 12px (§6.5) | Pass | `Projects.tsx:27-36` |
| GitHub link: 18px icon (0.92), 15px/600, 1px Accent underline, 2px + Accent on hover, 44px, new-tab hint (§6.1) | Pass | `proj-link-hover-light-1440` |
| Hover: Pebble border, -3px, shadow; pointer only; detected on `<li>` (§6.5, §1.5) | Pass | `proj-hover-*`; `globals.css:284-303` |
| Not a link: default cursor, no overlay or tabindex, name unchanged, no `:focus-within` lift | Pass | code; focus measurement |
| Reduced motion: border and shadow only (§7) | Pass | measured 0 lift. Not declaring the transform equals §7's `transform: none` |
| Focus ring 2px Charcoal, 2px offset, 4px radius (§8) | Pass | `proj-focus-light-390` |
| Tokens, contrast (§9.1), no 320px scroll | Pass | shots; scrollWidth |

**Must-fix:** none. **Step 6 passes.**

### Rulings
1. **Header `align-items: baseline`:** accepted. The name (21px) and date (15px) differ in size; baseline seats the date on the name's text line, where `center` would float it. When wrapped, the date sits left under the name, directly above the tech line, so the two meta lines read as one block. This differs from the timeline (dates right-aligned on wrap), which is fine: there the dates travel with the chevron group; projects have no chevron.
2. **Dark hover shadow (75% black):** reads faintly, as a soft darkening under the card's bottom edge (`proj-hover-dark-1440`). That is near the ceiling: dark Paper `#1A1816` is already close to black, so raising the opacity to 100% adds almost nothing. The Pebble border (`#A8A09A`, clearly visible) carries the hover, as intended; the shadow is decorative (§9.1). Accept as built. **Owner call** only if a stronger shadow is still wanted: the lever is geometry, not opacity, e.g. `0 12px 32px -8px color-mix(in srgb, #000 80%, transparent)` in dark only; Design would re-check it against the "quiet" direction.

### Spec clarifications (proposed; not edited)
- §6.5 header row: "`align-items: baseline`; on wrap the date drops under the name, left-aligned."
- §7 "Other rules": "set `transform: none`, or declare the transform only under `prefers-reduced-motion: no-preference`."

Not checked: the remaining full-page shots (`proj-light-{768,1200,1440}`, `proj-dark-{390,1200,1440}`) were not opened (the hover shots cover 1440); real touch devices; Safari and Firefox.

---

## Step 7 QA (2026-10-18): Footer

Read-only review. Sources: `footer-light-{320,768,1440}`, `footer-dark-{320,1200,1440}`, `footer-hover-light-1440`, `footer-focus-light-390`; `Footer.tsx`; Frontend's step 7 notes. No file changed except this one. Skills used: `frontend-design` (preloaded). No 21st lookups (§15 picks none for the footer).

| Item | Result | Evidence |
|---|---|---|
| Real `<footer>` after and outside `<main>`, one contentinfo (§4.6, §9.4) | Pass | measurements; `page.tsx` |
| In main's column: 880px cap, `xl:col-start-2`, edges equal main's (§4.6, §2) | Pass | measurements; 1200/1440 shots |
| Copyright left, link right; name from `basics.name`, year build-time and static (§6.8) | Pass | `Footer.tsx:6-17`; prerender manifest |
| 1px Rule top border; 24px top, `max(32px, safe-area)` bottom (§4.6) | Pass | `Footer.tsx:15`; measured |
| Copyright 14px/1.45, 400, Pebble (§1.2): 6.3:1 / 6.8:1 (§9.1) | Pass | measured `#5E5751` / `#A8A09A` |
| Link: §6.1 underline style at 14px, 44px tall, `#top` (§6.1, §6.8, §9.2) | Pass | measured 44px; all shots |
| Hover: Accent text, 2px underline, 120ms | Pass | `footer-hover-light-1440` |
| Focus ring 2px Charcoal, 2px offset, 4px radius (§8) | Pass | `footer-focus-light-390` |
| Wrap: 8px row gap (§4.6) | Pass | forced-narrow test; no wrap needed at 320 |
| Back to top: smooth scroll, instant under reduced motion (§7) | Pass | scroll measurements |
| 80px from the last card to the border (§1.3 main bottom padding) | Pass | shots |
| Tokens only, both themes; no 320px scroll | Pass | shots; scrollWidth |

**Must-fix:** none. **Step 7 passes.**

### Rulings
1. **Link weight and color: keep 600 Charcoal (`labeled-link`).** §6.8 names the §6.1 underline style, and §6.1 defines that style as 15px/600 Charcoal; "at 14px" overrides only the size. §1.2's "Footer" row (400 Pebble) is the copyright text. The preview's 400 Pebble link was inherited by accident, not specified. Charcoal also keeps the one action in the footer distinct from the static text and matches every other text link on the page. Contrast: Charcoal on Paper 14.5:1 / 14.7:1.
2. **16px column gap: accept.** It matches the preview and the timeline and project header rows (`gap: 2px 16px` pattern), and it only matters if a wrap ever needs a minimum horizontal gap. Add it to the spec (below).

### Spec clarifications (proposed; not edited), one batch for the owner
From step 6:
- §6.5 header row: "`align-items: baseline`; on wrap the date drops under the name, left-aligned."
- §7 "Other rules": "set `transform: none`, or declare the transform only under `prefers-reduced-motion: no-preference`."

From step 7:
- §1.2 "Footer" row: rename to "Footer text"; add a note "the 'Back to top' link follows §6.1 at 14px: 600, Charcoal."
- §4.6 "Narrow screens": "a wrapping flex row, `justify-content: space-between`, `align-items: center`, `gap: 8px 16px`; on wrap the link drops under the copyright, left-aligned."
- §6.8 "Back to top": "the §6.1 labeled-link style without an icon, at 14px (600, Charcoal, 1px Accent underline at 4px offset; hover Accent and 2px)."

All restate the built values; none changes a visual rule.

Not checked: `footer-{light,dark}-390`, `footer-light-1200`, `footer-dark-768` were not opened (neighbouring widths cover them); dark hover and dark focus shots (not supplied); a notched device for the safe-area padding; Safari and Firefox.
