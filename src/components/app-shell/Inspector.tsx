import type { ColorUsage, HeroColorRoles, LayoutSettings, Mode, Palette, SavedSetup, SampleCopy, TypeSettings } from "@/data/types";
import { AboutPanel } from "@/components/panels/AboutPanel";
import { BrandPanel } from "@/components/panels/BrandPanel";
import { ExportPanel } from "@/components/panels/ExportPanel";
import { LayoutPanel } from "@/components/panels/LayoutPanel";
import { SavedSetupsPanel } from "@/components/panels/SavedSetupsPanel";
import { TypePanel } from "@/components/panels/TypePanel";

type InspectorProps = {
  state: {
    mode: Mode;
    colorUsageByMode: Record<Mode, ColorUsage>;
    copy: SampleCopy;
    type: TypeSettings;
    layout: LayoutSettings;
  };
  activePalette: Palette;
  roles: HeroColorRoles;
  savedSetups: SavedSetup[];
  selectedSetupId: string;
  exportText: string;
  exportFormat: string;
  onColorUsageChange: (mode: Mode, usage: ColorUsage) => void;
  onCopyChange: (copy: SampleCopy) => void;
  onTypeChange: (type: TypeSettings) => void;
  onLayoutChange: (layout: LayoutSettings) => void;
  onSaveSetup: () => void;
  onUpdateSetup: () => void;
  onDuplicateSetup: () => void;
  onDeleteSetup: () => void;
  onSelectSetup: (id: string) => void;
  onLoadSetup: () => void;
  onExportFormatChange: (value: string) => void;
  onImportLibrary: (text: string) => void;
  onResetSettings: () => void;
};

export function Inspector(props: InspectorProps) {
  return (
    <aside className="inspector">
      <BrandPanel
        palette={props.activePalette}
        mode={props.state.mode}
        usageByMode={props.state.colorUsageByMode}
        roles={props.roles}
        onColorUsageChange={props.onColorUsageChange}
      />
      <TypePanel type={props.state.type} copy={props.state.copy} onTypeChange={props.onTypeChange} onCopyChange={props.onCopyChange} />
      <LayoutPanel layout={props.state.layout} onLayoutChange={props.onLayoutChange} />
      <SavedSetupsPanel
        setups={props.savedSetups}
        selectedSetupId={props.selectedSetupId}
        onSelect={props.onSelectSetup}
        onLoad={props.onLoadSetup}
        onSave={props.onSaveSetup}
        onUpdate={props.onUpdateSetup}
        onDuplicate={props.onDuplicateSetup}
        onDelete={props.onDeleteSetup}
        onImportLibrary={props.onImportLibrary}
        onResetSettings={props.onResetSettings}
      />
      <ExportPanel format={props.exportFormat} text={props.exportText} onFormatChange={props.onExportFormatChange} />
      <AboutPanel />
    </aside>
  );
}
