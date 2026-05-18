import { inspectorPanels } from "../parity/prototypeManifest";
import { NativeBrandPanel } from "./NativeBrandPanel";
import { NativeLayoutPanel } from "./NativeLayoutPanel";
import { NativePresetsExportPanel } from "./NativePresetsExportPanel";
import { NativeTypePanel } from "./NativeTypePanel";

function NativePanel({
  children,
  icon,
  panel
}: {
  children: React.ReactNode;
  icon: string;
  panel: (typeof inspectorPanels)[number];
}) {
  return (
    <section className="major-group" data-major-group={panel.key} data-native-inspector-panel={panel.key}>
      <div className="major-group-header">
        <div className="major-group-title">
          <span className="group-icon" aria-hidden="true">
            {icon}
          </span>
          <strong>{panel.label}</strong>
        </div>
        <button className="secondary major-group-toggle" type="button">
          −
        </button>
      </div>
      <div className="major-group-body">{children}</div>
    </section>
  );
}

export function NativeInspector() {
  const [brandPanel, typePanel, layoutPanel, savePanel, aboutPanel] = inspectorPanels;

  return (
    <aside className="inspector-v39" data-native-region="inspector" aria-label="Controls Inspector">
      <NativePanel icon="◐" panel={brandPanel}>
        <NativeBrandPanel />
      </NativePanel>

      <NativePanel icon="T" panel={typePanel}>
        <NativeTypePanel />
      </NativePanel>

      <NativePanel icon="▦" panel={layoutPanel}>
        <NativeLayoutPanel />
      </NativePanel>

      <NativePanel icon="↓" panel={savePanel}>
        <NativePresetsExportPanel />
      </NativePanel>

      <NativePanel icon="i" panel={aboutPanel}>
        <section className="system-grid">
          <div className="field">
            <label>Brand-Inspired Systems</label>
            <p className="small">Brand-inspired palettes are unofficial references for visual exploration.</p>
          </div>
        </section>
      </NativePanel>
    </aside>
  );
}
