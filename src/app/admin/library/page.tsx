import { palettes } from "@/data/palettes";
import { fontCategories } from "@/data/fontPairs";
import { paletteStrengthText } from "@/lib/color/paletteStrength";

export default function LibraryAdminPage() {
  const fontPairCount = Object.values(fontCategories).reduce((sum, pairs) => sum + pairs.length, 0);

  return (
    <main className="admin-page">
      <header>
        <a href="/">Back to visualizer</a>
        <h1>Local Library Admin</h1>
        <p>File/JSON workflow first: review, validate, export, and prepare palette or font-pair edits without a database.</p>
      </header>
      <section className="admin-grid">
        <article className="panel">
          <h2>Palette Library</h2>
          <p className="panel-note">{palettes.length} palettes loaded from structured data.</p>
          <textarea readOnly value={JSON.stringify(palettes.slice(0, 12), null, 2)} />
        </article>
        <article className="panel">
          <h2>Font Pair Library</h2>
          <p className="panel-note">
            {fontPairCount} pairs across {Object.keys(fontCategories).length} categories.
          </p>
          <textarea readOnly value={JSON.stringify(fontCategories, null, 2)} />
        </article>
        <article className="panel">
          <h2>Palette Validation</h2>
          <div className="admin-list">
            {palettes.slice(0, 20).map((palette) => (
              <div key={palette.name} className="admin-row">
                <strong>{palette.name}</strong>
                <span>{paletteStrengthText(palette, palette.light)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
