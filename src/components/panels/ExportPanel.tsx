import { exportFormats, type ExportFormat } from "@/lib/exports";

type ExportPanelProps = {
  format: string;
  text: string;
  onFormatChange: (value: string) => void;
};

export function ExportPanel({ format, text, onFormatChange }: ExportPanelProps) {
  async function copyText() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="panel">
      <h2>Export Package</h2>
      <label className="control-field">
        <span>Format</span>
        <select value={format} onChange={(event) => onFormatChange(event.target.value as ExportFormat)}>
          {exportFormats.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => void copyText()}>
        Copy Export
      </button>
      <textarea readOnly value={text} />
    </section>
  );
}
