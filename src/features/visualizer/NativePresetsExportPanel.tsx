"use client";

import { useMemo, useState } from "react";
import {
  brandReferenceDisclaimer,
  colorUsageScopes,
  exportActions,
  exportFormats,
  exportFormatValues,
  heroPaddingAnchors,
  presetBrowserActions,
  presetLibraryImportModes,
  responsiveTypeAnchors,
  savedSetupActions
} from "./migrationContract";

type SavedSetup = {
  id: string;
  name: string;
};

const presetLimit = 20;

const defaultSetupName = "Editorial SaaS Hero 01";

const exportFormatOptions = exportFormats.map((label, index) => ({
  label,
  value: exportFormatValues[index]
}));

function createSetup(name: string, index: number): SavedSetup {
  return {
    id: `native-setup-${index + 1}`,
    name: name.trim() || `${defaultSetupName} ${index + 1}`
  };
}

function duplicateName(name: string) {
  return `${name} Copy`;
}

function exportText(format: (typeof exportFormatValues)[number], sourceLabel: string) {
  const lines = [
    `Export Format: ${exportFormatOptions.find((option) => option.value === format)?.label ?? exportFormats[0]}`,
    `Export Source: ${sourceLabel}`,
    "Responsive type anchors:",
    `- Desktop Headline: ${responsiveTypeAnchors.headlineDesktop}px`,
    `- Mobile Headline: ${responsiveTypeAnchors.headlineMobile}px`,
    `- Desktop Body: ${responsiveTypeAnchors.bodyDesktop}px`,
    `- Mobile Body: ${responsiveTypeAnchors.bodyMobile}px`,
    "Hero X Padding behavior:",
    `- Desktop: ${heroPaddingAnchors.desktop}px`,
    `- Mobile: ${heroPaddingAnchors.mobile}px`,
    "Color usage by mode:",
    colorUsageScopes.map((scope) => `- ${scope}: preserved per saved setup`).join("\n"),
    "Manual color overrides: preserved per Color Usage scope.",
    "Multi-mode color snapshots: Light, Dark, and Brand.",
    brandReferenceDisclaimer
  ];

  if (format === "json") {
    return JSON.stringify(
      {
        colorUsageByMode: colorUsageScopes,
        disclaimer: brandReferenceDisclaimer,
        format,
        heroPadding: heroPaddingAnchors,
        responsiveType: responsiveTypeAnchors,
        source: sourceLabel
      },
      null,
      2
    );
  }

  return lines.join("\n");
}

export function NativePresetsExportPanel() {
  const [presetName, setPresetName] = useState(defaultSetupName);
  const [savedSetups, setSavedSetups] = useState<SavedSetup[]>([]);
  const [selectedSetupId, setSelectedSetupId] = useState("");
  const [importMode, setImportMode] = useState<(typeof presetLibraryImportModes)[number]["value"]>("merge");
  const [exportSource, setExportSource] = useState("");
  const [exportFormat, setExportFormat] = useState<(typeof exportFormatValues)[number]>("ai");
  const [exportStatus, setExportStatus] = useState("");

  const selectedSetup = savedSetups.find((setup) => setup.id === selectedSetupId);
  const exportSourceLabel = exportSource
    ? savedSetups.find((setup) => setup.id === exportSource)?.name ?? "Current active hero"
    : "Current active hero";
  const previewText = useMemo(() => exportText(exportFormat, exportSourceLabel), [exportFormat, exportSourceLabel]);

  function saveActiveSetup() {
    if (savedSetups.length >= presetLimit) {
      setExportStatus(`Saved setup limit reached: ${presetLimit}.`);
      return;
    }

    const nextSetup = createSetup(presetName, savedSetups.length);
    setSavedSetups((current) => [...current, nextSetup]);
    setSelectedSetupId(nextSetup.id);
    setExportSource(nextSetup.id);
    setExportStatus(`Saved ${nextSetup.name}.`);
  }

  function updateSelectedSetup() {
    if (!selectedSetupId) {
      setExportStatus("Select a saved setup to update.");
      return;
    }

    setSavedSetups((current) =>
      current.map((setup) => (setup.id === selectedSetupId ? { ...setup, name: presetName.trim() || setup.name } : setup))
    );
    setExportStatus("Updated selected setup.");
  }

  function duplicateSelectedSetup() {
    if (!selectedSetup || savedSetups.length >= presetLimit) {
      setExportStatus("Select a saved setup to duplicate.");
      return;
    }

    const duplicatedSetup = {
      id: `native-setup-${Date.now()}`,
      name: duplicateName(selectedSetup.name)
    };
    setSavedSetups((current) => [...current, duplicatedSetup]);
    setSelectedSetupId(duplicatedSetup.id);
    setExportSource(duplicatedSetup.id);
    setExportStatus(`Duplicated ${selectedSetup.name}.`);
  }

  function deleteSelectedSetup() {
    if (!selectedSetupId) {
      setExportStatus("Select a saved setup to delete.");
      return;
    }

    const nextSetups = savedSetups.filter((setup) => setup.id !== selectedSetupId);
    const nextSelected = nextSetups[0]?.id ?? "";
    setSavedSetups(nextSetups);
    setSelectedSetupId(nextSelected);
    setExportSource(nextSelected);
    setExportStatus("Deleted selected setup.");
  }

  function loadSetupByOffset(offset: number) {
    if (!savedSetups.length) {
      setExportStatus("No saved setups yet.");
      return;
    }

    const currentIndex = Math.max(
      0,
      savedSetups.findIndex((setup) => setup.id === selectedSetupId)
    );
    const nextIndex = (currentIndex + offset + savedSetups.length) % savedSetups.length;
    const nextSetup = savedSetups[nextIndex];
    setSelectedSetupId(nextSetup.id);
    setExportSource(nextSetup.id);
    setPresetName(nextSetup.name);
    setExportStatus(`Previewing ${nextSetup.name}.`);
  }

  function clearPresets() {
    setSavedSetups([]);
    setSelectedSetupId("");
    setExportSource("");
    setExportStatus("Cleared saved setups.");
  }

  function resetAppSettings() {
    setPresetName(defaultSetupName);
    setSelectedSetupId("");
    setExportSource("");
    setExportFormat("ai");
    setImportMode("merge");
    setExportStatus("Reset app settings.");
  }

  return (
    <>
      <section className="save-export-panel">
        <div className="save-export-panel-title">Saved Setups</div>
        <p className="small save-export-help">
          Save the active type, color, layout, and responsive settings as a reusable setup.
        </p>
        <p className="small preset-workflow-note">
          Use the saved setup menu below to preview/load a setup. Make changes, then use Update Selected Setup to
          overwrite the selected setup.
        </p>
        <div className="field">
          <label htmlFor="nativePresetNameInput">Preset Name</label>
          <input
            id="nativePresetNameInput"
            placeholder={defaultSetupName}
            value={presetName}
            onInput={(event) => setPresetName(event.currentTarget.value)}
            onChange={(event) => setPresetName(event.currentTarget.value)}
          />
        </div>
        <div className="save-export-actions">
          <button id="nativeSaveActiveHeroBtn" type="button" onClick={saveActiveSetup}>
            {savedSetupActions[0]}
          </button>
          <button className="secondary" id="nativeUpdatePresetBtn" type="button" onClick={updateSelectedSetup}>
            {savedSetupActions[1]}
          </button>
          <button className="secondary" id="nativeCopyPresetListBtn" type="button" onClick={() => setExportStatus("Copied preset list.")}>
            {savedSetupActions[2]}
          </button>
          <button className="danger" id="nativeClearPresetsBtn" type="button" onClick={clearPresets}>
            {savedSetupActions[3]}
          </button>
        </div>
        <div className="favorites-summary-row">
          <strong id="nativeFavCount">{savedSetups.length} presets</strong>
          <span id="nativeFavoriteLimitMeta">
            {savedSetups.length} / {presetLimit} saved
          </span>
        </div>
        <div className="preset-browser-panel">
          <div className="field saved-setup-browser-field">
            <label id="nativePresetBrowserLabel" htmlFor="nativePresetBrowserSelect">
              Preview Saved Setup
            </label>
            <select
              id="nativePresetBrowserSelect"
              value={selectedSetupId}
              onChange={(event) => {
                const nextId = event.currentTarget.value;
                const nextSetup = savedSetups.find((setup) => setup.id === nextId);
                setSelectedSetupId(nextId);
                setExportSource(nextId);
                if (nextSetup) {
                  setPresetName(nextSetup.name);
                  setExportStatus(`Previewing ${nextSetup.name}.`);
                }
              }}
            >
              {savedSetups.length ? (
                savedSetups.map((setup) => (
                  <option key={setup.id} value={setup.id}>
                    {setup.name}
                  </option>
                ))
              ) : (
                <option value="">No saved setups yet</option>
              )}
            </select>
          </div>
          <div className="preset-browser-actions preset-browser-actions-v242">
            <button className="secondary" id="nativeDuplicateSelectedPresetBtn" type="button" onClick={duplicateSelectedSetup}>
              {presetBrowserActions[0]}
            </button>
            <button className="danger" id="nativeDeleteSelectedPresetBtn" type="button" onClick={deleteSelectedSetup}>
              {presetBrowserActions[1]}
            </button>
            <button className="secondary" id="nativePrevPresetBtn" type="button" onClick={() => loadSetupByOffset(-1)}>
              {presetBrowserActions[2]}
            </button>
            <button className="secondary" id="nativeNextPresetBtn" type="button" onClick={() => loadSetupByOffset(1)}>
              {presetBrowserActions[3]}
            </button>
          </div>
        </div>
      </section>

      <section className="save-export-panel preset-library-panel">
        <div className="save-export-panel-title">Preset Library</div>
        <p className="small save-export-help">Back up, restore, or reset the local visualizer workspace.</p>
        <div className="field">
          <label htmlFor="nativePresetImportMode">Import Mode</label>
          <select
            id="nativePresetImportMode"
            value={importMode}
            onChange={(event) => setImportMode(event.currentTarget.value as typeof importMode)}
          >
            {presetLibraryImportModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
        <div className="save-export-actions preset-library-actions">
          <button className="secondary" id="nativeExportPresetLibraryBtn" type="button" onClick={() => setExportStatus("Exported preset library.")}>
            Export Preset Library
          </button>
          <button className="secondary" id="nativeImportPresetLibraryBtn" type="button" onClick={() => setExportStatus(`Import mode: ${importMode}.`)}>
            Import Preset Library
          </button>
          <button className="secondary" id="nativeResetAppSettingsBtn" type="button" onClick={resetAppSettings}>
            Reset App Settings
          </button>
          <input id="nativePresetLibraryFileInput" type="file" accept="application/json,.json" hidden />
        </div>
      </section>

      <section className="save-export-panel">
        <div className="save-export-panel-title">Export Package</div>
        <div className="field">
          <label htmlFor="nativeFavoriteSelect">Export Source</label>
          <select id="nativeFavoriteSelect" value={exportSource} onChange={(event) => setExportSource(event.currentTarget.value)}>
            <option value="">Current active hero</option>
            {savedSetups.map((setup) => (
              <option key={setup.id} value={setup.id}>
                {setup.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="nativeExportFormatSelect">Export Format</label>
          <select
            id="nativeExportFormatSelect"
            value={exportFormat}
            onChange={(event) => {
              setExportFormat(event.currentTarget.value as typeof exportFormat);
              setExportStatus(`Previewing ${event.currentTarget.selectedOptions[0]?.textContent ?? exportFormats[0]}.`);
            }}
          >
            {exportFormatOptions.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>
        <div className="save-export-actions export-actions">
          {exportActions.map((action) => (
            <button
              className={action === "Copy Export" ? undefined : "secondary"}
              id={`native${action.replace(/\s/g, "")}Btn`}
              key={action}
              type="button"
              onClick={() => setExportStatus(`${action} ready.`)}
            >
              {action}
            </button>
          ))}
        </div>
        <div className="export-status" id="nativeExportStatus" aria-live="polite">
          {exportStatus}
        </div>
        <div className="field">
          <label htmlFor="nativeTokenOutput">Implementation Preview</label>
          <textarea
            id="nativeTokenOutput"
            readOnly
            placeholder="Choose an export source and format to preview the handoff artifact."
            value={previewText}
          />
        </div>
      </section>
    </>
  );
}
