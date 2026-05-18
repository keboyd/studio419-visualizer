import { NativeCanvasRegion } from "./NativeCanvasRegion";
import { NativeHeader } from "./NativeHeader";
import { NativeInspector } from "./NativeInspector";
import { getPrototypeHeaderData } from "../parity/prototypeData.server";
import { NativeVisualizerStateProvider } from "./NativeVisualizerState";

export function NativeMigrationShadow() {
  const headerData = getPrototypeHeaderData();

  return (
    <div hidden aria-hidden="true" data-migration-shadow="native-regions">
      <NativeVisualizerStateProvider headerData={headerData}>
        <NativeHeader />
        <NativeCanvasRegion />
        <NativeInspector />
      </NativeVisualizerStateProvider>
    </div>
  );
}
