# Aero front modernization — design

## Intent

The portfolio has an aeronautical art direction (cockpit glow, radar borders, instrument-style HUD grid,
plane in logo and hero, "takeoff" cards, DeLorean + vortex in the footer). It was built with Cursor 1-2
years ago: animations stutter and mobile is weak. Goal: keep the same style, make it smoother, cleaner
and push the aero DA a bit further, section by section.

## Goals

- Smooth animations (no React re-render on scroll, no animated `filter`, no endless offscreen work).
- `prefers-reduced-motion` respected everywhere (framer-motion and CSS).
- Mobile (375px) gets the signature elements too, not a stripped-down version.
- Consistent DA tokens: glows and grid driven by `--primary`, shared section heading.

## Non-goals / anti-goals

- No change of style, palette, font or content. Texts and FR/EN translations stay; only new keys
  (e.g. aria-labels) are added, in both `fr.json` and `en.json`.
- Contact form logic (`react-hook-form`, zod, `/api/contact`) is untouched.
- No new dependency. `react-parallax-tilt` may be removed (PR 7).
- Hidden `alternance-section` is not touched.

## Approach (picked)

Full scope: perf/mobile/a11y fixes **plus** new aero details, one PR per section, PR 0 first because the
others build on it. Alternative rejected by the user: fixes only, no new visuals.

## PRs

0. **Foundations** — `MotionConfig reducedMotion="user"` in `Providers`; CSS
   `@media (prefers-reduced-motion: reduce)` stopping infinite CSS animations; `.hud-grid` (one CSS
   background replacing the 10 `hud-line` divs); `cockpit-glow`/`accent-glow` from CSS vars;
   `components/ui/SectionHeading.tsx` used by About, Parcours, Projects, Contact.
1. **Navbar** — thin "flight line" under the bar with a small plane advancing with scroll progress
   (motion values, no state); active section highlight; mobile menu with `AnimatePresence`, burger with
   `aria-label` + `aria-expanded`; passive scroll listener.
2. **Hero** — plane rewritten with motion values only (no setState on scroll), smooth turn when scroll
   direction flips, remove dead state; a mobile version; small instrument marks on the grid.
3. **About** — technologies as an instrument panel (tiles with radar border, glow on hover).
4. **Parcours** — drop animated blur, `backdrop-blur-xl` and the double variant; scroll runner becomes a
   plane on the flight path; on mobile the timeline sits on the left instead of being hidden.
5. **Projects** — takeoff cards with the HUD corner brackets (shared with Parcours), image zoom on hover,
   no cumulative stagger on mobile.
6. **Contact** — "flight plan" form styling (radar focus, "transmission" sending state). Logic unchanged.
7. **Footer** — DeLorean pauses offscreen / reduced motion; Vortex lighter, mobile-sized, Escape closes,
   `role="dialog"`, drop `react-parallax-tilt`.

## Constraints

AGENTS.md rules apply (Tailwind + `cn()`, no new SCSS, framer-motion `hidden`/`show` variants with short
durations, light + dark, FR + EN, 375px). Each PR: `npm run lint` + `npm run build` pass, checked with
dev-browser in FR/EN, light/dark, 375px/1440px, and with reduced motion emulated.

## Left to the builder

Exact visuals of each new detail, as long as they reuse existing colors, spacing and components.
