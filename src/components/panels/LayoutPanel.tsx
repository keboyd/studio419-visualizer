import type { LayoutSettings } from "@/data/types";
import { SegmentedControl } from "@/components/controls/SegmentedControl";
import { SliderControl } from "@/components/controls/SliderControl";

type LayoutPanelProps = {
  layout: LayoutSettings;
  onLayoutChange: (layout: LayoutSettings) => void;
};

export function LayoutPanel({ layout, onLayoutChange }: LayoutPanelProps) {
  const setLayout = <K extends keyof LayoutSettings>(key: K, value: LayoutSettings[K]) => onLayoutChange({ ...layout, [key]: value });

  return (
    <section className="panel">
      <h2>Layout</h2>
      <SegmentedControl
        label="Alignment"
        value={layout.alignment}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" }
        ]}
        onChange={(value) => setLayout("alignment", value)}
      />
      <SliderControl label="Hero X Padding" value={layout.heroPaddingX} min={16} max={220} suffix="px" onChange={(value) => setLayout("heroPaddingX", value)} />
      <SliderControl label="Headline Width" value={layout.headlineWidth} min={34} max={92} suffix="ch" onChange={(value) => setLayout("headlineWidth", value)} />
      <SliderControl label="Body Width" value={layout.bodyWidth} min={34} max={84} suffix="ch" onChange={(value) => setLayout("bodyWidth", value)} />
      <SegmentedControl
        label="CTA Radius"
        value={layout.ctaRadius}
        options={[
          { value: "full", label: "Full" },
          { value: "lg", label: "Large" },
          { value: "md", label: "Medium" },
          { value: "sm", label: "Small" },
          { value: "square", label: "Square" }
        ]}
        onChange={(value) => setLayout("ctaRadius", value)}
      />
    </section>
  );
}
