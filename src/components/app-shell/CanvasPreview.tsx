import type { HeroColorRoles, LayoutSettings, Mode, SampleCopy, TypeSettings } from "@/data/types";
import type { CSSProperties } from "react";
import { HeroPreview } from "@/components/hero/HeroPreview";
import { SliderControl } from "@/components/controls/SliderControl";
import { SegmentedControl } from "@/components/controls/SegmentedControl";

const viewportPresets = [
  { key: "retina", label: "Retina / 5K", width: 2560 },
  { key: "ultrawide", label: "Ultrawide", width: 1920 },
  { key: "desktop", label: "Desktop", width: 1440 },
  { key: "foldable", label: "Foldable", width: 768 },
  { key: "mobile", label: "Mobile", width: 390 }
];

type CanvasPreviewProps = {
  viewportWidth: number;
  pair: string;
  copy: SampleCopy;
  roles: HeroColorRoles;
  type: TypeSettings;
  layout: LayoutSettings;
  mode: Mode;
  onViewportChange: (value: number) => void;
  onModeChange: (value: Mode) => void;
};

function previewDisplayWidth(width: number) {
  const t = Math.max(0, Math.min(1, (width - 390) / (2560 - 390)));
  return Math.round(390 + (1320 - 390) * t);
}

export function CanvasPreview({ viewportWidth, pair, copy, roles, type, layout, mode, onViewportChange, onModeChange }: CanvasPreviewProps) {
  const activePreset = viewportPresets.reduce((best, preset) => (Math.abs(preset.width - viewportWidth) < Math.abs(best.width - viewportWidth) ? preset : best), viewportPresets[2]);

  return (
    <main className="canvas-region">
      <div className="viewport-toolbar">
        <div className="zoom-control" aria-label="Canvas zoom">
          <button type="button">-</button>
          <strong>100%</strong>
          <button type="button">+</button>
        </div>
        <div className="viewport-presets">
          {viewportPresets.map((preset) => (
            <button key={preset.key} type="button" className={Math.abs(viewportWidth - preset.width) < 20 ? "active" : ""} onClick={() => onViewportChange(preset.width)}>
              {preset.label}
            </button>
          ))}
        </div>
        <button type="button" className="bounds-button">
          Bounds
        </button>
        <SegmentedControl
          label="Preview Mode"
          value={mode}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "brand", label: "Brand" }
          ]}
          onChange={onModeChange}
        />
        <SliderControl label="Viewport" value={viewportWidth} min={390} max={2560} suffix="px" onChange={onViewportChange} />
      </div>
      <div className="canvas-grid">
        <div className="canvas-stage" style={{ "--preview-display-width": `${previewDisplayWidth(viewportWidth)}px` } as CSSProperties}>
          <HeroPreview pair={pair} copy={copy} roles={roles} type={type} layout={layout} />
          <p className="viewport-caption">
            {activePreset.label} preview, simulated width {viewportWidth}px, safe margin {activePreset.key === "desktop" ? "960-1280px" : activePreset.width + "px"}
          </p>
        </div>
      </div>
    </main>
  );
}
