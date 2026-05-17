# Codex Clean-Start Prompt

We need to restart or correct the React/Next.js migration of Font Pair & Palette Visualizer.

The previous rewrite drifted visually away from the reference and lost functionality. This task is to restore visual and behavioral parity with the current single-file prototype while keeping a design-system/token-first implementation discipline.

Reference source of truth:
- /reference/v244.html

Reference screenshots:
- /reference/screenshots/desktop-full.png
- /reference/screenshots/header.png
- /reference/screenshots/brand-panel.png
- /reference/screenshots/type-panel.png
- /reference/screenshots/layout-panel.png
- /reference/screenshots/presets-panel.png

Before coding, read:
- AGENTS.md
- reference/prototype-spec.md
- reference/visual-parity-checklist.md
- reference/v244.html

Use Plan Mode first. Produce a plan and checklist before editing files.

## Critical instruction

This is not a redesign. This is not a simplification. This is not a new UI. The React version must match the reference prototype visually and functionally before any new features are added.

A visually correct but hard-coded implementation is not complete; a tokenized implementation that does not match the reference is also not complete. The target is visual parity plus token discipline.

## Product framing

Font Pair & Palette Visualizer is a Studio419 / Future Craft tool for exploring font pairings and color palettes using a responsive hero section as a real-world design test canvas.

## Non-negotiables

- Preserve the current dark chrome UI.
- Preserve the current right-side Inspector layout.
- Preserve the current inspector width and density.
- Preserve the current header command-bar structure.
- Preserve the Studio419 logo exactly as it appears in v244.html.
- Extract the Studio419 SVG from v244.html and use that exact SVG asset/markup.
- Preserve centered Type/Color controls.
- Preserve UI mode selector on the right side of header.
- Preserve canvas preview layout and canvas control placement.
- Preserve pan/drag and zoom controls.
- Preserve viewport slider largest-to-smallest behavior.
- Preserve Inspector section order.
- Preserve About panel as last Inspector section.
- Preserve compact 32px control rhythm.
- Preserve select/menu styling, range slider styling, segmented controls, badges, cards, and dividers.
- Preserve Inter/system UI styling.

## Do not

- Do not replace the UI with shadcn, Radix defaults, Tailwind defaults, generic SaaS styling, or a dashboard redesign.
- Do not move major controls to new locations.
- Do not add new features in this milestone.
- Do not build the custom palette picker yet.
- Do not build admin routes yet.
- Do not build new Figma export features yet.
- Do not remove existing behavior to simplify the migration.

## Implementation approach

1. Create or correct the Next.js + React + TypeScript app so it visually matches /reference/v244.html.
2. It is acceptable to port much of the existing CSS into a global stylesheet for the first parity milestone.
3. Do not force all styling into Tailwind during the first pass if doing so causes visual drift.
4. Preserve current CSS variables and token-like values from the prototype where possible.
5. Preserve current behavior first, then clean architecture later.
6. Componentization is allowed, but visual output must remain equivalent to the reference.
7. Keep library data separated where practical, but do not rewrite the product experience.

## Design-system/token discipline

Do not scatter raw hex values, pixel values, font sizes, border radii, shadows, or spacing values directly inside components.

If a visual value is reused or conceptually meaningful, define it as a token.

Use semantic tokens in components:
- var(--app-bg)
- var(--app-panel-bg)
- var(--app-control-bg)
- var(--app-border)
- var(--app-text)
- var(--space-label-control)
- var(--app-control-height)
- var(--app-control-radius)

If copied legacy CSS is needed for parity, isolate it as `prototype-parity.css` and mark it as temporary.

## Definition of Done

Visual:
- Header matches screenshot.
- Studio419 logo matches v244.
- App uses Inter/system UI styling.
- Inspector is right-side and matches width/density.
- Brand panel matches screenshot.
- Type panel matches screenshot.
- Layout panel matches screenshot.
- Presets panel matches screenshot.
- About panel is last.
- No visible saved setup cards.

Canvas:
- pan works.
- zoom in/out/reset works.
- device buttons work.
- viewport slider works.
- viewport slider fill remains attached to thumb.
- preview modes Light/Dark/Brand work.

Responsive:
- viewport slider changes hero width.
- viewport slider changes headline/body size.
- viewport slider changes Hero X Padding.
- mobile padding is about 36px when desktop is 48px.

Color:
- Color Usage by Mode works.
- Element Color override chips update.
- contrast fix pills work.
- CTA auto is brand-led in Minimal/Editorial.
- no Mobbin references.

Presets:
- Save Active Setup works.
- Preview Saved Setup dropdown loads setups.
- Duplicate/Delete work.
- Previous/Next work.
- Update Selected Setup works.
- Import/export preset library work.
- Reset App Settings preserves saved setups/custom palettes.

Exports:
- all six export formats exist.
- copy/download work.
- exports include current responsive/color state.

Token discipline:
- No new hard-coded visual values in React components unless documented as a temporary parity exception.
- App chrome values are represented by app UI tokens.
- Hero/preset values are represented by visualizer preset tokens.
- Any remaining hard-coded values are isolated to a clearly marked prototype parity CSS layer.

Before final response:
- Run typecheck/lint if available.
- Start app locally if possible.
- Compare against reference screenshots.
- Report changed files.
- Report known visual deviations.
- Report remaining temporary hard-coded parity exceptions, if any.
