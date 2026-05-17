import { paletteCategories } from "@/data/paletteCategories";
import { TokenSelect } from "@/components/controls/TokenSelect";

type HeaderProps = {
  fontCategory: string;
  fontCategoryOptions: { value: string; label: string }[];
  pair: string;
  pairOptions: { value: string; label: string }[];
  pairPosition: string;
  paletteLibrary: string;
  paletteName: string;
  paletteOptions: { value: string; label: string }[];
  palettePosition: string;
  onFontCategoryChange: (value: string) => void;
  onPairChange: (value: string) => void;
  onPaletteLibraryChange: (value: string) => void;
  onPaletteChange: (value: string) => void;
};

export function Header({
  fontCategory,
  fontCategoryOptions,
  pair,
  pairOptions,
  pairPosition,
  paletteLibrary,
  paletteName,
  paletteOptions,
  palettePosition,
  onFontCategoryChange,
  onPairChange,
  onPaletteLibraryChange,
  onPaletteChange
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-lockup">
        <div className="studio-logo" aria-label="Studio419 logo">
          <svg viewBox="0 0 132 32" role="img" aria-hidden="true">
            <path d="M10 24V8h10.5c4.2 0 6.8 2.2 6.8 5.8 0 3.8-2.8 6.1-7.3 6.1h-4.3V24H10Zm5.7-8.5h4.1c1.2 0 1.9-.6 1.9-1.7 0-1-.7-1.6-1.9-1.6h-4.1v3.3Z" />
            <path d="M33.4 24V8h5.7v16h-5.7Zm12.2 0V8h5.5l6.5 7.8V8h5.6v16h-5.3l-6.7-8v8h-5.6Zm26.1.3c-5.1 0-8.7-3.4-8.7-8.3 0-4.8 3.6-8.3 8.8-8.3 3.3 0 5.9 1.4 7.3 3.8l-4.6 2.3c-.6-1-1.5-1.5-2.7-1.5-1.9 0-3.2 1.5-3.2 3.7s1.3 3.7 3.2 3.7c1.2 0 2.1-.5 2.7-1.5l4.6 2.3c-1.4 2.4-4 3.8-7.4 3.8Zm16.8-.3V12.8h-5V8h15.7v4.8h-5V24h-5.7Zm17.2 0V8h15.2v4.5h-9.5V14h8.6v4.1h-8.6v1.4h9.8V24h-15.5Z" />
          </svg>
        </div>
        <div>
          <strong>Font Pair &amp; Palette Visualizer</strong>
        </div>
      </div>
      <div className="header-controls">
        <span className="header-label">Type</span>
        <TokenSelect label="Type Category" value={fontCategory} options={fontCategoryOptions} onChange={onFontCategoryChange} />
        <TokenSelect label="Font Pair" value={pair} options={pairOptions} onChange={onPairChange} />
        <span className="header-count">{pairPosition}</span>
        <span className="header-label">Color</span>
        <TokenSelect
          label="Palette Library"
          value={paletteLibrary}
          options={paletteCategories.map((item) => ({ value: item.value, label: item.label }))}
          onChange={onPaletteLibraryChange}
        />
        <TokenSelect label="Palette" value={paletteName} options={paletteOptions} onChange={onPaletteChange} />
        <span className="header-count">{palettePosition}</span>
        <span className="header-label">UI</span>
        <TokenSelect label="UI Mode" value="dark" options={[{ value: "dark", label: "Dark" }]} onChange={() => undefined} />
      </div>
    </header>
  );
}
