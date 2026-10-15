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

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
- None.

## Files changed
- `docs/design-spec.md`
- `docs/phase-notes/phase-2-design.md`

## Open questions
- None.
