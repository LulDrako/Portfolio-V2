# AGENTS.md

Personal portfolio built with Next.js 15 (App Router), React 18, TypeScript, Tailwind, framer-motion and i18next (FR/EN). Deployed on Vercel.

## Commands

- `npm run dev`: local server on http://localhost:3000
- `npm run lint`: ESLint, zero warnings allowed (`--max-warnings=0`)
- `npm run build`: production build, must pass before a task is considered done
- `npm run format`: Prettier
- `npm run analyze`: bundle analysis

There are no automated tests: check changes visually in the browser.

## Structure

- `app/page.tsx`: assembles the sections, loaded with `next/dynamic`
- `components/*-section.tsx`: one page section per file
- `components/ui/`: base components (shadcn/Radix style) and custom components
- `lib/data.ts`: content (projects, experience, technologies) and `iconMap`
- `lib/messages/fr.json` and `en.json`: all displayed text
- `hooks/useTranslations.ts`: i18n hook, `t('key')`, and `t.raw('key')` for arrays/objects
- `app/api/contact/route.ts`: contact form, forwarded to Getform

## Rules

- No hardcoded text in components: add the key to both `fr.json` **and** `en.json`, with the same structure.
- New content (project, experience, technology) goes in `lib/data.ts`, not in the component.
- Follow the existing style: Prettier (single quotes, semicolons, 100 columns), `@/` alias, components as `export default function`.
- Style with Tailwind classes; use `cn()` from `lib/utils.ts` for conditional classes. No new SCSS files.
- Animations use framer-motion, in the same spirit as the existing sections (`hidden`/`show` variants, short durations).
- The site must work in light and dark themes, and on mobile (check at ~375px wide).
- No new dependency without asking first.
- Images live in `public/` and are rendered with `next/image`.

## Keep it simple

- Change only what was asked: no unrelated refactoring, renaming or reformatting.
- No comments that restate the code, no dead code left commented out.
- No "just in case" abstractions: only extract a component or helper when it is used in at least two places.
- No generic design: reuse the existing colors, spacing and components instead of inventing a new style.

## Before saying "done"

1. `npm run lint` and `npm run build` pass.
2. The change was checked in the browser (FR and EN, light and dark, desktop and mobile if it is visual).
3. State clearly what was tested and what was not.

## Git

- One branch per change (`feat/...`, `fix/...`, `chore/...`), then a PR to `main`.
- Conventional Commits: `feat: ...`, `fix: ...`, `refactor: ...`, `chore: ...`, `docs: ...`.
- `main` is production: every push to `main` is deployed automatically by Vercel.
