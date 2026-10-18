# Personal Portfolio — Project Plan

*Updated 2026-10-16 to match decisions.md; decisions.md wins on conflict.*

## 1. Goal

Build a minimal, aesthetic personal portfolio that lets a recruiter or hiring manager understand within 30 seconds who I am, what I've built, and why I'm worth an interview. The site is driven by `resume.json`, so content updates never require touching UI code.

### What a visitor should take away
- **Identity:** Software engineer (Northeastern CS, graduating Dec 2026) with backend/data and full-stack experience. The site must not read as backend-only; I'm open to frontend, full-stack and other work (see `docs/decisions.md`, "Overall feel").
- **Proof of impact:** Co-op work at Babel Street and Verisk, with concrete outcomes (Java 25 migration across 5 repos, Secure API framework across 10+ services, 30% faster deployments).
- **Range:** Production backend and data pipelines, plus frontend leadership at Scout.
- **Next step:** One obvious way to reach me: the row of icon links in the hero (Resume, Email, LinkedIn, GitHub, Instagram). There is no separate Contact section (see `docs/decisions.md`, "Hero links" and "No Contact section").

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
- **Styling:** Tailwind CSS v4, with design tokens defined in the `@theme` block of `src/app/globals.css` (there is no `tailwind.config.ts`; see `docs/design-spec.md` §0).
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
│   ├── design-spec.md        # Design agent output (approved spec)
│   ├── decisions.md          # Running log of approved decisions
│   └── phase-notes/          # One summary file per phase
├── data/
│   ├── resume.json           # Single source of truth for all site content
│   └── schema.ts             # Zod schema + TypeScript types
├── public/
│   ├── resume.pdf            # Served at /resume.pdf (view or download)
│   └── ...                   # Hero photo and company logos
└── src/
    ├── app/                  # Pages and routes; globals.css holds the Tailwind v4 @theme tokens
    ├── components/
    └── lib/                  # Data loading, helpers
```

### Where content lives
- **`data/resume.json`** holds every piece of text on the site. To update the site, edit this file and redeploy.
- **`public/resume.pdf`** is the downloadable resume. Anything in `public/` is served from the site root, so this file is available at `yoursite.com/resume.pdf`. The site links to it with the Resume icon link in the hero, which opens it in a new browser tab, where visitors can read it or download it (spec §6.1). To update it, replace the file with a new export of the same name.

---

## 5. Phases

Each phase ends with a **review checkpoint**. Nothing moves forward until I approve it.

### Phase 0 — Foundations and Decisions
**Lead:** Me (all agents advise)
- Confirm tech stack and hosting. (Domain: none yet; purchased at launch, Phase 7.)
- ~~Decide site structure~~ **Decided:** single-page scroll (see §6).
- ~~Decide which projects to feature~~ **Decided:** all three shown equally (see §6).
- Decide whether to include: ~~dark mode~~ (**decided in Phase 2:** light and dark with a toggle; see `docs/decisions.md`), project case-study pages, blog.
- ~~Gather assets~~ **Done:** hero photo, company logos and resume PDF are in `public/`; repo links are in `resume.json`. No project screenshots (see `docs/decisions.md`, "Project images").

**Checkpoint:** Decisions recorded in `docs/decisions.md`.

### Phase 1 — Data Layer
**Lead:** Backend
- Finalize the `resume.json` schema: an optional `links` array (`{ label, url }`) on both experiences and projects, plus a headshot image and a summary/tagline. (The planned `featured` flag and project images were later dropped; see `docs/decisions.md`.)
- Write the Zod schema and generated TypeScript types.
- Build the data-loading utility that the frontend imports.
- Add derived helpers (e.g. date formatting, treating a null `endDate` as "Present", sorting by date).

**Checkpoint:** I can edit `resume.json`, run the build, and see validation catch a mistake. **Approved 2026-10-15.**

### Phase 2 — Design System
**Lead:** Design
- Produce 2–3 visual directions (mood, palette, type pairing) for me to choose from.
- After I choose, write `docs/design-spec.md` covering: tokens, layout grid, each section's layout, component specs (experience timeline card, project card, technology item, nav, theme toggle, footer), mobile/tablet/desktop behavior, hover and motion rules.
- Define the content hierarchy: what appears above the fold, and in what order.

**Checkpoint:** I approve one direction and the full spec. **Approved 2026-10-16** (merged in PR #2).

### Phase 3 — Project Scaffold
**Lead:** Frontend (Backend assists)
- Initialize the Next.js + TypeScript + Tailwind v4 project, with the app in `src/app/` (moved from the root `app/`; the `@/*` alias stays pointed at `./*`).
- Wire design tokens (spec §1) into the Tailwind v4 `@theme` in `src/app/globals.css`. There is no `tailwind.config.ts`.
- Set up linting, formatting (Prettier plus `prettier-plugin-tailwindcss`), and a basic CI check (type-check, lint, build).
- Deploy a "hello world" to Vercel so preview URLs work from day one. Project name `rchen2004` (free URL `rchen2004.vercel.app`); I connect it myself through the GitHub integration.

**Checkpoint:** A live preview URL that builds from the repo.

### Phase 4 — Core Sections
**Lead:** Frontend
Build one step at a time, each reviewed before the next, in this order (see `docs/decisions.md`, "Phase 4 build order"):
1. Backend data (pending my diff review)
2. Hero (greeting, tagline, photo, icon links), with the page shell and the theme toggle and its head script (spec §6.9)
3. About (short personal blurb)
4. Technologies
5. Experience
6. Projects
7. Footer
8. Rail nav and skip link (spec §6.6, §6.7)

Motion (spec §7) is built with each component in this phase, not later.

There are no Skills, Education or Contact sections (see `docs/decisions.md`).

**Checkpoint:** All sections render from `resume.json` and match the spec on mobile and desktop.

### Phase 5 — Enhancements (only what `docs/decisions.md` approves)
**Leads:** Frontend and Backend
- Dark mode: approved and specified in Phase 2 (spec §1.1, §6.9) and built in Phase 4 with the Hero (step 2).
- Project detail pages: not approved; I decide before Phase 5.
- Subtle motion (respecting `prefers-reduced-motion`): specified in Phase 2 (spec §7) and built in Phase 4 with each component.

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
- **Featured experiences:** The two co-ops, Babel Street and Verisk, get the most prominent treatment (larger cards, all highlights shown, placed first). Scout and Ventus Health appear in a lighter, more compact style. *Superseded (2026-10-16): one card style for all, ordered by date; see `docs/decisions.md`, "`featured` removed".*
- **Experience links:** Experiences can carry links, just like projects. Scout will link to the GitHub repos for its client work (NUMAC and 3 Stones), shown as small repo links on the Scout entry.
- **Projects:** All three (CodeStack, Fakebook Crawler, Hexagonal Reversi) are displayed equally, with no single featured project. Each links to its GitHub repo; no live demos.
- **Domain:** None yet. The site runs on the free Vercel URL until launch, when a domain is purchased and connected (Phase 7).

- **Tagline:** "Software engineer who learns fast, adapts quickly, and loves a challenging problem." Stored in `resume.json` as `basics.tagline` and shown in the hero section.
- **About section:** A short personal blurb directly below the hero, covering background, co-op work, and interests outside code. Stored in `resume.json` as `basics.summary`.

---

## 7. Definition of Done

- The site is live on a custom domain.
- All content comes from `data/resume.json`, and editing it is documented.
- The resume PDF opens from the site in one click.
- The site is responsive, accessible (WCAG AA), and scores 95+ on Lighthouse.
- A recruiter can find my experience, projects, and contact info within one scroll or one click.
