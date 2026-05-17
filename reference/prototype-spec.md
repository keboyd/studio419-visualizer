# Font Pair & Palette Visualizer — Prototype Specification

This document defines the current working prototype behavior for migration parity.

## Product

Font Pair & Palette Visualizer is a Studio419 / Future Craft tool for exploring font pairings and color palettes using a responsive hero section as a real-world design test canvas.

## App regions

The app has three main regions:
1. Header command bar
2. Main canvas / responsive hero preview
3. Right-side Inspector

The visual style is dark, compact, tool-like chrome using Inter/system UI.

## Header

Left:
- Exact Studio419 SVG logo from `reference/v244.html`
- App title: Font Pair & Palette Visualizer

Center:
- Type category selector
- Font pair selector
- Font count
- Color category selector
- Color system selector

Right:
- UI/chrome mode selector: Auto, Light, Dark

## Canvas

Must preserve:
- pan/drag behavior
- zoom out
- zoom reset
- zoom in
- viewport device buttons
- viewport width slider
- Light/Dark/Brand preview mode controls

Device order:
1. Retina / 5K
2. Ultrawide
3. Desktop
4. Foldable
5. Mobile

Viewport slider:
- visually reversed
- largest left
- smallest right
- changes preview width
- recalculates type
- recalculates Hero X Padding
- fill stays connected to thumb

## Responsive type

Defaults:
- Desktop Headline: 60px
- Desktop Body: 16px
- Mobile Headline: 40px
- Mobile Body: 16px

Responsive type interpolates based on simulated viewport width and scales above desktop on large screens.

## Hero X Padding

Default desktop Hero X Padding: 48px.
Mobile effective padding: about 36px.
Padding scales based on simulated viewport width.

## Brand panel

Includes:
- Palette Library
- Jump to Palette
- Random
- Custom
- Active palette
- token chips
- Palette Strength
- source note
- Color Usage by Mode
- Element Color overrides
- Hero Contrast Audit

No Mobbin references.

Use Brand-Inspired Systems.

## Layout panel

Use `reference/screenshots/layout-panel.png`.

Hero Layout label must appear above segmented control.

Controls include:
- Hero Layout
- Hero X Padding
- gap controls
- CTA radius
- CTA → Text Link Gap

CTA → Text Link Gap must visibly change the gap between CTA and secondary link.

## Presets & Export

Use Saved Setup language.

Visible:
- Preview Saved Setup dropdown
- Duplicate/Delete buttons in first row
- Previous/Next buttons in second row
- Save Active Setup
- Update Selected Setup
- Export Package
- Preset Library controls

Saved setup cards must not be visible.

## Export formats

Preserve:
- AI + Dev Brief
- CSS Variables + Mini CSS
- Mini HTML + CSS
- JSON
- Framer Prompt
- Figma Notes

## Design-system-first requirement

The React migration should treat the app as a tokenized design-system product.

There are two design systems:
1. App/chrome design system
2. Visualizer output / hero preset system

Do not mix app UI tokens with hero preset tokens.
