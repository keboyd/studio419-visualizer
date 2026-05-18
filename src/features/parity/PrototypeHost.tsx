import { prototypeRegions, prototypeSource } from "./prototypeManifest";
import { NativeMigrationShadow } from "../visualizer/NativeMigrationShadow";

export function PrototypeHost() {
  return (
    <main
      className={prototypeRegions.shell.hostClassName}
      aria-label={prototypeRegions.shell.ariaLabel}
      data-migration-phase="prototype-host"
    >
      <iframe
        className={prototypeRegions.shell.frameClassName}
        src={prototypeSource.path}
        title={prototypeSource.title}
      />
      <NativeMigrationShadow />
    </main>
  );
}
