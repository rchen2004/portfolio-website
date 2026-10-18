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
- [ ] Photo crop matches the preview at both aspect ratios: face centered, zoomed, not a tall sliver (`height: auto`) (§5).
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
