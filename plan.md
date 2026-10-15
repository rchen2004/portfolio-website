# Personal Portfolio — Project Plan

## 1. Goal

Build a minimal, aesthetic personal portfolio that lets a recruiter or hiring manager understand within 30 seconds who I am, what I've built, and why I'm worth an interview. The site is driven by `resume.json`, so content updates never require touching UI code.

### What a visitor should take away
- **Identity:** Software engineer (Northeastern CS, graduating Dec 2026) with backend/data and full-stack experience.
- **Proof of impact:** Co-op work at Babel Street and Verisk, with concrete outcomes (Java 25 migration across 5 repos, Secure API framework across 10+ services, 30% faster deployments).
- **Range:** Production backend and data pipelines, plus frontend leadership at Scout.
- **Next step:** One obvious way to reach me: a contact area with email, LinkedIn, and GitHub, plus a button to view my resume.

### Guiding principles
- **Content first:** Every design decision serves readability and scannability.
- **Minimal:** Few colors, one or two typefaces, generous whitespace, no gimmicks that slow the page down.
- **Data-driven:** `resume.json` is the single source of truth.
- **Fast and accessible:** Lighthouse 95+ in all categories, keyboard navigable, WCAG AA contrast.
- **Understandable:** I review and approve each phase before the next begins.

---

## 2. Team (Sub-Agents)

| Agent | Owns | Does not own |
|---|---|---|
| **Design** | Visual direction, design tokens (color, type, spacing), layout and component specs, responsive behavior, motion guidelines | Writing production code |
| **Frontend** | Implementing pages and components from design specs, rendering `resume.json`, responsiveness, accessibility, performance | Visual decisions not in the spec, data schema changes |
| **Backend** | Data schema and validation, content loading, resume PDF delivery, SEO metadata, deployment and hosting config | UI and styling |

### Coordination rules
- **Hand-offs** happen through files in the repo (see §4), not assumptions.
- **Schema changes** to `resume.json` are proposed by Backend and approved by me before Frontend depends on them.
- **Design changes** after Phase 2 approval go through the Design agent, not straight into code.
- **Each agent** ends its phase with a short summary: what was done, decisions made, open questions.

---

## 3. Tech Stack (proposed, confirm in Phase 0)

- **Framework:** Next.js (App Router) with TypeScript, using static generation since content changes rarely.
- **Styling:** Tailwind CSS, with design tokens defined in the Tailwind config.
- **Data:** `resume.json` validated at build time with a Zod schema, so a malformed edit fails the build instead of breaking the live site.
- **Hosting:** Vercel (free tier, built-in previews per branch).
- **Optional:** Privacy-friendly analytics such as Vercel Analytics or Plausible.

Note: there is no contact form, so the site needs no server-side code. The Backend agent's scope is deliberately small: data schema and validation, resume PDF delivery, SEO metadata, and deployment.

---

## 4. Repository Structure (target)

```
/
├── plan.md
├── docs/
│   ├── design-spec.md        # Design agent output
│   ├── decisions.md          # Running log of approved decisions
│   └── phase-notes/          # One summary file per phase
├── data/
│   ├── resume.json           # Single source of truth for all site content
│   └── schema.ts             # Zod schema + TypeScript types
├── public/
│   └── resume.pdf            # Served at /resume.pdf (view or download)
├── src/
│   ├── app/                  # Pages and routes
│   ├── components/
│   └── lib/                  # Data loading, helpers
└── tailwind.config.ts
```

### Where content lives
- **`data/resume.json`** holds every piece of text on the site. To update the site, edit this file and redeploy.
- **`public/resume.pdf`** is the downloadable resume. Anything in `public/` is served from the site root, so this file is available at `yoursite.com/resume.pdf`. The site links to it with a "View Resume" button that opens it in a new browser tab, where visitors can read it or download it. To update it, replace the file with a new export of the same name.

---

## 5. Phases

Each phase ends with a **review checkpoint**. Nothing moves forward until I approve it.

### Phase 0 — Foundations and Decisions
**Lead:** Me (all agents advise)
- Confirm tech stack and hosting. (Domain: none yet; purchased at launch, Phase 7.)
- ~~Decide site structure~~ **Decided:** single-page scroll (see §6).
- ~~Decide which projects to feature~~ **Decided:** all three shown equally (see §6).
- Decide whether to include: dark mode, project case-study pages, blog.
- Gather assets: headshot (optional), resume PDF, project screenshots, repo links.

**Checkpoint:** Decisions recorded in `docs/decisions.md`.

### Phase 1 — Data Layer
**Lead:** Backend
- Finalize the `resume.json` schema: add a `featured` flag on experiences and projects, an optional `links` array (`{ label, url }`) on both experiences and projects, plus images and a summary/tagline.
- Write the Zod schema and generated TypeScript types.
- Build the data-loading utility that the frontend imports.
- Add derived helpers (e.g. date formatting, treating a null `endDate` as "Present", sorting by date).

**Checkpoint:** I can edit `resume.json`, run the build, and see validation catch a mistake.

### Phase 2 — Design System
**Lead:** Design
- Produce 2–3 visual directions (mood, palette, type pairing) for me to choose from.
- After I choose, write `docs/design-spec.md` covering: tokens, layout grid, each section's layout, component specs (experience card, project card, skill tag, nav, footer), mobile/tablet/desktop behavior, hover and motion rules.
- Define the content hierarchy: what appears above the fold, and in what order.

**Checkpoint:** I approve one direction and the full spec.

### Phase 3 — Project Scaffold
**Lead:** Frontend (Backend assists)
- Initialize the Next.js + TypeScript + Tailwind project.
- Wire design tokens into the Tailwind config.
- Set up linting, formatting, and a basic CI check (type-check, lint, build).
- Deploy a "hello world" to Vercel so preview URLs work from day one.

**Checkpoint:** A live preview URL that builds from the repo.

### Phase 4 — Core Sections
**Lead:** Frontend
Build sections one at a time, each reviewed before the next:
1. Hero (name, tagline, links)
2. About (short personal blurb)
3. Experience
4. Projects
5. Skills
6. Education
7. Contact area: email (mailto link), LinkedIn, and GitHub as a row of icon links, plus the "View Resume" button. No form.

**Checkpoint:** All sections render from `resume.json` and match the spec on mobile and desktop.

### Phase 5 — Enhancements (only what Phase 0 approved)
**Leads:** Frontend and Backend
- Dark mode.
- Project detail pages.
- Subtle motion (respecting `prefers-reduced-motion`).

**Checkpoint:** Each enhancement reviewed individually.

### Phase 6 — Polish and Quality
**Leads:** All
- **Design:** Visual QA pass against the spec.
- **Frontend:** Accessibility audit (keyboard, screen reader, contrast), Lighthouse scores, image optimization.
- **Backend:** SEO metadata, Open Graph image for link previews, sitemap, robots.txt.
- **Me:** Final content edit; read every line as a recruiter would.

**Checkpoint:** Lighthouse 95+ across the board; no accessibility errors.

### Phase 7 — Launch
- Connect the custom domain.
- Add the site link to resume, LinkedIn, and GitHub profile.
- Document how to update content in a short README.

---

## 6. Phase 0 Decisions

### Decided
- **Site structure:** Single page. The nav bar links jump to sections on the same page (`#experience`, `#projects`, etc.). Project detail pages may be added later as separate routes without restructuring.
- **Featured experiences:** The two co-ops, Babel Street and Verisk, get the most prominent treatment (larger cards, all highlights shown, placed first). Scout and Ventus Health appear in a lighter, more compact style.
- **Experience links:** Experiences can carry links, just like projects. Scout will link to the GitHub repos for its client work (NUMAC and 3 Stones), shown as small repo links on the Scout entry.
- **Projects:** All three (CodeStack, Fakebook Crawler, Hexagonal Reversi) are displayed equally, with no single featured project. Each links to its GitHub repo; no live demos.
- **Domain:** None yet. The site runs on the free Vercel URL until launch, when a domain is purchased and connected (Phase 7).

- **Tagline:** "Software engineer who learns fast, adapts quickly, and loves a hard problem." Stored in `resume.json` as `basics.tagline` and shown in the hero section.
- **About section:** A short personal blurb directly below the hero, covering background, co-op work, and interests outside code. Stored in `resume.json` as `basics.summary`.

---

## 7. Definition of Done

- The site is live on a custom domain.
- All content comes from `data/resume.json`, and editing it is documented.
- The resume PDF opens from the site in one click.
- The site is responsive, accessible (WCAG AA), and scores 95+ on Lighthouse.
- A recruiter can find my experience, projects, and contact info within one scroll or one click.
