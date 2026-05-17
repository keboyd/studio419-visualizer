type SliderControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export function SliderControl({ label, value, min, max, step = 1, suffix = "", onChange }: SliderControlProps) {
  return (
    <label className="control-field">
      <span>
        {label} <b>{value}{suffix}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
