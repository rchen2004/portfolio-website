# Phase 6: Design notes

## QA plan

Visual QA of the built site against `docs/design-spec.md`, in light and dark. Read-only: mismatches are listed for Frontend, and spec changes happen only for owner-approved decisions.

1. **Widths:** 320, 390, 768, 1199, 1200 and 1440px, in both themes.
2. **Per section, in page order** (Hero, About, Technologies, Experience, Projects, Footer, plus the rail and skip link): tokens (color, type size and weight, spacing), layout and wrapping, and icon sizes against the spec.
3. **States:** hover (under `hover: hover`), `:focus-visible` rings (circle on round controls, 4px radius elsewhere), pressed, the open accordion card, and the theme toggle in both placements.
4. **Motion:** the hero blur-in, the accordion height, and the hover lifts with motion on, then the same with `prefers-reduced-motion: reduce`.
5. **Contrast:** spot-check §9.1's pairs in both themes against the built CSS values.
6. **Phase 6 changes:** once picked, check the chosen font and the thicker Java cup against the spec, and check that Backend's metadata work causes no visible change.
7. **Output:** one list of mismatches, each with the section, width, theme, expected value and built value, ranked must-fix or nice-to-have.

## What I did (2026-10-19)

- Added "Phase 6 Decisions (in progress)" to `docs/decisions.md` with the owner's 2026-10-19 answers: font demo first, thicker Java cup, test tools, SEO ownership, title and description, and the accepted defaults.
- Checked the stale `skills` entry Backend flagged (`phase-4-backend.md` open question 1). Both "Skills" and "Unused data" (Phase 2) already carry the 2026-10-18 superseded notes, so no edit was needed.

## Owner picks after the Font Lab demo (2026-10-19)

- **Font: closed.** Figtree stays, unchanged. Spec §1.2 not edited. `decisions.md`: the "demo first" entry is marked superseded by a new "Font: Figtree kept" entry.
- **Java cup stroke: closed.** 0.5px `currentColor` stroke at 36px = `stroke-width="1.78"` in the 128-unit box, `stroke-linejoin="round"`, Java path only, follows the hover Accent. Spec §6.3 (table row and a stroke build note), §13 (icons row) and §15 (logos note) updated. The `decisions.md` entry now has the width. Contrast is unchanged in both themes, because stroke and fill share `currentColor`.

## Decisions made

- None of my own. Both changes are the owner's picks. I chose to write "do not use `non-scaling-stroke`" in §6.3, so the 0.5px holds through either Devicon rendering path (own 128 viewBox or the `scale(0.1875)` group).

## Files changed

- `docs/decisions.md`
- `docs/design-spec.md` (§6.3, §13, §15)
- `docs/phase-notes/phase-6-design.md` (this file)

## Skills used

`frontend-design` (preloaded). No 21st lookups.

## Open questions

1. **QA plan source:** the coordinator asked for the QA plan "from your kickoff report", but that report was not in my context. The plan above is restated from my role file and `plan.md` Phase 6. Replace it if the kickoff version differed.
2. **`CLAUDE.md` conflict:** the SEO exception gives Backend files in `src/app/`, which `CLAUDE.md` assigns to Frontend. `decisions.md` now records it; `CLAUDE.md` itself is unchanged. The owner decides whether to note it there.
3. ~~**Font and Java cup:** after the owner picks a font and a stroke width, I update spec §1.2 (type) and §6.3, §13 and §15 (Java), with the related `decisions.md` entries.~~ Closed 2026-10-19: Figtree kept (no §1.2 change); Java stroke 0.5px applied to §6.3, §13 and §15.
