import { Studio419Logo } from "../brand/Studio419Logo";
import { appTitle } from "./migrationContract";
import { NativeHeaderClient } from "./NativeHeaderClient";

export function NativeHeader() {
  return (
    <header className="topbar-v39" data-native-region="header">
      <section className="toolbar app-header-v43">
        <div className="brand-lockup-v43">
          <div className="logo-slot-v43 logo-slot-studio419" aria-label="Studio419 logo">
            <Studio419Logo />
          </div>
          <div className="app-title-v43">
            <strong>{appTitle}</strong>
            <span className="counter-placeholder-v50" aria-hidden="true" />
          </div>
        </div>

        <NativeHeaderClient />
      </section>
    </header>
  );
}
