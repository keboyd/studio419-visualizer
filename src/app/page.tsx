const parityPrototypePath = "/prototype/v244.html";

export default function Home() {
  return (
    <main className="app-shell" aria-label="Font Pair & Palette Visualizer">
      <iframe
        className="prototype-frame"
        src={parityPrototypePath}
        title="Font Pair & Palette Visualizer parity prototype"
      />
    </main>
  );
}
