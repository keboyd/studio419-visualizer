"use client";

import { useEffect, useMemo, useState } from "react";
import { palettes } from "@/data/palettes";
import { fontCategories, sampleCopy } from "@/data/fontPairs";
import { paletteCategories } from "@/data/paletteCategories";
import type { ColorUsage, FontCategoryMap, Mode, Palette, SampleCopyMap, SavedSetup, VisualizerState } from "@/data/types";
import { CanvasPreview } from "./CanvasPreview";
import { Header } from "./Header";
import { Inspector } from "./Inspector";
import { defaultColorUsageByMode, resolveHeroRoles } from "@/lib/color/colorEngine";
import { createPreset } from "@/lib/presets/createPreset";
import { defaultLayoutSettings } from "@/lib/presets/presetSchema";
import { loadPreset } from "@/lib/presets/loadPreset";
import { defaultTypeSettings } from "@/lib/typography/responsiveType";
import { exportSetup, type ExportFormat } from "@/lib/exports";
import { importPresetLibrary } from "@/lib/storage/importExportLibrary";
import { readLocalStorage, writeLocalStorage } from "@/lib/storage/localStorage";
import { googleFontsHref } from "@/lib/typography/fontPairing";

const storageKey = "studio419.visualizer.v1";
const fontCategoryMap = fontCategories as FontCategoryMap;
const sampleCopyMap = sampleCopy as SampleCopyMap;

function initialState(): VisualizerState {
  const fontCategory = Object.keys(fontCategories)[0];
  const pair = fontCategoryMap[fontCategory][0];
  const paletteName = palettes[0].name;

  return {
    fontCategory,
    pair,
    paletteLibrary: "all",
    paletteName,
    mode: "light",
    colorUsageByMode: defaultColorUsageByMode,
    colorOverrides: {
      minimal: {},
      editorial: {},
      brand: {},
      campaign: {},
      maximal: {}
    },
    copy: sampleCopyMap[fontCategory],
    type: defaultTypeSettings,
    layout: defaultLayoutSettings,
    viewportWidth: 1440
  };
}

function filterPalettes(library: string): Palette[] {
  const category = paletteCategories.find((item) => item.value === library);
  if (!category || !("group" in category)) return palettes;
  return palettes.filter((palette) => palette.group === category.group);
}

export function AppShell() {
  const [state, setState] = useState<VisualizerState>(initialState);
  const [savedSetups, setSavedSetups] = useState<SavedSetup[]>([]);
  const [selectedSetupId, setSelectedSetupId] = useState("");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("ai");

  useEffect(() => {
    const stored = readLocalStorage<{ state: VisualizerState; savedSetups: SavedSetup[]; selectedSetupId: string } | null>(storageKey, null);
    if (stored?.state) setState(stored.state);
    if (stored?.savedSetups) setSavedSetups(stored.savedSetups);
    if (stored?.selectedSetupId) setSelectedSetupId(stored.selectedSetupId);
  }, []);

  useEffect(() => {
    writeLocalStorage(storageKey, { state, savedSetups, selectedSetupId });
  }, [state, savedSetups, selectedSetupId]);

  useEffect(() => {
    const id = "studio419-active-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = googleFontsHref(state.pair);
  }, [state.pair]);

  const availablePalettes = useMemo(() => filterPalettes(state.paletteLibrary), [state.paletteLibrary]);
  const activePalette = availablePalettes.find((palette) => palette.name === state.paletteName) || availablePalettes[0] || palettes[0];
  const pairOptions = fontCategoryMap[state.fontCategory] || [];
  const pairIndex = Math.max(0, pairOptions.findIndex((pair) => pair === state.pair));
  const paletteIndex = Math.max(0, availablePalettes.findIndex((palette) => palette.name === activePalette.name));
  const activeUsage = state.colorUsageByMode[state.mode];
  const roles = resolveHeroRoles(activePalette, state.mode, state.colorUsageByMode, state.colorOverrides[activeUsage] || {});
  const activeSetup = createPreset(state, activePalette, state.pair);
  const exportText = exportSetup(exportFormat, activeSetup);

  function updateState(next: Partial<VisualizerState>) {
    setState((current) => ({ ...current, ...next }));
  }

  function setPaletteLibrary(value: string) {
    const nextPalettes = filterPalettes(value);
    updateState({ paletteLibrary: value, paletteName: (nextPalettes[0] || palettes[0]).name });
  }

  function setFontCategory(value: string) {
    updateState({ fontCategory: value, pair: fontCategoryMap[value][0], copy: sampleCopyMap[value] || state.copy });
  }

  function saveSetup() {
    if (savedSetups.length >= 20) return;
    const setup = createPreset(state, activePalette);
    setSavedSetups((current) => [...current, setup]);
    setSelectedSetupId(setup.id);
  }

  function updateSetup() {
    setSavedSetups((current) =>
      current.map((setup) => (setup.id === selectedSetupId ? { ...createPreset(state, activePalette, setup.name), id: setup.id, createdAt: setup.createdAt, updatedAt: new Date().toISOString() } : setup))
    );
  }

  function duplicateSetup() {
    const setup = savedSetups.find((item) => item.id === selectedSetupId);
    if (!setup || savedSetups.length >= 20) return;
    const copy = { ...structuredClone(setup), id: `hero-${Date.now()}`, name: `${setup.name} Copy`, createdAt: new Date().toISOString() };
    setSavedSetups((current) => [...current, copy]);
    setSelectedSetupId(copy.id);
  }

  function deleteSetup() {
    setSavedSetups((current) => current.filter((setup) => setup.id !== selectedSetupId));
    setSelectedSetupId("");
  }

  function loadSelectedSetup() {
    const setup = savedSetups.find((item) => item.id === selectedSetupId);
    if (setup) setState(loadPreset(setup));
  }

  function importLibrary(text: string) {
    const imported = importPresetLibrary(text);
    setSavedSetups((current) => [...current, ...imported].slice(0, 20));
  }

  function resetSettings() {
    setState({ ...initialState(), paletteLibrary: state.paletteLibrary, paletteName: state.paletteName });
  }

  return (
    <div className="app-shell">
        <Header
          fontCategory={state.fontCategory}
          fontCategoryOptions={Object.entries(fontCategoryMap).map(([value, pairs]) => ({ value, label: `${value} (${pairs.length})` }))}
          pair={state.pair}
          pairOptions={pairOptions.map((pair, index) => ({ value: pair, label: `${index + 1}. ${pair}` }))}
          pairPosition={`${pairIndex + 1} / ${pairOptions.length}`}
          paletteLibrary={state.paletteLibrary}
          paletteName={activePalette.name}
          paletteOptions={availablePalettes.map((palette, index) => ({ value: palette.name, label: `${index + 1}. ${palette.name}` }))}
          palettePosition={`${paletteIndex + 1} / ${availablePalettes.length}`}
          onFontCategoryChange={setFontCategory}
          onPairChange={(pair) => updateState({ pair })}
          onPaletteLibraryChange={setPaletteLibrary}
          onPaletteChange={(paletteName) => updateState({ paletteName })}
        />
        <div className="workbench">
          <CanvasPreview
            viewportWidth={state.viewportWidth}
            pair={state.pair}
            copy={state.copy}
            roles={roles}
            type={state.type}
            layout={state.layout}
            mode={state.mode}
            onViewportChange={(viewportWidth) => updateState({ viewportWidth })}
            onModeChange={(mode) => updateState({ mode })}
          />
          <Inspector
            state={state}
            activePalette={activePalette}
            roles={roles}
            savedSetups={savedSetups}
            selectedSetupId={selectedSetupId}
            exportText={exportText}
            exportFormat={exportFormat}
            onColorUsageChange={(mode: Mode, usage: ColorUsage) => updateState({ colorUsageByMode: { ...state.colorUsageByMode, [mode]: usage } })}
            onCopyChange={(copy) => updateState({ copy })}
            onTypeChange={(type) => updateState({ type })}
            onLayoutChange={(layout) => updateState({ layout })}
            onSaveSetup={saveSetup}
            onUpdateSetup={updateSetup}
            onDuplicateSetup={duplicateSetup}
            onDeleteSetup={deleteSetup}
            onSelectSetup={setSelectedSetupId}
            onLoadSetup={loadSelectedSetup}
            onExportFormatChange={(value) => setExportFormat(value as ExportFormat)}
            onImportLibrary={importLibrary}
            onResetSettings={resetSettings}
          />
        </div>
    </div>
  );
}
