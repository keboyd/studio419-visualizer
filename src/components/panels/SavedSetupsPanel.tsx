import type { SavedSetup } from "@/data/types";
import { exportPresetLibrary } from "@/lib/storage/importExportLibrary";

type SavedSetupsPanelProps = {
  setups: SavedSetup[];
  selectedSetupId: string;
  onSelect: (id: string) => void;
  onLoad: () => void;
  onSave: () => void;
  onUpdate: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onImportLibrary: (text: string) => void;
  onResetSettings: () => void;
};

export function SavedSetupsPanel({
  setups,
  selectedSetupId,
  onSelect,
  onLoad,
  onSave,
  onUpdate,
  onDuplicate,
  onDelete,
  onImportLibrary,
  onResetSettings
}: SavedSetupsPanelProps) {
  const selected = setups.find((setup) => setup.id === selectedSetupId);

  function downloadLibrary() {
    const blob = new Blob([exportPresetLibrary(setups)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "studio419-visualizer-preset-library.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;
    onImportLibrary(await file.text());
  }

  return (
    <section className="panel">
      <h2>Saved Setups</h2>
      <p className="panel-note">Save the active type, color, layout, and responsive settings as a portable token package.</p>
      <label className="control-field">
        <span>Preview Saved Setup</span>
        <select value={selectedSetupId} onChange={(event) => onSelect(event.target.value)}>
          <option value="">No saved setups yet</option>
          {setups.map((setup) => (
            <option key={setup.id} value={setup.id}>
              {setup.name}
            </option>
          ))}
        </select>
      </label>
      <p className="panel-note">{selected ? selected.summary : `${setups.length} / 20 saved`}</p>
      <div className="button-grid">
        <button type="button" onClick={onDuplicate} disabled={!selected}>
          Duplicate
        </button>
        <button type="button" onClick={onDelete} disabled={!selected}>
          Delete
        </button>
        <button type="button" onClick={onLoad} disabled={!selected}>
          Load
        </button>
        <button type="button" onClick={onUpdate} disabled={!selected}>
          Update Selected Setup
        </button>
      </div>
      <button type="button" onClick={onSave}>
        Save Active Setup
      </button>
      <div className="button-grid">
        <button type="button" onClick={downloadLibrary} disabled={!setups.length}>
          Export Preset Library
        </button>
        <label className="file-button">
          Import Preset Library
          <input type="file" accept="application/json" onChange={(event) => void handleImport(event.target.files?.[0])} />
        </label>
      </div>
      <button type="button" className="secondary" onClick={onResetSettings}>
        Reset App Settings
      </button>
    </section>
  );
}
