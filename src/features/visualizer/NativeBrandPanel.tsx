"use client";

import { useMemo, useState } from "react";
import {
  brandReferenceDisclaimer,
  colorUsageModes,
  colorUsageScopes,
  elementColorOverrides,
  heroContrastAuditTargets
} from "./migrationContract";

type ColorUsageScope = (typeof colorUsageScopes)[number];
type ColorUsageMode = (typeof colorUsageModes)[number];
type ElementOverride = (typeof elementColorOverrides)[number];
type OverrideValue = "Auto" | "Brand" | "Accent" | "Text" | "Background";

const defaultUsageByScope = {
  Brand: "Campaign",
  Dark: "Minimal",
  Light: "Minimal"
} satisfies Record<ColorUsageScope, ColorUsageMode>;

const overrideOptions: OverrideValue[] = ["Auto", "Brand", "Accent", "Text", "Background"];

function emptyOverrides() {
  return Object.fromEntries(elementColorOverrides.map((override) => [override, "Auto"])) as Record<
    ElementOverride,
    OverrideValue
  >;
}

function makeInitialOverrides() {
  return Object.fromEntries(colorUsageModes.map((mode) => [mode, emptyOverrides()])) as Record<
    ColorUsageMode,
    Record<ElementOverride, OverrideValue>
  >;
}

export function NativeBrandPanel() {
  const [usageByScope, setUsageByScope] = useState<Record<ColorUsageScope, ColorUsageMode>>(defaultUsageByScope);
  const [activeScope, setActiveScope] = useState<ColorUsageScope>("Light");
  const [overridesByUsage, setOverridesByUsage] = useState(makeInitialOverrides);
  const activeUsage = usageByScope[activeScope];
  const activeOverrides = overridesByUsage[activeUsage];

  const scopeMeta = useMemo(() => {
    return `${activeUsage} usage overrides for ${activeScope} mode`;
  }, [activeScope, activeUsage]);

  function setUsage(scope: ColorUsageScope, usage: ColorUsageMode) {
    setUsageByScope((current) => ({ ...current, [scope]: usage }));
    setActiveScope(scope);
  }

  function setOverride(override: ElementOverride, value: OverrideValue) {
    setOverridesByUsage((current) => ({
      ...current,
      [activeUsage]: {
        ...current[activeUsage],
        [override]: value
      }
    }));
  }

  function resetOverrides() {
    setOverridesByUsage((current) => ({
      ...current,
      [activeUsage]: emptyOverrides()
    }));
  }

  return (
    <>
      <section className="library-grid brand-palette-controls">
        <div className="field">
          <label>Palette Library</label>
          <select id="nativePaletteLibrarySelect">
            <option>All Palettes</option>
            <option>Semantic Sets</option>
            <option>Full Research Library</option>
            <option>Custom Palettes</option>
            <option>Brand-Inspired Systems</option>
          </select>
        </div>
        <div className="field">
          <label>Jump to Palette</label>
          <select id="nativePaletteJumpSelect" />
        </div>
        <div className="actions">
          <button className="secondary" type="button">
            Random
          </button>
          <button className="secondary" type="button">
            Custom
          </button>
        </div>
      </section>

      <section className="system-grid active-palette-panel">
        <div className="field">
          <label>Active Palette</label>
          <div className="palette-title" id="nativePaletteTitle">
            Palette
          </div>
          <div className="palette-meta" id="nativePaletteMeta">
            1 / 1 · Brand-Inspired Systems
          </div>
        </div>
        <div className="field">
          <label>Palette Strength</label>
          <p className="small" id="nativePaletteStrengthMeta">
            Strength: reference palette · balanced accent distribution
          </p>
        </div>
        <div className="field">
          <label>Palette Source</label>
          <p className="small" id="nativePaletteSourceMeta">
            {brandReferenceDisclaimer}
          </p>
        </div>
        <div className="palette-chip-grid" id="nativePaletteChipGrid" aria-label="Token chips">
          {["bg", "text", "muted", "line", "brand", "accent"].map((token) => (
            <span className="palette-chip" data-native-palette-chip={token} key={token} title={token} />
          ))}
        </div>
      </section>

      <section className="system-grid brand-color-usage-by-mode">
        <div className="field brand-color-usage-header">
          <label>Color Usage by Mode</label>
        </div>
        {colorUsageScopes.map((scope) => (
          <div className="field" key={scope}>
            <label>{scope}</label>
            <select
              id={`nativeColorUsage${scope}Select`}
              value={usageByScope[scope]}
              onChange={(event) => setUsage(scope, event.currentTarget.value as ColorUsageMode)}
            >
              {colorUsageModes.map((mode) => (
                <option key={mode}>{mode}</option>
              ))}
            </select>
          </div>
        ))}
      </section>

      <section className="system-grid brand-element-colors">
        <div className="field brand-element-colors-header">
          <label>Element Colors</label>
          <div className="small" id="nativeColorOverrideScopeMeta">
            {scopeMeta}
          </div>
        </div>
        {elementColorOverrides.map((override) => (
          <div className="field" key={override}>
            <label>{override}</label>
            <div className="color-override-row">
              <span
                className="color-override-chip"
                data-override-chip={override}
                title={`${override}: ${activeOverrides[override]}`}
              />
              <select
                aria-label={override}
                data-native-color-override={override}
                value={activeOverrides[override]}
                onChange={(event) => setOverride(override, event.currentTarget.value as OverrideValue)}
              >
                {overrideOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className="actions">
          <button className="secondary" id="nativeResetColorOverridesBtn" type="button" onClick={resetOverrides}>
            Reset Overrides
          </button>
        </div>
      </section>

      <section className="system-grid hero-audit-grid brand-audit-panel">
        <div className="field">
          <label>Hero Contrast Audit</label>
          <div className="hero-contrast-row" id="nativeHeroContrastRow">
            {heroContrastAuditTargets.map((target) => (
              <button className="badge pass" data-native-contrast-target={target} key={target} type="button">
                {target}: AA
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
