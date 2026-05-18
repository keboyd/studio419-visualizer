"use client";

import { useState } from "react";
import { responsiveTypeControls } from "./migrationContract";
import { useNativeVisualizerState } from "./NativeVisualizerState";

type TypeControlId = (typeof responsiveTypeControls)[number]["id"];

type TypeControlState = Record<TypeControlId, number>;

const defaultTypeState = responsiveTypeControls.reduce((state, control) => {
  return {
    ...state,
    [control.id]: control.value
  };
}, {} as TypeControlState);

function counterLabel(activeIndex: number, total: number) {
  return total > 0 ? `${activeIndex + 1} / ${total}` : "0 / 0";
}

export function NativeTypePanel() {
  const [typeState, setTypeState] = useState<TypeControlState>(defaultTypeState);
  const {
    activeFontPairIndex,
    activeFontPairs,
    headerData,
    selectedFontCategory,
    setSelectedFontCategory,
    setSelectedFontPair
  } = useNativeVisualizerState();

  function updateTypeControl(controlId: TypeControlId, nextValue: number) {
    setTypeState((current) => ({
      ...current,
      [controlId]: nextValue
    }));
  }

  return (
    <>
      <section className="library-grid">
        <div className="field">
          <label htmlFor="nativeCategorySelect">Font Category</label>
          <select
            id="nativeCategorySelect"
            value={selectedFontCategory}
            onChange={(event) => setSelectedFontCategory(event.currentTarget.value)}
          >
            {headerData.fontCategoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="nativePairSelect">Jump to Pairing</label>
          <select
            id="nativePairSelect"
            value={activeFontPairs[activeFontPairIndex]?.value ?? ""}
            onChange={(event) => setSelectedFontPair(event.currentTarget.value)}
          >
            {activeFontPairs.map((pair) => (
              <option key={pair.value} value={pair.value}>
                {pair.label}
              </option>
            ))}
          </select>
          <span id="nativeTypePairCounter" className="font-count-v50">
            {counterLabel(activeFontPairIndex, activeFontPairs.length)}
          </span>
        </div>
      </section>
      <section className="type-scaling-grid responsive-type-grid">
        {responsiveTypeControls.map((control) => (
          <div className="type" key={control.id}>
            <label htmlFor={`native-${control.id}`}>{control.label}</label>
            <input
              id={`native-${control.id}`}
              data-native-type-control={control.id}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={typeState[control.id]}
              onInput={(event) => updateTypeControl(control.id, Number(event.currentTarget.value))}
              onChange={(event) => {
                updateTypeControl(control.id, Number(event.currentTarget.value));
              }}
            />
            <output htmlFor={`native-${control.id}`} data-native-type-output={control.id}>
              {typeState[control.id]}px
            </output>
          </div>
        ))}
        <div className="field responsive-type-meta-field">
          <label>Responsive Type</label>
          <p className="small" id="nativeResponsiveTypeMeta">
            {typeState.headlineMobile}px → {typeState.headlineDesktop}px headline · {typeState.bodyMobile}px →{" "}
            {typeState.bodyDesktop}px body
          </p>
        </div>
      </section>
    </>
  );
}
