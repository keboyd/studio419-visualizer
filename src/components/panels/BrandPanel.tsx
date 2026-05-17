import type { ColorUsage, HeroColorRoles, Mode, Palette } from "@/data/types";
import { brandDisclaimer, isBrandInspired } from "@/data/brandEnrichment";
import { contrast, contrastClass, contrastLabel } from "@/lib/color/contrast";
import { paletteStrengthText } from "@/lib/color/paletteStrength";
import { ColorChip } from "@/components/controls/ColorChip";
import { SegmentedControl } from "@/components/controls/SegmentedControl";
import { ColorOverrideSelect } from "@/components/controls/ColorOverrideSelect";

type BrandPanelProps = {
  palette: Palette;
  mode: Mode;
  usageByMode: Record<Mode, ColorUsage>;
  roles: HeroColorRoles;
      onColorUsageChange: (mode: Mode, usage: ColorUsage) => void;
};

const usageOptions: { value: ColorUsage; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "editorial", label: "Editorial" },
  { value: "brand", label: "Brand" },
  { value: "campaign", label: "Campaign" },
  { value: "maximal", label: "Maximal" }
];

export function BrandPanel({ palette, mode, usageByMode, roles, onColorUsageChange }: BrandPanelProps) {
  const modeColors = palette[mode];
  const audit = [
    ["Eyebrow", roles.eyebrow, roles.panel, 4.5],
    ["Headline", roles.text, roles.panel, 3],
    ["Body", roles.muted, roles.panel, 4.5],
    ["CTA", roles.ctaText, roles.ctaBg, 3],
    ["Secondary", roles.secondaryLink, roles.panel, 4.5]
  ] as const;

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Brand</h2>
        <span>-</span>
      </div>
      <div className="inspector-active-block">
        <span>Active</span>
        <strong>{palette.name}</strong>
        <small>1 / 425 · {palette.group || "Semantic Sets"}</small>
        <small>{paletteStrengthText(palette, modeColors).replace(/^Strength:\s*/, "Strength: ")}</small>
      </div>
      {(["light", "dark", "brand"] as Mode[]).map((item) => (
        <SegmentedControl
          key={item}
          label={`${item[0].toUpperCase()}${item.slice(1)} Usage`}
          value={usageByMode[item]}
          options={usageOptions}
          onChange={(value) => onColorUsageChange(item, value)}
        />
      ))}
      <div className="element-color-grid">
        <ColorOverrideSelect label="Hero Background" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="Eyebrow" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="Headline" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="Body" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="CTA Background" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="CTA Text" value="auto" roles={roles} onChange={() => undefined} />
        <ColorOverrideSelect label="Secondary Link" value="auto" roles={roles} onChange={() => undefined} />
      </div>
      <div className="audit-list">
        {audit.map(([label, foreground, background, threshold]) => {
          const ratio = contrast(foreground, background);
          return (
            <span key={label} className={`audit-pill ${contrastClass(ratio, threshold)}`}>
              {label}: {ratio.toFixed(2)} {contrastLabel(ratio, threshold)}
            </span>
          );
        })}
      </div>
      <div className="chip-grid">
        {["bg", "text", "muted", "line", "panel", "brand", "onBrand", "accent", "onAccent", "success", "warning", "danger"].map((key) => (
          <ColorChip key={key} color={modeColors[key as keyof typeof modeColors] as string} label={key} />
        ))}
      </div>
      {isBrandInspired(palette.group, palette.sourceType, palette.unofficial) ? <p className="panel-note">{brandDisclaimer}</p> : null}
    </section>
  );
}
