# Phase 4: Frontend

## Step 2: Hero, page shell, theme toggle

Agent: Frontend. Branch `phase-4-sections`. Date 2026-10-18. Not committed.

### What I did
- **Page shell (§2, §3):** `src/app/page.tsx`. The column is max 1000px; side padding is `max(16px, safe-area inset)` on `<body>`, outside the max width, as in the preview. `<main id="top">` is max 880px, a grid with 72px gaps, top padding `calc(max(16px, env(safe-area-inset-top)) + 44px)` (60px) below 1200px and 56px from 1200px, bottom 80px. From 1200px the shell is the `220px minmax(0, 1fr)` grid, 60px gap, max 1180px, with main in column 2. Column 1 stays empty until step 8. No rail, no skip link. Neither the shell nor main is positioned.
- **Scroll (§7):** `scroll-padding-top: 24px` on `html`; `scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`.
- **Hero (`src/components/Hero.tsx`, server component, §4.1):** a `<header>` grid. Under 720px the photo comes first (`order-first`) with a 24px gap; from 720px it is `minmax(0, 1fr) 280px` with a 40px gap, aligned to the top. If `basics.image` is missing, the grid has one column and no photo. Text block gaps are 20px.
  - Greeting h1: 36/48px, 700, line-height 1.1, -0.015em, `text-wrap: balance`. Tagline: 21/24px, line-height 1.35 (no balance: §1.2 limits it to h1 to h3, and the preview agrees).
  - **Word split (§7 rule 5):** `BlurWords` splits `basics.greeting` and `basics.tagline` on whitespace at build time. Each line has one `sr-only select-none` full copy, then one `aria-hidden` wrapper of `inline-block` word spans with `--i` set inline. Spaces are text nodes between spans. The tagline index starts at the greeting's word count.
  - **Blur-in:** CSS only in `globals.css`. Keyframes declare only `from`. The animation is `700ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 45ms) backwards`, and the link row is `500ms ease 700ms backwards`, opacity only, with `.hero-links:focus-within { animation: none }`. Every `animation` declaration sits inside `prefers-reduced-motion: no-preference`; `inline-block` is outside it.
  - **Photo (§5):** `next/image` with `fill`, `preload`, `sizes="(min-width: 720px) 448px, 160vw"`. The frame is 4:3 / 4:5, `overflow: hidden`, 12px radius. The image uses `object-fit: cover`, `object-position: 50% 75%`, `transform: translateY(-8%) scale(1.6)`, `transform-origin: 51% 60%`. Compared with `docs/design-preview.html` at 1440px: the crop matches.
  - **Links (§6.1):** one non-wrapping flex row, 8px gap, `margin-left: -10px`. Order: Resume (`RESUME_PDF`, new tab), Email (`mailto:` + `basics.email`), then `basics.profiles` in array order (LinkedIn, GitHub, Instagram), with the icon mapped from `network`. Each link is a 44px round box with a 24px icon and an `sr-only` label plus hint ("Resume (PDF, opens in a new tab)", "Email", "<network> (opens in a new tab)"). New-tab links have `rel="noopener"`. No `title`, no `aria-label`.
- **Soft circle (`@utility soft-circle` in `globals.css`):** shared by the hero links and the toggle. It sets the 44px round box, Charcoal, no underline, and color 160ms `cubic-bezier(0.2, 0, 0, 1)` plus background 160ms ease. Under `@media (hover: hover)`, `:hover` adds the 10% Accent circle and an Accent icon. `:active` is Accent deep.
- **Focus (§8):** a global `:focus-visible` rule, 2px Charcoal outline, 2px offset (see open question 1).
- **Theme toggle (`src/components/ThemeToggle.tsx`, client, §6.9):**
  - A `<button type="button">` with the sr-only label "Dark mode". Both icons are rendered (`moon`, `sun`, 22px), and CSS shows one, keyed on `html[data-theme="dark"]`.
  - `aria-pressed` comes from `useSyncExternalStore`. The server snapshot is `false`, so hydration matches, and then it reads `data-theme`. A `MutationObserver` on `data-theme` keeps every instance in sync, which covers the two instances in step 8.
  - Click: if `prefers-reduced-motion: no-preference` matches, it adds `theme-fade` to `<html>` and removes it after 240ms (one timer, reset on a quick second click). It then flips `data-theme` and writes `localStorage.theme` inside `try`.
  - `html.theme-fade, html.theme-fade *` transitions background-color, color, border-color, text-decoration-color and box-shadow, 240ms ease. The rule is unlayered, so it beats the utility transitions for those 240ms.
  - `html:not([data-theme]) .theme-toggle { display: none }` hides it without JS.
  - **Placement (temporary, decisions.md):** the first child of `<main>`, `position: absolute`, `top: calc(max(16px, env(safe-area-inset-top)) - 11px)` and `right: calc(max(16px, env(safe-area-inset-right)) - 11px)`, at every width until step 8.
- **Head script (`src/app/layout.tsx`):** a plain inline `<script>` in `<head>`, blocking, not `next/script`. Inside `try`, it sets `data-theme` to `"dark"` only when `localStorage.theme === "dark"`, otherwise `"light"` (also `"light"` in the `catch`). `<html>` keeps `suppressHydrationWarning`.
- **Icons (`src/components/icons.tsx`, §6.1):** the seven Tabler 3.49.0 outline glyphs, path data copied from the pinned files, with Tabler's invisible bounding path dropped. `Icon` renders `fill="none"`, `stroke="currentColor"`, width 2, round caps and joins, `vector-effect="non-scaling-stroke"` on every path, the optical scale as `<g transform="translate(12 12) scale(s) translate(-12 -12)">`, `aria-hidden="true"`, `focusable="false"` and `flex: none`. The svg is a direct flex child of the link or button. Scales after Design QA: file-text 0.95, mail 1.00, linkedin 0.90, github 0.92, instagram 0.90; moon and sun 1.0 (see "QA fixes" below).
- **Dark mode:** every color is a token or a `color-mix()` of one. There are no `dark:` utilities and no `prefers-color-scheme` anywhere in `src/`.

### Decisions I made
- **`fill` instead of width/height plus `height: auto` for the photo.** §12 says `next/image` with `priority` and `fill`. `fill` emits no width/height attributes and sizes the img at 100% x 100% of the frame. That removes the cause §5 warns about (the intrinsic height overriding the frame), and it is exactly the preview's `width: 100%; height: 100%` img. A literal `height: auto` on a width/height img would give the img its 3:4 box inside the frame, `object-position` would do nothing, and the crop would no longer match the preview. The frame is `position: relative` for `fill`; it is not an ancestor of the toggle.
- **`preload` instead of `priority`.** Next 16 deprecates `priority` in favor of `preload`, which does the same thing.
- **The hero link row is a `<div>`, not a list,** as in the preview. The spec doesn't specify a list.
- **The `sr-only` labels sit in `position: relative` links,** so the absolutely positioned label stays inside its link.

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass (`/` prerendered as static)
- Headless Chrome against `next start` (not `next dev`, so `AGENTS.md` was not rewritten):
  - screenshots at 320, 390, 768, 1199 and 1440px, light and dark;
  - no console errors;
  - no horizontal scroll at 320px;
  - toggle box at 5 to 49px with a 5px right offset, and main top padding 60px below 1200px and 56px from 1200px;
  - the split h1 and tagline have the same height and line count as the unsplit text at 320, 390, 720, 1199 and 1200px;
  - reduced motion: fully visible on the first frame. With motion: mid-blur at 350ms.
  - A click sets `data-theme="dark"`, `localStorage.theme="dark"` and `aria-pressed="true"`, and `theme-fade` is gone after 240ms.
  - The words' computed `filter` at rest is `none`.
- Not checked: Lighthouse (LCP element, CLS 0), real hover and keyboard focus visuals, Safari and Firefox, a device with a safe-area inset.

### Files changed
- `src/app/globals.css`: scroll rules, focus ring, `soft-circle` utility, hero motion, toggle icon and visibility rules, theme fade.
- `src/app/layout.tsx`: head theme script, body side padding.
- `src/app/page.tsx`: page shell; replaces the Phase 3 swatch placeholder.
- `src/components/Hero.tsx`, `src/components/ThemeToggle.tsx`, `src/components/icons.tsx` (new).

Skills used: `frontend-design` (preloaded). No 21st components: spec §15 picks none, and no new dependencies were added.

### Open questions
1. **Focus ring shape on the round controls.** §6.1 and §8 say "2px Charcoal, 2px offset, 4px radius, drawn around the 44px box". An outline follows the element's own corners, so on the 44px round hero links and toggle the ring is a circle. A 4px-cornered square would need `border-radius: 4px` on focus, which turns the hover circle into a rounded square while focused. I kept the circle. Should it be a circle, or a square with 4px corners?
2. **Optical scales need the owner's eye.** In Tabler, LinkedIn and Instagram share the same outer rounded square (3 to 21), but the starting values differ (0.85 and 0.82), so their frames render at slightly different sizes side by side. At the starting values, LinkedIn and Instagram also read smaller than mail and file-text in the screenshots. Should the owner or Design tune these now or in Phase 6?
3. **Temporary toggle at 1200px and up.** Main's top padding there is 56px, so the gap between the toggle box (ends at 49px) and the hero is 7px, not 11px. The toggle sits at the window corner, far from the content column. Both end in step 8. Acceptable until then?
4. **`viewport-fit=cover` is not set,** so `env(safe-area-inset-*)` is 0 on notched phones and the safe-area parts of the formulas do nothing yet. Adding it means a `viewport` export in the layout. Should I add it (Frontend), or does it belong with Backend's Phase 6 metadata?

### QA fixes (2026-10-18, Design's step 2 must-fixes)
- **Icon optical scales** (`src/components/icons.tsx`): LinkedIn 0.85 to 0.90, Instagram 0.82 to 0.90, GitHub 0.88 to 0.92. File-text 0.95, mail 1.00, moon and sun 1.0 are unchanged. I checked the row by eye at 24px in light and dark (2x crops, `icons-row-light.png` and `icons-row-dark.png`). The LinkedIn and Instagram frames now match, and none of the five looks bigger or heavier, so I made no further 0.02 steps. The GitHub value also applies to the repo and project links later.
- **`viewport` export** (`src/app/layout.tsx`): `{ viewportFit: "cover" }`. The rendered meta is `width=device-width, initial-scale=1, viewport-fit=cover`, so the safe-area insets now apply. This closes open question 4.
- **Open question 2** is closed by the new scales.
- **Checks after the fixes:** typecheck, lint, format:check, check:data and build all pass.

## Step 3: About

Agent: Frontend. Branch `phase-4-sections`. Date 2026-10-18. Not committed.

### What I did
- **`src/components/About.tsx` (new, server component, §4.2, §6.2):** `<section id="about" aria-labelledby="about-heading">` with an h2 "About" (15px/600, line-height 1.45, Pebble, `text-wrap: balance`, 8px margin below) and one `<p>` with `resume.basics.summary` from the loader (16px/1.55, max 68ch, Charcoal inherited). No card, border, background or motion. "About" is UI copy from the spec; the text is not hardcoded.
- **`src/app/page.tsx`:** `<About />` after `<Hero />`. Main's existing 72px grid gap supplies the hero-to-About space, so the section has no margin of its own.

### Decisions I made
- The paragraph sets 16px explicitly, so at 720px and up (body 17px) the 68ch cap is measured in the 16px text's own `ch`, as the spec reads.
- Heading id is `about-heading`. Later sections will follow the `<anchor>-heading` pattern.

### Measurements (headless Chrome, `next start`, light and dark, 320/390/768/1200/1440)
- Hero bottom to About top: 72px at every width.
- h2 bottom to text top: 8px at every width.
- 68ch at 16px Figtree: 697.41px. The paragraph is 697.41px wide at 768, 1200 and 1440 (main is 736 / 880 / 880), so the cap applies; at 320 and 390 it fills main (288 / 358). Lines: 10 / 8 / 4 / 4 / 4.
- Computed: h2 15px, 600, 21.75px line-height, Pebble (`#5E5751` light, `#A8A09A` dark); text 16px, 24.8px line-height, Charcoal. Section border 0, background transparent.
- No horizontal scroll at 320px. No console errors.
- Screenshots: `about-{light,dark}-{320,390,768,1200,1440}.png`, full page, in the shots folder.

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass (`/` static)

### Files changed
- `src/components/About.tsx` (new)
- `src/app/page.tsx`

Skills used: `frontend-design` (preloaded). No 21st components (spec §15 lists none for About). No new dependencies.

### Open questions
None.

## Step 4: Technologies

Agent: Frontend. Branch `phase-4-sections`. Date 2026-10-18. Not committed.

### What I did
- **`src/components/Technologies.tsx` (new, server component, §4.3, §6.3, §7):** `<section id="technologies" aria-labelledby="technologies-heading">` with the h2 "Technologies" in the section heading style (24px/700, line-height 1.25, 24px below, `text-wrap: balance`), then a `<ul>` of `resume.technologies` in data order. Only "Technologies" is hardcoded.
  - Grid: 5 equal columns from 600px (16px column gap, 28px row gap). Under 600px (`max-sm:`): 12 columns, no column gap, each item spans 4, and items 4 to 7 span 3 (`:nth-child(n+4):nth-child(-n+7)`), which gives rows of 3/4/3. A `shortcut:` comment says the spans only fit exactly 10 items and names the plain 3-column fallback.
  - Item: a plain `<li>` (no link, no tabindex, `cursor: default`), with one inner wrapper holding a 36px logo above the name (10px gap, centered). Name 15px/600, line-height 1.45.
  - Lift: hover is detected on the `<li>` (`group`), and the wrapper moves `translate: 0 -4px` over 180ms `cubic-bezier(0.2,0,0,1)`. The name turns Accent over 180ms ease. Tailwind v4's hover variants already sit under `@media (hover: hover)`. The movement is `motion-safe:` only, so under reduced motion only the name color changes. The logo keeps Charcoal.
- **`src/components/icons.tsx`:** a `TECH_ICONS` map typed `Record<TechnologyIcon, ReactNode>` (type from `data/schema.ts`), so a missing or extra key fails typecheck, plus a `TechIcon` component (`fill: currentColor`, `aria-hidden`, `focusable="false"`). Nine Simple Icons v16.35.0 paths copied unchanged from the pinned files, and Lucide `database` (lucide-static v0.460.0) as a stroke group with stroke width 2 in its 24-unit box.
- **`src/app/page.tsx`:** `<Technologies />` after `<About />`; main's 72px grid gap spaces it.

### Decisions I made
- Lift uses Tailwind's `translate` property (v4 `-translate-y-1`), not `transform`. Same effect, transform-only, no layout shift; `transition-transform` covers `translate`.
- SQL stroke: "stroke width 2" read as Lucide's own unit (2 of 24), which renders at 3px at 36px. I did not use `non-scaling-stroke` (that would give 2px and a lighter icon). See open question 3.

### Measurements (headless Chrome, `next start`, light and dark, reduced motion for the static shots)
- **320:** rows 3/4/3 (Java Python TypeScript / C++ HTML CSS SQL / React.js Tailwind Next.js). Grid columns 12 x 24px; narrowest cell 72px (3-column span), 4-column span 96px. No name wraps; the tightest is TypeScript, 75.05px in a 96px cell (78%). Row gap 28px, column gap 0.
- **390:** rows 3/4/3; narrowest cell 89.5px; 4-span 119.3px. No wraps. Row gap 28, column gap 0.
- **600, 768, 1200, 1440:** rows 5/5. Columns 97.8 / 134.4 / 163.2 / 163.2px. Column gap 16px, row gap 28px. No wraps.
- Every width: logo 36 x 36, logo-to-name gap 10px, name 15px/600/21.75px centered, h2 24px/700/30px with 24px to the list, About to Technologies 72px, all `<li>` tabIndex -1 (not focusable), cursor default, no horizontal scroll.
- Colors: logo and name Charcoal, `#24201D` light and `#EDEAE6` dark.
- **Lift:** React.js wrapper moves up exactly 4px on hover in both themes. The name turns `#C0362C` light / `#E56B60` dark; the logo stays Charcoal. With the pointer 2px above the `<li>`'s bottom edge, the item stays hovered after the lift (no flicker). Reduced motion: 0px movement, name still turns Accent.
- **Logo ink at 36px** (bounding box, coverage of that box): Java 29 x 36, 18%; Python 36 x 36, 62%; TypeScript 36 x 36, 81%; C++ 32 x 36, 56%; HTML 31.5 x 36, 62%; CSS 36 x 36, 84%; SQL 30 x 33, 45%; React 36 x 32, 32%; Tailwind 36 x 21.5, 34%; Next.js 36 x 36, 68%.
- Screenshots in the shots folder: `tech-{light,dark}-{320,390,600,768,1200,1440}.png` (full page), `tech-hover-{light,dark}-1440.png` (React.js hovered, section crop), `tech-icons-2x.png` (grid at DPR 2).

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass (`/` static)

### Files changed
- `src/components/Technologies.tsx` (new)
- `src/components/icons.tsx`
- `src/app/page.tsx`

Skills used: `frontend-design` (preloaded). No 21st components (spec §15 picks none for Technologies). No new dependencies.

### Open questions
1. **HTML and CSS.** They do not read as a pair. HTML is the shield outline with a cut-out "5" (31.5px wide, 62% ink); CSS is a solid rounded tile with "CSS" knocked out (full 36 x 36, 84% ink), so CSS looks bigger and heavier, and it pairs more with the TypeScript tile than with HTML. See `tech-icons-2x.png`. §6.3 allows Devicon's `css3` shield, recolored to Charcoal, as the fallback. Keep `css`, or switch (needs Design and a decision entry)?
2. **Java looks small and light.** The OpenJDK Duke is a thin line drawing (18% ink, the lowest), so it reads lighter than its neighbors, especially next to Python and TypeScript. Tailwind (21.5px tall) and React (32% ink) are also light, but that is their natural shape. I made no optical scaling, since the spec gives no scale for these logos. Owner's call whether Java needs one.
3. **SQL stroke width.** Rendered at 3px (Lucide's 2 units scaled to 36px). It sits between React and C++ in weight and reads close to the filled logos. If Design meant a literal 2px line, I would add `vector-effect: non-scaling-stroke`, which makes it lighter.

### QA fix (2026-10-18, Design's step 4 must-fix)
- **CSS logo** (`src/components/icons.tsx`): switched to the §6.3 fallback, Devicon `css3-plain` from devicon v2.16.0 (MIT), downloaded from jsDelivr into a fresh scratchpad folder. The data key stays `css`. The path is copied unchanged without its `#1572B6` fill, so it inherits `currentColor`, and is wrapped in `<g transform="scale(0.1875)">` to map the 128-unit box exactly onto the 24-unit one. A one-line comment names the source and version, and the block header now says "Simple Icons ... except CSS".
- **Measurements:** at 36px, HTML's logo is 31.5 x 36 with 62% ink, and CSS is 31 x 35.25 with 64% ink. CSS's computed fill is Charcoal in both themes (`#24201D` / `#EDEAE6`).
- **Visual check:** `tech-html-css-{light,dark}-2x.png` (390px, where the two sit side by side in row 2) and a new `tech-icons-2x.png`. The two shields now read as a pair: same outline, same size and weight, "5" and "3" cut out in the same style. This closes open question 1.
- **Checks after the fix:** typecheck, lint, format:check, check:data and build all pass.

### Owner changes (2026-10-18): Java cup and Accent logo on hover
- **Java logo** (`src/components/icons.tsx`): Backend renamed the data and schema key `openjdk` to `java`, so the `TECH_ICONS` entry is now `java`. The logo is Devicon `java-plain` (the coffee cup), devicon v2.16.0, MIT, from the pinned file in the scratchpad. I copied its one path unchanged, without the `#EA2D2E` fill, so it uses `currentColor`, inside `<g transform="scale(0.1875)">`, the same as the CSS shield. It has a one-line source comment, and the header now says "except Java and CSS". No `openjdk` remains in `src/`.
- **Hover color** (`src/components/Technologies.tsx`): the logo now turns Accent with the name. The Accent color moved from the name `<span>` to the wrapper, so the logo (`currentColor`) and the name both inherit it. The wrapper's transition is `translate 180ms cubic-bezier(0.2,0,0,1), color 180ms ease`. The movement stays `motion-safe:`, so under reduced motion the color change stays and nothing moves.
- **Measurements** (React.js hovered, 1440px):
  - With motion: lift 4px; name and logo both `#C0362C` in light and `#E56B60` in dark; still hovered with the pointer 2px above the `<li>`'s bottom edge.
  - Reduced motion: lift 0px; name and logo still turn Accent in both themes.
- **Java cup ink at 36px:** 26 x 34.75, 15% coverage. That is the lowest of the ten. Python is 36 x 36 at 62% and TypeScript is 36 x 36 at 81%; the old OpenJDK Duke was 29 x 36 at 18%.
- **Screenshots:** `tech-java-{light,dark}-2x.png` (the Java, Python and TypeScript row at DPR 2), a new `tech-icons-2x.png`, and new `tech-hover-{light,dark}-1440.png`.
- **Checks:** typecheck, lint, format:check, check:data and build all pass.

#### Open question
- **The cup reads light.** Its strokes are thin and it is narrower than its neighbors (26px wide), so next to the solid Python and TypeScript marks it looks smaller and fainter, even more than the OpenJDK Duke did. An optical scale-up would make it bigger but not heavier. A heavier Java mark would need a different icon. Owner's call; I made no change.

## Step 5: Experience

Agent: Frontend. Branch `phase-4-sections`. Date 2026-10-18. Not committed.

### What I did
- **`src/components/Experience.tsx` (new, server component, §4.4, §6.4, §9.3):** `<section id="experience" aria-labelledby="experience-heading">`, the h2 "Experience" (the only hardcoded text), then `<ol class="timeline">` of `sortByDate(resume.experience)` (Scout, Babel Street, Verisk, Ventus Health). Each `<li class="entry">` holds an `aria-hidden` dot span and `<details name="experience">`. Index 0 of the sort result gets `open`, so no company name is used.
  - Summary: no headings, only spans (summary allows phrasing content). It has a flex row that wraps: the logo (next/image 40 x 40, `alt=""`, 8px radius, 1px Rule border, `object-fit: contain`) and the company (21px/600, 18px under 720px) with a 14px gap, then the dates (`displayDate`, meta style) and the chevron, pushed right with `margin-left: auto`. Under it is the title in meta style, 2px below, with a 54px indent from 720px. The company turns Accent on summary hover (120ms ease). The native marker is hidden and the cursor is a pointer.
  - Chevron: a 9 x 9px span with 2px Pebble right and bottom borders. Closed it is `rotate(45deg) translateY(-3px)`, and open (`group-open`) it is `rotate(-135deg) translateY(-1px)`. The transition is 200ms `cubic-bezier(0.2,0,0,1)`, under `motion-safe` only.
  - Highlights: `padding-top: 16px` (not margin), a 20px bullet indent, 8px gaps, 17px/1.6 (16px under 720px) and Pebble markers, with a 54px indent from 720px.
  - Scout's repo links: 12px below, a wrapping row with a 20px column gap. Each uses the new `labeled-link` utility with the 18px Tabler `brand-github` icon (shared 0.92 scale) as a direct flex child, the label from `links[].label`, a hidden " (opens in a new tab)" hint, `target="_blank"` and `rel="noopener"`.
  - Card: White, 1px Rule border, 12px radius, 28px padding (24px under 720px). Every card uses this style.
  - With no logo, the indent drops to 0 (fallback only; all four companies have logos).
- **`src/components/TimelineScript.tsx` (new, client, renders nothing):**
  - Reveal: only under `prefers-reduced-motion: no-preference`. Entries whose top is below the viewport at mount get `reveal-pending`. An IntersectionObserver (0.15) swaps that class for `reveal-shown` once, then stops observing the entry.
  - Scroll correction: a capture-phase `toggle` listener on the list remembers the card that opened. The browser's `close` toggle on the card it shuts does not overwrite that; closing the remembered card clears it. One shared timer and frame are cleared on every toggle. When the animation runs (no-preference, `::details-content` and `interpolate-size` supported), the work waits 320ms then one rAF; otherwise it waits one rAF. If the opened summary's top is above 0, it runs `scrollIntoView({ block: "start" })`, which honors `scroll-padding-top`. The behavior is `smooth` under no-preference, `auto` otherwise.
  - The settle function has a comment marking where step 8's rail update goes.
- **`src/app/globals.css`:**
  - **`labeled-link` utility (§6.1):** inline-flex, 8px gap, at least 44px tall, 15px/600 Charcoal, 1px Accent underline at a 4px offset. Hover (under `hover: hover`) gives Accent and a 2px underline over 120ms ease; pressed gives Accent deep. It has a 4px radius for the focus ring. Projects and the footer can reuse it.
  - **Timeline block:**
    - The dot is 12px Charcoal at -36/38 (-48/42 from 720px). It turns Accent with the 5px 18% ring via `.entry:has(> details[open]) > .dot`, and transitions over 200ms ease under no-preference only.
    - Connector: `.entry:not(:last-child)::before`, 2px Rule. It starts at `top: 44px` (48 from 720px) with `height: calc(100% + 20px)` (24 from 720px), centered on the dot.
    - Summary focus offset: 4px. This is unlayered, so it overrides the global 2px.
    - Animated height: under no-preference, `:root { interpolate-size }`, plus `::details-content` with `block-size` 0 to auto over 320ms, `content-visibility` allow-discrete and `overflow: clip`.
    - Reveal classes: under no-preference, 12px and opacity 0, over 320ms `cubic-bezier(0.22,1,0.36,1)`.
  - **Theme fade:** `html.theme-fade` now also covers `*::before` and `*::after`, so the connectors fade with the theme.
- **`src/app/page.tsx`:** `<Experience />` after `<Technologies />`.

### Decisions I made
- **Header row gaps from the preview:** 2px row gap, 16px column gap, and the chevron 4px past the dates' gap (20px from the dates). The spec gives no values; these match the approved preview.
- **Dates and chevron wrap together.** In the first build, the chevron wrapped alone onto its own line at 390 (Scout and Babel Street). Now the two sit in one non-wrapping group with `margin-left: auto`. When the row wraps, they drop to the next line together, right-aligned, and the chevron stays at the end of the row (§6.4). See `clip-320.png` and `clip-390.png`.
- **Repo link row gap:** 20px between links, 0 between wrapped lines, as in the preview. The links are 44px tall, so wrapped rows don't touch. See open question 2.
- **`overflow-clip-margin: 4px` on `::details-content`:** without it, the clip cut the focus ring of the repo links (2px offset + 2px width) at the content box edges, most visibly on mobile, where the links start at x = 0. Side effect: up to 4px of content past the clip edge can show during the 320ms height animation. See `exp-focus-link-light-390.png`.
- `{" "}` text nodes between the summary parts. They are not rendered in flex layout, but they keep words apart in the accessible name.

### Measurements (headless Chrome, `next start`, light and dark; static shots under reduced motion)
- **Order and default:** Scout, Babel Street, Verisk Analytics Inc., Ventus Health. Open on load: `[true, false, false, false]`.
- **Accessible names** (AX tree, role DisclosureTriangleGrouped): "Scout Sep 2025 - Present Senior Developer" (expanded), "Babel Street Jan - Jun 2026 Software Engineer Co-op", "Verisk Analytics Inc. Jan - Jun 2025 Junior Software Developer Co-op", "Ventus Health Jun - Sep 2024 Project Manager Assistant". The only heading in the section is the h2.
- **Styles at every width (320/390/768/1200/1440), both themes:**
  - List padding 36px with 20px gaps under 720px, and 48px with 24px gaps from 720px.
  - Card padding 24px / 28px, 12px radius, 1px border. White and Rule are `#FFFFFF` and `#DAD6D0` in light, `#24211E` and `#3A3531` in dark.
  - Logo: 40 x 40, 8px radius, 1px Rule border, `contain`, `alt=""`. It sits 14px from the company.
  - Company 18px / 21px, 600, line-height 1.3. Dates 15px Pebble.
  - Chevron: 9 x 9px, 2px Pebble borders.
  - Title: 15px Pebble, 2px below the row, indented 0px under 720px and 54px from 720px.
  - Highlights: `padding-top` 16px, 20px bullet indent, 8px gap, 16px/25.6px (under 720px) and 17px/27.2px (from 720px), Pebble markers.
  - Repo links: 15px/600, 44px tall, 1px Accent underline at a 4px offset, `_blank` and `noopener`, 18px icon, 12px below the highlights, 20px column gap.
  - No horizontal scroll at any width.
- **Wrapping:** at 320 and 390, Scout's dates and chevron drop to a second line, right-aligned, with the chevron last. At 320, "Verisk Analytics Inc." wraps to two lines. From 768, everything is on one row.
- **Dot center vs logo center:** the x-axis does not apply (the dot is in the gutter). On the y-axis, the dot center is **1px above** the logo center at every width. The spec's 42px / 38px puts the center at 48px / 44px from the card's top edge, and the logo's center is at 1px border + 28px / 24px padding + 20px = 49px / 45px. At 320, Verisk's two-line name makes the summary row 46.8px tall, so its logo center is 4.4px below the dot. See open question 1.
- **Connector, Scout open (default):** the first connector starts exactly at the first dot center, each connector ends exactly at the next dot center, and the last ends exactly at Ventus's dot. Start error 0, end error 0, joins `[0,0,0]`, x error 0, and the last entry has no connector. This holds at all 5 widths in both themes, under reduced motion and with motion (390 and 1440).
- **Connector, other cards open:**
  - Ventus (the last card): with motion at 390, the line runs 1442.05 to 1914.55 and the last dot is at 1914.55; at 1440, it runs 1082.44 to 1519.69. Errors 0, joins 0.
  - Babel Street: the line runs 1070.44 to 2053.06 and the last dot is at 2053.06, in both themes.
- **Connector mid-animation (~150ms into opening Babel Street):** card heights are `[131, 645, 122, 122]` against the settled `[122, 667, 122, 122]`. The line still runs exactly from the first dot to the last, with joins `[0,0,0]`. It follows the height every frame.
- **One open at a time** (sequence of clicks):
  - Ventus: `[F,F,F,T]`.
  - Verisk: `[F,F,T,F]`.
  - Scout: `[T,F,F,F]`.
  - Scout again: all closed.
  - Only the open card's dot is Accent (`#C0362C` light, `#E56B60` dark, with the 18% ring); the others are Charcoal.
- **Height animation vs snap** (Babel Street, read synchronously after `click()`, after two frames, and after 600ms):
  - Reduced motion: 121.75, then 667.13, 667.13 and 667.13. It snaps. The dot and chevron transition durations are 0s.
  - With motion: 121.75, then 121.75, 121.75 and 667.13. It animates. The dot transition is 0.2s, and the chevron transition is 0.2s on transform.
- **Scroll correction:**
  - With the page as it is now, the page ends at Experience. When Scout closes, the browser's max-scroll clamp keeps Ventus in view (1440: Ventus top 728 → 657; 390: 652 → 534). The correction never needs to run.
  - To test it, I added 2000px of bottom padding to main in the test page, as a stand-in for Projects and Footer. Ventus's summary started 28px from the top with Scout open above, then I opened Ventus:
    - **Chrome with scroll anchoring** (1440): the summary stays at 28px the whole time. Anchoring compensates, and no correction is needed.
    - **Scroll anchoring off** (`overflow-anchor: none`, as in Safari):
      - 1440, motion: the summary is at -138 at 100ms and -194 at 330ms. The correction runs at about 330ms and scrolls smoothly; the summary is at -38 at 400ms and **24px** from 600ms on.
      - 390, motion: -290, then -409, then -224, then **24px** (final).
      - 390, reduced motion: **24px** by 100ms, which is the instant path. 24px is the `scroll-padding-top`.
- **Reveal:**
  - 1440 x 900, motion: all 4 entries are below the fold at load (tops 1034 to 1696). All get `reveal-pending` (opacity 0). After scrolling, all are `reveal-shown`, opacity 1, transform none.
  - 1440 x 2600 (all in view at load): no classes, opacity 1. They never animate.
  - Reduced motion: no classes, opacity 1.
  - JS disabled: no classes, opacity 1.
- **Hover:**
  - Verisk's summary: the company turns `#C0362C` and the cursor is a pointer.
  - NUMAC link: text and icon turn `#C0362C`, and the underline goes to 2px.
- **Focus (keyboard Tab, 390):** the first summary reached is Scout. `:focus-visible` gives a 2px solid `#24201D` ring at a 4px offset with a 4px radius, clear of the logo and text. The NUMAC link's ring is fully visible inside the clipped content (`exp-focus-link-light-390.png`, 2x).
- **Theme fade:** with `theme-fade` on, the connector `::before` transitions `background-color, color, border-color, text-decoration-color, box-shadow`.
- **Screenshots** (scratchpad `shots/`):
  - `exp-{light,dark}-{320,390,768,1200,1440}.png` (full page, reduced motion);
  - `exp-open2-{light,dark}-1440.png` (Babel Street open, Scout closed; section crop);
  - `exp-hover-light-1440.png` (Verisk summary hovered; viewport);
  - `exp-focus-light-390.png` (keyboard focus on Scout's summary);
  - `exp-focus-link-light-390.png` (keyboard focus on a repo link, 2x);
  - `exp-mid-anim-1440.png` (about 150ms into opening Babel Street; Scout closing);
  - `clip-{320,390,768}.png` (section crops of the wrap behavior).

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass (`/` static)

`next start` only; the server was stopped afterwards. `AGENTS.md` is untouched.

### Files changed
- `src/components/Experience.tsx` (new)
- `src/components/TimelineScript.tsx` (new)
- `src/app/globals.css`
- `src/app/page.tsx`

Skills used: `frontend-design` (preloaded). No 21st components (spec §15 picks none for the timeline). No new dependencies.

### Open questions
1. **The dot is 1px above the logo center.** §6.4's `top: 42px` (38px mobile) assumes the logo center is 48px (44px) below the card top, but the card's 1px border puts it at 49px (45px). I kept the spec values; the approved preview has the same 1px. To center exactly, both the dot (`top: 43px` / `39px`) and the connector (`top: 49px` / `45px`) would move 1px. Design's call. (At 320, Verisk's two-line name moves its logo a further 4.4px down; a fixed `top` can't follow that.)
2. **Repo link row gap.** §6.4 says "a wrapping row with a 20px gap". I used 20px between links and 0 between wrapped lines (the preview's `gap: 0 20px`). With a literal `gap: 20px`, wrapped lines at 320 and 390 would have 20px between 44px targets. Confirm 0 or 20 for the row gap.
3. **The clip margin side effect.** `overflow-clip-margin: 4px` keeps keyboard focus rings visible inside the clipped `::details-content`. During the 320ms animation, it lets up to 4px of content show past the clip edge (inside the card padding). I couldn't see it in the frame captures. Keep it, or accept clipped rings at the content edges?

### QA fix (2026-10-18, Design's step 5 must-fix)
- **`src/app/globals.css`:** the dot moved to `top: 43px` (39px under 720px) and the connector to `top: 49px` (45px under 720px). The connector heights are unchanged. Design answered all three open questions: keep `gap: 0 20px`, `overflow-clip-margin: 4px` and the header gaps.
- **Dot center vs logo center:** 0px at 320, 390, 768, 1200 and 1440 in both themes. The one exception is Verisk at 320, where the two-line name puts the logo 3.39px below the dot.
- **Line:** it still runs exactly from the first dot to the last, with start, end and join errors all 0, in these cases:
  - Scout open, all 5 widths, both themes;
  - Ventus open, with motion, at 390 (1443.05 to 1915.55) and 1440 (1083.44 to 1520.69);
  - Babel Street open, both themes.
- **New screenshot:** `exp-links-dark-2x.png` (Scout's repo links in dark at 2x). The underline is Accent `#E56B60` on the `#24211E` card, which is 5.0:1 (§9.1).
- **Checks:** typecheck, lint, format:check, check:data and build all pass. `next start` only; the server is stopped. `AGENTS.md` is untouched.
