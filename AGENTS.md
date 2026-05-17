# AGENTS.md

## Project

This is the Studio419 Font & Palette Visualization App. It began as a single-file HTML prototype and should evolve into a tokenized, extensible design-system-first application.

## Core Principle

Do not hard-code visual values directly into components unless they are temporary placeholders. Use design tokens, semantic variables, and structured data.

## Architecture Goals

- Prefer React + TypeScript.
- Prefer Vite for local development.
- Use CSS custom properties generated from token files.
- Keep design tokens machine-readable and human-readable.
- Separate raw tokens, semantic tokens, component tokens, and preset data.
- Keep font pairs, palettes, and presets as structured JSON data.
- Avoid one-off inline styles unless unavoidable.
- Preserve the current prototype behavior before refactoring aggressively.

## Design System Rules

Use this token hierarchy:

1. Primitive tokens: raw color, spacing, typography, radius, shadow, motion values.
2. Semantic tokens: background, surface, text, border, accent, CTA, focus, muted, danger.
3. Component tokens: hero background, hero eyebrow, hero headline, hero body, hero CTA, control panel surface, slider track.
4. Preset tokens: named combinations of font pair, palette, layout, spacing, and theme mode.

## Required Checks

Before finishing a task:

- Run typecheck if available.
- Run build if available.
- Confirm no obvious console errors.
- Summarize changed files.
- Explain any architectural tradeoffs.

## Product Direction

This app is not just a visual playground. It should become a Studio419 design-system artifact that can later feed:

- Future Craft articles
- Figma variables
- reusable presets
- possible hosted web app
- possible admin interface for font and palette libraries
