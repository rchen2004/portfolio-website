# Phase 0 Decisions

### Decided
- **Site structure:** Single page. The nav bar links jump to sections on the same page (`#experience`, `#projects`, etc.). Project detail pages may be added later as separate routes without restructuring.
- **Featured experiences:** The two co-ops, Babel Street and Verisk, get the most prominent treatment (larger cards, all highlights shown, placed first). Scout and Ventus Health appear in a lighter, more compact style.
- **Experience links:** Experiences can carry links, just like projects. Scout will link to the GitHub repos for its client work (NUMAC and 3 Stones), shown as small repo links on the Scout entry.
- **Projects:** All three (CodeStack, Fakebook Crawler, Hexagonal Reversi) are displayed equally, with no single featured project. Each links to its GitHub repo; no live demos.
- **Domain:** None yet. The site runs on the free Vercel URL until launch, when a domain is purchased and connected (Phase 7).

- **Tagline:** "Software engineer who learns fast, adapts quickly, and loves a hard problem." Stored in `resume.json` as `basics.tagline` and shown in the hero section.
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
