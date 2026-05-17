type ColorChipProps = {
  color: string;
  label?: string;
};

export function ColorChip({ color, label }: ColorChipProps) {
  return <span className="color-chip" style={{ "--chip-color": color } as React.CSSProperties} title={label ? `${label}: ${color}` : color} />;
}
