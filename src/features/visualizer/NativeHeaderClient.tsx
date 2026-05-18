"use client";

import { chromeModeOptions, headerControlGroups } from "./migrationContract";
import { useNativeVisualizerState } from "./NativeVisualizerState";

const typeGroup = headerControlGroups[0];
const colorGroup = headerControlGroups[1];
const uiGroup = headerControlGroups[2];

function counterLabel(activeIndex: number, total: number) {
  return total > 0 ? `${activeIndex + 1} / ${total}` : "0 / 0";
}

export function NativeHeaderClient() {
  const {
    activeFontPairIndex,
    activeFontPairs,
    activePaletteIndex,
    activePaletteOptions,
    headerData,
    selectedFontCategory,
    selectedPaletteCategory,
    setSelectedFontCategory,
    setSelectedFontPair,
    setSelectedPalette,
    setSelectedPaletteCategory
  } = useNativeVisualizerState();

  return (
    <>
      <div className="header-preview-controls-v44 header-command-center-v183" aria-label="Hero selection controls">
        <div className="header-control-group-v183 header-type-group-v183" aria-label="Typography selection">
          <span className="header-group-label-v183">{typeGroup.label}</span>
          <select
            id="nativeHeaderCategorySelect"
            aria-label="Font category"
            value={selectedFontCategory}
            onChange={(event) => setSelectedFontCategory(event.currentTarget.value)}
          >
            {headerData.fontCategoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            id="nativeHeaderPairSelect"
            aria-label="Font pair"
            value={activeFontPairs[activeFontPairIndex]?.value ?? ""}
            onChange={(event) => setSelectedFontPair(event.currentTarget.value)}
          >
            {activeFontPairs.map((pair) => (
              <option key={pair.value} value={pair.value}>
                {pair.label}
              </option>
            ))}
          </select>
          <span id="nativeCounter" className="font-count-v50">
            {counterLabel(activeFontPairIndex, activeFontPairs.length)}
          </span>
        </div>
        <div className="header-control-group-v183 header-color-group-v183" aria-label="Color system selection">
          <span className="header-group-label-v183">{colorGroup.label}</span>
          <select
            id="nativeHeaderPaletteCategorySelect"
            aria-label="Palette category"
            value={selectedPaletteCategory}
            onChange={(event) => setSelectedPaletteCategory(event.currentTarget.value)}
          >
            {headerData.paletteCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            id="nativePaletteSelect"
            aria-label="Palette"
            value={activePaletteOptions[activePaletteIndex]?.value ?? ""}
            onChange={(event) => setSelectedPalette(event.currentTarget.value)}
          >
            {activePaletteOptions.map((palette) => (
              <option key={palette.value} value={palette.value}>
                {palette.label}
              </option>
            ))}
          </select>
          <span id="nativePaletteCounter" className="palette-count-v81">
            {counterLabel(activePaletteIndex, activePaletteOptions.length)}
          </span>
        </div>
        <div className="swatches header-swatches-v183" id="nativeSwatches" aria-hidden="true" />
      </div>

      <div className="header-ui-controls-v183" aria-label="Tool UI mode">
        <span className="header-group-label-v183">{uiGroup.label}</span>
        <select id="nativeChromeModeSelect" title="Controls only the tool UI chrome" aria-label="UI chrome mode">
          {chromeModeOptions.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
