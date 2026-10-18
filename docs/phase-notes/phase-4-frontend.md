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
