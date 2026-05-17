# AGENTS.md

## Project

Font Pair & Palette Visualizer is a Studio419 / Future Craft tool for exploring font pairings and color palettes using a responsive hero section as a real-world design test canvas.

## Prime directive

Preserve visual and behavioral parity with the reference HTML unless the task explicitly asks for a change.

## Do not redesign

Do not replace the UI with generic SaaS, shadcn, Radix, Tailwind default, or dashboard styling.
Do not change colors, spacing, control height, inspector width, header layout, canvas controls, section order, or labels unless specifically requested.

## Reference

Use `/reference/v244.html` and `/reference/screenshots/*` as the source of truth.

## UI constants

- Inspector is right side and approximately 445px wide.
- Header uses Studio419 logo on left, controls centered, UI mode on right.
- Controls are compact 32px chrome.
- Dark chrome colors must match the reference.
- Saved setups are managed through a dropdown, not visible cards.
- About panel is last in inspector.
- Brand-Inspired Systems language must remain unofficial and public-safe.

## Implementation rules

- Prefer small, targeted patches.
- Preserve IDs/data behavior during migration when possible.
- Keep CSS close to reference until visual parity is approved.
- Extract tokens only after the UI matches.
- Do not add custom palette picker/admin/Figma export until parity milestone is approved.

## Validation

Before final answer:

- Run typecheck/lint if available.
- Start app locally if possible.
- Capture or inspect screenshots for desktop full UI, header, inspector, canvas, and presets panel.
- Report changed files and known risks.
