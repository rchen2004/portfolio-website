# Portfolio Project: Shared Rules

These rules apply to the main session and every subagent.

## Source of truth
- `plan.md` is the project plan. Read it before starting any task.
- `docs/decisions.md` records approved decisions. If it conflicts with `plan.md`, the newer approved decision wins; flag the conflict in your summary.
- `data/resume.json` holds all site content. Never hardcode resume text in components.

## Working in phases
- Work only on the phase and task you were given. Do not start the next phase.
- At the end of every task, write a short summary to `docs/phase-notes/phase-<N>-<agent>.md` covering: what you did, decisions you made, files changed, and open questions.
- If something is ambiguous, stop and list it as an open question instead of guessing.

## Ownership
- Design owns `docs/design-*.md`. Frontend owns `src/` (except `src/lib/`) and the Tailwind v4 theme CSS (`src/app/globals.css`, where the `@theme` tokens live; there is no `tailwind.config.ts`). Backend owns `data/`, `src/lib/`, `public/`, and deployment config.
- To change a file you don't own, describe the change in your summary and let the owner make it.

## Content integrity
- Never invent or embellish resume content: no new metrics, roles, skills, or links. If content seems missing, ask.

## Skills and plugins
- At the start of each task, check which skills are available and use any that fit the task. Name the skills you used in your summary.
