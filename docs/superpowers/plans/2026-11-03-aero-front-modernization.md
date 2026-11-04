# Aero Front Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Smoother, mobile-ready, reduced-motion-aware front that pushes the existing aero DA further, one PR per section.

**Architecture:** Task 0 lands shared foundations (motion config, CSS tokens, `SectionHeading`, `HudCorners`) and must be merged to `main` first. Tasks 1-7 then run in parallel, each on its own branch from `main`, each touching only its section file(s) plus additive CSS / i18n keys.

**Tech Stack:** Next.js 16, React 18, Tailwind 3, framer-motion 11, i18next.

**Spec:** `docs/superpowers/specs/2026-11-03-aero-front-modernization-design.md`

## Global Constraints

- Follow `AGENTS.md`: Tailwind + `cn()`, no new SCSS, no new dependency, no hardcoded text (keys in both `lib/messages/fr.json` and `en.json`), Prettier style for new code only, no unrelated refactor.
- framer-motion: `hidden`/`show` variants, durations ≤ 0.6s, never animate `filter`, never `setState` in a scroll handler (use motion values / `useMotionValueEvent`).
- Content and existing translations unchanged; contact form logic (`react-hook-form`, zod, `/api/contact`) unchanged.
- Light + dark, FR + EN, 375px + 1440px, and `prefers-reduced-motion: reduce` must all render correctly.
- Do not touch `components/alternance-section.tsx`. Do not commit `AGENTS.md` (`next dev` rewrites it; PR #30 handles it).
- One branch + one PR to `main` per task, Conventional Commits, no `Co-Authored-By` line, never merge.

## Verification (every task, replaces unit tests: the repo has none)

1. `npm run lint` → 0 warnings; `npm run build` → success.
2. `npm run dev -- -p <port>` (task N uses port `3100 + N`), then dev-browser:
   `dev-browser --browser dev --connect http://127.0.0.1:9333`, page named `portfolio-<task>`.
   Screenshot the section at 375×812 and 1440×900, FR and EN (`localStorage` / language switcher),
   light and dark (`page.emulateMedia({ colorScheme })`), and once with
   `page.emulateMedia({ reducedMotion: 'reduce' })`.
3. Assert `document.documentElement.scrollWidth === innerWidth` at 375px (no horizontal scroll).
4. Look at every screenshot before claiming done; list in the PR what was and wasn't checked.

## Review Focus

- Reduced motion: infinite / scroll-driven motion must stop or become instant, content still visible (not stuck at `opacity: 0`).
- Fast scroll / jump links (`#contact` from the hero): nothing left invisible because a `whileInView` was skipped.
- Dark mode contrast of new HUD details (lines at `/20` opacity can vanish on `--background`).
- 375px: new decorations must not overlap text or cause horizontal scroll.
- Language switch at runtime: new aria-labels update in EN.

---

### Task 0: Foundations — branch `feat/aero-foundations` (orchestrator does this one)

**Files:**

- Modify: `components/providers.tsx` (wrap children in `<MotionConfig reducedMotion="user">`)
- Modify: `app/globals.css` (append; edit `cockpit-glow`/`accent-glow` in place)
- Create: `components/ui/SectionHeading.tsx`, `components/ui/HudCorners.tsx`
- Modify: `components/about-section.tsx`, `parcours-section.tsx`, `projects-section.tsx`, `contact-section.tsx` (use `SectionHeading`), `hero-section.tsx` + `parcours-section.tsx` (use `.hud-grid`), `parcours-section.tsx` (use `HudCorners`)
- Commit spec + this plan.

**Interfaces (produced, used by tasks 1-7):**

- `export default function SectionHeading({ title, description }: { title: string; description?: string })` — motion header: `h2.text-3xl.font-bold.mb-4.cockpit-glow`, bar `w-20 h-1 bg-primary mx-auto mb-8 rounded-full`, optional `p.text-muted-foreground.max-w-2xl.mx-auto`; `hidden`/`show` with `whileInView`, `viewport={{ once: true }}`.
- `export default function HudCorners({ className }: { className?: string })` — the 4 corner brackets currently inline in `parcours-section.tsx`, `pointer-events-none absolute inset-0`.
- CSS `.hud-grid` — one background of 1px `hsl(var(--primary) / 0.2)` lines every 20% (replaces the `hud-line` / `hud-line-vertical` div loops, which are deleted).
- CSS `.cockpit-glow` / `.accent-glow` built from `hsl(var(--primary) / …)` / `hsl(var(--accent) / …)`.
- CSS `@media (prefers-reduced-motion: reduce)` setting `animation: none` on `.parcours-node-pulse` and `.vortex-glow`, and `scroll-behavior: auto`.

- [ ] Implement the above; headings look identical to before (compare screenshots).
- [ ] Verification; open PR; **user merges before tasks 1-7 start**.

### Task 1: Navbar — `feat/navbar-flight-line` — `components/navbar.tsx`

- [ ] Scroll listener → `useScroll` + `useMotionValueEvent` (state only flips when crossing 50px).
- [ ] Flight line: 1px `bg-primary/20` under the header, a `bg-primary` fill and a small lucide `Plane` (rotate 45°) positioned by `scaleX` / `x` from `scrollYProgress` (motion values only).
- [ ] Active section: `IntersectionObserver` on `#hero,#about,#parcours,#projects,#contact`, active link `text-primary`.
- [ ] Mobile menu in `AnimatePresence`; burger gets `aria-label` (new keys `Navbar.openMenu` / `Navbar.closeMenu`) and `aria-expanded`.
- [ ] Verification + PR.

### Task 2: Hero — `feat/hero-plane` — `components/hero-section.tsx`

- [ ] Remove `isScrollingUp`, `topReached`, `bottomReached`, `currentRotation`, `smoothRotation`, the scroll `useEffect` and the resize state; plane `y` from `useScroll().scrollYProgress` → `useTransform` to `[70, 'calc(100vh - 220px)']`-equivalent, `useSpring` stiffer (≈ stiffness 120, damping 30).
- [ ] Rotation: `useMotionValueEvent(scrollY, 'change')` compares with `scrollY.getPrevious()`, sets a motion value to `135` (down) / `-45` (up), springed. No React state.
- [ ] Mobile (< lg): smaller plane (size 28) on the right edge, same logic, must not cover text at 375px.
- [ ] Instrument marks on the `.hud-grid`: small tick labels / crosshair at one grid intersection using `HudCorners` or borders; decorative, `aria-hidden`.
- [ ] Verification (also scroll down to bottom then up: plane turns smoothly) + PR.

### Task 3: About — `feat/about-instrument-panel` — `components/about-section.tsx`, `app/globals.css`

- [ ] Each technology becomes a tile: `radar-border border rounded-lg bg-secondary/50` with `HudCorners`, icon + name, hover: `cockpit` glow via `box-shadow: 0 0 16px hsl(var(--primary) / 0.3)` and icon `scale-110`.
- [ ] Grid stays `grid-cols-2 sm:grid-cols-4`, stagger ≤ 0.05s.
- [ ] Verification + PR.

### Task 4: Parcours — `feat/parcours-flight-path` — `components/parcours-section.tsx`, `app/globals.css`

- [ ] `cardVariants`: drop `filter` and `scale`, rename to `hidden`/`show`; apply only on the `article` (remove variants on the inner card). Remove `backdrop-blur-xl`.
- [ ] Runner: replace the dot with a lucide `Plane` rotated 135° (pointing down), same `runnerTop`/`runnerOpacity`.
- [ ] Mobile: timeline line + runner on the left (`left-5`) next to the icons instead of `hidden md:block`; cards keep full width with left padding.
- [ ] Verification + PR.

### Task 5: Projects — `feat/projects-takeoff-cards` — `components/projects-section.tsx`

- [ ] Card: `HudCorners`, `radar-border border`, image wrapper `overflow-hidden` with `group-hover:scale-105 transition-transform duration-500`.
- [ ] Stagger: `delay: (index % 3) * 0.08` so mobile cards never wait > 0.16s; `y: 24`.
- [ ] Image `quality` back to default (75).
- [ ] Verification + PR.

### Task 6: Contact — `feat/contact-flight-plan` — `components/contact-section.tsx`, `app/globals.css`

- [ ] Remove the `mounted` / `initial={false}` animation hack; use `hidden`/`show` `whileInView` like the other sections.
- [ ] `.form-input` focus: `radar` look (`border-primary`, `box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15)`); form panel with `HudCorners`.
- [ ] Sending state: button shows a `Plane` taking off (translate + fade loop) and new key `Contact.sending` (FR « Transmission… », EN "Transmitting…"). Same submit handler.
- [ ] Verification: stub `window.fetch` in the page, submit, confirm stub caught the call; **no real send**. + PR.

### Task 7: Footer — `feat/footer-vortex-lite` — `components/footer.tsx`, `components/ui/DeloreanSpinner.tsx`, `components/ui/VortexModal/*`, `package.json`

- [ ] DeLorean: run the interval only while in view (`useInView`) and not `useReducedMotion()`.
- [ ] Clickable wrapper becomes a `<button>` with `aria-label` (new key `Footer.vortex`).
- [ ] Vortex: wrapper `min(900px, 100vw)` square, 3 glows instead of 5, drop `blur(70px)` ring, `role="dialog" aria-modal`, Escape closes, focus the close button on open.
- [ ] Replace `react-parallax-tilt` with a plain `hover:scale-[1.02]` and `npm uninstall react-parallax-tilt`.
- [ ] Verification + PR.
