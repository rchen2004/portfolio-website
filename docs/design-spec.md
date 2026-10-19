# Design Spec: Direction D

Status: **approved by the owner** (2026-10-16, Phase 2 checkpoint). Later changes go through `docs/decisions.md`. Owner: Design. Frontend builds from this file.

## 0. Sources and precedence

- **Look and feel:** `docs/design-preview.html`, approved by the owner as the visual reference. Where this spec and the preview disagree, **this spec wins**. Section 13 lists the places where I changed the preview on purpose.
- **Decisions:** `docs/decisions.md`, "Phase 2 Decisions (2026-10-15 to 2026-10-16)". It supersedes `plan.md` and `docs/design-directions.md` (Round 2 and its addendum) wherever they conflict.
- **Not part of the spec:**
  - the preview's banner note;
  - its CDN logo-loading script (Simple Icons v13 from jsDelivr);
  - its letter-tile fallbacks;
  - its dashed photo and logo placeholder boxes.
- **Content:** all visible text comes from `data/resume.json`. Section 11 lists what it must gain. UI words (nav labels, "Resume", "Email", "Back to top", visually hidden link hints) are interface copy, not resume content. They may live in components.
- **Tailwind:** the project uses Tailwind v4 (`tailwindcss ^4`). Tokens are defined with `@theme` in `src/app/globals.css`, not in `tailwind.config.ts`. Frontend owns that file, as recorded in `decisions.md` and `CLAUDE.md`. The variable names below follow v4's namespaces (`--color-*`, `--font-*`, `--breakpoint-*`, `--radius-*`).

---

## 1. Design tokens

### 1.1 Color

There are two palettes, light and dark, with the same token names (owner decision, 2026-10-16; supersedes "one light palette, no dark mode"). The visitor switches with the theme toggle (§6.9). Light is the `@theme` default; dark redefines the same tokens under `html[data-theme="dark"]`.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-paper` | `#F4F3F0` | `#1A1816` | Page background |
| `--color-white` | `#FFFFFF` | `#24211E` | Card surface (timeline cards, project cards, skip link). The name stays `white` in dark so no component changes. |
| `--color-charcoal` | `#24201D` | `#EDEAE6` | Primary text, headings, icons and logos, timeline dots, focus ring |
| `--color-pebble` | `#5E5751` | `#A8A09A` | Secondary text: titles, dates, tech lists, About heading, footer, inactive nav links, chevron, bullet markers |
| `--color-accent` | `#C0362C` | `#E56B60` | Link underlines, link and summary hover text, rail marker, open timeline dot and its ring, hover circle |
| `--color-accent-deep` | `#A02D24` | `#F2958C` | Pressed (`:active`) link text and icons. This is its only use. In dark it is lighter than Accent, so pressed still reads as "more". |
| `--color-rule` | `#DAD6D0` | `#3A3531` | Card borders, timeline line, footer top border. Decorative only. |

- **`color-scheme`:** `light` on `html`, `dark` on `html[data-theme="dark"]`, so scrollbars and any native controls follow the theme.
- **Open-dot ring:** Accent at 18% opacity, `color-mix(in srgb, var(--color-accent) 18%, transparent)`. It is decorative. It is written against the token, so it follows the theme with no extra rule (dark: about `#3F2723` over Paper).
- **Hover circle** (hero links, theme toggle): `color-mix(in srgb, var(--color-accent) 10%, transparent)`, also token-based (light: about `#EFE0DC`; dark: about `#2E201D` over Paper).
- **No other colors.** There are no gradients. There are two shadows: the open-dot ring and the project card hover shadow (§1.5).
- **Company logos** are the only full-color artwork on the page. In dark they are shown **unchanged**: no `filter`, `invert`, opacity or blend mode, which would distort the brand colors. Their own light JPG backgrounds read as small tiles inside the 1px Rule box. The photo is unchanged too.
- **Technologies logos** use `currentColor` (Charcoal), so they turn light in dark with no extra rule.

### 1.2 Typography

- **One family: Figtree.** Load it with `next/font/google`, weights 400, 600 and 700, the `latin` subset and `display: "swap"`. Fallback stack: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- **`text-wrap: balance`** on h1, h2 and h3.
- Desktop means 720px and up for type. Mobile means under 720px.

| Role | Desktop | Mobile | Weight | Line-height | Other |
|---|---|---|---|---|---|
| Hero greeting (h1) | 48px | 36px | 700 | 1.1 | letter-spacing -0.015em |
| Tagline | 24px | 21px | 400 | 1.35 | |
| Section heading (h2): Technologies, Experience, Projects | 24px | 24px | 700 | 1.25 | 24px space below |
| About heading (h2) | 15px | 15px | 600 | 1.45 | Pebble, 8px space below |
| About text | 16px | 16px | 400 | 1.55 | max 68ch |
| Card title (company, project name) | 21px | 18px | 600 | 1.3 | |
| Body, highlights | 17px | 16px | 400 | 1.6 | |
| Meta (title, dates, tech list) | 15px | 15px | 400 | 1.45 | Pebble |
| Link labels (hero, repo, GitHub) | 15px | 15px | 600 | 1.45 | |
| Technology name | 15px | 15px | 600 | 1.45 | centered |
| Rail name "Ryan Chen" (1200px and up only) | 24px | n/a | 600 | 1.25 | |
| Rail section links (1200px and up only) | 20px | n/a | 400 | 1.45 | |
| Footer text | 14px | 14px | 400 | 1.45 | Pebble |

The "Footer text" row is the copyright line. The footer's "Back to top" link follows §6.1 at 14px: 600, Charcoal (§6.8).

The root body size is 17px at 720px and up, and 16px below.

### 1.3 Spacing

Tailwind v4's 4px-based spacing (`--spacing: 0.25rem`) covers every value. These values are used:

`2, 4, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 54, 56, 60, 72, 80` px.

Named uses:

| Use | Value |
|---|---|
| Page side padding | 16px, or the safe-area inset if that is larger |
| Gap between sections in main | 72px |
| Main padding | 60px top below 1200px (56px at 1200px and up), 80px bottom. Below 1200px the exact value is `calc(max(16px, env(safe-area-inset-top)) + 44px)` (§2). |
| Rail-to-content column gap | 60px |
| Card padding | 28px (24px under 720px) |
| Gap between timeline items | 24px (20px under 720px) |
| Gap between project cards | 20px |
| Card text indent past the logo | 54px (40px logo + 14px gap), only at 720px and up |

### 1.4 Radii

| Token | Value | Use |
|---|---|---|
| `--radius-card` | 12px | Timeline cards, project cards, hero photo |
| `--radius-logo` | 8px | Company logo box |
| `--radius-focus` | 4px | Focus ring corners on every control that isn't round: text links (repo, project, footer, rail and name links), the skip link and the timeline summaries |
| `--radius-marker` | 2px | Rail marker |
| full | 50% | Timeline dots; the round controls (the hero icon links and the theme toggle) and their focus rings, which are circles (§8) |

### 1.5 Shadows

There are two, and no others:

| Token | Value | Use |
|---|---|---|
| (none, inline) | `0 0 0 5px color-mix(in srgb, var(--color-accent) 18%, transparent)` | The open timeline dot's ring (§1.1, §6.4) |
| `--shadow-card-hover` | `0 8px 24px -12px color-mix(in srgb, var(--color-charcoal) 35%, transparent)` | Project card on hover only (§6.5). Cards have no shadow at rest. |

Both are decorative. The project card hover shadow was added by owner decision (2026-10-16), replacing the earlier "no shadows except that ring" rule; §1.1 now lists both shadows.

**Dark:** the ring needs no change (it follows Accent). `--shadow-card-hover` is redefined under `html[data-theme="dark"]` with black in place of Charcoal, because Charcoal is light in dark, and at 75% instead of 35% so it still shows on the dark Paper (owner choice): `0 8px 24px -12px color-mix(in srgb, #000 75%, transparent)`. Light stays at 35% Charcoal.

### 1.6 Breakpoints

These replace Tailwind's defaults, so only three exist.

| Token | Min width | What changes |
|---|---|---|
| `--breakpoint-sm` | 600px (37.5rem) | Technologies grid goes from rows of 3/4/3 to 5 + 5. |
| `--breakpoint-md` | 720px (45rem) | Hero becomes two columns (text, then photo). Desktop type sizes apply. Card text indents past the logo. Card padding goes from 24 to 28. |
| `--breakpoint-xl` | 1200px (75rem) | The sticky left rail and the skip link appear. Below this width there is no nav at all. |

Naming: "mobile" means under 720px, "tablet" means 720 to 1199px, and "desktop" means 1200px and up.

---

## 2. Layout grid

- **`viewport-fit=cover` is required** in the viewport meta (in Next, `export const viewport: Viewport = { viewportFit: "cover" }` in `src/app/layout.tsx`). Without it, `env(safe-area-inset-*)` is 0 and every safe-area formula in this spec (§1.3, §2, §4.6, §6.6) does nothing.
- **Below 1200px:** one column, centered, max 1000px wide, with 16px side padding. There is no nav: main comes first and opens on the hero. Main is max 880px.
  - **Main top padding is `calc(max(16px, env(safe-area-inset-top)) + 44px)`, which is 60px** without a top inset (§1.3). It clears a band for the theme toggle in the top-right corner (§6.9), so the toggle never overlaps the hero.
  - **Theme toggle corner: the browser window's top-right corner** (owner choice), not the page column. The toggle is `position: absolute` against the page itself, the initial containing block, so no ancestor of it may be positioned (neither the page container nor `<main>`). It scrolls away; it is not fixed or sticky.
    - `top: calc(max(16px, env(safe-area-inset-top)) - 11px)` (5px without an inset).
    - `right: calc(max(16px, env(safe-area-inset-right)) - 11px)` (5px without an inset).
    - The 11px is (44 − 22) / 2, so the 22px glyph sits 16px (or the safe-area inset) from the top and right edges of the page, the same margin as the page padding. With a classic scrollbar, the right edge is the scrollbar's inner edge.
    - **No alignment with the photo is implied.** Main is capped at 880px inside the 1000px column, so from about 912px wide the photo's right edge moves in from the window edge (at 1120px, the photo is about 172px in while the glyph is 16px in, plus the scrollbar). Below about 912px the photo's edge and the glyph's edge are both 16px in.
    - Clearance: the 44px box ends at 49px; the hero starts at 60px, an 11px gap. The formula keeps the gap at 11px when there is a safe-area inset.
- **1200px and up:** main top padding stays 56px. The toggle sits in the rail instead (§6.6, §6.9).
- **1200px and up:** a two-column grid, `220px minmax(0, 1fr)`, with a 60px gap, max 1180px wide and centered. The rail is in column 1 and main in column 2, capped at 880px.
- **Alignment:** everything is left-aligned except the technology items (centered in their cells).
- **Line length:** at 17px, an 880px column runs about 95 characters. Long body text is capped so it stays readable:
  - About: max 68ch.
  - Highlights inside cards: the card is full width, and the 54px indent plus the 28px padding bring lines down to about 85 characters. That is slightly above the 80-character guideline. It is accepted to match the approved preview; see §13.

---

## 3. Section order and content hierarchy

**Order:** Hero, About, Technologies, Experience, Projects, Footer.

**Nav (1200px and up only):** About, Technologies, Experience, Projects. The hero is reached through the "Ryan Chen" name link. Below 1200px there is no nav; visitors scroll, and the footer's "Back to top" returns them to the hero.

**Theme toggle (§6.9):** at 1200px and up, in the rail on the name's row, at the right. Below 1200px, in the top-right corner of the browser window, above the hero (§2). It is not part of the nav list.

**Full name below 1200px:** the greeting uses the first name only. "Ryan Chen" then appears only in the footer and the page `<title>` (accepted by the owner).

**Section anchors:**

| Section | Anchor | Heading level |
|---|---|---|
| Top of page (`<main>`) | `#top` | |
| About | `#about` | h2 |
| Technologies | `#technologies` | h2 |
| Experience | `#experience` | h2 |
| Projects | `#projects` | h2 |

The hero greeting is the page's only h1.

**Above the fold:**
- **Desktop (1440 x 900):** the rail, the full hero (greeting, tagline, all five links, the photo at 280 x 350) and the About section. The Technologies heading starts near the bottom edge.
- **Tablet (768 x 1024):** with no header, the theme toggle in the top-right corner, then the full hero from 60px, About and most of Technologies.
- **Mobile (390 x 844):** with no header, the theme toggle in the top-right corner, then the page content starts 60px from the top: the photo (4:3), the greeting, the tagline and the row of five icon links. About starts just below the fold (28px lower than before the toggle).

**What a recruiter gets in 30 seconds:**
1. Name and role: the greeting and tagline.
2. How to reach Ryan and his resume: the five hero links.
3. Background: the About text.
4. Stack: Technologies.
5. Current role, already open: Scout.
6. The other roles, one click each.

---

## 4. Section layouts

### 4.1 Hero (`<header>` inside `<main>`)

- **Mobile (under 720px):** one column with a 24px gap.
  1. The photo comes first, at full width, 4:3.
  2. Then the text block: the greeting, the tagline and the link row, with 20px gaps.
- **Tablet and desktop (720px and up):** a two-column grid, `minmax(0, 1fr) 280px`, with a 40px gap, aligned to the top. Text on the left; the photo on the right at 4:5 (280 x 350).
- **Link row:** see §6.1.
- **Load motion:** the greeting and tagline blur in word by word, then the link row fades in. The photo stays static. See §7 rule 5.

### 4.2 About

- An h2 "About" at 15px/600 in Pebble.
- Below it, `basics.summary` at 16px/1.55, max 68ch, with 8px between heading and text.
- It sits directly under the hero, with the standard 72px section gap.
- It has no card and no border.

### 4.3 Technologies

- An h2 "Technologies", then a list of 10 items in data order.
- **600px and up (tablet and desktop):** 5 equal columns, which gives 2 rows of 5. Gaps are 28px between rows and 16px between columns.
- **Under 600px (mobile): rows of 3, 4 and 3**, in data order, on a 12-column grid.

  | Row | Items | Each spans |
  |---|---|---|
  | 1 | 1 to 3 (Java, Python, TypeScript) | 4 columns |
  | 2 | 4 to 7 (C++, HTML, CSS, SQL) | 3 columns |
  | 3 | 8 to 10 (React.js, Tailwind, Next.js) | 4 columns |

  - **Gaps:** 28px between rows and **no column gap**. The cell widths do the spacing; 11 gaps of 16px would squeeze the cells.
  - **Alignment:** each item is centered in its span. Rows 1 and 3 line up with each other, and row 2 sits offset between them in a regular pattern.
  - **Fit:** at 320px, the narrowest cell (a 3-column span) is 72px (3 of 12 columns of the 288px content width). Row 2 holds the short names (C++, HTML, CSS, SQL), and TypeScript sits in a wider 4-column span, so no name wraps.
  - **Ties to 10 items:** the spans are set by position (`nth-child`), so they only fit a list of exactly 10. If the curated list ever changes length, fall back to a plain 3-column grid until the layout is revisited. Frontend should leave a comment noting this.

### 4.4 Experience

- An h2 "Experience", then an ordered list (`<ol>`) of timeline cards.
- **Order:** newest end date first, with "Present" (null `endDate`) counting as newest. Today that gives Scout, Babel Street, Verisk, Ventus Health.
- See §6.4.

### 4.5 Projects

- An h2 "Projects", then an unordered list (`<ul>`) of three project cards in `resume.json` order: CodeStack, Fakebook Crawler, Hexagonal Reversi.
- The cards are stacked, with a 20px gap. There are no images.

### 4.6 Footer

- **Placement:** after `<main>`, in the same column. Use a real `<footer>` element outside `<main>`, so it is the page's contentinfo landmark (the preview put it inside main; see §13).
- **Content:** "© <year> Ryan Chen" on the left and "Back to top" on the right.
- **Style:** 1px Rule top border, padding 24px top and `max(32px, env(safe-area-inset-bottom))` bottom (32px without an inset). The copyright is 14px Pebble ("Footer text", §1.2); the link is styled per §6.8.
- **Layout:** a wrapping flex row with `justify-content: space-between`, `align-items: center` and `gap: 8px 16px`. On narrow screens, when it wraps, the link drops under the copyright, left-aligned.

---

## 5. Photo

- **Source:** `basics.image` (`src`, `alt` = "Ryan at the Golden Gate Bridge", approved). It points to `/hero.jpg`, a **pre-cropped copy** of `public/Professional.jpg` (owner choice, 2026-10-19): 1350 x 1688 (4:5), cut from the 2160 x 2880 original to the approved crop. Backend made the file. The original stays in `public/` as the source.
- **Frame (the box):** 4:5 at 280 x 350 at 720px and up; 4:3 at full column width under 720px. It has a 12px radius and `overflow: hidden`. No border, filter or tint.
- **Image inside the frame:**
  - `object-fit: cover`
  - `object-position: 50% 76%`. In the 4:5 frame it has no effect (the file is already 4:5). In the 4:3 frame it matches the old mobile framing pixel for pixel (Frontend, 2026-10-19): the hair about a third of the way down and the hoodie logo near the bottom edge. 78% sat the face too high.
  - **No transform** and no `transform-origin`. The zoom and the 8% upward shift are baked into the file.
  - **Use `fill`:** the `<img>` fills the frame at 100% x 100%, so the frame's aspect ratio sets its size. Do not give it explicit width and height attributes; the intrinsic height would override the frame's aspect ratio and render a tall sliver.
- **Rendering:** `next/image` with `fill`, `preload` (Next 16's name for `priority`) and `fetchPriority="high"`. It is the LCP element.
  - `sizes`: `(min-width: 720px) 280px, calc(100vw)`. With no scale, the frame width is the display width. Write `calc(100vw)`, not `100vw`: with a bare `100vw` Next drops the widths below 640 from `srcset`, so desktop would get a larger file than it needs. The 1350px file covers 280px at 3x and a 390px phone at 3x.
- **Approved crop (for reference):** the original framing was `object-position: 50% 75%`, `transform: translateY(-8%) scale(1.6)`, `transform-origin: 51% 60%` on `Professional.jpg`. The pre-crop was checked by eye against it at both aspect ratios (Design, 2026-10-19).
- **If `basics.image` is missing:** the hero is text only. The grid collapses to one column and no space is reserved.

---

## 6. Components

### 6.1 Hero link

There are five links in one matching style, in this order:

| # | Label | Icon | Target |
|---|---|---|---|
| 1 | Resume | `file-text` | `/resume.pdf`, new tab |
| 2 | Email | `mail` | `mailto:` + `basics.email` |
| 3 | LinkedIn | `brand-linkedin` | profile URL, new tab |
| 4 | GitHub | `brand-github` | profile URL, new tab |
| 5 | Instagram | `brand-instagram` | profile URL, new tab |

**The hero links are icon-only at every width.** The labels are visually hidden. There is no labeled mode (owner decision).

**Link icons: one outline style.** This applies to every icon inside a link: the five hero links, Scout's repo links and the project GitHub links.
- **Size:** a 24 x 24 `viewBox` in a **24px box for the hero links** and an **18px box for the labeled repo and project links** (§6.4, §6.5).
- **Stroke:** `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, plus `vector-effect: non-scaling-stroke` on every path. The stroke is then 2 screen pixels at both box sizes and at every optical scale.
- **Color:** the icon takes its color from the link, so it changes on hover along with the link.
- **Optical sizing:** each glyph is scaled about the center of its 24-unit box, so all five look the same size.
  - Apply it inside the SVG, for example a `<g transform="translate(12 12) scale(s) translate(-12 -12)">` around the paths. A group inside the SVG is fine; the "no wrapper" rule below is about elements around the `<svg>`.
  - **Tuned values** for the Tabler glyphs at 24px, confirmed by eye by Frontend and Design with the five side by side (Phase 4 step 2, 2026-10-18):

    | Icon | Scale |
    |---|---|
    | file-text | 0.95 |
    | mail | 1.00 |
    | linkedin | 0.90 |
    | github | 0.92 |
    | instagram | 0.90 |

  - LinkedIn and Instagram share the same rounded-square frame, so they share one value. The moon and sun in the theme toggle stay at 1.0 (§6.9).
  - **The GitHub scale is shared:** 0.92 also applies to the GitHub icon in Scout's repo links and in the project links.
- **No wrapper:** the `<svg>` is a **direct flex child of the `<a>`**, with no `<span>` or other element around it, and `flex: none`. A wrapper adds inline line-height and pushes the icon off-center, which is the bug the owner spotted.
- **Hidden from assistive technology:** `aria-hidden="true"` and `focusable="false"`.
- **No solid logos in links.** Solid brand logos look larger than outline glyphs at the same box size. The solid monochrome logos (Simple Icons and Devicon) belong only to the Technologies component (§6.3).

**Source: inline all five SVGs in the repo**, copied from **Tabler Icons** (outline set, `@tabler/icons` v3.49.0, MIT license). The files are `file-text`, `mail`, `brand-linkedin`, `brand-github` and `brand-instagram`, all checked as present.
- **Why Tabler:** Lucide removed its brand icons, so it can no longer supply LinkedIn, GitHub or Instagram. Tabler still has them, and its outline set uses the same 24px grid, 2px stroke and round caps and joins as Lucide.
- **One family:** take all five from Tabler, including `file-text` and `mail`, so the drawing style is consistent. The preview's Lucide-style glyphs are close, but not identical.
- **Delivery:** copy the five paths into a small local icon component or a set of SVG files. Do not add the full package as a dependency just for five icons, and do not load them from a CDN.

**The hero row (every width):**
- **Layout:** one row of five links, `display: flex`, `flex-wrap: nowrap`, with an 8px gap.
  - Width: five 44px targets plus four 8px gaps is 252px. That fits the narrowest supported screen (288px of content at 320px), and every wider column.
- **Pulled left by 10px:** the row has `margin-left: -10px`, which is (44 − 24) / 2.
  - This lines up the first icon's glyph box with the left edge of the greeting and tagline above it.
  - Every target stays a full 44px, and the focus ring may extend into the page padding. That is fine, because the page padding is at least 16px.
- **Each link:**
  - a 44 x 44px box, `inline-flex`, centered both ways, holding the **24px** icon, with `border-radius: 50%`;
  - **at rest, no background, border, fill or box** around the icon (a boxed version was tried and dropped);
  - **no underline** (`text-decoration: none`).
- **Label:** it stays in the DOM, visually hidden with the standard sr-only pattern (`position: absolute`, 1 x 1px, clipped, `white-space: nowrap`, `overflow: hidden`). The link keeps its accessible name.
- **Hover: Soft circle** (owner choice, 2026-10-16). This replaces the earlier -6° tilt; **there is no tilt and no movement of any kind.**
  - The link gets the background `color-mix(in srgb, var(--color-accent) 10%, transparent)`, a 44px circle (about `#EFE0DC` over Paper).
  - The icon turns Accent.
  - Timing: the color takes 160ms with `cubic-bezier(0.2, 0, 0, 1)`; the background takes 160ms ease.
  - Wrap the hover rules (circle and color) in `@media (hover: hover)`. Touch browsers can leave a "sticky" hover after a tap, which would leave a circle behind.
  - The circle is fully inside the 44px box. With the row's -10px pull, the first circle reaches 10px into the page padding (at least 16px), which is fine.
- **Pressed (`:active`):** the icon turns Accent deep. The circle stays while the pointer is down.
- **Focus:** the standard ring (§8): 2px Charcoal, 2px offset, drawn around the 44px box. It is a **circle** (52px across), following the link's `border-radius: 50%` and its hover circle, not the 4px-radius ring. Keyboard `:focus-visible` gets the ring only, with no circle; the ring is the focus cue.
- **Reduced motion:** nothing changes. The hover has no movement, so the circle, the color change and their 160ms fades all stay.
- **No tooltip.** Do not add a `title` attribute or a custom tooltip.
  - `title` doesn't show on touch screens and isn't announced reliably.
  - The five glyphs are widely recognized, and screen readers get the hidden labels.

**Repo and project links keep their labels at every width.** This covers Scout's repo links and the project GitHub links. Three identical GitHub icons would be meaningless without labels.
- **Anatomy:** an `inline-flex` row, centered vertically: the 18px outline icon, an 8px gap, then the label (15px/600, Charcoal). Minimum height 44px.
- **Underline:** 1px Accent, `text-underline-offset: 4px`.
- **Hover:** the label and icon turn Accent, and the underline thickens to 2px, over 120ms.
- **Pressed:** Accent deep.

**Accessible names (hero links):**
- The name is the hidden label: "Resume", "Email", "LinkedIn", "GitHub" or "Instagram".
- Append visually hidden hints:
  - Resume: " (PDF, opens in a new tab)".
  - LinkedIn, GitHub and Instagram: " (opens in a new tab)".
- Email: the name is "Email".
- Never use `aria-label` in place of the label text. Keeping one source of the name avoids the two drifting apart.
- External links use `rel="noopener"`.

**No email address on screen** (an owner decision). The tradeoff: visitors with no mail client set up cannot see the address. It is still in the resume PDF.

### 6.2 About

See §4.2. The section has `aria-labelledby` pointing at its h2.

### 6.3 Technology item

- **Anatomy:** a list item in a centered column: a 36 x 36px logo above the name, with a 10px gap. The name is 15px/600 Charcoal and centered.
- **Logos:** monochrome Charcoal (`fill: currentColor`), `aria-hidden`. The visible name carries the meaning.
- **Not interactive:** it stays a plain, non-focusable list item. No link, no box, no `tabindex`, `cursor: default`, so there is no keyboard state.
- **Hover: Lift** (owner choice, 2026-10-16), only under `@media (hover: hover)`:
  - The item rises `translateY(-4px)` over 180ms with `cubic-bezier(0.2, 0, 0, 1)`.
  - The logo and the name both turn Accent over 180ms ease (owner decision, 2026-10-18: the whole item goes Accent, as in the demo). Set `color` on the inner wrapper; the logo follows through `currentColor`.
  - **Detect the hover on the `<li>` but move its contents** (one inner wrapper around the logo and the name). The hover area then stays still, so a pointer at the item's bottom edge doesn't flicker the hover on and off.
  - Transform only, so the grid doesn't shift.
- **Reduced motion:** no movement; the logo and name color change stays.
- **Contrast:** Accent on Paper is 4.9:1 in light and 5.5:1 in dark. That passes the 4.5:1 needed for the 15px/600 name (not large text) and the 3:1 non-text minimum for the logo.
- **Tradeoff:** a hover response on a non-interactive item can suggest it does something. The default cursor and the lack of any focus stop keep it from reading as a control.
- **Logo source:** Simple Icons v16.35.0 for most logos, Devicon v2.16.0 (MIT) for Java and CSS, and Lucide for SQL, each pinned. Inline the SVG; no CDN at runtime and no icon font.

| Name | Icon |
|---|---|
| Java | Devicon `java-plain` (the cup), plus a 0.5px `currentColor` stroke |
| Python | `python` |
| TypeScript | `typescript` |
| C++ | `cplusplus` |
| HTML | `html5` |
| CSS | Devicon `css3-plain` (the shield) |
| SQL | generic database icon, Lucide `database` (decided) |
| React.js | `react` |
| Tailwind | `tailwindcss` |
| Next.js | `nextdotjs` |

Unmarked slugs are Simple Icons.

**Build notes:**
- **Java:** Devicon `java-plain`, the coffee cup (owner left the choice to the orchestrator, 2026-10-18). It is filled, widely recognized as Java, and from the same set as the CSS shield. The data key is `java`. The visible name stays "Java".
  - **Stroke (owner decision, 2026-10-19):** the cup alone reads light, so its path gets `stroke="currentColor"`, `stroke-width="1.78"` and `stroke-linejoin="round"`. That is 0.5px at the 36px render (0.5 × 128 / 36 path units). It works with either rendering below, since the stroke scales with the path. Do not use `non-scaling-stroke`. Only the Java path gets a stroke; CSS and the other logos stay fill-only. The stroke follows the hover Accent with the fill through `currentColor`, so contrast is unchanged (§9.1).
- **CSS:** Devicon `css3-plain`, so it pairs with the HTML5 shield (owner decision, 2026-10-18). Simple Icons' `css` tile did not pair with it. The data key stays `css`.
- **Devicon paths:** both are one path in a 128-unit box (`viewBox="0 0 128 128"`). Remove the source's brand `fill` and use `fill="currentColor"`, like the Simple Icons logos. Render them from the 128-unit box: either give the `<svg>` `viewBox="0 0 128 128"`, or, inside the shared 24-unit `TechIcon`, wrap the path in `<g transform="scale(0.1875)">`. Note the source and version in a code comment.
- **SQL:** Lucide is a stroke icon. Render it at 36px with stroke width 2 in Lucide's 24-unit grid, which is 3px at 36px. Do not use `non-scaling-stroke` here (unlike the link icons in §6.1), so its visual weight stays close to the filled logos.

### 6.4 Timeline accordion card

**Structure (per entry):**
```
<li class="entry">                      position: relative
  <span class="dot" aria-hidden>        timeline dot
  <details name="experience" [open]>    the card
    <summary>
      [logo 40px] Company            Dates   [chevron]
                  Title
    </summary>
    <ul> highlights </ul>
    [repo links row, Scout only]
  </details>
</li>
```

**List:**
- `<ol>`, no list style, a grid with a 24px gap (20px under 720px).
- Left padding 48px (36px under 720px) makes room for the line and the dots.

**Card (the `<details>`):**
- White fill, 1px Rule border, 12px radius.
- 28px padding (24px under 720px).
- Every card uses this one style. There is no featured or compact variant.

**Summary (collapsed view):**
- **Header row:** a flex row, centered vertically, that wraps, with `gap: 2px 16px` (2px between wrapped lines, 16px between items).
  - On the left: the company logo box (40 x 40, 8px radius, 14px gap), then the company name (21px/600; 18px under 720px).
  - On the right: one non-wrapping group, pushed over with `margin-left: auto`, holding the dates in meta style (Pebble 15px), from `dateLabel`, then the chevron 20px after the dates.
- **Second line:** the title in meta style, 2px below. It is indented 54px at 720px and up so it lines up under the company name; no indent below 720px.
- **Wrapping:** if the header row wraps on narrow screens, the dates and chevron drop together to the next line, under the company name and right-aligned. The chevron always stays at the end of the row.
- **Chevron:**
  - A 9 x 9px corner drawn with 2px Pebble right and bottom borders.
  - Closed: rotated 45° and nudged up 3px, so it points down.
  - Open: rotated -135° and nudged up 1px, so it points up.
  - The rotation takes 200ms with `cubic-bezier(0.2, 0, 0, 1)`.
- **Default marker:** hide it (`list-style: none`, and `::-webkit-details-marker { display: none }`).
- **Cursor:** pointer.
- **Hover:** the company name turns Accent (120ms).
- **No headings inside `<summary>`.** The company name is plain text, not an h3 (§9.3).

**Expanded content:**
- **Highlights:** a list 16px below the summary, with a 20px bullet indent and 8px between items. Text is 17px/1.6 (16px under 720px). Bullet markers are Pebble. Indented 54px at 720px and up; no indent below.
- **Scout's repo links:** 12px below the highlights, a wrapping row with `gap: 0 20px` (20px between links; no extra space between wrapped lines, since the 44px link height already separates them). They use the labeled link style (§6.1, "Repo and project links") with the 18px outline `brand-github` icon (§6.1 link icons), labels from `links[].label`, and a new tab. Same 54px indent.

**Company logo (box):**
- 40 x 40, 8px radius, a **1px Rule border**, `object-fit: contain`. The files are the owner-supplied **100 x 100 JPGs in `public/`** (§11).
- Decorative: `alt=""`, because the company name sits right next to it.
- **If a company has no logo:** the box is omitted for that card and its 54px indent drops to 0. The owner plans to supply all four, so this is a fallback only.

**Timeline dot:**
- 12px circle, Charcoal, positioned in the list's left padding.
- Its center lines up with the logo's center: 49px from the card's outer top edge at 720px and up (1px border + 28px padding + 20px), 45px below 720px (1px + 24px + 20px).
- Positioned at `left: -48px` and `top: 43px` (mobile: `-36px` and `39px`).- **Open card's dot:** Accent fill plus a 5px soft ring (§1.1). Fill and ring change over 200ms. Use `.entry:has(> details[open]) .dot` or an equivalent class.
- **Only the open card's dot is Accent.** All other dots stay Charcoal.
- **Opening is click-only.** Scrolling never opens, closes or highlights a card. The only scroll-driven behavior on the timeline is the one-time reveal (§7).

**Timeline line:**
- 2px wide, Rule color, decorative. It runs through the dot centers (x = 6px inside the list padding, so it is centered on the dot).
- It must run **from the first dot to the last dot exactly**, whichever cards are open.
- Draw it as a connector on each entry except the last: from that entry's dot center down to the next entry's dot center. It starts at `top: 49px` (45px on mobile) with `height: calc(100% + 24px)` (the entry's height + the list gap; `+ 20px` on mobile).
- The preview's single line with a fixed `bottom: 48px` overshoots past the last dot when the last card is open (§13).

**Behavior:**
- **One card open at a time:** every `<details>` shares `name="experience"`. The browser closes the others when one opens.
  - Fallback: in browsers without exclusive-accordion support, several cards can be open at once. That is acceptable.
- **On load:** the first card in sorted order (the current or most recent role; Scout today) has `open`. Frontend sets this from the sort result, not from a hardcoded company.
- **Expanding the content: Animated height** (owner choice, 2026-10-16). CSS only, on native `<details name="experience">`; no Radix, no `framer-motion`, no JS height measuring.
  - All of this sits inside `@media (prefers-reduced-motion: no-preference)`:
    ```css
    :root { interpolate-size: allow-keywords; }
    details::details-content {
      block-size: 0;
      overflow: clip;
      overflow-clip-margin: 4px;
      transition: block-size 320ms cubic-bezier(0.2, 0, 0, 1),
                  content-visibility 320ms allow-discrete;
    }
    details[open]::details-content { block-size: auto; }
    ```
  - **`overflow-clip-margin: 4px`** keeps the repo links' focus ring (2px offset + 2px width) visible at the content box edges. During the 320ms animation up to 4px of content can show past the clip edge; that stays inside the 24/28px card padding, so it is accepted.
  - Opening and closing both animate, including the card the browser closes when another opens.
  - **Keep the 16px space above the highlights inside the clipped box.** Make it the list's `padding-top`, not `margin-top`. `overflow: clip` does not stop margin collapsing, so a margin could leak outside the clip and jump at the end of the close.
  - **Fallback:** browsers without `::details-content` or `interpolate-size` snap open and closed (native behavior). Acceptable.
  - **Reduced motion:** none of the rules above apply, so cards snap. The chevron and dot are instant too (§7).
  - **Timeline line:** the connectors must be CSS sized from the entry (for example `height: calc(100% + gap)`), so they follow the height every frame. No JS measuring.
- **Settle timing** (for the scroll correction and the rail update). The card above now closes over 320ms, so layout keeps changing after `toggle` fires.
  - **The animation runs** when all three match: `prefers-reduced-motion: no-preference`, `CSS.supports("selector(::details-content)")` and `CSS.supports("interpolate-size", "allow-keywords")`. Then the work waits **320ms, then one `requestAnimationFrame`**.
  - **Otherwise** it runs on the next frame after `toggle`.
  - Use one shared timer. A new `toggle` clears the pending one, so a quick second click only runs the work once, after the last change.
  - Why a timer and not `transitionend`: `transitionend` never fires when nothing transitions (fallback browsers, reduced motion, or a transition interrupted by another click), so it would need the timer as a backup anyway. The timer alone covers every case.
- **Scroll correction:** when a card opens and a card above it closes, the content above shrinks and the summary just clicked can move out of view.
  - On the opening card's `toggle` (`newState === "open"`), after the settle timing above: if its summary is above the viewport top, scroll it into view (`block: "start"`, respecting `scroll-padding-top: 24px`).
  - Scrolling is smooth only under `prefers-reduced-motion: no-preference`; otherwise it is instant.
  - Running it after the close finishes means the summary ends in view at its final position. Scrolling earlier would aim at a position that keeps moving for 320ms.
  - The preview does not do this (§13).
- **Rail update:** after the same settle timing, the timeline script dispatches a `timeline-settled` event on `document`; the rail's active-section update (§6.6) listens for it, not for the raw `toggle`. Scroll events during the transition update the rail as usual.
- **Scroll reveal:** see §7.

### 6.5 Project card

**Structure:** `<li><article>`. The card is White, with a 1px Rule border, a 12px radius, and 28px padding (24px under 720px).

**Contents, top to bottom:**
1. **Header row:**
   - The project name as an h3, 21px/600 (18px under 720px).
   - The date on the right, in meta style, from `dateLabel`.
   - The row wraps, with `align-items: baseline` and gaps of 2px vertically and 16px horizontally. Baseline seats the 15px date on the 21px name's text line. When it wraps, the date drops under the name, left-aligned.
2. **Technologies:** `projects[].technologies` joined with ", " in meta style, 2px below. Plain text, not chips.
3. **Highlights:** the same list style as the timeline cards, 16px below. No indent, since there is no logo.
4. **Link row:** 12px below. A GitHub link in the labeled link style (§6.1, "Repo and project links"), with the 18px outline `brand-github` icon (§6.1 link icons), the label from `links[].label`, and a new tab.

**Rules:**
- The card itself is not clickable; only the link is.
- **Hover: Hover lift** (owner choice, 2026-10-16), only under `@media (hover: hover)`:
  - The border goes from Rule to Pebble.
  - The card moves `translateY(-3px)` and gets `--shadow-card-hover` (§1.5).
  - Timing: 180ms. The transform uses `cubic-bezier(0.2, 0, 0, 1)`; `border-color` and `box-shadow` use ease (Design's choice of curve; the owner set the duration).
  - **Detect the hover on the `<li>` and move the `<article>`,** so the hover area stays still and the bottom edge doesn't flicker.
  - Transform only for movement, so the list doesn't shift.
- **Reduced motion:** the border and shadow change stay (180ms ease); there is no movement.
- **Keeping it from reading as a link.** A hover cue on a non-clickable card can suggest the whole card is clickable. These rules reduce that without making it a link:
  - The card keeps `cursor: default`. Only the GitHub link shows the pointer.
  - No stretched link, no `::after` overlay, no `onclick` and no `tabindex` on the card.
  - The project name stays Charcoal with no underline, and does not change on card hover.
  - The GitHub link keeps its underline at rest and its own hover (Accent, 2px underline), so it is the only part that responds like a link.
  - The card does not lift on `:focus-within`. Keyboard users see the link's focus ring only.
- All three cards are identical. Heights differ only because the text differs.
- There is no image slot.

### 6.6 Rail nav (1200px and up)

**Container:**
- A `<nav aria-label="Sections">` in grid column 1.
- `position: sticky`, `top: 0` (plus the safe-area inset), aligned to the start.
- Padding 56px top and bottom, with a 20px gap between the name and the list.

**Name:** "Ryan Chen" (`basics.name`), 24px/600, Charcoal, no underline. It links to `#top`.

**List:**
- A vertical list, indented 15px to make room for the marker.
- Each link is 20px, Pebble, no underline, block-level, with a **minimum height of 44px** (8px vertical padding with the 29px line).
- The current link is Charcoal and gets `aria-current="true"` (`"location"` is also acceptable). All other links get no `aria-current`.

**Marker:**
- A 3 x 32px Accent bar with a 2px radius, `aria-hidden`.
- It is absolutely positioned at the list's left edge and moved with `transform: translateY(...)` so it is centered on the current link.
- It moves over 200ms with `cubic-bezier(0.2, 0, 0, 1)`.

**Hover:** non-current links turn Charcoal (120ms).

**Which section is current:**
- The current section is the last one whose top is at or above 35% of the viewport height.
- If the page is scrolled to the bottom (within 4px), the last section (Projects) is current.
- Before the first section reaches the 35% line, the first link (About) is current.
- The check runs on scroll (a passive listener), on resize, and after every experience toggle settles: on the `timeline-settled` event that the timeline script dispatches on `document` (320ms plus one frame after the `toggle`, or the next frame without the height animation; §6.4 settle timing). It does not run on the raw `toggle`.
- **Placing the marker on attach:** on load, and when the window widens past 1200px, the marker is placed at the current link without the slide. It slides only when the current section changes (§7).
- **The script runs only while the rail is shown.**
  - Gate it with `matchMedia("(min-width: 1200px)")`.
  - Attach the scroll, resize and `timeline-settled` listeners only while that query matches.
  - Detach them when it stops matching (listen for the query's `change` event).
  - Below 1200px, no scroll tracking runs at all.

**Below 1200px the rail is not rendered.** Use `display: none`, so it also leaves the accessibility tree. There is **no header or nav of any kind** on phones and tablets: no top bar and no menu. The page opens straight on the hero and visitors scroll (owner decision).

### 6.7 Skip link (1200px and up only)

- **On desktop** it is the first focusable element: "Skip to content", linking to `#top` (`<main>`).
  - It is visually hidden until focused. When focused, it appears at the top left: White background, Charcoal text, 12px horizontal and 8px vertical padding, the focus ring, at least 44px tall.
  - **Type:** the §6.1 labeled-link style without an icon: 15px/600, Charcoal, 1px Accent underline at a 4px offset; on hover, Accent and a 2px underline. Contrast on White: Charcoal 16.1:1 light / 13.3:1 dark; Accent underline 5.5:1 / 5.0:1 (§9.1).
  - **Focused position:** `position: fixed`, `top: max(16px, env(safe-area-inset-top))`, `left: max(16px, env(safe-area-inset-left))`, above the rail (`z-index: 10`), so it shows from any scroll position.
  - **Accepted overlap:** at exactly 1200px, the focused link overlaps the rail's name row by 1px. It is the topmost, opaque layer, so the focused element is never obscured (WCAG 2.4.11), and it lasts only while focused. At wider screens there is no overlap.
  - It exists because the rail's five links (the name and four sections) come before the content.
- **Below 1200px** it is not rendered (`display: none`). With no nav, `<main>` is already the first content, so a skip link would skip nothing.

### 6.8 Footer

See §4.6.
- **Year:** rendered at build time. It updates on the next deploy, which is acceptable for a static site.
- **"Back to top":** links to `#top`. It uses the §6.1 labeled-link style ("Repo and project links") without an icon, at 14px: 600, Charcoal, 1px Accent underline at a 4px offset; on hover, Accent and a 2px underline. 44px minimum height.

### 6.9 Theme toggle

Owner decision, 2026-10-16. One button that switches between light and dark. There is no "System" option (the owner turned it down).

**Element:**
- A real `<button type="button">` with `aria-pressed="true"` in dark and `"false"` in light.
- **Accessible name:** a visually hidden label "Dark mode" inside the button (the sr-only pattern from §6.1). No `aria-label`, per the naming rule in §6.1. Screen readers announce "Dark mode, toggle button, pressed / not pressed".
- No `title` and no tooltip (§6.1).

**Look:**
- A 44 x 44px box, `inline-flex`, centered both ways, `border-radius: 50%`. At rest: no background, border or box.
- **Icon:** Tabler outline (v3.49.0, MIT, inlined like §6.1). **`moon` in light** (it switches to dark) and **`sun` in dark**. 22px box, 24 viewBox, and the same stroke rules as §6.1 link icons: `currentColor`, 2px with `vector-effect: non-scaling-stroke`, round caps and joins, a direct flex child of the button, `flex: none`, `aria-hidden="true"`, `focusable="false"`. Optical scale 1.0 for both (confirmed by eye in Phase 4 step 2).
- **Icon swap without JS state:** render both SVGs and show one with CSS, keyed on `html[data-theme="dark"]`. The server HTML is then the same for both themes, so there is no hydration mismatch and the right icon shows from the first paint.
- **Color:** Charcoal at rest.
- **Hover** (under `@media (hover: hover)`): the soft circle (10% Accent, §1.1) and an Accent icon, the same timing as the hero links (color 160ms `cubic-bezier(0.2, 0, 0, 1)`, background 160ms ease).
- **Pressed (`:active`):** Accent deep icon; the circle stays while the pointer is down.
- **Focus:** the standard ring (§8) around the 44px box, as a **circle** (52px across) that follows the button's `border-radius: 50%`, like the hero links (§6.1). `:focus-visible` gets the ring only, no hover circle.

**Placement:**
- **1200px and up:** inside the rail `<nav>`, on the same row as "Ryan Chen", at the right. The row is a flex row with `justify-content: space-between` and `align-items: center`; the name link keeps its 44px minimum height, so the row is 44px. The toggle sticks with the rail.
- **Below 1200px:** the top-right corner of the browser window, `position: absolute` against the page (no positioned ancestor), scrolling away with the page. The offsets, safe-area insets and the 60px main top padding that keeps it clear of the hero are in §2.
  - **Mobile:** the photo is first and full width. It starts at 60px, below the toggle's box (5 to 49px), so the toggle never sits on the photo.
  - **Tablet:** the photo is top right, starting at 60px, so the toggle sits above it with at least an 11px gap. Their right edges are not aligned: from about 912px wide the photo sits further in (§2).
  - The toggle never sits on the photo, so its contrast is always measured against Paper.
- **Two instances, one at a time.** The rail is `display: none` below 1200px, so the rail toggle can't move to the corner. Render the component twice, in the rail and in the corner. Each is `display: none` outside its range, so only one is ever focusable or in the accessibility tree. One script updates `aria-pressed` on both.
- **DOM position below 1200px:** the first child of `<main>`, before the hero `<header>`, so it is inside a landmark. Neither `<main>` nor the page container may be positioned, so the toggle is placed against the page edge (§2).
- **Without JS:** hide both instances (`html:not([data-theme]) .theme-toggle { display: none }`). The inline script (below) always sets `data-theme`, so this only hides a button that could do nothing.

**Behavior:**
- **State lives on `<html>`:** `data-theme="light"` or `data-theme="dark"`. The dark tokens are scoped to `html[data-theme="dark"]` (§1.1, §12).
- **Stored choice:** `localStorage` key `theme`, value `"light"` or `"dark"`. A click flips `data-theme`, writes the key and updates `aria-pressed`. If `localStorage` throws (blocked storage), the switch still works for the visit and is not remembered.
- **First visit: always light** (owner choice). With no stored key, the page is light. The operating-system color setting is not read. Dark applies only after a click; the stored choice then wins on every later visit.
- **No flash of the wrong theme:** a small inline `<script>` in `<head>` (not deferred, not `next/script` with a lazy strategy) reads the key (inside `try`) and sets `data-theme` to `"dark"` if the key is `"dark"`, otherwise `"light"`, before first paint. It is a few lines, blocking, with no network request. `<html>` gets `suppressHydrationWarning`, because the attribute is added before React hydrates.
- **`aria-pressed` after hydration:** the toggle renders `aria-pressed="false"` on the server and sets the real value from `document.documentElement.dataset.theme` after mount, so the first client render matches the server.
- **Color fade on switch:** 240ms, `ease`, on `background-color`, `color`, `border-color`, `text-decoration-color` and `box-shadow` only. `text-decoration-color` is included as a color, so the Accent underlines change with the text rather than snapping ahead of it.
  - Apply it **only during the switch:** on click, add a class to `<html>` that sets this transition on every element and on its `::before` and `::after` (so colors drawn by pseudo-elements, such as timeline dots or lines, fade too), flip the theme, and remove the class 240ms later (one timer, reset on a quick second click). There is no fade on page load.
  - While the class is on, it replaces element transitions for those 240ms. That is fine, because nothing else moves during a theme switch.
  - **Reduced motion:** the class is never added; the switch is instant.
  - The photo and company logos don't change, so they don't fade.

---

## 7. Motion

There are two ambient motions (the hero load and the timeline reveal), plus state changes and small hover feedback.

| Motion | Trigger | Properties | Duration and easing | Reduced motion |
|---|---|---|---|---|
| Hero load | Page load; plays once | Greeting and tagline words: opacity 0 to 1, `filter: blur(10px)` to none, translateY 4px to 0. Link row: opacity 0 to 1. Photo: none | Words: 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, delay = word index × 45ms (index runs on from the greeting into the tagline). Link row: 500ms, ease, 700ms delay | Not declared; everything is static at its resting state |
| Timeline reveal | A timeline entry that was below the viewport at load scrolls 15% into view; it plays once per entry | opacity 0 to 1, translateY 12px to 0 | 320ms, `cubic-bezier(0.22, 1, 0.36, 1)` | Never applied; cards are always visible |
| Rail marker slide | The current section changes (not on load or when widening past 1200px, where it is placed without sliding; §6.6) | transform | 200ms, `cubic-bezier(0.2, 0, 0, 1)` | Jumps instantly |
| Chevron rotate | A card opens or closes | transform | 200ms, `cubic-bezier(0.2, 0, 0, 1)` | Instant |
| Open-dot color and ring | A card opens or closes | background-color, box-shadow | 200ms, ease | Instant |
| Card height | A timeline card opens or closes | `::details-content` block-size (to and from `auto`), content-visibility (discrete) | 320ms, `cubic-bezier(0.2, 0, 0, 1)` | Not declared; snaps (native) |
| Hero link soft circle | pointer hover on a hero link (`hover: hover`) | background (10% Accent circle); icon color | Color 160ms, `cubic-bezier(0.2, 0, 0, 1)`; background 160ms, ease | Kept in full (no movement) |
| Technology lift | pointer hover on a technology item (`hover: hover`) | transform `translateY(-4px)` on the item's contents; logo and name color | Transform 180ms, `cubic-bezier(0.2, 0, 0, 1)`; color 180ms, ease | No movement; logo and name color only |
| Project card lift | pointer hover on a project card (`hover: hover`) | transform `translateY(-3px)` on the article; border-color; box-shadow | Transform 180ms, `cubic-bezier(0.2, 0, 0, 1)`; border and shadow 180ms, ease | No movement; border and shadow kept |
| Labeled link hover | hover | color, text-decoration-thickness | 120ms, ease | Kept (color only, no movement) |
| Summary and rail hover | hover | color | 120ms, ease | Kept |
| Theme toggle hover | pointer hover on the toggle (`hover: hover`) | background (10% Accent circle); icon color | Same as the hero link soft circle | Kept in full (no movement) |
| Theme color fade | A click on the theme toggle; only during the switch (§6.9) | background-color, color, border-color, text-decoration-color, box-shadow | 240ms, ease; the class is removed after 240ms | Never applied; the switch is instant |
| Anchor jumps | nav or footer click | scroll | browser smooth scroll | `scroll-behavior: auto` |

**Rules for the timeline reveal** (these protect content and Lighthouse):
1. In CSS, every entry is visible by default.
2. On load, and only if `prefers-reduced-motion: no-preference` matches, a script adds the hidden starting state to entries whose top is below the viewport. Entries already in view never animate.
3. An IntersectionObserver (threshold 0.15) reveals each entry once and then stops observing it.
4. Only `opacity` and `transform` animate, so there is no layout shift.
5. **Hero load animation: Blur-in words** (owner choice, 2026-10-16). This supersedes the earlier rule "nothing in the hero animates on load". It is CSS only, plays once on load, and needs no JS.
   - **Final values** (the owner's demo values, kept unchanged because they are what the owner approved):
     - Each word of the greeting (h1) and of the tagline animates from `opacity: 0; filter: blur(10px); transform: translateY(4px)` to its resting state.
     - 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, delay = word index × 45ms.
     - The index runs on from the greeting into the tagline. With today's text: greeting words 0 to 2, tagline words 3 to 14. The last word starts at 630ms and ends at about 1330ms.
     - The hero link row fades in, opacity only, 500ms ease, 700ms delay (done at 1200ms).
     - The photo does not animate. It is the LCP element.
   - **Resting CSS is the final state.** The keyframes declare only the `from` state, and the animation uses `animation-fill-mode: backwards` with one iteration. After it ends, no `filter`, `transform` or `opacity` is left on the words, so the text renders crisp. Do not use `forwards` or `both`, and do not add `will-change`.
   - **Only under `prefers-reduced-motion: no-preference`.** Every `animation` declaration sits inside that media query. Under `reduce`, or in a browser without CSS animations, the hero is fully visible from the first paint. Without JS it still plays, because it is CSS only, and the content is never hidden at rest.
   - **No CLS.** Only `opacity`, `filter` and `transform` animate, none of which affect layout. The blur halo paints outside the word boxes but does not move anything; no hero ancestor may set `overflow: hidden` (only the photo frame does).
   - **Word spans, built from `resume.json`.** The hero component splits `basics.greeting` and `basics.tagline` at build time (a server component, splitting on whitespace). Nothing is hardcoded.
     - Each word is an `inline-block` span. Punctuation stays with its word ("Hello,", "I'm", "problem.").
     - The spaces between words are plain text nodes between the spans, not inside them, so lines still break at spaces.
     - `display: inline-block` applies at every motion setting, not only inside the media query, so line breaks are identical with and without reduced motion.
     - Each span gets its index as an inline custom property (`style="--i: 4"`), and the delay is `calc(var(--i) * 45ms)`. The tagline's first index is the greeting's word count.
     - Frontend checks that the split greeting and tagline wrap exactly like the unsplit text (with `text-wrap: balance`) at 320, 390, 720 and 1200px.
   - **Accessible text stays one string.** In both the h1 and the tagline `<p>`:
     - one visually hidden copy of the full string (the sr-only pattern from §6.1, plus `user-select: none` so a copy of the hero is not doubled);
     - then one `aria-hidden="true"` wrapper holding the word spans.
     - The h1's accessible name is then "Hello, I'm Ryan." read once, and the tagline is read as one sentence. Both strings come from `resume.json`, so the copy and the spans cannot drift apart. No `aria-label`.
   - **Tradeoffs (raised by Design, accepted by the owner):**
     - `filter: blur()` is heavier than opacity and transform. Chromium composites it; Safari and Firefox may repaint the words each frame. The cost is bounded: 15 short words, one play, at most about 1.3s.
     - Per-word spans add markup and need the hidden-copy pattern above. Find-in-page may match the hidden copy as well as the visible words, and crawlers see the text twice. Both are minor.
     - Text is not fully readable until about 1.3s. The greeting (the name) is fully in by about 790ms.
   - **Hero link row.** The fade runs on the link row container, opacity only. If focus enters the row before the fade ends (`.row:focus-within`), set `animation: none` on the row, so a keyboard user never focuses an invisible link.
   - **Timeline reveal.** The two never play on the same element. The hero plays on load; the reveal applies only to entries below the viewport at load (rule 2) and plays on scroll. They share the same curve, `cubic-bezier(0.22, 1, 0.36, 1)`, so they read as one family.
   - **Check:** Frontend confirms in Lighthouse that the LCP element is still the photo on mobile and desktop and that CLS is 0.
6. Without JS, every entry is visible.

**Other rules:**
- Smooth scrolling (`scroll-behavior: smooth` on `html`) applies only under `prefers-reduced-motion: no-preference`.
- `scroll-padding-top: 24px`.
- **Hover movement: only the technology lift (§6.3) and the project card lift (§6.5).** The hero links have no tilt and no movement (§6.1).
  - Both lifts are transform-only and move the element's contents, not the hovered `<li>`, so nothing shifts and the hover doesn't flicker.
  - Both sit under `@media (hover: hover)`.
  - Under reduced motion there is no transform: either set `transform: none` under `prefers-reduced-motion: reduce`, or declare the transform only under `prefers-reduced-motion: no-preference`. Their color, border and shadow changes remain.
  - Neither element is focusable, so neither has a keyboard state.
- **The only movement on expand is the card height** (§6.4), plus the chevron and dot. It applies only under `prefers-reduced-motion: no-preference`.
- No other load, scroll or hover animations. The hero load (rule 5) is the only load animation. The photo has no motion.
- **Tradeoff (accepted by the owner):** hover responses on the technology items and the project cards add hover feedback in two more places, and both are non-interactive. §6.3 and §6.5 list what keeps them from reading as controls.

---

## 8. Hover and focus rules

- **Focus:** every focusable element shows a 2px Charcoal outline with a 2px offset on `:focus-visible`. This includes links, summaries, the theme toggle, and (at 1200px and up) the skip link and rail links. Never remove the outline without replacing it.
  - **The ring follows the control's shape** (owner decision, 2026-10-18). Round controls (the 44px hero icon links and the theme toggle, both `border-radius: 50%`) get a **circular** ring, 52px across. Every other control (text links, the skip link, the timeline summaries) gets **4px** rounded corners (`--radius-focus`).
  - Browsers draw `outline` along the element's `border-radius`, so the round controls need no extra rule. Color, width and offset are the same for both shapes, so the contrast below is unchanged.
  - **In dark the ring is light** (`#EDEAE6`), because it uses the Charcoal token: 14.7:1 on Paper and 13.3:1 on cards. No separate dark focus color is needed.
  - The corner toggle's ring reaches 4px past its box, so it ends 1px inside the viewport edge without an inset. It stays fully visible.
  - **Exception (owner-approved, 2026-10-18):** `<main id="top" tabindex="-1">` draws no focus ring (`main:focus { outline: none }`). Main is a programmatic focus target for the `#top` links (skip link, rail name, "Back to top"), not a control, and a ring around the whole column would read as an error. The next Tab shows the normal ring on the first link. This is the only element exempt from "never remove the outline".
- **Theme toggle hover:** the same soft circle and Accent icon as the hero links (§6.9), under `@media (hover: hover)`.
- **Summary focus:** the outline is drawn on the `<summary>`, inside the card padding. Use `outline-offset: 4px` so the ring clears the logo and the text.
- **Hover is never the only cue.** Links are always underlined, with three exceptions: nav links (identified by their position in the nav), the name link, and the icon-only hero links (identified by their icon glyphs, in a row directly under the tagline). Summaries always show the chevron.
- **Hover on non-interactive elements** (technology items, project cards) is feedback only, not an affordance. They keep `cursor: default`, get no focus stop, and their hover is under `@media (hover: hover)` (§6.3, §6.5).
- **Disabled states:** none exist.

---

## 9. Accessibility

### 9.1 Contrast

I calculated the ratios by hand with the WCAG 2.x formula and rounded them down. Frontend should confirm them with a checker.

| Foreground | Background | Ratio | Needed | Use |
|---|---|---|---|---|
| Charcoal | Paper | 14.5:1 | 4.5 | Body text, headings, hero links, tech names, current nav link, footer link |
| Charcoal | White | 16.1:1 | 4.5 | Card text, skip link |
| Pebble | Paper | 6.3:1 | 4.5 | About heading, inactive nav, footer copyright |
| Pebble | White | 7.1:1 | 4.5 | Dates, titles, tech lists in cards |
| Accent | Paper | 4.9:1 | 4.5 | Hovered link text on the page; hovered technology name (15px/600) |
| Accent icon | 10% Accent circle over Paper (about `#EFE0DC`) | 4.3:1 | 3 (non-text) | Hovered hero icon |
| Accent deep icon | 10% Accent circle over Paper | 5.6:1 | 3 (non-text) | Pressed hero icon |
| Accent logo | Paper | 4.9:1 | 3 (non-text) | Hovered technology logo |
| 10% Accent circle | Paper | about 1.16:1 | none (decorative) | Hover feedback; the icon color change is the meaningful cue |
| Pebble border, card-hover shadow | Paper / White | n/a | none (decorative) | Project card hover |
| Accent | White | 5.5:1 | 4.5 | Hovered summary and link text inside cards |
| Accent deep | Paper / White | 6.5:1 / 7.2:1 | 4.5 | Pressed link text |
| Accent underline | Paper / White | 4.9:1 / 5.5:1 | 3 (non-text) | Link identification, including the skip link (on White) |
| Accent rail marker | Paper | 4.9:1 | 3 (non-text) | Current section |
| Pebble chevron | White | 7.1:1 | 3 (non-text) | Open or closed state |
| Charcoal focus ring | Paper / White | 14.5:1 / 16.1:1 | 3 (non-text) | Focus |
| Charcoal dot / Accent open dot | Paper | 14.5:1 / 4.9:1 | none (decorative) | The open state is also shown by the chevron and the native expanded state |
| Rule | Paper / White | about 1.3:1 | none (decorative) | Card edges and the timeline line. Each card is also identified by its chevron and its content. |

The light theme toggle uses the hero-link pairs above: Charcoal icon on Paper 14.5:1, Accent on the circle 4.3:1, Accent deep on the circle 5.6:1.

**Dark theme.** Same method, hand-calculated and rounded down. The owner's demo figures are 0.1 higher in places (14.8, 6.9, 5.6, 8.0, 13.4); that is rounding, and every pair passes either way. Frontend confirms with a checker.

| Foreground | Background | Ratio | Needed | Use |
|---|---|---|---|---|
| Charcoal `#EDEAE6` | Paper `#1A1816` | 14.7:1 | 4.5 | Body text, headings, hero links, toggle icon, tech names and logos, current nav link, footer link |
| Charcoal | White `#24211E` | 13.3:1 | 4.5 | Card text, skip link |
| Pebble `#A8A09A` | Paper | 6.8:1 | 4.5 | About heading, inactive nav, footer copyright |
| Pebble | White | 6.2:1 | 4.5 | Dates, titles, tech lists in cards |
| Accent `#E56B60` | Paper | 5.5:1 | 4.5 | Hovered link text on the page; hovered technology name |
| Accent | White | 5.0:1 | 4.5 | Hovered summary and link text inside cards |
| Accent deep `#F2958C` | Paper / White | 7.9:1 / 7.2:1 | 4.5 | Pressed link text |
| Accent icon | 10% Accent circle over Paper (about `#2E201D`) | 4.9:1 | 3 (non-text) | Hovered hero icon and toggle icon |
| Accent deep icon | 10% Accent circle over Paper | 7.0:1 | 3 (non-text) | Pressed hero icon and toggle icon |
| Accent logo | Paper | 5.5:1 | 3 (non-text) | Hovered technology logo |
| 10% Accent circle | Paper | about 1.13:1 | none (decorative) | Hover feedback; the icon color is the cue |
| Accent underline | Paper / White | 5.5:1 / 5.0:1 | 3 (non-text) | Link identification, including the skip link (on White) |
| Accent rail marker | Paper | 5.5:1 | 3 (non-text) | Current section |
| Pebble chevron | White | 6.2:1 | 3 (non-text) | Open or closed state |
| Charcoal focus ring | Paper / White | 14.7:1 / 13.3:1 | 3 (non-text) | Focus |
| Charcoal dot / Accent open dot | Paper | 14.7:1 / 5.5:1 | none (decorative) | As in light |
| 18% Accent ring (about `#3F2723`) | Paper | about 1.29:1 | none (decorative) | Open dot ring; visible as a dark red halo |
| Rule `#3A3531` | Paper / White | about 1.46:1 / 1.32:1 | none (decorative) | Card edges, timeline line |
| White card | Paper | about 1.1:1 | none (decorative) | Same step as light (White on Paper is also about 1.1:1); the Rule border defines the card |

**Failures:** none. The lowest text pair is Accent on White, 5.0:1. Nothing needed a fix.

**Not ratio-checked:** the company logo JPGs and the photo are artwork and stay unchanged (§1.1). Their light tiles are bright against dark Paper, but they are decorative (`alt=""`) and the company name beside them carries the meaning.

### 9.2 Hit areas

- Every interactive element is at least **44 x 44px**: hero links, repo and GitHub links, the rail's name and section links, the theme toggle, the footer link and the skip link.
- **Theme toggle:** exactly 44 x 44px at every width, with a 22px icon and a circular focus ring (§8). Its name is the hidden label "Dark mode" and its state is `aria-pressed` (§6.9). In the rail it shares a row with the name link, which keeps its own 44px height, so the two targets don't overlap.
- **Icon-only hero links (every width):**
  - Each is exactly 44 x 44px, with 8px between targets.
  - Each keeps its accessible name through the visually hidden label (§6.1).
  - Visible focus is the standard ring around the 44px box, drawn as a circle (§8).
  - Hover adds the 10% Accent circle and turns the icon Accent; pressed turns it Accent deep. Nothing moves.
  - There is no tooltip.
  - The icons are `aria-hidden`, so the name is announced once, not twice.
- **Icon contrast:** Charcoal icons are 14.5:1 on Paper; Accent icons on the hover circle are 4.3:1 (4.9:1 on bare Paper). Both exceed the 3:1 needed for meaningful graphics, which matters here because in the hero row the icon is the only visible cue.
- **Alignment offset:** the hero row's -10px pull does not shrink any target. The focus ring may draw into the page padding (at least 16px), and it stays fully visible.
- The summaries are far larger.
- The nav links (20px text, 29px line) need 8px vertical padding to reach 44px (§13).

### 9.3 Accordion semantics

- Use native `<details>` and `<summary>`. That provides keyboard support (Tab to focus, Enter or Space to toggle) and exposes the expanded or collapsed state to assistive technology. No ARIA is added on top.
- **No heading elements inside `<summary>`.** `<summary>` has a button role, and some browser and screen-reader combinations flatten its children, so a heading inside it is announced unreliably.
  - The accessible name comes from the summary text: company, dates and title (for example "Scout Sep 2025 - Present Senior Developer").
  - Tradeoff: screen-reader users cannot jump between companies with heading navigation. They move through the list items of the `<ol>` instead, and it is announced as a list of 4.
- The company logo is decorative (`alt=""`). The chevron and the dot are CSS or `aria-hidden`.
- Highlights stay in the DOM when a card is collapsed. Browsers hide them from assistive technology until the card opens, and find-in-page can reveal them where supported.

### 9.4 Other

- **Landmarks:** `<nav aria-label="Sections">`, `<main id="top" tabindex="-1">` and `<footer>` outside main.
- **Main focus:** `<main>` takes focus from the `#top` links and draws no ring, a narrow owner-approved exception to "never remove the outline" (§8). It is a focus target, not a control; the next Tab shows the normal ring on the first link. Each section has `aria-labelledby` pointing at its h2.
- **Headings:** h1 is the greeting; h2s are the sections; h3s are the project names.
- **Lists:** Technologies is a `<ul>`, Experience an `<ol>`, Projects a `<ul>`.
- **Language:** `<html lang="en">`.
- **New-tab links** announce it with visually hidden text (§6.1).
- **Landmarks below 1200px:** there is no nav landmark, only `<main>` and `<footer>`. Screen-reader users move through the sections by their h2 headings.
- **Keyboard order:**
  - **1200px and up:** skip link, name, theme toggle, rail links; then hero links, summaries (with Scout's repo links when its card is open), project GitHub links, back to top.
  - **Below 1200px:** theme toggle (first, matching its top-right place above the hero), then hero links, summaries, project GitHub links, back to top.
  - Only one toggle instance is ever rendered visible, so it is one tab stop (§6.9).
- **Theme toggle naming:** a `<button>` named by its visually hidden text "Dark mode", with `aria-pressed`. No `aria-label`. Below 1200px it sits inside `<main>`, so it is not outside every landmark.

---

## 10. Responsive summary

| Area | Mobile (under 720px) | Tablet (720 to 1199px) | Desktop (1200px and up) |
|---|---|---|---|
| Nav | None. Opens on the hero, main has 60px top padding (plus any top safe-area inset beyond 16px) | None (same as mobile) | Sticky 220px rail: name 24px/600, links 20px, 32px marker |
| Theme toggle | 44px button, absolute in the window's top-right corner (5px offsets, safe-area aware), scrolls away; first tab stop | Same as mobile, above the photo | In the rail, right end of the name row; sticky with the rail |
| Color modes | Light and dark | Same | Same |
| Skip link | None | None | On focus |
| Rail scroll script | Not running | Not running | Running |
| Hero | Photo 4:3 on top, text below | Text with 280px photo at 4:5 | Same as tablet |
| Hero links | Icon-only: one row of 44px targets, 24px icons, 8px gap, pulled left 10px; soft circle on hover only where the device supports hover | Same | Same |
| Repo and project links | Icon + label | Icon + label | Icon + label |
| Greeting / tagline | 36 / 21px | 48 / 24px | 48 / 24px |
| Technologies | Rows of 3, 4 and 3 (5 + 5 from 600px) | 5 columns | 5 columns |
| Timeline | 36px gutter, 24px padding, no indent | 48px gutter, 28px padding, 54px indent | Same as tablet |
| Projects | Stacked, 24px padding | Stacked, 28px padding | Same as tablet |
| Body text | 16px | 17px | 17px |

---

## 11. Data needed from Backend

Backend owns `data/` and proposes the schema; the owner approves. The field names below are my suggestions only. "Rec." means my recommendation, and the owner decides.

| # | Need | Suggestion | Notes |
|---|---|---|---|
| 1 | Hero greeting | A new string, e.g. `basics.greeting` = "Hello, I'm Ryan." | Required. It must not be hardcoded. |
| 2 | Instagram profile | Add `{ "network": "Instagram", "url": "https://www.instagram.com/ryan.chen2" }` to `basics.profiles` | Hero order is LinkedIn, GitHub, Instagram. Rec.: render in array order, so put Instagram last. Frontend maps `network` to an icon. |
| 3 | Curated technologies | A new ordered list, e.g. `technologies: [{ name, icon }]`, where `icon` is a key Frontend maps to a logo (a Simple Icons slug, `java` and `css` for the Devicon logos, or `"database"` for SQL) | The 10 entries in the §6.3 order. Validation could reject unknown icon values. |
| 4 | Company logo per experience | Optional, e.g. `experience[].logo` = a site-root `src` path | Rec.: `src` only, always decorative, because the name sits beside it. If Backend reuses the existing `image` shape (where `alt` is required), it must allow an empty `alt`. Files go in `public/` (Backend owns it). The owner has supplied **100 x 100 JPGs in `public/`** (more than 2x for the 40px box). Render them with `next/image` at 40 x 40, with a 1px Rule border. |
| 5 | Photo | Populate the existing `basics.image`: `src` (e.g. `/images/...`) and `alt` "Ryan at the Golden Gate Bridge" | The file comes from the owner. An optional focal point (e.g. `basics.image.position`) is needed only if the face is off-center. |
| 6 | Remove `featured` | Delete it from `data/schema.ts` and `resume.json` | Nothing renders it. This reverses the Phase 0 and Phase 1 decisions; record it in `decisions.md`. |
| 7 | Experience sort helper | In `src/lib/`: null `endDate` first, then `endDate` descending, then `startDate` descending as a tie-breaker | Result today: Scout, Babel Street, Verisk, Ventus Health. Frontend opens the first result by default. |
| 8 | Remove `projects[].image` | Delete it from the schema | No project images is decided. Rec.: remove. |
| 9 | Resume PDF path | Today it is the fixed path `/resume.pdf`, and `public/resume.pdf` exists | Rec.: keep it as a constant in `src/lib/`. No data field is needed. |

**Data that will no longer be rendered: `education` (and the full `skills` lists, now removed)**

The site will no longer show GPA (3.6/4.0), Dean's List, the degree name or the 39-item skills list. The owner confirmed that this is intended. The About text keeps Northeastern and the December 2026 graduation.

- **Decided: `education` stays in `resume.json`, unrendered. `skills` is removed (owner decision, 2026-10-18; see "Skills list removed" in `docs/decisions.md`).** The curated `technologies` list (#3) is the only skills data. The full list lives only in the resume PDF, and there is no "show all skills" control.
- **Possible future use:** Backend may use the data for SEO structured data in Phase 6 (schema.org `Person`: `alumniOf` from `education`, `knowsAbout` from `technologies`).
- **The resume PDF does not use `resume.json`.** `public/resume.pdf` is a separately exported file (`plan.md` §4). The JSON and the PDF don't affect each other.
- **`dateLabel`:** keep it. Cards display it.
- **`profiles`, `email` and `links`:** keep them. They are all rendered.

---

## 12. Implementation notes for Frontend

These are notes, not code.
- **Static generation** with no client data fetching.
- **The only client JS:**
  - the rail's active-section logic;
  - the timeline reveal;
  - the accordion scroll correction;
  - the theme: a blocking inline `<head>` script of a few lines that sets `data-theme` before paint, plus the toggle's click handler (flip the attribute, write `localStorage`, update `aria-pressed`, add and remove the fade class) (§6.9).
  - The hero load animation is CSS only and adds no client JS (§7 rule 5).
- **Theme and static rendering:** the page stays fully static. The server HTML has no `data-theme`; the inline script adds it before paint and before hydration, so `<html>` gets `suppressHydrationWarning`. The toggle's icons swap in CSS and its `aria-pressed` is set after mount, so nothing else mismatches. If a Content Security Policy is added later, the inline script needs a hash or nonce.
- **Tailwind v4 dark tokens** (Frontend owns `globals.css`; described, not edited, here):
  - Keep the light values in `@theme` as today. Use plain `@theme`, not `@theme inline`, for the colors and `--shadow-card-hover`, so utilities like `bg-paper` read `var(--color-paper)` at runtime.
  - Add one plain CSS block, `html[data-theme="dark"] { --color-paper: #1A1816; ... --shadow-card-hover: ...; color-scheme: dark; }`, with the seven colors from §1.1 and the shadow from §1.5. Add `color-scheme: light` on `html`.
  - Components need no `dark:` utilities, because the tokens swap. If Frontend wants a variant for the icon swap, `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` is enough.
  - The `color-mix()` values (hover circle, open-dot ring) reference the tokens, so they follow automatically.
  - The card height animation and all hover effects are CSS only. The accordion scroll correction and the rail update wait for the 320ms settle timing (§6.4).
- **Icons:** all inline SVG, with no CDN at runtime and no icon font.
  - **Link icons:** five Tabler outline glyphs, copied into the repo (§6.1).
  - **Technologies logos:** solid monochrome Simple Icons (v16.35.0) and Devicon (v2.16.0, Java and CSS), plus the Lucide `database` icon for SQL (§6.3).
- **Photo:** `next/image` with `preload` (Next 16's name for `priority`), `fetchPriority="high"` and `fill`; `sizes` and framing as in §5. AVIF and WebP are on by default.
- **Fonts:** one Figtree file, Latin subset.
- **Target:** Lighthouse 95+ on all four categories, on mobile and desktop.

---

## 13. Deliberate differences from the preview

| Preview | Spec | Why |
|---|---|---|
| Lucide-style link glyphs with preview optical scales | Tabler outline glyphs; the scales were tuned by eye at 24px in Phase 4 step 2 (see §6.1) | Lucide no longer ships brand icons, and Tabler's shapes differ |
| Nav links with too little vertical padding for 44px | 8px padding on 20px text (45px tall), with the 32px marker centered | 44px hit areas |
| Photo `<img>` in the preview | The pre-cropped `/hero.jpg` with the approved crop baked in, no transform, and `sizes` per §5 | The image stays sharp without a zoom; the pre-crop sends fewer bytes |
| Company name as an h3 inside `<summary>` | Plain text in the summary | Headings inside summaries are announced unreliably by screen readers |
| One timeline line with a fixed `bottom` | A connector per entry, from dot to next dot | The line overshoots when the last card is open |
| Email link `title` tooltip with the address | No `title` | Hover-only text isn't available to keyboard or touch users. The address is hidden by owner decision. |
| Footer inside `<main>` | Footer outside `<main>` | Correct contentinfo landmark |
| No skip link | Skip link at 1200px and up only | Five rail links come before the content on desktop. Below 1200px there is no nav to skip. |
| Rail script runs at every width | Gated by `matchMedia("(min-width: 1200px)")` | No scroll work when the rail is hidden |
| No scroll correction when the exclusive accordion closes a card above | Scroll the opened summary into view if it moves off screen | Otherwise a click can push the content out of view |
| Simple Icons v13 from a CDN, `openjdk` and `css3` | Simple Icons pinned v16.35.0, inlined; Java and CSS from Devicon v2.16.0 (`java-plain`, `css3-plain`), inlined, `currentColor`; the Java cup also gets a 0.5px `currentColor` stroke | Performance. Simple Icons v16.35.0 has no `java`, and the Devicon cup is more recognizable than `openjdk`; the Devicon CSS shield pairs with the HTML5 shield (decisions of 2026-10-18). The stroke makes the thin cup read closer to its neighbors' weight (decision of 2026-10-19). |
| `.btn` styles and `.edu` styles | Removed | No button and no Education section |
| Highlight lines about 85 characters | Kept | Matches the approved preview. It slightly exceeds the 80-character guideline; I am flagging it rather than changing it. |

---

## 14. Open questions: closed

All six questions were answered by the owner and are recorded in `docs/decisions.md`.

| # | Question | Answer | Where applied |
|---|---|---|---|
| 1 | Is losing GPA and Dean's List from the site intended? | Yes | §11 |
| 2 | Keep or remove `education` and `skills`? | Keep both, unrendered. `technologies` is added alongside them. *Superseded (2026-10-18): `skills` is removed; `education` stays.* | §11 |
| 3 | Shorten `basics.summary`? | No, it stays as is | §4.2 (no change) |
| 4 | Technologies layout on mobile | Rows of 3, 4 and 3 | §4.3 |
| 5 | Company logo format | Originally PNG at least 80 x 80px. Now supplied as 100 x 100 JPGs. | §11 #4, §6.4 |
| 6 | Who owns the Tailwind v4 theme CSS? | Frontend owns `globals.css` | §0 |

**Closed: the hero-link tablet gap.** The labeled hero row couldn't fit on one line at viewports from 720 to about 850px. The owner resolved this by making the hero links icon-only at every width (§6.1).

**Still assumed, not separately confirmed:** company logos are decorative (`alt=""`), because the name sits beside them (§6.4). Tell Design if the owner wants alt text instead.

The tagline in `resume.json` now ends "...loves a challenging problem." The spec never quotes the tagline, so nothing needed changing.

---

## 15. 21st component references (proposed, pending owner approval)

Scouted on 2026-10-16 with the read-only 21st tools. **This section changes nothing above.** §0 to §14 stay the source of truth, and nothing here is approved until the owner says so.

**Result: no 21st component is proposed for any part of the spec.** Every component here is small, already fully specified, and built on native HTML (`<details name>`, plain links, a CSS grid). Each candidate I found would add decoration or motion the spec rejects, or would need so much stripped and rewritten that adapting it is more work than building from §6. Frontend builds every component from the spec, with no new dependencies.

| Spec component | Pick | Closest candidate checked, and why it was rejected |
|---|---|---|
| Rail nav (§6.6) | None | [Table of Contents](https://21st.dev/@mohammadshehadeh/components/toc) (mohammadshehadeh). Code checked: no npm dependencies, only shadcn's `cn` helper (`clsx` + `tailwind-merge`). Its smooth scroll respects reduced motion and it sets `aria-current`. But its active-section rule (first heading below a 56px offset, throttled to 200ms) is not the spec's 35% line with the bottom-of-page rule, it has no `toggle` hook and no `matchMedia` gate, its marker is a per-link border rather than the sliding 3 x 32px bar, and its label is a mono, all-caps, 10px eyebrow. Keeping it would mean rewriting almost all of it. |
| Hero layout (§4.1, §5) | None | [Hero Block](https://21st.dev/@moumensoliman/components/hero-block-shadcnui) and [Portfolio Hero](https://21st.dev/@waleedkibhen/components/portfolio-hero). Both bring their own load animation (an animated avatar, a scroll cue), and the photo crop is specific to this photo. The hero's one load animation is the owner's Blur-in words, built in plain CSS (§7 rule 5). *History: when scouted, §7 rule 5 had no hero load animation; see the first update below.* |
| Hero links (§6.1) | None | [Social Media](https://21st.dev/@ravikatiyar162/components/social-media) and [Social Icons](https://21st.dev/@jatin-yadav05/components/social-icons). They add revealed labels or tooltips. §6.1 has no tooltip, uses Tabler outline glyphs, and its soft-circle hover is a few lines of CSS. *History: when scouted, §6.1 had no hover box and a -6° tilt; both changed, see the updates below.* |
| Technology item (§6.3) | None | [Integration Logos Grid](https://21st.dev/@ziegfiroyt/components/feature135) and [Pixel Logo Grid](https://21st.dev/@smammar/components/pixel-logo-grid). These are "trusted by" logo clouds with brand-color hover effects (grayscale, canvas shimmer). §6.3 uses Charcoal logos, a plain-CSS Lift hover, and a 3/4/3 mobile grid specific to this list. *History: when scouted, §6.3 had no hover; see the updates below.* |
| Timeline accordion card (§6.4) | None | [Experience Timeline](https://21st.dev/@shadcnui-blocks/components/timeline-02) (shadcnui-blocks). It is a static list with tech badges and is not collapsible. The spec needs native `<details name="experience">` with one card open, the dot that matches the open card, per-entry connectors and scroll correction. The accordion candidates ([Accordion](https://21st.dev/@micka_design/components/accordion), [Interactive Accordion](https://21st.dev/@jatin-yadav05/components/interactive-accordion)) pull in Radix and `framer-motion`; §6.4 animates height in plain CSS on native `<details>`, so neither is needed. *History: when scouted, §6.4 had no height animation; see the updates below.* |
| Project card (§6.5) | None | [Project Card](https://21st.dev/@ravikatiyar162/components/project-card). It is built around an image with a hover zoom. The spec has no images, and its Hover lift (border, -3px, shadow) is plain CSS. *History: when scouted, §6.5 had no card hover; see the updates below.* |
| Skip link (§6.7) | None | Not searched for as a component. It is a single styled link. |
| Footer (§6.8) | None | [Minimal Two-Column Footer](https://21st.dev/@ln-dev7/components/footer-17). It is a brand block with a link list. The spec footer is one line of copyright and a "Back to top" link. |

**Update (2026-10-16):** §7 rule 5 now has a hero load animation, so the Hero layout row's "nothing animates on load" reason no longer applies. The pick stays "None": the animation is built in plain CSS from §7 rule 5, with no 21st component and no `framer-motion`.

**Update (2026-10-16, owner variant picks):** the hero links now have a soft hover circle, technology items lift, project cards lift, and timeline cards animate their height (§6.1, §6.3, §6.4, §6.5). The hero tilt is dropped. The original rejection reasons that cited "no box", "the -6° tilt", "no interaction", "not animated" and "no card hover" no longer apply (the table above now gives the current reasons and marks the old ones as history), but every pick stays "None": all four are plain CSS, with no Radix and no `framer-motion`.

**Update (2026-10-16, dark mode):** theme toggle (§6.9): pick "None". The candidates checked by metadata ([Theme Toggle](https://21st.dev/@luv-jeri_c92deb60/components/theme-toggle) with a morphing icon and page-reveal animation; [Theme Switch](https://21st.dev/@zweiundeins/components/theme-switch) with the light/dark/auto picker the owner rejected) add motion or options §6.9 doesn't have; the toggle is one button built from §6.9.

**Components the agent brief lists that the spec no longer has.** `docs/decisions.md` (Phase 2) removed these, so I did not scout them:
- Featured and compact experience variants: one card style for all (§6.4).
- Skill tag: replaced by the technology item (§6.3).
- Contact links row and "View Resume" button: there is no Contact section. Resume is one of the five icon-only hero links (§6.1).

**Logos:** `search_logo` (svgl) was checked, but it is not proposed. The spec pins Simple Icons v16.35.0 and Devicon v2.16.0 for Technologies and Tabler for link icons (§6.1, §6.3). A query for "java" returned no results. Simple Icons v16.35.0 has no `java` either, so Technologies uses Devicon `java-plain` with a 0.5px `currentColor` stroke (§6.3, decisions of 2026-10-18 and 2026-10-19).

**Dependencies added by these proposals:** none.

---

## 16. Link preview and icons

Added 2026-10-19 (Phase 6) for Backend's SEO files (owner-approved ownership exception, `decisions.md` "SEO ownership"). Content is owner-approved (name and tagline only). The visual values are Design's defaults, except the favicon tile, which the owner picked on 2026-10-19 (§16.2). Nothing here changes §0 to §15 or anything on the page.

### 16.1 Open Graph image (`src/app/opengraph-image.tsx`)

- **Size:** 1200 x 630, PNG, generated at build time with `next/og` `ImageResponse`. Static, no request data.
- **Content:** `basics.name` and `basics.tagline` from `resume.json`, nothing else. No photo, no URL, no logo, no icons.
- **Light palette only.** Previews render inside other apps' cards, in those apps' themes, and the site itself always opens light (§6.9). The preview then matches the page a visitor lands on. Paper also reads as a distinct image card on a dark app background, where a dark image would blend into it.
- **No photo** (Design agrees). It would need its own pre-crop at a third aspect ratio, and at thumbnail size a face pulls the eye off the name.

**Layout** (one flex column; Satori needs `display: flex` on every element with more than one child):

```
+------------------------------------------------------------+
|  96px                                                      |
|  ====  Accent rule 56 x 6                                  |
|        48px                                                |
|  Ryan Chen                     96px / 700                  |
|        28px                                                |
|  Software engineer who learns fast, adapts quickly,        |
|  and loves a challenging problem.        40px / 400        |
+------------------------------------------------------------+
```

| Property | Value |
|---|---|
| Root | `width: 1200`, `height: 630`, `display: flex`, `flexDirection: column`, `justifyContent: center`, `alignItems: flex-start`, `padding: 0 96px`, `background: #F4F3F0` (Paper), `fontFamily: Figtree` |
| Accent rule | first child: `width: 56`, `height: 6`, `borderRadius: 3`, `background: #C0362C` (Accent). The one Accent detail; it echoes the rail marker. 48px gap below it. |
| Name | `basics.name`, Figtree **700**, `fontSize: 96`, `lineHeight: 1.05`, `letterSpacing: -1.44` (-0.015em, as the hero h1), `color: #24201D` (Charcoal). One line. |
| Tagline | `basics.tagline`, Figtree **400**, `fontSize: 40`, `lineHeight: 1.3`, `color: #24201D` (Charcoal, as in the hero), `maxWidth: 960`, `marginTop: 28`. Wraps naturally to two lines (about 46 characters per line). |
| Alignment | Left-aligned, block centered vertically. Total block is about 290px tall, so about 170px of Paper sits above and below. |

- **Fonts passed to `ImageResponse`:** Figtree **400** and **700** as **static TTF or WOFF** files (OFL). The build uses the static WOFF files from `@fontsource/figtree@5.3.0` (accepted 2026-10-19). Satori reads TTF, OTF and WOFF, not WOFF2 or variable fonts, so the files from `next/font` cannot be reused. Weight 600 is not used.
- **Alt text:** `` `${basics.name}. ${basics.tagline}` ``, which today reads "Ryan Chen. Software engineer who learns fast, adapts quickly, and loves a challenging problem." No new words; the period is punctuation joining the two strings.
- **Contrast (light only):** Charcoal on Paper 14.5:1 (text); Accent rule on Paper 4.9:1 (decorative, above 3:1 anyway). There is no dark version, so no dark check applies.
- **Safe area:** the 96px side padding and the 170px top and bottom margins keep everything clear of the corner rounding and center crops that LinkedIn, Slack, iMessage and X apply.
- **Twitter/X:** no separate `twitter-image`; X falls back to `og:image`.

### 16.2 Favicon and app icons

**Glyph: a single "R"** (Design's default). "RC" needs two letters with 2px strokes in a 16px tile, about 5px each with no room for counters; it turns to a blur. One letter stays legible at 16px. It is drawn as **one stroked path** (no `<text>`, so no font dependency), in the same language as the site's link icons: round caps and joins (§6.1). Building it from strokes avoids outlining Figtree, which needs a font tool.

**Tile: Charcoal, full-bleed rounded square, glyph in Paper** (owner choice, 2026-10-19, over Design's Accent default). Quieter than Accent; the tile inverts the page's own Charcoal-on-Paper pair.

**`src/app/icon.svg`** (scalable, switches with the OS theme):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .tile { fill: #24201D }
    .glyph { stroke: #F4F3F0 }
    @media (prefers-color-scheme: dark) {
      .tile { fill: #EDEAE6 }
      .glyph { stroke: #1A1816 }
    }
  </style>
  <rect class="tile" width="32" height="32" rx="8"/>
  <path class="glyph" d="M10 24V8h6a4 4 0 0 1 0 8h-6m6 0l6 8" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- **Geometry:** 32-unit viewBox; tile 32 x 32, `rx="8"` (4px at 16px). Stem x = 10 from y = 8 to 24; bowl from (10, 8) to (16, 8), a radius-4 half circle to (16, 16), back to (10, 16); leg from (16, 16) to (22, 24). Stroke 4 units.
- **Legibility at 16px:** 1 unit = 0.5px, so the stroke is 2px. The stem and the bowl's horizontals sit on even units, so their edges land on whole pixels and render crisp. The bowl's counter is 3 x 2px, and the leg is about 4px clear of the stem at the baseline. The glyph's ink spans x 8 to 23.4 and y 6 to 26 (with round caps), so it is optically centered in the tile.
- **Dark mode: yes, it switches** with `prefers-color-scheme`. Tabs follow the OS, not the site toggle, so the site's "always start light" rule does not apply. The dark values are the dark tokens (tile = dark Charcoal `#EDEAE6`, glyph = dark Paper `#1A1816`), so the pair stays "Paper on Charcoal" in both. A light Charcoal tile on a dark tab bar would nearly vanish, which is why it switches. Browsers that ignore the SVG's media query (or SVG favicons) use `favicon.ico`.
- **Contrast:** glyph on tile about 14.5:1 light (Paper `#F4F3F0` on Charcoal `#24201D`) and about 14.7:1 dark (`#1A1816` on `#EDEAE6`), well above 3:1 non-text.

**`src/app/apple-icon.tsx`** (generated with `next/og` `ImageResponse`, 180 x 180, PNG output):
- The light version of the SVG above (Charcoal `#24201D` tile, Paper `#F4F3F0` "R"), rendered at 180 x 180 as a **plain square** (no corner radius) with **every pixel opaque**. iOS applies its own rounded mask, and transparent pixels turn black. Same glyph geometry, scaled 5.625x (stroke 22.5px). Light only; the PNG can't switch.

**`src/app/favicon.ico`** (replaces the Next default):
- The light SVG above, **with** `rx="8"`, rasterized at 16, 32 and 48px into one ICO. Light only. It is the fallback for Safari and for browsers without SVG favicons.

**Check (Backend, then Design QA):** view the built tab at 16px in Chrome and Firefox with the OS in light and in dark, and the ICO in Safari. The "R" must read at 100% zoom.

**Tool for the PNG and ICO:** Backend's choice (for example a one-off conversion from the SVG). No new dependency is needed in `package.json`.
