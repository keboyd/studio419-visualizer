import type { SampleCopy, TypeSettings } from "@/data/types";
import { SliderControl } from "@/components/controls/SliderControl";

type TypePanelProps = {
  type: TypeSettings;
  copy: SampleCopy;
  onTypeChange: (type: TypeSettings) => void;
  onCopyChange: (copy: SampleCopy) => void;
};

export function TypePanel({ type, copy, onTypeChange, onCopyChange }: TypePanelProps) {
  const setType = (key: keyof TypeSettings, value: number) => onTypeChange({ ...type, [key]: value });

  return (
    <section className="panel">
      <h2>Type</h2>
      <SliderControl label="Headline Desktop" value={type.headlineDesktop} min={32} max={128} suffix="px" onChange={(value) => setType("headlineDesktop", value)} />
      <SliderControl label="Headline Mobile" value={type.headlineMobile} min={28} max={96} suffix="px" onChange={(value) => setType("headlineMobile", value)} />
      <SliderControl label="Body Desktop" value={type.bodyDesktop} min={12} max={40} suffix="px" onChange={(value) => setType("bodyDesktop", value)} />
      <SliderControl label="Body Mobile" value={type.bodyMobile} min={12} max={28} suffix="px" onChange={(value) => setType("bodyMobile", value)} />
      <SliderControl label="Headline Weight" value={type.headlineWeight} min={100} max={900} step={50} onChange={(value) => setType("headlineWeight", value)} />
      <label className="control-field">
        <span>Eyebrow</span>
        <input value={copy.eyebrow} onChange={(event) => onCopyChange({ ...copy, eyebrow: event.target.value })} />
      </label>
      <label className="control-field">
        <span>Headline</span>
        <textarea value={copy.headline} onChange={(event) => onCopyChange({ ...copy, headline: event.target.value })} />
      </label>
      <label className="control-field">
        <span>Body</span>
        <textarea value={copy.body} onChange={(event) => onCopyChange({ ...copy, body: event.target.value })} />
      </label>
    </section>
  );
}
