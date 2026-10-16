# Phase 2, Step 1: Design Directions

Status: **proposal, awaiting owner choice.** No direction has been picked. `docs/design-spec.md` will be written only after one is approved.

## The brief, restated

- **Subject:** Ryan Chen, a Northeastern CS student graduating in December 2026. His co-op work is mostly backend and data: API frameworks, data pipelines, name matching and search. He has also led frontend work at Scout.
- **Audience:** Recruiters and hiring managers who spend about 30 seconds on the page.
- **The page's main job:** In one scroll, show the name, the tagline, the Babel Street and Verisk work, and a way to make contact.

All three directions keep these fixed rules from `plan.md` and `docs/decisions.md`:
- A single page with anchor nav. Section order: Hero, About, Experience, Projects, Skills, Education, Contact.
- Babel Street and Verisk are first and larger, with every highlight shown. Scout and Ventus Health are compact. Scout has three small repo links.
- The three projects get equal weight, and each has a GitHub link.
- Contact is a row of icon links (email, LinkedIn, GitHub) plus a "View Resume" button. There is no form.
- No phone number anywhere. No dark mode, case-study pages or blog yet. Each direction only notes how it would adapt to dark mode.
- Fonts come from Google Fonts and are self-hosted through `next/font`.

The optional content fields change the layout in the same way for every direction:
- `basics.image` (headshot): no file has been supplied. Each hero works without a photo and has a defined place for one.
- `projects[].image` (screenshots): none supplied. Project cards are designed text-first. If screenshots arrive, all three cards show one, or none do, so the projects stay equal.

### About the contrast numbers

I calculated every ratio by hand with the WCAG 2.x relative-luminance formula, rounded down to one decimal. Frontend should confirm them with a checker when wiring the tokens.
- AA thresholds: 4.5:1 for body text, 3:1 for large text (24px and up, or 18.66px bold and up) and for UI parts such as focus rings.
- Colors marked "decorative" are never used for text or to carry meaning.

---

## Direction A: Index

### Mood
Cool, orderly and quiet, like a well-made technical reference. The page reads like a document you look things up in. The layout itself is the one memorable element. On desktop, a fixed left rail holds the name and the section links and marks where you are. Everything else stays plain.

### Who it reads well with
Data and infrastructure teams, enterprise software (the same world as Verisk and Babel Street), fintech and backend-heavy companies. It says "careful, reliable engineer."

### Palette

| Role | Name | Hex |
|---|---|---|
| Page background | Mist | `#F6F7F9` |
| Featured panel surface | White | `#FFFFFF` |
| Primary text, headings | Ink | `#1B2330` |
| Secondary text (dates, titles, tech lists) | Slate | `#4F5A6B` |
| Accent: links, current nav item, focus ring, button | Cobalt | `#2A47B8` |
| Hairline borders (decorative) | Rule | `#D9DDE3` |

| Text / background | Ratio | AA |
|---|---|---|
| Ink on Mist | 14.7:1 | Pass |
| Ink on White | 15.7:1 | Pass |
| Slate on Mist | 6.5:1 | Pass |
| Slate on White | 6.9:1 | Pass |
| Cobalt on Mist | 7.2:1 | Pass |
| Cobalt on White | 7.8:1 | Pass |
| White on Cobalt (button label) | 7.8:1 | Pass |
| Cobalt focus ring vs Mist (UI, needs 3:1) | 7.2:1 | Pass |

### Type
- **One family: IBM Plex Sans** (variable, weights 400, 500 and 600). Plex grew out of an engineering company, and its plain, slightly technical forms suit enterprise backend work. Using one family keeps font loading to a single file.
- Dates use tabular figures (`font-variant-numeric: tabular-nums`), so the date column lines up.
- Scale, based on the classic 12/14/16/18/21/24/36/48 steps:

| Use | Desktop | Mobile | Weight / line-height |
|---|---|---|---|
| Name (h1) | 48px | 36px | 600 / 1.1, letter-spacing -0.01em |
| Tagline | 24px | 21px | 400 / 1.35 |
| Section heading (h2) | 21px | 21px | 600 / 1.3 |
| Company, featured | 24px | 21px | 600 / 1.25 |
| Company, compact | 18px | 18px | 600 / 1.3 |
| Body and highlights | 17px | 16px | 400 / 1.6 |
| Meta (dates, title, tech) | 15px | 15px | 400 / 1.5 |

### Hero

Desktop (1200px and up): the rail is the nav. The hero is the top of the content column.

```
+--------------------+------------------------------------------------+
| Ryan Chen          |                                                |
|                    |  Ryan Chen                                     |
| About              |  Software engineer who learns fast, adapts     |
| Experience         |  quickly, and loves a hard problem.            |
| Projects           |                                                |
| Skills             |  [mail] [in] [gh]     [ View Resume ]          |
| Education          |                                                |
| Contact            |  ---------------------------------------------  |
|                    |  About                                         |
|  (sticky rail,     |  I'm a Computer Science student at             |
|   current section  |  Northeastern, graduating in December 2026...  |
|   in Cobalt with   |                                                |
|   a 2px bar)       |                                                |
+--------------------+------------------------------------------------+
   ~240px rail          content column, max 680px, left-aligned
```

Mobile and tablet: the rail turns into a slim top bar with the name on the left and the section links in a row that scrolls sideways. There is no hamburger menu. The hero is left-aligned and fits in the first screen, with About starting just below it.

Headshot, if supplied: a 96px square with a 4px radius, placed above the name in the content column. Without one, nothing is reserved.

### Experience card

Featured cards (Babel Street, Verisk) sit on a White panel with a 1px Rule border and a 4px radius. Compact entries (Scout, Ventus Health) have no panel. They are plain rows on the Mist background, so the panel itself tells you which roles are featured.

```
+--------------------------------------------------------------+
|  Babel Street                                 Jan - Jun 2026 |
|  Software Engineer Co-op                                     |
|                                                              |
|  - Designed and developed Region of Origin classification    |
|    feature to improve matching of multi-regional names, ...  |
|  - Built a multilingual person-name data pipeline in Python  |
|    by parsing a Wikidata dump, ...                           |
|  - (all 5 highlights)                                        |
+--------------------------------------------------------------+

   Scout  Senior Developer                    Sep 2025 - Present
   - Co-led development of a React/Tailwind frontend for NUMAC...
   - Built React-based frontend for 3 Stones, a real-estate ...
   [gh] NUMAC   [gh] 3 Stones App   [gh] 3 Stones Web
```

Projects use the same unboxed row style as the compact entries, in three equal blocks: name, date, technologies in Slate, highlights, then a GitHub icon link.

### Motion
Close to none. Nothing animates on page load or scroll. Only the user's actions get feedback:
- Links and buttons change color over 120ms.
- The rail's current-section bar moves to the active section as you scroll.

With `prefers-reduced-motion`, both changes happen instantly.

### Dark mode, if approved later
Mist becomes a blue-black, and Cobalt becomes a lighter cobalt so it still passes AA. The layout does not change.

### Tradeoffs
- **Pro:** It has the strongest scannability. The nav is always visible on desktop, so a recruiter can jump to Experience in one click. It loads the fewest fonts and has almost no motion, which makes Lighthouse 95+ easy.
- **Con:** It is the least personal of the three. Board games, recipes and the video-game origin story only come through in the About text.
- **Con:** The sticky rail is extra work: an IntersectionObserver for the current section, and a different layout on mobile.

---

## Direction B: Game Night

### Mood
Warm, friendly and tactile. It takes the hobbies from the summary (board games, the video-game start, Hexagonal Reversi) and expresses them through materials, not pictures. The colors are a table-felt green on a soft grey-green. The memorable element is that skills and links look like **game tiles**: small raised pieces with a darker bottom edge that press down when clicked. The rest of the page stays calm.

### Who it reads well with
Startups, product teams, consultancies and agencies like Scout's clients. It says "easy to work with, curious, builds things people use."

### Palette

| Role | Name | Hex |
|---|---|---|
| Page background | Sage paper | `#F2F4EF` |
| Tile and card surface | White | `#FFFFFF` |
| Primary text, headings | Forest ink | `#1F2A24` |
| Secondary text | Moss grey | `#4E5B53` |
| Accent: links, button, focus ring | Felt green | `#1F5C45` |
| Tile bottom edge, card border (decorative) | Edge | `#C9D1C9` |

| Text / background | Ratio | AA |
|---|---|---|
| Forest ink on Sage paper | 13.4:1 | Pass |
| Forest ink on White | 14.8:1 | Pass |
| Moss grey on Sage paper | 6.4:1 | Pass |
| Moss grey on White | 7.1:1 | Pass |
| Felt green on Sage paper | 7.0:1 | Pass |
| Felt green on White | 7.8:1 | Pass |
| White on Felt green (button label) | 7.8:1 | Pass |
| Felt green focus ring vs Sage paper (UI) | 7.0:1 | Pass |

### Type
- **Headings: Bricolage Grotesque** (variable, weights 600 to 700, optical size set high for the name). It is a grotesque with a little quirk in its shapes, so it carries personality without being a novelty font.
- **Body: Atkinson Hyperlegible Next** (400 and 600). It was designed for legibility, which backs up the accessibility goal, and its open shapes are clearly different from Bricolage.

| Use | Desktop | Mobile | Weight / line-height |
|---|---|---|---|
| Name (h1), Bricolage | 60px | 40px | 700 / 1.05, letter-spacing -0.02em |
| Tagline, Atkinson | 21px | 18px | 400 / 1.45 |
| Section heading (h2), Bricolage | 36px | 28px | 700 / 1.15 |
| Company, featured, Bricolage | 28px | 24px | 600 / 1.2 |
| Company, compact, Atkinson | 18px | 18px | 600 / 1.35 |
| Body and highlights, Atkinson | 18px | 17px | 400 / 1.6 |
| Meta and tile labels, Atkinson | 15px | 15px | 400 or 600 / 1.4 |

### Hero

```
+--------------------------------------------------------------------+
|  Ryan Chen  About Experience Projects Skills Education Contact     |
|                                                                    |
|  Ryan Chen                                         .------.        |
|  (60px Bricolage)                                 /  photo \       |
|                                                   \  (hex) /       |
|  Software engineer who learns fast, adapts         '------'        |
|  quickly, and loves a hard problem.             (only if supplied) |
|                                                                    |
|  [ mail ] [ LinkedIn ] [ GitHub ]   [ View Resume ]                |
|   '----'   '--------'   '------'     (filled Felt green)           |
+--------------------------------------------------------------------+
   max width 1080px; text left-aligned, max 640px wide
```

- The contact links are tiles: White, a 6px radius and a 2px Edge-colored bottom border.
- If a headshot is supplied, it sits in a hexagon frame, a nod to Hexagonal Reversi. Without one, the hero is a single column and nothing is drawn in that spot.

### Experience card

Featured cards are White, with a 12px radius and a 1px Edge border, at full content width. Compact entries have no card. Their borders and radii differ on purpose, so the shape shows the hierarchy.

```
.--------------------------------------------------------------.
|  Verisk Analytics Inc.                        Jan - Jun 2025 |
|  Junior Software Developer Co-op                             |
|                                                              |
|  - Designed and implemented a modular, reusable Secure       |
|    Internal API framework ... across 10+ services            |
|  - Contributed to the development of SFPublish, ...          |
|  - Developed an automated API deployment script ... by 30%   |
|  - Built and maintained Snowpipes to automate ingestion ...  |
'--------------------------------------------------------------'

   Ventus Health                                 Jun - Sep 2024
   Project Manager Assistant
   - Collaborated in the design and development of a mobile
     application aimed at connecting 100+ patients ...
```

- Scout's repo links are small tiles below its highlights.
- Projects sit in a three-column grid on desktop. On tablet the grid has two columns, and the third card spans the full width so it does not look like a leftover. On mobile there is one column.
- Each project card is White with an 8px radius, and its technologies are shown as small tiles.
- In Skills, the three groups (languages, frameworks, tools) are rows of tiles.

### Motion
One motion, and only in response to the user. On hover, a tile rises 1px. When pressed, it moves down 2px and its bottom edge disappears, as if you pressed a game piece (100ms, ease-out). Nothing animates on load or scroll. With `prefers-reduced-motion`, the tile only changes color and does not move.

### Dark mode, if approved later
The felt-green palette works well dark: a deep green-black background, a lighter mint-green accent, and tiles drawn with a lighter top edge instead of a darker bottom edge.

### Tradeoffs
- **Pro:** It has the most personality, and it shows the "loves a hard problem, learns new board games" side without any illustration.
- **Pro:** The tiles make the clickable things obvious.
- **Con:** It loads two font families, which adds about 40 to 60KB of WOFF2 and needs care to keep the first paint fast.
- **Con:** There are about 39 skill tiles, and 19 of them are tools. That is a lot of raised shapes, so the skill tiles may need a flatter, quieter style than the link tiles.
- **Con:** The warm, friendly tone reads less "enterprise data engineer" than Direction A, which may undersell the Verisk and Babel Street work for backend roles.

---

## Direction C: Highlighter

### Mood
Bright, clean and editorial, like a well-annotated reading copy. The page is one narrow column on white, set in a serif for headings. The memorable element is a single **marigold highlighter stroke** behind the tagline, as if someone marked up the one line that matters. The same marigold is reused only for link underlines. The highlighter idea comes from the content itself, since the resume's achievements are literally its `highlights`.

### Who it reads well with
Product-minded companies, developer-tools and search companies, and teams that value clear writing. It says "communicates well, thinks clearly."

### Palette

| Role | Name | Hex |
|---|---|---|
| Page background | White | `#FFFFFF` |
| Primary text, headings, button fill, focus ring | Ink violet | `#232136` |
| Secondary text | Dusk | `#5A5770` |
| Highlighter: band behind tagline, link underlines, button hover fill | Marigold | `#F5C542` |
| Hairline rules between sections (decorative) | Rule | `#E4E2EA` |

| Text / background | Ratio | AA |
|---|---|---|
| Ink violet on White | 15.6:1 | Pass |
| Dusk on White | 6.9:1 | Pass |
| Ink violet on Marigold (tagline on band, hovered button) | 9.6:1 | Pass |
| White on Ink violet (button label) | 15.6:1 | Pass |
| Ink violet focus ring vs White (UI) | 15.6:1 | Pass |
| Marigold vs White (underline only, never text) | 1.6:1 | Decorative only |

Link text is always Ink violet. The marigold underline is extra decoration. Links are recognizable by the underline's presence (shape), not by its color, so the 1.6:1 ratio does not fail WCAG 1.4.1. Even so, the underline is faint on white. To be safe, the spec would make the underline at least 3px thick.

### Type
- **Headings: Newsreader** (variable, with optical sizes; 400 and 500, plus italic). It is a modern text serif made for screens and keeps its shape at large display sizes.
- **Body: Public Sans** (400 and 600). It is a plain, neutral sans, so the serif can carry the personality and the highlights stay quick to scan.

| Use | Desktop | Mobile | Weight / line-height |
|---|---|---|---|
| Name (h1), Newsreader | 60px | 40px | 500 / 1.05 |
| Tagline, Newsreader italic, the whole line on the band | 30px | 24px | 400 / 1.35 |
| Section heading (h2), Newsreader | 36px | 28px | 500 / 1.15 |
| Company, featured, Newsreader | 28px | 24px | 500 / 1.2 |
| Company, compact, Public Sans | 17px | 17px | 600 / 1.4 |
| Body and highlights, Public Sans | 17px | 16px | 400 / 1.65 |
| Meta, Public Sans | 15px | 15px | 400 / 1.5 |

### Hero

```
+----------------------------------------------------------------+
|  Ryan Chen  About Experience Projects Skills Education Contact |
|                                                                |
|            Ryan Chen                                           |
|            (60px Newsreader)                                   |
|                                                                |
|            ▓Software engineer who learns fast,▓                |
|            ▓adapts quickly, and loves a hard  ▓                |
|            ▓problem.▓                                          |
|            (30px italic; marigold band behind each line)        |
|                                                                |
|            [mail] [in] [gh]    [ View Resume ]                 |
|                                                                |
+----------------------------------------------------------------+
     one column, max 640px, left-aligned; on desktop the column
     sits slightly right of center, leaving a left margin for dates
```

- The band is a background behind the inline text, repeated on each wrapped line. It covers the lower 60% of the line height, like a real highlighter pass.
- If a headshot is supplied, it is a 72px circle to the left of the name. Without one, nothing is reserved.

### Experience card

There are no boxes. Hierarchy comes from type size and from the margin.
- On wide screens (1200px and up), each entry's dates hang in the left margin beside the company name, like notes in a book margin. Below 1200px, the dates move under the title.
- Featured entries use a Newsreader company name and show every highlight. Compact entries are one Public Sans line plus their highlights at meta size.

```
                    Babel Street
  Jan - Jun 2026    Software Engineer Co-op
                    - Designed and developed Region of Origin
                      classification feature to improve matching
                      of multi-regional names, ...
                    - Led Java 25 migration across five
                      repositories; surfaced Solr and OpenSearch ...
                    - (all 5 highlights)

  Sep 2025 -        Scout, Senior Developer
  Present           - Co-led development of a React/Tailwind ...
                    - Built React-based frontend for 3 Stones, ...
                    NUMAC   3 Stones App   3 Stones Web
                    (underlined links, GitHub icon before each)
```

- Projects are three equal entries, stacked in the same single column. Each has the name in Newsreader 24px, then the technologies, the highlights and a GitHub link.
- Skills are three short paragraphs of comma-separated terms, one per group. They are not tags, which keeps the page textual and fast.

### Motion
One moment on page load: the highlighter band draws from left to right behind the tagline once, over 500ms, after the fonts load. Nothing else animates on load or scroll.
- Hover on a link thickens its marigold underline into a full marigold band behind the link text (150ms).
- With `prefers-reduced-motion`, the band is simply present from the start, and the hover change is instant.

### Dark mode, if approved later
This direction adapts most naturally. On a dark violet background, marigold becomes a readable text and accent color, and the band becomes a marigold underline under light text.

### Tradeoffs
- **Pro:** It looks the most distinctive and polished. The tagline gets real emphasis, which suits a tagline that is about character rather than a job title.
- **Pro:** It has the fewest components to build: no cards and no tag chips.
- **Con:** A single column makes the page long. Experience sits lower than in A, and the 30-second scan depends on the nav.
- **Con:** It loads two families, including a serif with italic, so it has the heaviest font payload of the three.
- **Con:** Skills as comma lists are less scannable than tags for a recruiter checking for "Java" or "AWS".
- **Con:** Marigold underlines on white are faint, as noted under the palette.

---

## Comparison

| | A: Index | B: Game Night | C: Highlighter |
|---|---|---|---|
| Temperature | Cool blue-grey | Warm green | Bright white and marigold |
| Type | 1 family (Plex Sans) | 2 sans (Bricolage + Atkinson) | Serif + sans (Newsreader + Public Sans) |
| Memorable element | Sticky rail nav with current-section marker | Pressable game tiles | Highlighter stroke on tagline |
| Featured vs compact | Panel vs no panel | Rounded card vs no card | Serif heading vs sans line |
| Skills | Tags (flat) | Tiles | Comma lists |
| Load motion | None | None | One (tagline stroke) |
| Font payload | Lightest | Medium | Heaviest |
| Time to reach Experience | Fastest (rail always visible on desktop) | Medium | Slowest (long single column) |
| Best audience fit | Backend, data, enterprise | Startups, product, agencies | Product and dev tools, writing-heavy teams |

## Recommendation

I lean toward **Direction A (Index)**.
- The plan's first goal is a 30-second scan, and the site's strongest proof is the backend and data work at Verisk and Babel Street. A fits both goals best.
- It is also the easiest of the three to keep at Lighthouse 95+.

If you want more personality, **Direction B** is the one I would pick second. Its tiles could also be borrowed into A for the skill tags only.

The choice is yours. You can also mix parts, for example A's layout with C's palette. If you do, I will check the combined contrast before writing the spec.

---

## Round 2

Status: **proposal, awaiting owner choice** (2026-10-15). Round 1 above is kept for reference. Round 2 follows the owner's feedback in `docs/decisions.md`, "Phase 2 Decisions (in progress)". Where that section conflicts with `plan.md` or Round 1, Round 2 follows decisions.md.

### What changed since Round 1

- **Feel:** I kept A's simple layout and made it warmer. The page should not read as backend-only.
- **Hero:** It is built around a casual photo of Ryan at the Golden Gate Bridge. The hero holds every contact link: email, LinkedIn, GitHub, Instagram and the resume PDF.
- **Removed:** the Contact section and its nav link. The "Skills" group is now "Technologies": 10 logos, no tools, no nav link.
- **Experience:** Scout and Ventus Health now get a lighter box that shows all their highlights.
- **Colors:** one light palette. No dark mode.
- **New:** two content arrangements, shown for each direction (section R2.1).

There are two directions. **D, Fog and Bridge** is the requested blend. **E, Postcard** is one alternative that I found worth showing. I did not add a third.

### Shared rules for both directions

- **Contrast:** I calculated the ratios by hand with the WCAG 2.x relative-luminance formula and rounded them down to one decimal. Frontend should confirm them with a checker. The thresholds are 4.5:1 for body text, 3:1 for large text, and 3:1 for meaningful non-text parts: link underlines, focus rings, the current-section marker, and button edges against the page.
- **Card borders are decorative.** A card's outline is not needed to understand or use the content, so WCAG 1.4.11 does not apply. The text inside every card meets AA on the card's own fill.
- **Fonts:** two typefaces at most, all from Google Fonts, self-hosted with `next/font/google`, and limited to the Latin subset.
- **Lighthouse 95+:**
  - The photo is the LCP element. It uses `next/image` with `priority`, a correct `sizes` value, and AVIF/WebP output.
  - All icons are inline SVG. There is no icon font and no runtime CDN.
  - Nothing animates on load in either direction.
- **The full name stays visible.** The greeting says "Ryan", but `basics.name` ("Ryan Chen") appears in the nav (D) or the header bar (E), and in the page `<title>`.
- **Nav:** About, Experience, Projects, Education. Hero, Technologies and Contact get no link. This nav is the same in both arrangements.
- **Avoided defaults on purpose:**
  - all-caps eyebrow labels and 01/02 numbering;
  - middle-dot meta strings and arrows on links;
  - monospace labels;
  - a cream page with a terracotta accent;
  - identical cards everywhere.

### The photo: how to supply and crop it

One source file serves every breakpoint. CSS `object-fit: cover` crops it to different shapes, so no second file is needed.

- **Supply** the original, uncropped photo, at least 1600px on the long edge. It can be portrait or landscape. Do not filter or tint it. The bridge's own orange is where both palettes get their accent, so it should stay true to life.
- **Safe area:** Ryan's face should sit near the horizontal center. The eyes should be about one-third of the way down. Keep everything important (face, shoulders, a piece of the bridge) inside the central 60% of the width. Then both the portrait crop and the landscape crop keep him and the bridge.
- **Composition:** frame from head to chest or waist, with a tower or the main cable visible behind one shoulder. Avoid a crop where a bridge line runs straight into the top of his head.
- **Crops used:**

| Direction | Desktop and tablet | Mobile |
|---|---|---|
| D, Fog and Bridge | 4:5 portrait, 280 x 350px, 12px radius | 4:3 landscape, full content width, 12px radius |
| E, Postcard | 4:5 portrait, fills the left half of the postcard, square corners inside an 8px white border | 3:2 landscape, top of the postcard |

- **Fallback:** if the face is off-center, Frontend sets `object-position` (for example `50% 30%`). If that is needed, Backend may want an optional focal-point field (see R2.4).
- **Alt text** is stored in `basics.image.alt` and the owner writes it. A neutral suggestion is "Ryan at the Golden Gate Bridge", but the owner should confirm the wording.

### Contact links in the hero (both directions)

The links are mixed on purpose, because they have different jobs:

| Link | Treatment | Why |
|---|---|---|
| Email | The address itself, `ry.chen2004@gmail.com`, as visible text with a small envelope icon. It is a `mailto:` link. | Easiest to find. A recruiter can read or copy it even with no mail client set up. |
| View resume | The one filled button. It opens `/resume.pdf` in a new tab. | It is the main next step. Wording comes from `plan.md`, in sentence case. |
| LinkedIn, GitHub, Instagram | An icon plus a visible text label, as quiet links in one row, in that order. | Labels are clearer than icons alone. Instagram is personal, so it goes last. |

Every link and the button has a hit area of at least 44 x 44px.

---

### R2.1 The two content arrangements

These apply to both directions. The wireframes in D and E show each one.

**Arrangement 1: tagline in the hero**
- Hero: "Hello, I'm Ryan.", the tagline (`basics.tagline`), then the contact links.
- About: `basics.summary`.
- Technologies: a separate section with an `h2` and no nav link.
- Section order: Hero, About, Experience, Projects, Technologies, Education. This is `plan.md`'s order without Contact.

**Arrangement 2: school in the hero**
- Hero: `[GREETING PLACEHOLDER: "Hello, I'm Ryan, from Northeastern University." Owner to confirm wording]`, then the contact links. There is no tagline in the hero.
- About: the tagline as the opening line at 21px, then `basics.summary`, then a "Technologies" sub-group (`h3`) with the 10 logos.
- Section order: Hero, About (with Technologies), Experience, Projects, Education. Technologies moves up, above Experience, and is no longer a section of its own.
- Nav: unchanged (About, Experience, Projects, Education). The About link now also leads to Technologies.

**Comparison**

| | Arrangement 1 | Arrangement 2 |
|---|---|---|
| First glance says | "Software engineer", from the tagline | "Student at Northeastern" |
| Fits the 30-second goal | Better. Role and character are visible before any scroll. | Weaker. The role sits in About, just below the hero on desktop and one scroll down on mobile. |
| Hero density | Fuller: greeting, tagline, 5 links | Lighter and calmer. Suits Postcard's short message side. |
| Repetition | Northeastern appears in the summary and in Education. | Northeastern appears three times: hero, summary, Education. |
| Technologies | Seen after Projects, as supporting proof | Seen early, before Experience |
| Sections to build | 6 | 5, but About is a richer block |

---

### R2.2 Direction D: Fog and Bridge (the requested blend)

#### Mood
A's quiet, document-like layout, warmed by the photo. The page is a soft fog grey, close to neutral and not cream. The text is a warm charcoal. There is one accent: International Orange, `#C0362C`, the Golden Gate Bridge's own paint color. The accent is not a decorative choice: it repeats the bridge in the photo. It is used only on links, the current-section marker and the resume button.
- **The memorable thing** is the photo and the matching orange.
- **Everything else** stays disciplined.
- The type is a friendly geometric sans instead of A's engineering Plex. That removes the enterprise tone without adding decoration.

#### Palette

| Role | Name | Hex |
|---|---|---|
| Page background | Fog | `#F4F3F0` |
| Featured card surface | White | `#FFFFFF` |
| Primary text, headings, logos, focus ring | Charcoal | `#24201D` |
| Secondary text (titles, dates, tech lists) | Pebble | `#5E5751` |
| Accent: link underlines, current-nav marker, resume button | Bridge | `#C0362C` |
| Button hover (darker Bridge) | Bridge deep | `#A02D24` |
| Card borders, dividers (decorative) | Rule | `#DAD6D0` |

| Pair | Ratio | Needed | Result |
|---|---|---|---|
| Charcoal on Fog | 14.5:1 | 4.5 | Pass |
| Charcoal on White | 16.1:1 | 4.5 | Pass |
| Pebble on Fog | 6.3:1 | 4.5 | Pass |
| Pebble on White | 7.1:1 | 4.5 | Pass |
| Bridge on Fog (as text, if used) | 4.9:1 | 4.5 | Pass |
| Bridge on White | 5.5:1 | 4.5 | Pass |
| White on Bridge (button label) | 5.5:1 | 4.5 | Pass |
| White on Bridge deep (hovered button) | above 5.5:1 (every channel is darker) | 4.5 | Pass |
| Bridge underline vs Fog (non-text) | 4.9:1 | 3 | Pass |
| Bridge underline vs White (non-text) | 5.5:1 | 3 | Pass |
| Bridge current-nav bar vs Fog (non-text) | 4.9:1 | 3 | Pass |
| Bridge button edge vs Fog (non-text) | 4.9:1 | 3 | Pass |
| Charcoal 2px focus ring vs Fog / White | 14.5:1 / 16.1:1 | 3 | Pass |
| Rule vs Fog | about 1.3:1 | none | Decorative only |

Link text stays Charcoal, so the text is at 14.5:1. The orange underline marks the link, and it passes 3:1 on its own.

#### Type
- **One family: Figtree** (variable, weights 400, 600 and 700). It is open, round and friendly, but still precise at small sizes. One family means one font file, the same as A.
- Dates are right-aligned in card headers, so the design does not depend on tabular figures.

| Use | Desktop | Mobile | Weight / line-height |
|---|---|---|---|
| Greeting (h1) | 48px | 36px | 700 / 1.1, letter-spacing -0.015em |
| Tagline (Arr. 1 hero; Arr. 2 About lead) | 24px (Arr. 2: 21px) | 21px (Arr. 2: 18px) | 400 / 1.35 |
| Section heading (h2) | 24px | 21px | 700 / 1.25 |
| Company, featured | 24px | 21px | 600 / 1.25 |
| Company, compact | 18px | 18px | 600 / 1.3 |
| Body and highlights | 17px | 16px | 400 / 1.6 |
| Meta, contact labels, tech names | 15px | 15px | 400 or 600 / 1.45 |

The content column is at most 680px wide, which gives about 75 characters per line at 17px.

#### Nav
- **Desktop (1200px and up):** A's sticky left rail, 220px wide. "Ryan Chen" at 18px/600 sits at the top, with the four links below it at 15px.
  - The current section gets Charcoal text and a 3px Bridge bar on its left.
  - Other links are Pebble.
- **Tablet and mobile:** a plain header at the top of the page that does not stick.
  - Row 1 is "Ryan Chen". Row 2 is the four links, which fit in one row at 375px.
  - It does not stick because the mobile hero is tall.
  - There is no hamburger menu.

#### Hero, Arrangement 1

Desktop:
```
+------------------+---------------------------------------------------+
| Ryan Chen        |                                                   |
|                  |  Hello, I'm Ryan.                  +-----------+  |
| | About          |                                    |           |  |
|   Experience     |  Software engineer who learns      |  photo    |  |
|   Projects       |  fast, adapts quickly, and loves   |  4:5      |  |
|   Education      |  a hard problem.                   |  280x350  |  |
|                  |                                    |           |  |
|  (sticky rail;   |  [envelope] ry.chen2004@gmail.com  |           |  |
|   "|" = Bridge   |                                    +-----------+  |
|   current bar)   |  [ View resume ]  [in] LinkedIn  [gh] GitHub       |
|                  |                   [ig] Instagram                  |
+------------------+---------------------------------------------------+
                     text left-aligned, ~380px; photo right; 40px gap
```

Mobile (375px):
```
+-----------------------------------+
| Ryan Chen                         |
| About  Experience  Projects  Edu. |   (all four labels in full)
|                                   |
| +-------------------------------+ |
| |        photo, 4:3 crop        | |
| +-------------------------------+ |
| Hello, I'm Ryan.                  |
| Software engineer who learns      |
| fast, adapts quickly, and loves   |
| a hard problem.                   |
| [envelope] ry.chen2004@gmail.com  |
| [ View resume ]                   |
| [in] LinkedIn [gh] GitHub [ig] Instagram |
+-----------------------------------+
```

#### Hero, Arrangement 2
It has the same grid. The text column holds the placeholder greeting, then the email, the button and the icon links. The tagline moves to About, so the text column is shorter, and the photo's height sets the hero's height.
```
|  [GREETING PLACEHOLDER: "Hello, I'm       +-----------+  |
|   Ryan, from Northeastern University."]   |  photo    |  |
|                                           |  4:5      |  |
|  [envelope] ry.chen2004@gmail.com         |           |  |
|  [ View resume ]  [in] LinkedIn ...       +-----------+  |
|-----------------------------------------------------------|
|  About                                                    |
|  Software engineer who learns fast, adapts quickly,       |
|  and loves a hard problem.          (21px, Charcoal)      |
|  I'm a Computer Science student at Northeastern, ...      |
|  Technologies                        (h3, 18px/600)       |
|  [logo grid, see below]                                   |
```

#### Experience cards
- **Featured (Babel Street, Verisk):** full column width, placed first, with every highlight.
  - White fill, 1px Rule border, 12px radius, 32px padding (24px on mobile).
  - The company is 24px. The title is Pebble 15px, and the dates are right-aligned on the company line.
```
+--------------------------------------------------------------+
|  Babel Street                                 Jan - Jun 2026 |
|  Software Engineer Co-op                                     |
|                                                              |
|  - Designed and developed Region of Origin classification    |
|    feature to improve matching of multi-regional names, ...  |
|  - Built a multilingual person-name data pipeline in Python  |
|    by parsing a Wikidata dump, ...                           |
|  - (all 5 highlights)                                        |
+--------------------------------------------------------------+
```
- **Compact (Scout, Ventus Health):** a lighter box with every highlight.
  - No fill (Fog shows through), a 1px Rule border, 8px radius, 20px padding.
  - The company is 18px and the highlights are 16px.
  - On desktop the two compact boxes sit side by side in a two-column grid. On mobile they stack.
  - Scout's three repo links sit in a row at the bottom: GitHub icon plus label, 15px, Charcoal text with a Bridge underline.
```
+-----------------------------+  +-----------------------------+
| Scout     Sep 2025 - Present|  | Ventus Health  Jun - Sep 2024|
| Senior Developer            |  | Project Manager Assistant   |
| - Co-led development of a   |  | - Collaborated in the design|
|   React/Tailwind frontend   |  |   and development of a      |
|   for NUMAC, ...            |  |   mobile application ...    |
| - Built React-based ...     |  |                             |
| [gh] NUMAC [gh] 3 Stones App|  |                             |
| [gh] 3 Stones Web           |  |                             |
+-----------------------------+  +-----------------------------+
```
In the grid, the two boxes match heights, so Ventus Health's shorter box does not look broken.

#### Project cards (three equal)
All three use one component: White fill, 1px Rule border, 12px radius. They stack in the content column, in `resume.json` order. Stacking gives no card a privileged position, which a three-column grid inside a 680px column would.
- **With screenshots:**
  - Desktop and tablet: the image is on the left, 240px wide at 16:10, with an 8px radius and a 1px Rule frame. The text is on the right: name 21px/600, date in Pebble right-aligned, technologies in Pebble 15px, highlights, then "[gh] GitHub".
  - Mobile: the image sits on top, at full width.
```
+--------------------------------------------------------------+
| +-----------+  CodeStack                       Oct - Dec 2025 |
| | screenshot|  React.js, TypeScript, MongoDB, Socket.io, CSS,|
| |  16:10    |  Jest                                          |
| +-----------+  - Implemented social networking features ...   |
|                [gh] GitHub                                    |
+--------------------------------------------------------------+
```
- **Fakebook Crawler** uses a terminal screenshot, in the same 16:10 frame at the same size.
  - **What to crop out:** the secret flags, plus any usernames, session cookies or IDs, hostnames and local file paths.
  - **Light terminal theme:** I recommend capturing with one. A dark terminal next to two light app screenshots would draw the eye and break the equal weighting.
- **Without screenshots:** the image slot is removed from the component, so the text spans the card. The three cards are identical in structure.
- **All or none:** if even one screenshot is missing, none are shown. Frontend decides this from the data at build time, so a half-supplied set never renders.

#### Technologies
- **Layout:** 10 items, always in this order: Java, Python, TypeScript, C++, HTML, CSS, SQL, React.js, Tailwind, Next.js.
  - Desktop: a 5 x 2 grid. Tablet: 4 columns. Mobile: 2 columns.
  - Each item is a 24px logo with its name beside it (15px/600, Charcoal), with 12px between logo and name.
- **Not interactive:** the items have no hover state, box or chip. They are information, not controls, and making them look clickable would mislead.
- **Monochrome:** the logos are Charcoal and `aria-hidden`, because the visible name carries the meaning.
```
[J] Java     [Py] Python   [TS] TypeScript   [C++] C++    [H] HTML
[C] CSS      [db] SQL      [R] React.js      [~] Tailwind [N] Next.js
```

#### Motion
Nothing animates on load or scroll. Only the user's actions get feedback:
- **Links:** on hover, the underline goes from 1px to 2px and the text turns Bridge (120ms).
- **Button:** on hover, the fill changes to Bridge deep (120ms).
- **Rail:** the current-section bar moves to the new item (150ms, ease-out).
- **Anchor jumps** use smooth scrolling.
- **Focus:** a 2px Charcoal outline with a 2px offset on every focusable element, shown on `:focus-visible`.
- **With `prefers-reduced-motion: reduce`:** all of the changes above happen instantly, and anchor jumps do not scroll smoothly.

#### Tradeoffs
- **Pro:** it is closest to what the owner asked for. It keeps A's scannability and the fastest route to Experience, with one font file.
- **Pro:** the accent is tied to the photo, so the page feels personal without any decoration.
- **Pro:** there is little to build beyond A, and the compact boxes and stacked projects are simple.
- **Con:** a warm grey with a red-orange accent is close in spirit to the common cream-and-terracotta look. It stays distinct because the background is near-neutral, the type is a sans, and the orange is used sparingly and drawn from the photo. If the photo has little visible bridge, the orange loses its reason to be there.
- **Con:** the rail still needs an IntersectionObserver and a separate mobile header.

---

### R2.3 Direction E: Postcard (alternative)

#### Mood
A Golden Gate photo is the most classic postcard there is. Postcard leans into that, once, in the hero only.
- **The hero** is a white postcard lying on a pale sky-blue page. The photo is on the front half. The "message side" holds the greeting, written as a greeting, and the contact links, set like the address lines on a postcard.
- **No props:** no stamp, postmark or handwriting font. A thin orange center line is the only postcard cue.
- **Below the hero,** the page is plain and single-column, close to A's simplicity but with a top nav instead of a rail.
- **The feel** is warm, personal and a little nostalgic, which supports "open to learning anything". The serif headings add warmth that a sans does not.

#### Palette

| Role | Name | Hex |
|---|---|---|
| Page background | Sky | `#EDF2F5` |
| Postcard, featured cards, project cards | White | `#FFFFFF` |
| Primary text, headings, logos, focus ring | Bay ink | `#1C2B3A` |
| Secondary text, address lines | Harbor | `#4F5D6B` |
| Links (text) and the resume button | Bay blue | `#1F5C8A` |
| Postcard center line, current-nav underline | Bridge | `#C0362C` |
| Card borders (decorative) | Rule | `#CED8E0` |

| Pair | Ratio | Needed | Result |
|---|---|---|---|
| Bay ink on White | 14.4:1 | 4.5 | Pass |
| Bay ink on Sky | 12.7:1 | 4.5 | Pass |
| Harbor on White | 6.7:1 | 4.5 | Pass |
| Harbor on Sky | 5.9:1 | 4.5 | Pass |
| Bay blue on White | 7.1:1 | 4.5 | Pass |
| Bay blue on Sky | 6.2:1 | 4.5 | Pass |
| White on Bay blue (button label) | 7.1:1 | 4.5 | Pass |
| Harbor address-line underlines vs White (non-text) | 6.7:1 | 3 | Pass |
| Bay blue link underline vs Sky (non-text) | 6.2:1 | 3 | Pass |
| Bridge current-nav underline vs White header (non-text) | 5.5:1 | 3 | Pass |
| Bay ink 2px focus ring vs White / Sky | 14.4:1 / 12.7:1 | 3 | Pass |
| Bridge postcard center line | 5.5:1 on White | none | Decorative |

#### Type
- **Headings: Young Serif** (one weight, 400). It is a warm serif with a soft, slightly heavy feel, so it reads as friendly, not formal. It is used only for the greeting, the h2s and the featured company names.
- **Body: Source Sans 3** (variable, 400 and 600). It is plain and very legible, and clearly different from the serif.
- The serif is used only at large sizes, so its body-text line height does not matter.

| Use | Desktop | Mobile | Weight / line-height |
|---|---|---|---|
| Greeting (h1), Young Serif | 48px | 36px | 400 / 1.1 |
| Tagline, Source Sans 3 | 21px | 18px | 400 / 1.45 |
| Section heading (h2), Young Serif | 36px | 28px | 400 / 1.15 |
| Company, featured, Young Serif | 24px | 21px | 400 / 1.25 |
| Company, compact, Source Sans 3 | 18px | 18px | 600 / 1.3 |
| Body and highlights, Source Sans 3 | 18px | 17px | 400 / 1.6 |
| Meta, address lines, tech names | 15px | 15px | 400 or 600 / 1.45 |

The content column is at most 680px wide. The hero postcard is wider, at most 960px.

#### Nav
- A white header bar, sticky on every screen size, with a 1px Rule bottom border.
- "Ryan Chen" (Source Sans 3, 600) sits on the left and the four links on the right.
- The current section gets a 2px Bridge underline.
- On mobile, the links move to a second row below the name. The bar stays thin (about 88px tall in total).

#### Hero, Arrangement 1

Desktop:
```
  Sky page
  +------------------------------------------------------------------+
  | +-------------------------+  |  Hello, I'm Ryan.                  |
  | |                         |  |                                    |
  | |                         |  |  Software engineer who learns fast,|
  | |       photo, 4:5        |  |  adapts quickly, and loves a hard  |
  | |   (8px white border     |  |  problem.                          |
  | |    is the card itself)  |  |                                    |
  | |                         |  |  [envelope] ry.chen2004@gmail.com  |
  | |                         |  |  ________________________________  |
  | |                         |  |  [in] LinkedIn   [gh] GitHub       |
  | |                         |  |  ________________________________  |
  | |                         |  |  [ig] Instagram                    |
  | +-------------------------+  |  ________________________________  |
  |                              |  [ View resume ]                   |
  +------------------------------------------------------------------+
     white postcard, 3:2 overall, max 960px, 8px radius, no shadow;
     "|" is a 2px Bridge center line; "____" are Harbor address lines
```
- The address lines are real underlines of the links, so they pass the 3:1 requirement and also mark the links.
- **Tablet:** the same layout at a smaller size.
- **Mobile:**
  - The postcard stacks: the photo (3:2) is on top.
  - The center line turns horizontal.
  - The message side sits below.

#### Hero, Arrangement 2
The message side holds only the placeholder greeting and the address lines. This fits the postcard idea best: a short greeting with plenty of white space, like a real postcard.
```
  |  [GREETING PLACEHOLDER: "Hello, I'm Ryan,  |
  |   from Northeastern University."]         |
  |                                           |
  |  [envelope] ry.chen2004@gmail.com         |
  |  ______________________________________   |
  |  [in] LinkedIn   [gh] GitHub              |
  |  ______________________________________   |
  |  [ig] Instagram   [ View resume ]         |
```
About follows on the Sky page:
1. the tagline at 21px in Bay ink;
2. the summary;
3. "Technologies" (h3, Young Serif 24px) with the logo grid.

#### Experience cards
- **Featured:**
  - White card on Sky, 1px Rule border, 8px radius (matching the postcard), 32px padding.
  - The company name is in Young Serif 24px, with every highlight.
- **Compact:**
  - No fill, 1px Rule border, 8px radius, 20px padding.
  - The company name is in Source Sans 3 at 18px/600, with every highlight.
  - Two boxes sit side by side on desktop and stack on mobile.
  - Scout's repo links are Bay blue text with underlines and GitHub icons.

The change of typeface between featured (serif) and compact (sans) adds a second hierarchy cue on top of the fill.
```
+--------------------------------------------------------------+
|  Verisk Analytics Inc.                        Jan - Jun 2025 |
|  (Young Serif 24px)                                          |
|  Junior Software Developer Co-op                             |
|  - Designed and implemented a modular, reusable Secure       |
|    Internal API framework ... across 10+ services            |
|  - (all 4 highlights)                                        |
+--------------------------------------------------------------+
```

#### Project cards (three equal)
- The structure is the same as D: one component, stacked in resume order, all or none for images.
- **With screenshots:** the image sits on top of the card, at full card width and 16:10, inside an 8px white inset. It looks like a small print, which echoes the postcard without adding props. The text follows below.
- **Fakebook Crawler:** the terminal capture uses the same frame. A light terminal theme is recommended, for the same reason as in D.
- **Without screenshots:** the cards are text only. The project name is in Young Serif 21px so the cards still have presence.
```
+------------------------------------+
| +--------------------------------+ |
| |   screenshot 16:10             | |
| +--------------------------------+ |
| Hexagonal Reversi    Nov - Dec 2023|
| Java, Swing, Git, JUnit            |
| - Developed a feature-rich Java    |
|   implementation of Reversi ...    |
| [gh] GitHub                        |
+------------------------------------+
```

#### Technologies
The grid, order, monochrome rule and visible names are the same as D. The logos are Bay ink and the names are 15px/600.

#### Motion
Nothing animates on load or scroll. The postcard does not tilt or drop in.
- **Links:** on hover, the underline goes from 1px to 2px (120ms).
- **Button:** on hover, the fill darkens (120ms).
- **Header:** the current-nav underline moves to the active link (150ms).
- **Focus:** a 2px Bay ink ring with a 2px offset.
- **With `prefers-reduced-motion: reduce`:** every change is instant, and anchor jumps do not scroll smoothly.

#### Tradeoffs
- **Pro:** it has the strongest and most personal first impression. The hero idea comes straight from the photo the owner chose.
- **Pro:** Arrangement 2's short greeting suits it naturally.
- **Pro:** blue ink with an orange line reads friendly and creative, not enterprise.
- **Con:** two font families. This is more weight than D, but still well within the 95+ budget if limited to Latin.
- **Con:** the postcard is a custom component, and the hero is the tallest of the two directions on mobile. Experience starts about two screens down on mobile.
- **Con:** the hero depends on the photo. A weak photo hurts E more than D.
- **Con:** with no rail, desktop visitors reach Experience through the top bar rather than an always-visible rail. In practice that is one click in both directions.

---

### R2.4 Data the design needs that `resume.json` lacks today

This list is for Backend, which will propose the schema changes after the owner picks a direction. I am not proposing field names or schema shapes. The names below only describe the content.

**Needed in both arrangements and both directions**

| Need | Status today | Notes |
|---|---|---|
| Hero greeting text | Missing. "Hello, I'm Ryan." exists only in `decisions.md`. | It must live in `resume.json`, not in a component (`CLAUDE.md`). |
| Instagram profile | Missing from `basics.profiles`. The URL `https://www.instagram.com/ryan.chen2` is in `decisions.md`. | It can likely use the existing `profiles` shape. |
| Hero photo | The `basics.image` field exists; there is no file and no alt text. | The owner supplies the file (see the photo guide) and the alt text. |
| Photo focal point (optional) | Missing | Only needed if the face is off-center. |
| Curated Technologies list, in order | Missing. `skills` has 39 items in three groups, in a different order, including tools. | The 10 names in the owner's order, kept separate from the full skills data. |
| Logo identifier per technology | Missing | Simple Icons slugs (R2.5) plus a marker for SQL's custom glyph. |
| Project screenshots | `projects[].image` exists; no files. | All three or none. The crawler file must be cropped as described. |
| Resume PDF | Outside the scope of `resume.json`. Expected at `public/resume.pdf`. | Backend should confirm the file is present before Phase 4. |

**Different in Arrangement 2**

| Need | Notes |
|---|---|
| The greeting text has a different value | It is the placeholder until the owner confirms the wording. Both arrangements use the same field. |
| No new fields | The tagline moves to About, and Technologies moves into About. Both are layout changes only. |

The existing `skills` object (languages, frameworks, tools) is no longer shown anywhere. Backend and the owner should decide whether to keep it as unused data or replace it with the curated list.

---

### R2.5 Logo source

**I recommend Simple Icons** (`simple-icons` npm package, v16.35.0 checked; license CC0, though brand trademark rules still apply).
- **Why it fits:** every icon is a single-color path on a 24 x 24 grid, so they render evenly in one color.
- **How Frontend should use it:** import the 10 icons from a pinned version and inline them as SVG. No CDN and no icon font, which protects Lighthouse.
- **Why not Devicon:** its icons are mostly full-color originals. React, for example, has no plain one-color variant, so the set would need recoloring and evening out.

| Technology | Simple Icons | Devicon | Notes |
|---|---|---|---|
| Java | Yes (`java`) | Yes | |
| Python | Yes (`python`) | Yes | |
| TypeScript | Yes (`typescript`) | Yes | |
| C++ | Yes (C++) | Yes (`cplusplus`) | |
| HTML | Yes (`html5`) | Yes (`html5`) | The HTML5 shield |
| CSS | Yes (`css`) | Yes (`css3`) | Simple Icons uses the newer community CSS logo, not the CSS3 shield, so it will not match the HTML5 shield visually. |
| SQL | **No** | **No** | Neither has a generic SQL logo, only vendor logos such as MySQL, PostgreSQL, SQLite and SQL Server. A vendor logo would misrepresent the skill. |
| React.js | Yes (`react`) | Yes | |
| Tailwind | Yes (`tailwindcss`) | Yes | |
| Next.js | Yes (`nextdotjs`) | Yes | |

- **For SQL,** I recommend a neutral database-cylinder glyph, for example Lucide's `database` icon (ISC license), drawn at a weight that matches the filled Simple Icons.
- **Contact icons:**
  - LinkedIn, GitHub and Instagram come from Simple Icons (all three checked as present).
  - The envelope comes from Lucide `mail`, so the email does not show a Gmail brand mark.

**Brand colors vs. monochrome:** I recommend monochrome in the ink color.
- Several brand colors fall below 3:1 on a light background, React's light cyan and Tailwind's teal among them.
- Ten brand colors in a row compete with the photo and the single accent.
- Monochrome reads as one considered set.

**Names next to logos:** yes, always.
- C++, CSS and SQL are hard to recognize from the logo alone, and a recruiter scanning for "Java" reads words.
- Visible names let the logos stay `aria-hidden`.

---

### R2.6 Recommendation

I lean toward **Direction D (Fog and Bridge) with Arrangement 1**.
- It is the closest match to the brief: A's simple layout, made warmer, with one typeface.
- Arrangement 1 puts "Software engineer" and the tagline in the first screen, which serves the 30-second goal.
- Arrangement 2 opens with the school. On a page for recruiters, the school is a weaker first fact than the role, and it would repeat three times.

**If the owner wants more personality,** E (Postcard) is the stronger first impression, and it suits Arrangement 2 well.

**Mixing:** parts can be combined, for example D's layout with E's serif headings. If you mix, I will recheck contrast before writing the spec.

The choice is the owner's.

---

## Round 2 addendum: Direction D refinements

Status: the owner picked **Direction D with Arrangement 1**. This addendum refines D only. Direction E and Arrangement 2 are no longer in play. Everything in R2.2 still applies unless this section changes it. The spec, tokens and code come later.

Newly approved in `docs/decisions.md`:
- **Greeting:** "Hello, I'm Ryan."
- **Alt text:** "Ryan at the Golden Gate Bridge"
- **Project images:** none for any project.

### A.1 Experience as a timeline

**Primary design: strictly by date, every entry styled the same.** The owner is leaning this way. There is no featured emphasis. Babel Street (5 highlights) and Verisk (4) stand out only because they hold more content.

**Order: newest start date first.** That gives Babel Street, Scout, Verisk, Ventus Health.
- Start date is the usual way to order a timeline that contains a current role, and it keeps the most recent co-op at the top.
- The alternative is newest end date first, with "Present" counting as newest. That order is Scout, Babel Street, Verisk, Ventus Health, and it would open the section with a part-time student role.
- **Sort rule:** sort by `startDate`, newest first. This is a derived helper in Backend's `src/lib/`, and it needs no schema change.

**Overlap:** Scout (Sep 2025 to now) overlaps Babel Street (Jan to Jun 2026). The date text shows the overlap, with no extra graphics.
- Scout's "Sep 2025 - Present" sits directly under Babel Street's "Jan - Jun 2026", so a reader sees that they ran at the same time.
- Parallel lanes would be more literal, but they break down at 375px and add a second visual idea to a minimal page.

**Layout (the same on desktop, tablet and mobile)**

```
  Experience

  ●──  +------------------------------------------------------+
  │    |  Babel Street                         Jan - Jun 2026 |
  │    |  Software Engineer Co-op                             |
  │    |  - (all 5 highlights)                                |
  │    +------------------------------------------------------+
  │
  ●──  +------------------------------------------------------+
  │    |  Scout                            Sep 2025 - Present |
  │    |  Senior Developer                                    |
  │    |  - (both highlights)                                 |
  │    |  [gh] NUMAC  [gh] 3 Stones App  [gh] 3 Stones Web    |
  │    +------------------------------------------------------+
  │
  ●──  +------------------------------------------------------+
  │    |  Verisk Analytics Inc.                Jan - Jun 2025 |
  │    |  Junior Software Developer Co-op                     |
  │    |  - (all 4 highlights)                                |
  │    +------------------------------------------------------+
  │
  ●──  +------------------------------------------------------+
       |  Ventus Health                        Jun - Sep 2024 |
       |  Project Manager Assistant                           |
       |  - (1 highlight)                                     |
       +------------------------------------------------------+
```

- **Line:** 2px wide, Rule color, decorative. It sits 7px from the left edge of the content column and runs from the first node to the last, no further.
- **Nodes:** one style for every entry, a 12px solid Charcoal dot. Each dot is centered on the first line of the company name and is `aria-hidden`.
- **Gutter** between the line and the cards: 32px on desktop and tablet, 24px on mobile. Because the layout is the same at every width, mobile needs no separate design.
- **Card:** one style for every entry.
  - White fill, 1px Rule border, 12px radius, 28px padding (24px on mobile), full column width.
  - Company name at 21px/600 (18px on mobile).
  - Title in Pebble at 15px.
  - Dates in Pebble at 15px, right-aligned on the company line. Below 400px wide, they wrap under the company name.
  - Every highlight shown, at 17px (16px on mobile).
  - Scout's repo links sit in a row at the bottom.
  - This one card replaces both the featured and compact variants from R2.2.
- **Spacing:** 24px between entries on desktop, 20px on mobile.
- **No year labels and no "Current" badge.** The dates already carry that information.
- **Markup:** an ordered list (`<ol>`), because the entries form a real sequence.

**If the featured variant is kept instead (not fully designed):** the order stays by start date. Babel Street and Verisk would use a larger card (24px company name, 32px padding) and a 16px dot. Scout and Ventus Health would use a lighter outlined box with no fill, 18px company name and a 10px ring. Verisk would be third, not "placed first".

**What happens to the `featured` field if it is dropped:** nothing on the page would read it.
- Backend would remove it from `data/schema.ts` and `resume.json`, after the owner approves.
- This reverses the Phase 1 decision to keep `featured` on experiences only, and the Phase 0 decision "featured, larger, placed first". Both should be updated in `decisions.md`.

**What the owner has to decide**
1. Confirm "strictly by date, no featured emphasis". This approves removing `featured`.
2. Confirm newest start date first (Babel Street on top), rather than newest end date first (Scout on top).

### A.2 Subtle animation

There are two motions. Only one of them is new.

**1. Timeline cards reveal once on scroll (new).** This is the site's one ambient motion, and it is used only on the timeline. Using it on every section would make the page look generic.
- **What moves:** each timeline card and its dot fade in (opacity 0 to 1) and rise 12px (translateY 12px to 0) the first time about 15% of the card enters the viewport.
- **Timing:** 320ms with `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out). There is no stagger delay; each card triggers on its own entry.
- **Once only:** a card never fades out or replays when the visitor scrolls back up.
- **It must never hide content:**
  - In plain CSS, every card is visible.
  - A small IntersectionObserver script adds the hidden starting state only to cards that are below the viewport when the page loads, and only if motion is allowed.
  - Without JS, cards already in view at load, and reduced-motion visitors all see the content straight away.
  - Only `opacity` and `transform` are animated, so there is no layout shift (CLS).
  - The timeline is below the hero, so it cannot affect LCP.
- **With `prefers-reduced-motion: reduce`:** no hidden state and no movement. Cards are simply there.

**2. The current-section marker in the rail slides (kept from R2.2, with timing changed).**
- **What moves:** the 3px Bridge bar moves to the newly active nav item.
- **Timing:** 200ms with `cubic-bezier(0.2, 0, 0, 1)`. Only `transform` is animated.
- **With `prefers-reduced-motion: reduce`:** the bar jumps instantly.

**Other motion:**
- Link and button hover color changes (120ms) stay. They are color changes, not movement, so they are kept under reduced motion.
- Smooth scrolling on anchor jumps applies only under `prefers-reduced-motion: no-preference`.
- Nothing in the hero animates.

### A.3 Project card, final (no images)

There are no screenshots. The three cards use one identical component and are stacked in `resume.json` order: CodeStack, Fakebook Crawler, Hexagonal Reversi.

```
+--------------------------------------------------------------+
|  CodeStack                                    Oct - Dec 2025 |
|  React.js, TypeScript, MongoDB, Socket.io, CSS, Jest         |
|                                                              |
|  - Implemented social networking features including          |
|    follow/unfollow system with real-time updates ...         |
|  - Developed two-factor authentication with QR code ...      |
|                                                              |
|  [gh] GitHub                                                 |
+--------------------------------------------------------------+
```

- **Surface:** White fill, 1px Rule border, 12px radius, 28px padding (24px on mobile), 20px gap between cards.
- **Header line:** the name is 21px/600 Charcoal (18px on mobile). The date is 15px Pebble, right-aligned. Below 400px wide, the date wraps under the name.
- **Technologies:** one line of 15px Pebble, joined with commas, taken from `projects[].technologies`. These are plain text, not chips, so they don't compete with the Technologies section.
- **Highlights:** 17px (16px on mobile), with a disc bullet in Pebble.
- **Link:** a GitHub icon and the label from `links[].label` ("GitHub"), in Charcoal with a Bridge underline. It opens in a new tab. The link is the only interactive part; the card itself is not clickable.
- **Equal weight:** every card has the same size, color and spacing. Heights differ only because the text differs (CodeStack has two highlights). There is no image slot and nothing is reserved for one.
- **Projects get no timeline line,** even though they have dates. The timeline belongs to Experience only, so it stays a single idea.

### A.4 SQL logo

**Decided:** SQL uses a generic database icon, for example Lucide `database` (ISC license).
- It is drawn at a stroke weight that matches the filled Simple Icons, in Charcoal at 24px, with the name "SQL" beside it like the other nine.
- **Why there is no official logo:** SQL is a language standard (ISO/IEC 9075), not a product, so nobody publishes a brand for it. Only the databases that use it (PostgreSQL, MySQL and others) have logos.

**HTML and CSS** (from `decisions.md`): Simple Icons' `html5` shield and its newer `css` logo don't match. If the build check shows they look too different, Devicon's `css3` shield, recolored to Charcoal, is the closest match to the HTML5 shield.

### A.5 Not SF-based: audit of D

| Item | Leans on SF? | Action |
|---|---|---|
| Photo and its approved alt text | It states a fact: Ryan visited the bridge. It does not say where he lives. | Keep. |
| Accent `#C0362C` (the bridge's orange) | No. Visitors see an orange, with no label. | Keep, as the owner approved. |
| Direction name "Fog and Bridge" | Slightly. "Fog" is a well-known San Francisco reference. Visitors never see this name; it exists only in these docs. | The spec will call it "Direction D". |
| Color names "Fog", "Bridge" and "Bridge deep" | Slightly, and they would end up in Tailwind token names. | Rename in the spec to neutral roles: Fog becomes **Paper**, Bridge becomes **Accent**, Bridge deep becomes **Accent deep**. Charcoal, Pebble and Rule stay. The hex values don't change. |
| Copy on the site | No. Every piece of visible text comes from `resume.json`. It contains no San Francisco reference, and the only location in it is "Boston, MA" in Education. | No change. |
| Theming | No skyline, bridge shapes, fog texture or postcard elements in D. | Keep it that way. No decoration drawn from the bridge should be added. |
| Direction E (Postcard) | It was the most SF-themed option. | Not chosen, so nothing to do. |

### A.6 Greeting and alt text

- **Hero h1:** "Hello, I'm Ryan." It still needs a home in `resume.json` (see R2.4), because it must not be hardcoded in a component.
- **Full name:** "Ryan Chen" still appears in the rail (desktop), the header (mobile) and the page `<title>`.
- **Photo alt text:** "Ryan at the Golden Gate Bridge". It goes in `basics.image.alt` once the file is supplied.
- **Arrangement 2** and its greeting placeholder are dropped.
