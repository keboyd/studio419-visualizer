"use client";

import { useState } from "react";
import {
  ctaRadiusOptions,
  heroLayoutOptions,
  layoutControlDefaults,
  layoutRangeControls
} from "./migrationContract";

type LayoutRangeId = (typeof layoutRangeControls)[number]["id"];

type LayoutRangeState = Record<LayoutRangeId, number>;

const defaultLayoutRangeState = layoutRangeControls.reduce((state, control) => {
  return {
    ...state,
    [control.id]: control.value
  };
}, {} as LayoutRangeState);

export function NativeLayoutPanel() {
  const [heroLayout, setHeroLayout] = useState<(typeof heroLayoutOptions)[number]>(layoutControlDefaults.heroLayout);
  const [ctaRadius, setCtaRadius] = useState<(typeof ctaRadiusOptions)[number]>(layoutControlDefaults.ctaRadius);
  const [rangeState, setRangeState] = useState<LayoutRangeState>(defaultLayoutRangeState);

  const primaryRangeControls = layoutRangeControls.slice(0, 3);
  const gapRangeControls = layoutRangeControls.slice(3);

  function updateRangeControl(controlId: LayoutRangeId, nextValue: number) {
    setRangeState((current) => ({
      ...current,
      [controlId]: nextValue
    }));
  }

  return (
    <>
      <section className="alignment-size-grid">
        <div className="field">
          <label>Hero Layout</label>
          <div className="seg" role="group" aria-label="Hero Layout">
            {heroLayoutOptions.map((option) => (
              <button
                className={heroLayout === option ? "active" : undefined}
                data-native-layout-option={option}
                key={option}
                type="button"
                onClick={() => setHeroLayout(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {primaryRangeControls.map((control) => (
          <div className="field" key={control.id}>
            <label htmlFor={`native-${control.id}`}>{control.label}</label>
            <input
              id={`native-${control.id}`}
              data-native-layout-control={control.id}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={rangeState[control.id]}
              onInput={(event) => updateRangeControl(control.id, Number(event.currentTarget.value))}
              onChange={(event) => {
                updateRangeControl(control.id, Number(event.currentTarget.value));
              }}
            />
            <output htmlFor={`native-${control.id}`} data-native-layout-output={control.id}>
              {rangeState[control.id]}px
            </output>
          </div>
        ))}
      </section>
      <section className="gap-grid">
        {gapRangeControls.map((control) => (
          <div className="field custom-gap-control" key={control.id}>
            <label htmlFor={`native-${control.id}`}>{control.label}</label>
            <input
              id={`native-${control.id}`}
              data-native-layout-control={control.id}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={rangeState[control.id]}
              onInput={(event) => updateRangeControl(control.id, Number(event.currentTarget.value))}
              onChange={(event) => {
                updateRangeControl(control.id, Number(event.currentTarget.value));
              }}
            />
            <output htmlFor={`native-${control.id}`} data-native-layout-output={control.id}>
              {rangeState[control.id]}px
            </output>
          </div>
        ))}
      </section>
      <section className="cta-radius-grid">
        <div className="field cta-radius-segment-field">
          <label>CTA Radius</label>
          <div className="seg cta-radius-seg" role="group" aria-label="CTA Radius">
            {ctaRadiusOptions.map((option) => (
              <button
                className={ctaRadius === option ? "active" : undefined}
                data-native-cta-radius={option}
                key={option}
                type="button"
                onClick={() => setCtaRadius(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
