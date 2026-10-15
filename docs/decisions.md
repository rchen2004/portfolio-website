# Phase 0 Decisions

### Decided
- **Site structure:** Single page. The nav bar links jump to sections on the same page (`#experience`, `#projects`, etc.). Project detail pages may be added later as separate routes without restructuring.
- **Featured experiences:** The two co-ops, Babel Street and Verisk, get the most prominent treatment (larger cards, all highlights shown, placed first). Scout and Ventus Health appear in a lighter, more compact style.
- **Experience links:** Experiences can carry links, just like projects. Scout will link to the GitHub repos for its client work (NUMAC and 3 Stones), shown as small repo links on the Scout entry.
- **Projects:** All three (CodeStack, Fakebook Crawler, Hexagonal Reversi) are displayed equally, with no single featured project. Each links to its GitHub repo; no live demos.
- **Domain:** None yet. The site runs on the free Vercel URL until launch, when a domain is purchased and connected (Phase 7).

- **Tagline:** "Software engineer who learns fast, adapts quickly, and loves a challenging problem." (owner edited "hard" to "challenging" in Phase 2) Stored in `resume.json` as `basics.tagline` and shown in the hero section.
- **About section:** A short personal blurb directly below the hero, covering background, co-op work, and interests outside code. Stored in `resume.json` as `basics.summary`.

# Phase 1 Decisions (2026-10-15)

- **Schema:** Approved as proposed in `docs/phase-notes/phase-1-backend.md`, with the changes below.
- **`featured`:** Experiences only (Babel Street, Verisk). Projects have no `featured` flag. This supersedes `plan.md` §5.
- **Links:**
  - Scout: NUMAC `https://github.com/Scout-NU/numac`, 3 Stones mobile app `https://github.com/Scout-NU/3-Stones-App`, 3 Stones web `https://github.com/Scout-NU/3-stones`.
  - CodeStack `https://github.com/rchen2004/CodeStack`, Fakebook Crawler `https://github.com/rchen2004/FakebookCrawler`, Hexagonal Reversi `https://github.com/rchen2004/Reversi`.
- **Images:** Optional screenshot image on each project, plus a headshot in `basics`. Image files not supplied yet.
- **Phone:** Must not appear on the site. Remove it from `resume.json` and the schema.
- **`dateLabel`:** Kept for now as an optional override. Removing it is still open.
- **Strictness:** Unknown keys fail the build at every level of the schema.
- **Phase 1 checkpoint:** Approved by owner (2026-10-15).

# Phase 2 Decisions (in progress)

- **Overall feel:** Minimal and clean. Must not read as backend-only; the owner is open to frontend, full-stack and other work. Direction not yet chosen.
- **Hero photo:** Owner will supply a photo of themself at the Golden Gate Bridge (not a studio headshot). The design must work with a casual outdoor photo.
- **Hero content:** The greeting "Hello, I'm Ryan." followed by the tagline (`basics.tagline`). Below them sit links to email, LinkedIn, GitHub, Instagram (`https://www.instagram.com/ryan.chen2`) and the resume PDF. Whether they appear as buttons or icons is a design choice.
- **No Contact section:** The hero is the only place the contact links appear; repeating them in a Contact section would be redundant. This supersedes `plan.md` Phase 4 item 7. There is no Contact nav link.
- **Compact experiences:** Scout and Ventus Health still get a card/box and show all their highlights, just lighter than the featured ones.
- **Skills:** Labeled "Technologies" on the site, with no nav link of its own. Show only a curated set of prominent languages/frameworks, each with its logo. Tools are not shown. The list, in order: Java, Python, TypeScript, C++, HTML, CSS, SQL, React.js, Tailwind, Next.js.
- **Direction:** Direction D "Fog and Bridge" with Arrangement 1 (greeting + tagline in hero; separate About and Technologies). Owner wants to see a visual preview before the spec is final.
- **Greeting:** "Hello, I'm Ryan." First name only, by owner's choice.
- **Photo alt text:** "Ryan at the Golden Gate Bridge" (approved). The owner visited San Francisco once and doesn't live there; the design must not imply the owner is SF-based.
- **Project images:** None for any project, to keep the three equal.
- **Technology logos:** HTML and CSS logos should look similar but needn't match exactly; to be checked during the build. SQL uses a generic database icon. Each technology shows its logo with the name underneath (stacked), not beside it.
- **Motion:** The owner wants some subtle animation somewhere on the site. Nothing fancy, and it must respect `prefers-reduced-motion`.
- **Experience:** A timeline ordered by date, with the current role first (newest end date first, "Present" counting as newest): Scout, Babel Street, Verisk, Ventus Health. Each entry shows a company logo; the owner will supply the logo files.
- **Width:** Content column wider on desktop than the 680px in Round 2 (preview uses about 880px).
- **Education:** Section removed. The About text still mentions Northeastern and the December 2026 graduation.
- **About:** Kept, but compact: small heading and smaller text, directly under the hero. Open: whether the owner shortens `basics.summary`.
- **Hero links:** Five links in one matching style, each an icon plus a label, in this order: Resume (file icon, opens `/resume.pdf`), Email (mailto), LinkedIn, GitHub, Instagram. No filled button, and the email address isn't shown as text. At every width, the five hero links are icon-only: one row, never wrapping, of 44px targets with 24px icons, optically balanced to look the same size. No box around the icons (tried and dropped). On hover, the icon turns Accent and the link tilts -6° (160ms); under reduced motion there's no tilt, only the color change. The labels are visually hidden but still read by screen readers. Scout's repo links and the project links keep their labels at every width. Supersedes Round 2's resume button and visible address. Every link icon (the hero links, Scout's repo links and the project GitHub links) uses one outline style: 18px, 2px stroke, round caps. No solid brand logos mixed in, since they look bigger and sit off-center.
- **Experience dropdowns:** Each timeline card is collapsible. Collapsed, it shows logo, company, title and dates; expanding reveals the highlights (and Scout's repo links). Only one card can be open at a time; opening one closes the others. No first-bullet preview (rejected). The most recent role (currently Scout) is open on page load. The open card's timeline dot is highlighted in the accent color, with a soft ring. No scroll-driven behavior on the cards: auto-open on scroll was rejected because closing cards makes the page jump, and a scroll highlight was tried and rejected as wonky. Opening is click-only.
- **Footer:** "© <year> Ryan Chen" plus a "Back to top" link.
- **Section order and nav:** Hero, About, Technologies, Experience, Projects, Footer. The nav reads About, Technologies, Experience, Projects. Technologies comes before Experience as an intro ("what I use, then what I've done") and now has a nav link, superseding the earlier "no nav link".
- **GPA and Dean's List:** Not shown anywhere on the site (intended).
- **Unused data:** Keep `education` and the full `skills` lists in `resume.json` even though they aren't rendered. The curated Technologies list is added alongside them.
- **About text:** `basics.summary` stays as is (typo "namefo-matching" fixed back to "name-matching").
- **Technologies on mobile:** 10 items laid out as rows of 3, 4, 3, not 3 + 3 + 3 + 1.
- **Company logos:** Supplied as PNG, at least 80 × 80px.
- **Theme file ownership:** Frontend owns the Tailwind v4 theme CSS (`globals.css`), as recorded in `CLAUDE.md`.
- **Assets supplied (in `public/`, not yet committed or wired into `resume.json`):** `Professional.jpg` (hero photo, 2160 × 2880, no EXIF or GPS data), plus company logos `neuscout_logo.jpg` (Scout), `babelstreet_logo.jpg`, `verisk_analytics_logo.jpg` and `ventus.jpg` (Ventus Health), each 100 × 100 JPG.
- **Hero photo size:** Approved as shown in the preview: 280 × 350px (4:5) beside the text on desktop, full-width 4:3 on mobile. The image must use `height: auto`; otherwise its intrinsic height overrides the aspect ratio and it renders as a tall sliver.
- **Hero photo crop (approved):** Same box sizes, zoomed in so Ryan fills more of the frame. The values from the preview: the frame is `overflow: hidden`, and the image uses `object-fit: cover`, `object-position: 50% 75%`, `transform: translateY(-8%) scale(1.6)` and `transform-origin: 51% 60%` (about the face). The 8% shift up shows more of the torso. The source has enough resolution: at 1.6× the visible area is about 1350px wide. Frontend may implement it as a pre-cropped copy instead, as long as the result matches.
- **Nav text sizes:** At every width (desktop rail and mobile/tablet header), "Ryan Chen" is 24px/600 and the section links are 20px, so the name stays visibly larger than the links. The rail's current-section bar is 32px tall to match. Below 600px, the four header links form a 2 × 2 grid (About, Technologies / Experience, Projects), because one row doesn't fit at 20px and a 3 + 1 wrap is ruled out. Tablets (600–1199px) keep one row.
- **Visual reference:** `docs/design-preview.html` (a throwaway mockup, approved by the owner as the look and feel for the spec).
- **Color modes:** One palette, light only. Dark mode is out of scope (removes it from Phase 5).
