# Phase 2 — Design (Step 1: Directions)

Status: **directions proposed, awaiting owner choice** (2026-10-15). Branch: `phase-2-design`. Not committed.

## What I did
- Read `plan.md`, `docs/decisions.md`, `data/resume.json`, `data/schema.ts`, `CLAUDE.md` and `docs/phase-notes/phase-1-backend.md`.
- Wrote `docs/design-directions.md`. It has three directions:
  - **A, Index:** cool blue-grey, IBM Plex Sans, a sticky left-rail nav.
  - **B, Game Night:** warm felt green, Bricolage Grotesque + Atkinson Hyperlegible Next, pressable game-tile tags and links.
  - **C, Highlighter:** white and marigold, Newsreader + Public Sans, one highlighter stroke behind the tagline.
- Each direction covers:
  - the mood and the audiences it suits;
  - a palette with hex values, the role of each color, and WCAG contrast ratios;
  - the type pairing and its scale;
  - ASCII wireframes of the hero and an experience card;
  - the motion attitude, a dark-mode note and the tradeoffs.
- The doc ends with a comparison table and a recommendation (A, with B second). The choice is left to the owner.
- I did not write `docs/design-spec.md`, any tokens or any code.

## Decisions I made
- **Real content only.** Every example uses text from `resume.json`. Long highlights are cut short with "..." in the wireframes, and that is the only change.
- **Featured vs compact.** In every direction, the difference comes from structure (a panel or card versus none, and the heading size), not only from color.
- **Optional images.** No headshot and no screenshots are assumed. Each direction defines where a headshot would go, and the project screenshot rule is "all or none," so the projects stay equal.
- **Contrast ratios** were calculated by hand with the WCAG 2.x formula and rounded down. Every text pair is at least 6.4:1. Frontend should confirm them with a checker.
- **No dark mode design.** Each direction only notes how it would adapt.
- **Avoided defaults on purpose:**
  - all-caps eyebrow labels, monospace data labels, and 01/02 numbering;
  - middle-dot meta strings and arrows on links;
  - cream with terracotta, black with acid green;
  - identical rounded cards everywhere.

## Files changed
- `docs/design-directions.md` (new)
- `docs/phase-notes/phase-2-design.md` (new, this file)

## Conflicts flagged
- `plan.md` §5 Phase 1 mentions a `featured` flag on projects. `docs/decisions.md` (Phase 1) supersedes this: experiences only. The directions follow decisions.md.

## Open questions
1. **Which direction?** You can also pick a mix, for example A's layout with B's skill tiles.
2. **Headshot:** will you supply one for `basics.image`? It changes the hero composition a little in every direction.
3. **Project screenshots:** will you supply all three, or none? Equal treatment requires all or none.
4. **Hero links:** `plan.md` Phase 4 lists "Hero (name, tagline, links)". Should the hero repeat the email, LinkedIn and GitHub icons and the "View Resume" button that the Contact section also has? The wireframes assume yes.
5. **Compact entries:** should they show all their highlights (Scout has 2, Ventus Health has 1), or only the first one? I assumed all, since they are short.
6. **Skills volume:** there are 39 skills, 19 of them tools. Should all of them be shown? I assumed yes. I will not drop any without your approval.
7. **Dark mode:** it is still undecided. Deciding before the spec would let me reserve tokens for it.

## Skills used
- `frontend-design`, for the direction method and to avoid templated defaults.
- `ponytail` was active (minimal scope).
- Checked `better-ui` and `animate`. Both are aimed at implementation and polish, so they are not used in this step.

---

# Round 2 (2026-10-15)

Status: **refined directions proposed, awaiting owner choice.** Branch: `phase-2-design`. Not committed.

## What I did
- Re-read `CLAUDE.md`, `plan.md`, `docs/decisions.md` (Phase 2 in progress), `data/resume.json`, `data/schema.ts` and Round 1.
- Added "## Round 2" to the end of `docs/design-directions.md`. Round 1 is unchanged. Round 2 contains:
  - **D, Fog and Bridge:** the requested blend. It has A's rail layout, a near-neutral fog-grey page, warm charcoal text, and the Golden Gate's International Orange (`#C0362C`) as the only accent. It uses one typeface, Figtree.
  - **E, Postcard:** one alternative. The hero is a white postcard on a sky-blue page, with the photo on the front half and the greeting and contact "address lines" on the message side. It uses Young Serif and Source Sans 3, with a top nav.
  - **Both arrangements** for each direction. Arrangement 1 has the tagline in the hero and a separate Technologies section. Arrangement 2 has the Northeastern greeting placeholder in the hero and Technologies inside About. A comparison table is included.
  - **A photo supply and crop guide:** one source file, CSS crops, a safe area and a composition note.
  - **A logo source check:** all 10 technologies were checked against Simple Icons and Devicon.
  - **The data-needs list** for Backend.
  - **A recommendation.**
- I did not write `docs/design-spec.md`, any tokens or any code.

## Decisions I made
- **Hero contact links:**
  - The email is shown as the visible address, as a `mailto:` link.
  - "View resume" is the single filled button.
  - LinkedIn, GitHub and Instagram are icon plus label links. Instagram is last.
- **Accent color:** International Orange is taken from the bridge in the photo, so the accent has a reason to exist. Link text stays the ink color, with an orange (D) or blue (E) underline at 3:1 or better.
- **Technologies:**
  - Monochrome logos in the ink color, with visible names, not interactive.
  - Simple Icons is the recommended source, with a pinned version and inline SVG.
  - SQL has no generic logo in either library, so I propose a neutral database glyph (Lucide).
- **Projects:**
  - One stacked component in resume order.
  - Screenshots are shown all or none, decided at build time.
  - The crawler capture uses the same 16:10 frame and a light terminal theme. Flags, credentials, session IDs, hostnames and paths are cropped out.
- **Compact experiences:** an outlined box with no fill and all highlights, two side by side on desktop.
- **Nav:** About, Experience, Projects, Education, the same in both arrangements. Technologies, Hero and Contact get no link.
- **Motion:** nothing on load or scroll. Hover, focus and nav-marker changes are 120 to 150ms, and all of them are instant under `prefers-reduced-motion`.
- **Contrast:** every ratio was calculated by hand with the WCAG 2.x formula and rounded down. The lowest text pair is 4.9:1 (Bridge on Fog, if it is used as text). Frontend should confirm with a checker.

## Files changed
- `docs/design-directions.md` (Round 2 appended)
- `docs/phase-notes/phase-2-design.md` (this section)

## Conflicts flagged
- `plan.md` Phase 4 still lists a Skills section and a Contact area. `docs/decisions.md` (Phase 2) supersedes both: Technologies, and no Contact section. Round 2 follows decisions.md.
- `plan.md` §1 frames the identity as "backend/data". The owner now wants the page not to read as backend-only. `plan.md` may need an edit by the owner.

## Data needed that resume.json lacks (for Backend, after a direction is picked)
- The hero greeting text. It must not be hardcoded. Arrangement 2 uses the same field with a placeholder value.
- An Instagram entry in `basics.profiles`.
- The photo file, alt text and an optional focal point.
- A curated, ordered Technologies list of 10, with a logo identifier for each.
- Project screenshot files, all three or none.
- `public/resume.pdf` present.
- Arrangement 2 needs no additional fields.
- What happens to the existing `skills` object, which is no longer displayed.

## Open questions
1. Which direction (D or E) and which arrangement (1 or 2)? You can also mix them.
2. Arrangement 2: what is the exact greeting wording?
3. SQL logo: is a neutral database glyph acceptable, or should SQL use a text-only treatment?
4. CSS logo: Simple Icons' newer CSS logo does not match the HTML5 shield. Is that acceptable, or should we use Devicon's CSS3 shield, recolored?
5. Crawler screenshot: can it be captured in a light terminal theme? If no usable capture exists, are you happy with no screenshots for any project?
6. Photo alt text: is "Ryan at the Golden Gate Bridge" right? The owner should confirm it.
7. The surname appears in the nav or header and the page title, but not in the greeting. Is that enough?

## Skills used
- `frontend-design`, for the plan-then-critique method and for avoiding defaults. For example, I checked the orange-on-warm-grey look against the cream-and-terracotta tell and kept the background near-neutral.
- `ponytail` was active.
- I checked `better-ui` and `animate`. Both are aimed at implementation, so they are not used yet.

---

# Round 2 addendum: Direction D refinements (2026-10-15)

Status: **refinements proposed** for the chosen Direction D, Arrangement 1. Not committed.

## What I did
Appended "## Round 2 addendum: Direction D refinements" to `docs/design-directions.md`. It covers:
- **A.1, timeline:**
  - Strictly by date, newest start date first: Babel Street, Scout, Verisk, Ventus Health.
  - Every entry has the same card and the same 12px dot on a 2px line. Babel Street and Verisk stand out only by having more highlights.
  - The Scout and Babel Street overlap is shown by the date text alone.
  - One layout for every screen width.
  - A short note on how a featured variant would differ, without designing it.
- **A.2, motion:**
  - Timeline cards fade in and rise 12px once on scroll: 320ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
  - The rail marker slides: 200ms, `cubic-bezier(0.2, 0, 0, 1)`.
  - Content is never hidden without JS. The hidden starting state is added only to cards below the viewport at load. Only opacity and transform animate.
  - Both motions are off under `prefers-reduced-motion`.
- **A.3, project card without images:** final. One identical component, technologies as plain comma text, a GitHub link.
- **A.4, SQL:** the generic database icon (decided), with a one-line explanation of why SQL has no official logo. HTML/CSS fallback: Devicon `css3`, recolored.
- **A.5, SF audit:** the photo, alt text and accent are fine. The token names will be neutral in the spec (Fog becomes Paper; Bridge becomes Accent). No SF copy or decoration.
- **A.6:** the greeting and alt text are recorded. Arrangement 2 is dropped.

## Decisions I made
- Timeline ordered by start date, not end date, so a part-time role doesn't open the section and the most recent co-op stays on top.
- No year labels, "Current" badges or parallel lanes.
- Projects get no timeline line, so the timeline stays an Experience-only idea.
- The timeline reveal is the only ambient motion on the site.

## Files changed
- `docs/design-directions.md` (addendum appended)
- `docs/phase-notes/phase-2-design.md` (this section)

## Conflicts flagged
Dropping the featured emphasis reverses two earlier decisions:
- Phase 0: "featured, larger, placed first".
- Phase 1: the `featured` flag on experiences.

If the owner confirms, `featured` is unused. Backend would remove it from `data/schema.ts` and `resume.json`, and `decisions.md` needs updating.

## Open questions
1. Confirm the timeline is strictly by date with no featured emphasis. This also approves removing `featured`.
2. Confirm newest start date first (Babel Street on top) rather than newest end date first (Scout on top).
3. Visual preview: `decisions.md` says the owner wants one before the spec is final. Design does not write code. Should Frontend build a throwaway preview from the directions doc, or should I write the spec as a draft first?
4. HTML/CSS logo match: check during the build. The fallback is Devicon `css3`, recolored.

## Skills used
- `frontend-design`: one motion moment rather than scattered effects, and no unneeded labels on the timeline.
- `ponytail` was active.

---

# Step 2: Design spec (2026-10-15)

Status: **spec drafted, awaiting owner approval.** Not committed.

## What I did
- Re-read `docs/decisions.md` (Phase 2) and the approved preview, `docs/design-preview.html`.
- Wrote `docs/design-spec.md`. It covers:
  - tokens (Paper, White, Charcoal, Pebble, Accent, Accent deep, Rule), the type scale, spacing, radii, shadows (none), and breakpoints at 600, 720 and 1200px;
  - the layout grid (220px rail, 60px gap, 880px main);
  - section order and the content hierarchy above the fold;
  - section layouts;
  - component specs: hero link, About, technology item, timeline accordion card, project card, rail, skip link, mobile header, footer;
  - motion, and hover and focus rules;
  - accessibility: contrast table, 44px hit areas, accordion semantics;
  - a responsive summary;
  - a "Data needed from Backend" section;
  - deliberate differences from the preview;
  - open questions.
- A scroll-highlight (`inview`) state was added and then removed at the coordinator's request, after the owner rejected it. The spec has no trace of it.

## Decisions I made (listed in spec §13)
- **Hero links:** split with a container query instead of a viewport query. The preview's viewport query can produce a 4 + 1 split at 720 to 900px.
- **Rail links:** 10px vertical padding, so they reach 44px. The preview's links are 38px tall.
- **Accordion headings:** no h3 inside `<summary>`, because screen readers announce headings inside it unreliably.
- **Timeline line:** a connector per entry, so it ends exactly at the last dot.
- **Scroll correction:** when the exclusive accordion closes a card above the one just opened, scroll the opened summary back into view.
- **Landmarks and links:**
  - a skip link;
  - the footer outside `<main>`;
  - no `title` tooltip on the email link;
  - visually hidden "(opens in a new tab)" hints.
- **Icons:** Simple Icons v16.35.0, pinned and inlined, using `java` and `css`; Devicon `css3` is the fallback for CSS. Lucide provides `file-text`, `mail` and `database`.
- **Accent deep:** used only for pressed links.

## Files changed
- `docs/design-spec.md` (new)
- `docs/phase-notes/phase-2-design.md` (this section)

## Conflicts flagged
- **Tailwind v4:** the project uses it, so tokens go in CSS `@theme`, not `tailwind.config.ts`. `CLAUDE.md` names `tailwind.config.ts` as Frontend's.
- **`featured`:** removing it reverses the Phase 0 and Phase 1 decisions. `decisions.md` should record this.
- **`plan.md`** still lists Skills, Education and Contact sections. `decisions.md` supersedes it.

## Recommendations to Backend (spec §11)
- **Add:** a greeting field; an Instagram profile; a curated `technologies` list with icon identifiers; an optional decorative company logo (`src` only); the populated `basics.image`.
- **Remove:** `featured` and `projects[].image`.
- **Sort helper:** null `endDate` first, then `endDate` descending, then `startDate` descending.
- **Keep:** `education` (for SEO structured data, `alumniOf`).
- **Replace:** `skills` with the curated list, unless Backend plans to use it for `knowsAbout`.
- **The resume PDF** is a separate file, so removing data from the JSON does not affect it.

## Open questions
1. Is losing GPA and Dean's List from the site intended?
2. Keep `education` and replace `skills` (my recommendation), or remove both?
3. Will `basics.summary` be shortened?
4. Is the lone Next.js item on the last mobile row of Technologies acceptable?
5. Are company logos decorative, and in what format (SVG, or PNG at least 80 x 80)?
6. Who owns the Tailwind v4 `@theme` file?

## Skills used
- `frontend-design`: restraint, a single ambient motion, and the type-scale discipline.
- `ponytail` was active.
- `better-ui` and `animate` were checked. The spec states the motion values directly, so I did not run them.

---

# Step 2 update: owner answers applied (2026-10-15)

## What I did
I updated `docs/design-spec.md` with the owner's answers to the six open questions and closed §14.
- **§4.3 Technologies:** mobile now uses rows of 3, 4 and 3. It is a 12-column grid: items 1 to 3 and 8 to 10 span 4 columns, and items 4 to 7 span 3. Rows have a 28px gap and columns have none. Each item is centered in its span. Tablet and desktop stay at 5 + 5. §10 is updated to match.
- **§11 Data:** `education` and the full `skills` lists stay in `resume.json`, unrendered. `technologies` is added alongside them. Losing GPA and Dean's List from the site is confirmed as intended. Company logos are PNG, at least 80 x 80px, rendered at 40px. I added an optional drift check between `skills` and `technologies`, for Backend to decide.
- **§0:** Frontend owns the Tailwind v4 `@theme` in `src/app/globals.css`.
- **Tagline:** it now ends "...loves a challenging problem." The spec never quotes it, so nothing changed.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md` (this section)

## Open questions
- None are blocking.
- One assumption is still unconfirmed: company logos are decorative (`alt=""`).
- `docs/design-directions.md` (Round 2 and its addendum) still quotes the old tagline in several places. It is a historical proposal document, so I left it unchanged. The spec is the source of truth.

## Skills used
- `ponytail` was active.

---

# Step 2 update: one outline style for link icons (2026-10-15)

## What I did
- **§6.1:** the hero links now have a "Link icons: one outline style" rule. It covers every icon inside a link:
  - an 18px box with a 24 viewBox;
  - a 2px stroke with round caps and joins;
  - `currentColor`;
  - the SVG as a direct flex child of the `<a>`, with no wrapper;
  - `aria-hidden` and `focusable="false"`.
- **§6.4 and §6.5:** Scout's repo links and the project GitHub links now point to that rule.
- **§12:** the icon-source note is updated.

## Decisions
- **Source:** Tabler Icons outline, v3.49.0 (MIT), for all five link icons: `file-text`, `mail`, `brand-linkedin`, `brand-github`, `brand-instagram`. I checked that each file exists and uses a 24 viewBox, a 2px stroke and round caps and joins. Lucide no longer ships brand icons, and taking all five from one family keeps the drawing style consistent.
- **Delivery:** the five paths are inlined in the repo. The full package is not added as a dependency, and nothing loads from a CDN.
- **Technologies:** these keep the solid monochrome Simple Icons, plus Lucide `database` for SQL.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
- None. At build time, Frontend should compare the five icons side by side at 18px. Tabler's GitHub mark is the densest of the five.

---

# Step 2 update: icon-only hero links on mobile (2026-10-15)

## What I did
- **§6.1:** the hero links now have two modes.
  - **Labeled mode (720px and up):** icon plus label in one row, unchanged.
  - **Icon-only mode (under 720px):**
    - one row with no wrap and an 8px gap;
    - each link a 44 x 44px target with a 22px outline icon;
    - no underline;
    - the label kept in the DOM, visually hidden;
    - hover and pressed change only the icon color (Accent, then Accent deep);
    - the standard focus ring;
    - no `title` or other tooltip, because it doesn't work on touch.
- **Repo and project links** keep their labels at every width.
- **Removed:** the 3 + 2 grid and the 560px switch point.
- **Also updated:** §3 (above the fold), §8 (underline exceptions), §9.2 (hit areas, accessible names, icon contrast), §10 (responsive table), §13 and §14.

## Decisions
- **Accessible name** comes from the hidden label. No `aria-label` duplicate, so there is one source of truth.
- **Icon contrast** is stated as non-text contrast, because the icon is the only visible cue in icon-only mode: 14.5:1 Charcoal, 4.9:1 Accent.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
1. **Narrow tablets:** at 720 to about 850px viewports, the hero text column (about 368 to 500px) is too narrow for the labeled row, which needs about 500px. "Icon plus label in one row" therefore can't hold there. The preview wraps it, which can produce a 4 + 1 split.
   - Recommendation: switch modes with a container query on the hero text block (icon-only when it is under about 500px), instead of the 720px viewport breakpoint.
   - The owner decides. Frontend should measure the exact threshold with Figtree loaded.

---

# Step 2 update: hero links icon-only at every width (2026-10-15)

## What I did
- **§6.1, the hero links are icon-only at every width:**
  - one row of five 44 x 44px targets with an 8px gap;
  - 22px outline icons;
  - no wrap and no underline;
  - labels visually hidden, and they remain the accessible names;
  - hover turns the icon Accent (Accent deep when pressed);
  - the standard focus ring;
  - no tooltip.
- **Alignment:** the row is pulled left by 11px, so the first glyph lines up with the text edge above it.
- **Icons:** the shared link-icon rule now covers both box sizes (22px in the hero, 18px in the labeled repo and project links). It also adds `vector-effect: non-scaling-stroke` for a constant 2px stroke, and per-glyph optical scaling about the center.
  - Starting values: file 0.95, mail 1.0, linkedin 0.85, github 0.88, instagram 0.82.
  - Frontend re-tunes them for the Tabler glyphs at 22px, by eye.
  - The GitHub value also applies to Scout's and the project links.
- **Repo and project links** keep their labels and underlines at every width. Their style now has its own block in §6.1, and §6.4 and §6.5 point to it.
- **Also updated:** §3, §8, §9.2, §10, §13 and §14. The tablet-gap question is closed.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
- None. At build time, Frontend tunes the optical scales by eye.

---

# Step 2 update: hero icon size and hover tilt (2026-10-15)

## What I did
- **§6.1:**
  - Hero icons are now 24px inside the same 44 x 44px targets.
  - The row is pulled left 10px, which is (44 − 24) / 2. The gap stays 8px.
  - There is explicitly no box, border or fill around the icons.
  - On hover, the icon turns Accent and the link rotates -6° (160ms, `cubic-bezier(0.2, 0, 0, 1)`). Pressed is Accent deep.
  - The optical scales are now tuned at 24px.
- **§7:**
  - New "Hero link tilt" row in the motion table.
  - Reduced motion means no rotation, only the color change.
  - The hero tilt is the only hover movement on the site.
  - I fixed a broken table row (two rows had merged) left over from removing the `inview` state.
- **Also updated:** §9.2, §10 and §13.
- **Unchanged:** the labeled links (Scout repos, projects) stay at 18px with no tilt.

## Decisions
- **Keyboard `:focus-visible` does not tilt; it gets the ring only.** Rotating the link would rotate its ring, and the ring is the clearer cue.
- **Tilt only under `@media (hover: hover)`.** Touch browsers can keep a "sticky" hover after a tap, which would leave an icon tilted. The color change stays unconditional.

---

# Step 2 update: final sync before merge (2026-10-15)

## What I did
- **Nav (§1.2, §1.6, §6.6, §6.8, §9.2, §10, §13):**
  - "Ryan Chen" is 24px/600 and the links are 20px at every width.
  - The links have 8px vertical padding, so they are 45px tall.
  - The rail marker is 32px tall.
  - The header links are a 2 x 2 grid under 600px, one row from 600 to 1199px, and the rail at 1200px and up.
- **Photo (§5, §13):**
  - The file is `public/Professional.jpg` (2160 x 2880). The frame sizes are unchanged and the frame has `overflow: hidden`.
  - The approved crop: `object-fit: cover`, `object-position: 50% 75%`, `translateY(-8%) scale(1.6)`, origin `51% 60%`, and the required `height: auto`.
  - `sizes` is raised to 448px / 160vw for the scale. A matching pre-cropped copy is allowed.
- **Company logos (§6.4, §11, §14):** the supplied 100 x 100 JPGs in `public/`, shown at 40px with a 1px Rule border.

---

# Step 2 update: no nav below 1200px (2026-10-15)

## What I did
- **Removed:** the mobile and tablet header component (former §6.8), its 2 x 2 grid and its one-row variant.
- **Below 1200px:**
  - There is no header or nav. The rail is `display: none`, so it also leaves the accessibility tree.
  - Main opens on the hero with 32px top padding, and visitors scroll.
- **Desktop rail:** unchanged (24px name, 20px links, 32px bar).
- **Rail script (§6.6):** gated by `matchMedia("(min-width: 1200px)")`. Its listeners attach only while the query matches and detach on `change`.
- **Skip link (§6.7):** kept at 1200px and up only, where five rail links come before the content. Below 1200px it is not rendered, because there is nothing to skip.
- **Full name:** below 1200px, "Ryan Chen" appears only in the footer and `<title>`. The owner accepted this; it is noted in §3.
- **Also updated:** §1.2 (type scale), §1.3 (main padding), §1.6 (breakpoints), §2, §3 (nav and above the fold), §8, §9.2 and §9.4 (landmarks, keyboard order), §10 and §13. The footer is renumbered to §6.8.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
- None.

---

# Add-on: 21st scouting (2026-10-16)

Status: **proposals only, pending owner approval.** Read-only. No change to the spec's direction.

## What I did
- Re-read `plan.md`, `docs/decisions.md`, `data/resume.json`, `docs/design-spec.md` and this file.
- Searched 21st for every component in the spec: rail nav, hero, hero links, technology item, timeline accordion card, project card, skip link and footer. I retrieved one candidate's code (the Table of Contents) to check its dependencies and its reduced-motion handling.
- Added §15 "21st component references (proposed, pending owner approval)" to `docs/design-spec.md`. No other section changed.

## Decisions I made
- **No pick for any component.** Every candidate either adds motion or decoration the spec rejects (load animation in the hero, hover effects, tooltips, height animation, image-led cards), or would need most of its logic rewritten (the TOC's active-section rule and marker). Building from §6 is smaller and needs no new dependencies.
- **Not scouted:** featured and compact experience variants, skill tag, contact row, "View Resume" button. `decisions.md` removed all of them.
- **Logos:** no svgl logos. The spec already pins Simple Icons and Tabler.

## Files changed
- `docs/design-spec.md` (§15 added)
- `docs/phase-notes/phase-2-design.md` (this entry)

## Open questions
1. Does the owner accept "none" across the board? If a 21st reference is wanted anyway, the Table of Contents (mohammadshehadeh) for the rail is the only one close enough, and only as a reference.
2. None other. Housekeeping: the previous entry ("no nav below 1200px") ended with the "Files changed / Open questions" block repeated three times; it is now collapsed into one.

## Skills and tools used
- `frontend-design` (restraint: no pick is better than added noise). `ponytail` was active.
- 21st tools: `mcp__21st__search`, `mcp__21st__get_inspiration`, `mcp__21st__get_component` (one retrieval, id 18113; one free retrieval left today), `mcp__21st__search_logo`.

---

# Step 2 update: Hero load animation (2026-10-16)

Status: **owner-approved change, specified.** Owner choice: Blur-in words, over my gentle fade-up recommendation.

## What I did
- **`docs/design-spec.md`:**
  - §7 rule 5 rewritten: Blur-in words, with final values, the resting-state rule, the reduced-motion gate, no CLS, how the words are split, the accessibility pattern, the tradeoffs, and how it fits the hero link tilt and the timeline reveal.
  - §7 motion table: new "Hero load" row.
  - §7 "Other rules": the hero load is now the only load animation.
  - §4.1: a "Load motion" bullet pointing to §7 rule 5.
  - §12: a one-line note that the animation is CSS only, with no client JS.
  - §15: a one-line update. The Hero row's old reason no longer applies, and the pick stays "None".
- **`docs/decisions.md`:** added the approved decision "Hero load animation: Blur-in words (owner choice, approved 2026-10-16)" with the exact values.

## Decisions I made
- **Values kept exactly as in the demo** (blur 10px, translateY 4px, 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 45ms stagger; link row 500ms ease at 700ms). The owner approved what they saw, so I did not tune them. Timing with today's text: 15 words, the greeting is in by about 790ms, and the last word ends at about 1330ms.
- **Accessibility:** a visually hidden copy of each full string, plus an `aria-hidden` wrapper holding the word spans. Both are generated at build time from `basics.greeting` and `basics.tagline`. The hidden copy gets `user-select: none`, so copying the hero does not double the text.
- **Safety:** `from`-only keyframes with `animation-fill-mode: backwards` and no `will-change`, so no filter lingers on the text after the animation. `inline-block` applies at every motion setting, so line breaks don't change with the preference. The stagger index is an inline `--i` custom property.
- **Link row:** the fade is on the row container (opacity only), separate from the per-link tilt transform. `:focus-within` cancels the fade, so a keyboard user never focuses an invisible link.
- **Timeline reveal:** unchanged. It never runs on the hero, and it shares the same curve.

## Files changed
- `docs/design-spec.md` (§4.1, §7, §12, §15)
- `docs/decisions.md` (one entry, added at the owner's request)
- `docs/phase-notes/phase-2-design.md` (this entry)

## Open questions
1. **Resolved:** the §7 intro line now reads "There are two ambient motions (the hero load and the timeline reveal), plus state changes and small hover feedback." The coordinator approved the change.
2. **`basics.greeting` does not exist yet** in `resume.json` or `data/schema.ts` (spec §11 #1). The split depends on it. Backend needs to add it.
3. **Verify at build:** Lighthouse still reports the photo as the LCP element, CLS is 0, and the split text wraps exactly like the unsplit text.

## Skills used
- `frontend-design` (motion and the quality floor: reduced motion and accessibility). `ponytail` was active.
- I checked `animate`. The values were already fixed by the owner, so I did not run it.

---

# Step 2 update: Owner variant picks (2026-10-16)

Status: **owner-approved changes, specified.** Picked by the owner in the Variant Lab demo. Mid-task correction: the hero hover is Soft circle only; the -6° tilt is dropped.

## What I did
- **`docs/design-spec.md`:**
  - §1.5: two shadows now, the dot ring and `--shadow-card-hover`.
  - §6.1: hero hover is the soft circle plus Accent icon, with no tilt.
  - §6.3: the technology Lift.
  - §6.4: the CSS height animation, the settle timing, and the scroll correction and rail update after it.
  - §6.5: the project card Hover lift, plus rules that keep the card from reading as a link.
  - §7: the tilt row is replaced by rows for card height, soft circle, technology lift and card lift. The tilt sub-bullet in rule 5 is now a link-row note (the `:focus-within` guard is kept). "Other rules" now says the only hover movements are the two lifts.
  - §8 (hover on non-interactive elements), §9.1 (new contrast rows), §9.2, §10 (hero links row), §12 (one line), §15 (one-line update).
- **`docs/decisions.md`:** four dated approved entries. The hero entry supersedes the old "Hero links" tilt and "no box" text; the old entry is not rewritten.

## Decisions I made
- **Hover lives on the `<li>`, movement on its contents** (technology wrapper, project `<article>`), so the hover area stays still and the edge doesn't flicker.
- **Project card easing:** the owner set 180ms. I set the transform to `cubic-bezier(0.2, 0, 0, 1)` and the border and shadow to ease, to match the technology lift.
- **Settle timing:** a 320ms timer plus one `requestAnimationFrame`, not `transitionend`. `transitionend` doesn't fire when nothing transitions. One shared timer, reset on each `toggle`. When the animation doesn't apply, the work runs on the next frame.
- **Highlights spacing** is `padding-top`, not `margin-top`, so no margin leaks outside the `overflow: clip` box.
- **Timeline connectors** must be CSS-sized, so they track the height animation.
- **Focus:** hero links get the ring only on `:focus-visible`, with no circle.

## Contrast (hand-calculated, WCAG 2.x, rounded down)
- Circle over Paper is about `#EFE0DC`. Accent icon on it: 4.3:1. Accent deep: 5.6:1. Both pass 3:1 non-text. The circle against Paper is about 1.16:1 and decorative.
- Accent technology name on Paper: 4.9:1. Passes 4.5:1 for 15px/600.

## Files changed
- `docs/design-spec.md`
- `docs/decisions.md`
- `docs/phase-notes/phase-2-design.md` (this entry)

## Open questions
1. **Resolved:** the stale §13 row "Hero tilt on hover" is removed (coordinator approved).
2. **Resolved:** §1.1 now has the missing line break and says there are two shadows, the open-dot ring and the project card hover shadow, matching §1.5 (coordinator approved).
3. **Frontend should verify** in a real browser: the closing card's end has no jump, and the clicked summary ends in view after the 320ms settle.

## Skills used
- `frontend-design` (restraint, motion that answers an action, the quality floor). `ponytail` was active.

---

# Step 2 update: Dark mode and theme toggle (2026-10-16)

Status: **owner-approved change, specified.** Reverses "Color modes: one palette, light only".

## What I did
- **`docs/design-spec.md`:**
  - §1.1: light and dark palettes side by side, `color-scheme` per theme, and how the hover circle, open-dot ring, Technologies logos, company logos and photo look in dark.
  - §1.5: the dark card hover shadow (black, 35%).
  - §2 and §3: the corner placement below 1200px, its offsets and the 60px main top padding; the toggle's place in the rail at 1200px and up.
  - §6.9 (new): the theme toggle component, its placement, storage, first-visit default, the no-flash script, hydration and the color fade.
  - §7: theme toggle hover and theme color fade rows.
  - §8: the toggle's focus and hover, and the light focus ring in dark.
  - §9.1: a dark contrast table (and the two merged rows in the light table split back apart). §9.2: the toggle hit area. §9.4: the keyboard order per range and the toggle's naming.
  - §10: theme toggle and color modes rows; main padding updated. §12: the theme script in the client JS list, static rendering and hydration, and the Tailwind v4 approach. §15: one note, pick "None".
- **`docs/decisions.md`:** one dated approved entry. The light-only entry is left as it was.
- Ran one 21st search for theme toggles (metadata only, no retrieval).

## Decisions I made
- **Clearing the hero below 1200px:** main's top padding goes from 32 to 60px (`max(16px, safe-top) + 44px`). The toggle box sits 5 to 49px from the top, so it never sits on the photo (mobile) and sits right above it (tablet), with an 11px gap.
- **Offsets:** `top` and `right` = `max(16px, safe-area inset) − 11px`, so the 22px glyph sits 16px (or the inset) from the top and right edges of the window.
- **Window corner (owner choice):** the toggle is absolute against the page, with no positioned ancestor, so it sits in the browser window's top-right corner at every width below 1200px.
- **Two instances,** one per range, each `display: none` outside it, because the rail is `display: none` below 1200px. One tab stop at a time.
- **Below 1200px the toggle is the first child of `<main>`**, so it is first in tab order (it is visually first) and inside a landmark.
- **Icons swap in CSS** on `data-theme`; `aria-pressed` is set after mount. No hydration mismatch beyond `<html>`, which gets `suppressHydrationWarning`.
- **Fade properties:** I added `text-decoration-color` to the owner's four, so Accent underlines don't snap ahead of the text.
- **No JS:** the toggle is hidden (`html:not([data-theme])`), and the page renders light.
- **First visit is always light (owner choice);** the head script reads only the stored `theme` key, and the system color setting is never read.
- **Company logos and photo:** unchanged in dark, no filters.

## Contrast (hand-calculated, WCAG 2.x, rounded down)
- On Paper: Charcoal 14.7, Pebble 6.8, Accent 5.5, Accent deep 7.9. On cards: 13.3, 6.2, 5.0, 7.2. The owner's demo numbers are 0.1 higher in places; that is rounding.
- Accent icon on the 10% circle (about `#2E201D`): 4.9:1; Accent deep 7.0:1. Focus ring 14.7 / 13.3:1.
- Decorative: circle 1.13:1, open-dot ring 1.29:1, Rule 1.46 / 1.32:1.
- **No failures, no fixes needed.**

## Files changed
- `docs/design-spec.md`
- `docs/decisions.md`
- `docs/phase-notes/phase-2-design.md` (this entry)

## Conflicts flagged
- §1.3's "Main padding: 32px top" is now stale below 1200px. §2 states that it supersedes it, because I was asked to leave §1.3 unchanged. It should become "60px top below 1200px (56px at 1200px and up)" if the coordinator approves the one-cell edit.
- `plan.md` Phase 5 lists dark mode, which this decision brings back. No conflict now.

## Open questions
1. **Resolved (owner): always start light.** The head script reads only `localStorage` `theme`; the system color setting is not followed. Spec §6.9 updated.
2. **Resolved (owner): the browser window's top-right corner**, not the page column. Same safe-area offsets (glyph 16px from the top and right). Spec §2, §3, §6.9 and §10 updated. Correction: my earlier claim that the glyph lines up with the photo's right edge was wrong. Main is capped at 880px, so from about 912px wide the photo sits further in (coordinator measured 172px in at 1120px). The spec no longer claims alignment.
3. **Resolved (owner): stronger dark shadow,** 75% black (`0 8px 24px -12px color-mix(in srgb, #000 75%, transparent)`), as in the demo. Light stays 35% Charcoal. Spec §1.5 updated.
4. **Resolved (owner): yes.** §1.3 now reads "60px top below 1200px (56px at 1200px and up)". The §1.3 conflict above is closed.

## Skills used
- `frontend-design` (the quality floor: contrast, focus, reduced motion). `ponytail` was active.
- 21st: `mcp__21st__search` (metadata only).

---

# decisions.md cleanup (2026-10-16)

Done at the owner's request on branch `phase-3-scaffold`, after Phase 2 was merged (PR #2, `76c7058`).

## What I did
- **`docs/decisions.md`:**
  - Phase 2 heading now "(2026-10-15 to 2026-10-16)"; added "Phase 2 checkpoint: Approved by owner (2026-10-16)" and a "`featured` removed" entry (spec §6.4, §11 #6).
  - Marked contradicted entries in place with one style, `*Superseded (2026-10-16): see "<entry>".*`: Phase 0 Featured experiences; Phase 1 `featured` and Images; Phase 2 Hero content, Compact experiences, Skills (nav link), About (open question), Hero links (tilt, hover box, 18px vs 24px), Company logos (PNG), Color modes (light only).
  - Updated factual status lines: Overall feel and Direction (direction chosen, preview approved), Hero photo and Experience (files supplied), Assets supplied (committed in `8d8010f`, verified in `public/`).
  - Added "Phase 3 Decisions (in progress)" with the owner's four answers: `src/app/` move, Prettier plus `prettier-plugin-tailwindcss`, Vercel project `rchen2004`, no git history rewrite for the phone.
- **`docs/design-spec.md`:** status line only: approved by the owner on 2026-10-16, later changes through `decisions.md`.

## Files changed
- `docs/decisions.md`
- `docs/design-spec.md` (status line)
- `docs/phase-notes/phase-2-design.md` (this entry)

## Open questions
1. Spec §0 still points to "Phase 2 Decisions (in progress)", a heading that no longer exists. A one-word fix if the owner approves.
2. Phase 1 `dateLabel`: "Removing it is still open." Spec §11 says keep it. Should decisions.md record it as kept?
3. `featured` is still in `data/schema.ts` and `resume.json` (Backend).

## Skills used
- `frontend-design` (loaded; not exercised, docs only). `ponytail` was active.

