# Phase 6: Frontend

## Java logo outline (owner pick, 2026-10-19)

Agent: Frontend. Branch `phase-6-polish`. Date 2026-10-19. Not committed.

### What I did
- Added `stroke="currentColor"`, `strokeWidth={1.78}` and `strokeLinejoin="round"` to the Java path (Devicon cup) in `TECH_ICONS`, inside the existing `scale(0.1875)` group. 1.78 path units = 0.5 * 128 / 36, so the outline is 0.5px at 36px. A one-line comment says why. No other icon changed. The font stays Figtree.
- The stroke uses currentColor, so it follows the wrapper color: Charcoal at rest, Accent on hover, in both themes. Measured stroke color: `rgb(36, 32, 29)` light, `rgb(237, 234, 230)` dark.
- **Fit:** the stroked bounds are 17.08 to 110.92 (x) and 0.70 to 127.30 (y) in the 128-unit box, so the logo stays inside the 36px box with no clipping (about 0.2px to spare at the top and bottom).

### Decisions
- None beyond the owner's pick.

### Checks
- `npm run typecheck`: pass
- `npm run lint`: pass
- `npm run format:check`: pass
- `npm run check:data`: pass
- `npm run build`: pass

`next start` only; the server was stopped afterwards. `AGENTS.md`, `docs/design-spec.md` and `docs/decisions.md` were not touched.

Screenshots (scratchpad `shots/`): `tech-java-0.5-{light,dark}-2x.png`.

### Files changed
- `src/components/icons.tsx`

Skills used: `frontend-design` (preloaded). No new dependencies.

### Open questions
- None.
