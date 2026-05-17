import { brandDisclaimer } from "@/data/brandEnrichment";

export function AboutPanel() {
  return (
    <section className="panel">
      <h2>About</h2>
      <p className="panel-note">
        Font Pair &amp; Palette Visualizer explores font pairings and color palettes using a responsive hero section as a real-world design test canvas.
      </p>
      <p className="panel-note">{brandDisclaimer}</p>
    </section>
  );
}
