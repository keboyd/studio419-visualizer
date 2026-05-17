import type { Palette } from "@/data/types";
import { paletteStrengthText } from "@/lib/color/paletteStrength";
import { ColorChip } from "./ColorChip";

type PalettePickerProps = {
  value: string;
  palettes: Palette[];
  onChange: (value: string) => void;
};

export function PalettePicker({ value, palettes, onChange }: PalettePickerProps) {
  return (
    <label className="control-field">
      <span>Palette</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {palettes.map((palette, index) => (
          <option key={palette.name} value={palette.name}>
            {index + 1}. {palette.name}
          </option>
        ))}
      </select>
      <div className="palette-mini-list">
        {palettes.slice(0, 6).map((palette) => (
          <button key={palette.name} className={palette.name === value ? "palette-row active" : "palette-row"} type="button" onClick={() => onChange(palette.name)}>
            <span>{palette.name}</span>
            <span className="palette-row-chips">
              <ColorChip color={palette.light.brand} />
              <ColorChip color={palette.light.accent} />
              <ColorChip color={palette.light.success || palette.light.warning} />
            </span>
            <small>{paletteStrengthText(palette, palette.light).replace(/^Strength:\s*/, "")}</small>
          </button>
        ))}
      </div>
    </label>
  );
}
