"use client";

import { useMemo, useState } from "react";
import { NativeHeroPreview } from "./NativeHeroPreview";
import { previewModes, viewportPresets, viewportRange, zoomRange } from "./migrationContract";
import { useNativeVisualizerState } from "./NativeVisualizerState";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatZoom(scale: number) {
  return `${Math.round(scale * 100)}%`;
}

function viewportProgress(width: number) {
  const total = viewportRange.maxWidth - viewportRange.minWidth;
  return `${((viewportRange.maxWidth - width) / total) * 100}%`;
}

export function NativeCanvasRegion() {
  const { previewMode, scale, setPreviewMode, setScale, setViewportWidth, viewportWidth } = useNativeVisualizerState();
  const [boundsVisible, setBoundsVisible] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState<{ pointerX: number; pointerY: number; viewX: number; viewY: number }>();

  const activePreset = useMemo(() => {
    return viewportPresets.find((preset) => preset.width === viewportWidth);
  }, [viewportWidth]);

  function updateScale(nextScale: number | ((current: number) => number)) {
    setScale((current) => {
      const rawScale = typeof nextScale === "function" ? nextScale(current) : nextScale;
      return clamp(rawScale, zoomRange.minScale, zoomRange.maxScale);
    });
  }

  return (
    <div data-native-region="canvas">
      <section className="canvas-control-cluster" data-native-region="canvas-controls" aria-label="Canvas preview controls">
        <div className="canvas-tools" aria-label="Canvas zoom controls">
          <button
            className="secondary"
            id="nativeZoomOutBtn"
            type="button"
            onClick={() => updateScale((current) => current - zoomRange.step)}
          >
            −
          </button>
          <button className="secondary" id="nativeZoomResetBtn" type="button" onClick={() => setScale(zoomRange.defaultScale)}>
            {formatZoom(scale)}
          </button>
          <button
            className="secondary"
            id="nativeZoomInBtn"
            type="button"
            onClick={() => updateScale((current) => current + zoomRange.step)}
          >
            +
          </button>
          <span className="canvas-hint">Wheel/trackpad zoom · drag to pan</span>
        </div>

        <div className="viewport-switcher" aria-label="Preview layout type">
          {viewportPresets.map((preset) => (
            <button
              className={activePreset?.value === preset.value ? "viewport-btn active" : "viewport-btn"}
              data-viewport={preset.value}
              key={preset.value}
              type="button"
              onClick={() => setViewportWidth(preset.width)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="viewport-width-control" aria-label="Viewport width control">
          <span className="viewport-width-label">
            Viewport <strong id="nativeViewportWidthVal">{viewportWidth}px</strong>
          </span>
          <input
            id="nativeViewportWidth"
            type="range"
            min={viewportRange.minWidth}
            max={viewportRange.maxWidth}
            step={viewportRange.step}
            value={viewportWidth}
            style={{ "--range-progress": viewportProgress(viewportWidth) } as React.CSSProperties}
            onInput={(event) => setViewportWidth(Number(event.currentTarget.value))}
            onChange={(event) => setViewportWidth(Number(event.currentTarget.value))}
          />
        </div>

        <button
          className={boundsVisible ? "bounds-mid-btn active" : "bounds-mid-btn"}
          id="nativeOverlayToggleBtn"
          type="button"
          title="Show hero element bounds"
          onClick={() => setBoundsVisible((current) => !current)}
        >
          {boundsVisible ? "Hide Bounds" : "Bounds"}
        </button>

        <div className="canvas-preview-mode-switcher" aria-label="Preview color mode">
          <div className="seg compact-preview-mode-v44">
            {previewModes.map((mode) => (
              <button
                className={previewMode === mode ? "active" : undefined}
                id={`native${mode}Btn`}
                key={mode}
                type="button"
                onClick={() => setPreviewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div
        className={panStart ? "canvas-stage is-panning" : "canvas-stage"}
        data-native-region="canvas-stage"
        data-pan-x={pan.x}
        data-pan-y={pan.y}
        data-scale={scale}
        data-is-panning={Boolean(panStart)}
        id="nativeCanvasStage"
        onPointerDown={(event) => {
          setPanStart({
            pointerX: event.clientX,
            pointerY: event.clientY,
            viewX: pan.x,
            viewY: pan.y
          });
        }}
        onPointerMove={(event) => {
          if (!panStart) {
            return;
          }

          setPan({
            x: panStart.viewX + event.clientX - panStart.pointerX,
            y: panStart.viewY + event.clientY - panStart.pointerY
          });
        }}
        onPointerUp={() => setPanStart(undefined)}
        onPointerCancel={() => setPanStart(undefined)}
        onWheel={(event) => {
          event.preventDefault();
          updateScale((current) => current + (event.deltaY < 0 ? zoomRange.step : -zoomRange.step));
        }}
      >
        <NativeHeroPreview boundsVisible={boundsVisible} previewMode={previewMode} viewportWidth={viewportWidth} />
      </div>
    </div>
  );
}
