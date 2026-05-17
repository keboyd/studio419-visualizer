import type { HeroColorRoles } from "@/data/types";
import { ColorChip } from "./ColorChip";

type ColorOverrideSelectProps = {
  label: string;
  value: string | "auto";
  roles: HeroColorRoles;
  onChange: (value: string | "auto") => void;
};

export function ColorOverrideSelect({ label, value, roles, onChange }: ColorOverrideSelectProps) {
  const options = Object.entries(roles);

  return (
    <label className="control-field control-field-row">
      <span>{label}</span>
      <ColorChip color={value === "auto" ? roles.text : value} />
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="auto">Auto</option>
        {options.map(([key, color]) => (
          <option key={key} value={color}>
            {key} · {color}
          </option>
        ))}
      </select>
    </label>
  );
}
