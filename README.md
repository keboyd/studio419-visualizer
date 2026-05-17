# Font Pair & Palette Visualizer — Clean Migration Starter

This repository is for rebuilding the current single-file prototype as a maintainable React/Next.js app **without drifting from the reference UI**.

## Source of truth

Place the current working prototype here:

```text
reference/v244.html
```

Place reference screenshots here:

```text
reference/screenshots/
  desktop-full.png
  header.png
  brand-panel.png
  type-panel.png
  layout-panel.png
  presets-panel.png
```

## Migration phases

### Phase 1 — Visual + behavioral parity
Recreate the existing prototype in React/Next.js as closely as possible.

No redesign.  
No custom palette picker yet.  
No admin route yet.  
No new Figma export features yet.

### Phase 2 — Behavior hardening
Verify all controls, saved setups, exports, viewport slider, responsive type, color engine, contrast fixes, and storage behavior.

### Phase 3 — Token extraction
Extract app UI tokens and visualizer preset tokens into a clean design-system layer.

### Phase 4 — Custom palette picker
Replace native palette selects with a searchable grouped palette picker showing palette name + brand/accent chips.

### Phase 5 — Local library admin
Add an admin route for managing font pairs and palettes using JSON import/export.

### Phase 6 — Figma/token artifacts
Add DTCG, Tokens Studio, and Figma-ready exports.

## Before asking Codex to code

Ask Codex to read:

```text
AGENTS.md
docs/codex-clean-start-prompt.md
reference/prototype-spec.md
reference/visual-parity-checklist.md
```

Then ask Codex to produce a plan before coding.
