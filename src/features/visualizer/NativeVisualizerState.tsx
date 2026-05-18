"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { PrototypeHeaderData } from "../parity/prototypeData.server";
import { previewModes, viewportRange, zoomRange } from "./migrationContract";

type NativeVisualizerStateContextValue = {
  activeFontPairs: PrototypeHeaderData["fontCategoryOptions"][number]["pairs"];
  activeFontPairIndex: number;
  activePaletteIndex: number;
  activePaletteOptions: PrototypeHeaderData["paletteOptions"];
  headerData: PrototypeHeaderData;
  previewMode: (typeof previewModes)[number];
  scale: number;
  selectedFontCategory: string;
  selectedFontPair: string;
  selectedPalette: string;
  selectedPaletteCategory: string;
  setPreviewMode: (mode: (typeof previewModes)[number]) => void;
  setScale: (scale: number | ((current: number) => number)) => void;
  setSelectedFontCategory: (category: string) => void;
  setSelectedFontPair: (pair: string) => void;
  setSelectedPalette: (palette: string) => void;
  setSelectedPaletteCategory: (category: string) => void;
  setViewportWidth: (width: number) => void;
  viewportWidth: number;
};

const NativeVisualizerStateContext = createContext<NativeVisualizerStateContextValue | undefined>(undefined);

type NativeVisualizerStateProviderProps = {
  children: React.ReactNode;
  headerData: PrototypeHeaderData;
};

export function NativeVisualizerStateProvider({ children, headerData }: NativeVisualizerStateProviderProps) {
  const [selectedFontCategory, setSelectedFontCategoryState] = useState(headerData.fontCategoryOptions[0]?.value ?? "");
  const [selectedFontPair, setSelectedFontPair] = useState(headerData.fontCategoryOptions[0]?.pairs[0]?.value ?? "");
  const [selectedPaletteCategory, setSelectedPaletteCategoryState] = useState(headerData.paletteCategories[0] ?? "");
  const [selectedPalette, setSelectedPalette] = useState(headerData.paletteOptions[0]?.value ?? "");
  const [scale, setScale] = useState<number>(zoomRange.defaultScale);
  const [viewportWidth, setViewportWidth] = useState<number>(viewportRange.defaultWidth);
  const [previewMode, setPreviewMode] = useState<(typeof previewModes)[number]>("Light");

  const activeFontCategory = useMemo(() => {
    return (
      headerData.fontCategoryOptions.find((category) => category.value === selectedFontCategory) ??
      headerData.fontCategoryOptions[0]
    );
  }, [headerData.fontCategoryOptions, selectedFontCategory]);

  const activeFontPairs = activeFontCategory?.pairs ?? [];
  const activeFontPairIndex = Math.max(
    0,
    activeFontPairs.findIndex((pair) => pair.value === selectedFontPair)
  );

  const activePaletteOptions = useMemo(() => {
    if (selectedPaletteCategory === "All Palettes") {
      return headerData.paletteOptions;
    }

    return headerData.paletteOptions.filter((palette) => palette.group === selectedPaletteCategory);
  }, [headerData.paletteOptions, selectedPaletteCategory]);
  const activePaletteIndex = Math.max(
    0,
    activePaletteOptions.findIndex((palette) => palette.value === selectedPalette)
  );

  function setSelectedFontCategory(category: string) {
    const nextCategory = headerData.fontCategoryOptions.find((option) => option.value === category);
    setSelectedFontCategoryState(category);
    setSelectedFontPair(nextCategory?.pairs[0]?.value ?? "");
  }

  function setSelectedPaletteCategory(category: string) {
    const nextPalette = headerData.paletteOptions.find((palette) => {
      return category === "All Palettes" || palette.group === category;
    });
    setSelectedPaletteCategoryState(category);
    setSelectedPalette(nextPalette?.value ?? "");
  }

  const value = useMemo(
    () => ({
      activeFontPairs,
      activeFontPairIndex,
      activePaletteIndex,
      activePaletteOptions,
      headerData,
      previewMode,
      scale,
      selectedFontCategory,
      selectedFontPair,
      selectedPalette,
      selectedPaletteCategory,
      setPreviewMode,
      setScale,
      setSelectedFontCategory,
      setSelectedFontPair,
      setSelectedPalette,
      setSelectedPaletteCategory,
      setViewportWidth,
      viewportWidth
    }),
    [
      activeFontPairs,
      activeFontPairIndex,
      activePaletteIndex,
      activePaletteOptions,
      headerData,
      previewMode,
      scale,
      selectedFontCategory,
      selectedFontPair,
      selectedPalette,
      selectedPaletteCategory,
      viewportWidth
    ]
  );

  return <NativeVisualizerStateContext.Provider value={value}>{children}</NativeVisualizerStateContext.Provider>;
}

export function useNativeVisualizerState() {
  const context = useContext(NativeVisualizerStateContext);

  if (!context) {
    throw new Error("useNativeVisualizerState must be used inside NativeVisualizerStateProvider");
  }

  return context;
}
