# AGENTS.md

## Project

Font Pair & Palette Visualizer is a Studio419 / Future Craft tool for exploring font pairings and color palettes using a responsive hero section as a real-world design test canvas.

The current source of truth is:

```text
/reference/v244.html
```

Reference screenshots live in:

```text
/reference/screenshots/
```

Required screenshots:
- desktop-full.png
- header.png
- brand-panel.png
- type-panel.png
- layout-panel.png
- presets-panel.png

## Prime Directive

Preserve visual and behavioral parity with the reference prototype unless the task explicitly asks for a change.

The first milestone is **not a redesign**. It is a parity migration.

If cleaner architecture conflicts with matching the reference UI, choose reference UI parity first.

## Do Not Redesign

Do not replace the UI with:
- generic SaaS styling
- dashboard styling
- shadcn default styling
- Radix default styling
- Tailwind default styling
- a new layout system
- new cards/panels that are not present in the reference

Do not change:
- colors
- spacing
- control height
- Inspector width
- header layout
- logo placement
- canvas controls
- Inspector section order
- labels
- button text
- saved setup workflow

unless the user explicitly requests that change.

## Studio419 Logo Requirement

The app must use the exact Studio419 SVG logo from `/reference/v244.html`.

Rules:
- Extract the SVG from v244.html.
- Use the exact SVG markup or an equivalent SVG asset created from that markup.
- Do not replace it with text.
- Do not use a placeholder.
- Do not revert to the old square “419” logo.
- Preserve the white fill behavior.
- Preserve the horizontal Studio419 wordmark appearance.
- Keep the header placement and optical alignment close to the reference.

## UI Constants

Preserve these unless explicitly instructed otherwise:

- App title: Font Pair & Palette Visualizer
- Dark chrome UI
- Right-side Inspector
- Inspector width approximately matching the prototype
- Compact 32px control rhythm
- Studio419 logo at the left side of the header
- Header controls centered
- UI mode control on the right side of the header
- Canvas preview in the main area
- Canvas controls in their existing positions
- Viewport slider ordered largest-to-smallest
- About panel as the last Inspector section
- Saved setups managed through dropdown, not visible cards
- Brand-Inspired Systems language
- Public-safe brand disclaimer
- No Mobbin references

## Saved Setup UI Rules

Saved setup cards should not be visible in the Inspector.

Saved setups are managed through the Preview Saved Setup dropdown.

Buttons below the dropdown should be arranged as:

Row 1:
- Duplicate
- Delete

Row 2:
- Previous
- Next

Preserve:
- Save Active Setup
- Update Selected Setup
- Export Preset Library
- Import Preset Library
- Reset App Settings

## Layout Panel Rules

Use `/reference/screenshots/layout-panel.png` for visual verification.

The Hero Layout label must appear above the segmented control.

Do not allow labels to appear below their controls.

Preserve the order, spacing, density, and styling of the Layout panel from the reference.

## Product Language

Use:
- Font Pair & Palette Visualizer
- Saved Setup / Saved Setups
- Preview Saved Setup
- Save Active Setup
- Update Selected Setup
- Brand-Inspired Systems

Avoid:
- Hero Preset
- Curated Font Pair Hero Viewer
- Hero System Visualizer
- Mobbin
- Official brand palette
- Sponsored/endorsed brand language

Clarifying language:
- Hero = the preview/test canvas
- Setup/Preset = the saved type, color, layout, and responsive configuration

## Brand Reference Disclaimer

Brand-inspired palettes are unofficial references for visual exploration. Trademarks belong to their respective owners.

Do not expose Mobbin or mobbin.com in the public UI, exports, metadata, or source labels.

## Detailed Functional Parity Requirements

The React app must preserve the full behavior of the reference prototype. Do not omit controls or simplify interactions unless explicitly asked.

### Canvas Controls

The canvas must preserve:
- pan/drag behavior
- zoom out
- zoom reset
- zoom in
- device preset buttons
- viewport width slider
- Light/Dark/Brand preview mode controls

The viewport slider is reversed visually:
- largest viewport on the left
- smallest viewport on the right

The slider fill must stay connected to the thumb when dragging and when clicking device preset buttons.

Device preset order:
1. Retina / 5K
2. Ultrawide
3. Desktop
4. Foldable
5. Mobile

Clicking a device preset must:
- update the preview frame width
- update the viewport slider thumb
- update the viewport slider fill
- update responsive type
- update responsive Hero X Padding

### Responsive Type

Preserve responsive type anchors:
- Desktop Headline default: 60px
- Desktop Body default: 16px
- Mobile Headline default: 40px
- Mobile Body default: 16px

Type must interpolate based on simulated viewport width. It must not stay static across viewport sizes.

Preserve larger-screen type lift above desktop.

Controls must not reset each other.

### Hero X Padding

Hero X Padding desktop default is 48px.
Mobile effective padding should be about 36px.
Padding must scale with the simulated viewport.

### Header

Header must use:
- exact Studio419 SVG from v244.html
- title: Font Pair & Palette Visualizer
- Inter/system UI font
- centered Type/Color controls
- UI mode selector on the right

Header must not use generic default styling.

### Inspector Panels

Preserve panel order:
1. Brand
2. Type
3. Layout
4. Presets & Export
5. About

About is last.

Hero Layout label must appear above the segmented control.

### Brand Panel

Preserve:
- palette/category controls
- Active palette display
- token chips
- source note
- Palette Strength
- Color Usage by Light/Dark/Brand
- Element Color overrides with chips
- Hero Contrast Audit
- contrast fix behavior

No Mobbin references.

Use Brand-Inspired Systems.

### Color Usage by Mode

Defaults:
- Light: Minimal
- Dark: Minimal
- Brand: Campaign

Color Usage values:
- Minimal
- Editorial
- Brand
- Campaign
- Maximal

### Element Color Overrides

Preserve override dropdowns:
- Hero Background
- Eyebrow
- Headline
- Body
- CTA Background
- CTA Text
- Secondary Link

Each must have a chip showing resolved applied color.

Overrides are scoped by Color Usage.

### CTA Auto Defaults

CTA auto background should be brand-led in Minimal and Editorial unless the brand color is too close to the surface.

Do not regress to black/white CTA backgrounds when a usable brand color exists.

### Saved Setups

Saved setups are managed through a dropdown. Saved setup cards must not be visible.

Label:
- Preview Saved Setup

Buttons:
Row 1:
- Duplicate
- Delete

Row 2:
- Previous
- Next

Also preserve:
- Save Active Setup
- Update Selected Setup
- Export Preset Library
- Import Preset Library
- Reset App Settings

### Export Formats

Preserve:
- AI + Dev Brief
- CSS Variables + Mini CSS
- Mini HTML + CSS
- JSON
- Framer Prompt
- Figma Notes

Exports must include:
- responsive type anchors
- Hero X Padding behavior
- color usage by mode
- manual color overrides
- multi-mode color snapshots
- public-safe brand disclaimer

### UI Styling

UI must use Inter/system UI styling.

Controls must preserve:
- compact 32px rhythm
- dark chrome
- select styling
- segmented controls
- range sliders with filled tracks
- color chips
- badges
- Inspector density

Do not replace with Tailwind/shadcn/browser-default UI.

## Token Discipline / Design-System-First Implementation

This project must be implemented as a tokenized design-system-first app.

The reference prototype defines the visual appearance, but the React implementation should not recreate that appearance with scattered hard-coded values.

### Prime token rule

If a value affects visual design and could reasonably be reused, themed, exported, or explained to a designer/developer/AI system, it must be represented as a token.

### Do not hard-code visual values in components

Avoid hard-coding:
- hex colors
- spacing values
- margins
- padding
- gaps
- control heights
- border radii
- font sizes
- font families
- line heights
- shadows
- z-index values
- animation durations
- borders

Bad:

```tsx
<div className="bg-[#2C2C2C] p-[8px] gap-[16px] rounded-[4px]">
```

Better:

```tsx
<div className="bg-[var(--app-panel-bg)] p-[var(--space-panel)] gap-[var(--space-section)] rounded-[var(--radius-control)]">
```

Best:

```tsx
<Panel variant="inspector">
```

Where the component maps to semantic tokens internally.

### Separate token systems

Keep these separate:

1. App UI design-system tokens
   - Controls application chrome: header, inspector, fields, buttons, sliders, panels, modals.

2. Visualizer preset tokens
   - Controls the rendered hero/test canvas: palette roles, type pairings, responsive typography, hero padding, CTA styling, layout rhythm.

3. Source data/library values
   - Font pair library, palette library, brand-inspired palette data, enrichment metadata.

Do not mix app UI tokens with hero preset tokens.

### Token layers

Use a layered token model:
1. Base tokens
2. Semantic tokens
3. Component tokens
4. Preset/hero tokens

### Required token files

Create or maintain token files similar to:

```text
src/tokens/app/base.tokens.ts
src/tokens/app/semantic.tokens.ts
src/tokens/app/component.tokens.ts
src/tokens/visualizer/hero.tokens.schema.ts
src/tokens/visualizer/preset.tokens.schema.ts
```

Optional generated CSS:

```text
src/styles/tokens.css
```

### CSS variable naming guidance

App UI examples:

```css
--app-bg
--app-panel-bg
--app-panel-soft-bg
--app-text
--app-text-muted
--app-border
--app-control-bg
--app-control-border
--app-control-text
--app-control-height
--app-control-radius
--space-label-control
--space-grid-row
--space-grid-col
--space-panel
--space-card
--slider-track-height
--slider-thumb-size
```

Hero/preset examples:

```css
--hero-bg
--hero-text
--hero-muted
--hero-eyebrow
--hero-cta-bg
--hero-cta-text
--hero-secondary
--hero-accent-1
--hero-accent-2
--hero-accent-3
--hero-headline-desktop
--hero-headline-mobile
--hero-body-desktop
--hero-body-mobile
--hero-padding-x-desktop
--hero-padding-x-mobile
```

### Temporary parity exception

During the first visual parity migration, some existing CSS may be ported directly from the prototype.

If so:
- put it in a clearly named file like `prototype-parity.css`
- do not add new hard-coded values to React components
- mark hard-coded legacy values with comments where practical
- plan to move them into tokens during the token extraction milestone

### Token compliance review

Before marking a task complete, scan changed files for:
- raw hex colors
- px values
- arbitrary Tailwind values like `[8px]`, `[#222]`, `[32px]`
- repeated values
- hard-coded font stacks
- hard-coded shadows
- hard-coded border colors

If found, either:
1. move the value into a token, or
2. explain why it is a temporary parity exception.

## Implementation Rules

- Prefer small targeted patches.
- Preserve IDs and behavior when possible.
- Keep CSS close to the reference until visual parity is approved.
- It is acceptable to use a global stylesheet for parity.
- Do not force Tailwind utility conversion if it creates visual drift.
- Do not introduce new features during parity migration.
- Do not build the custom palette picker during parity migration.
- Do not build admin routes during parity migration.
- Do not build Figma export features during parity migration.
- Preserve behavior before refactoring.
- Avoid broad rewrites unless explicitly requested.

## Validation

Before final response:
- Run typecheck if available.
- Run lint if available.
- Start the app locally if possible.
- Inspect the browser UI.
- Compare against reference screenshots.
- Check at minimum:
  - desktop full UI
  - header
  - Brand panel
  - Type panel
  - Layout panel
  - Presets & Export panel
- Confirm Studio419 logo matches v244.html.
- Confirm saved setup cards are not visible.
- Confirm saved setup dropdown exists.
- Confirm pan/zoom controls work.
- Confirm viewport slider works and fill stays connected.
- Confirm Inter/system UI styling.
- Confirm no Mobbin references exist.
- Report changed files.
- Report known visual deviations honestly.

## If Unsure

When uncertain, preserve the reference prototype.

Do not guess a new design direction.
Do not “clean up” visual details unless the user requested it.
