type Option = {
  value: string;
  label: string;
};

type TokenSelectProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function TokenSelect({ label, value, options, onChange }: TokenSelectProps) {
  return (
    <label className="control-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
