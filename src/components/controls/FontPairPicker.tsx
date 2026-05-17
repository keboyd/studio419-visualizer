import { TokenSelect } from "./TokenSelect";

type FontPairPickerProps = {
  categories: Record<string, string[]>;
  category: string;
  pair: string;
  onCategoryChange: (value: string) => void;
  onPairChange: (value: string) => void;
};

export function FontPairPicker({ categories, category, pair, onCategoryChange, onPairChange }: FontPairPickerProps) {
  const pairs = categories[category] || [];

  return (
    <>
      <TokenSelect
        label="Font Category"
        value={category}
        options={Object.keys(categories).map((item) => ({ value: item, label: item }))}
        onChange={onCategoryChange}
      />
      <TokenSelect label="Font Pair" value={pair} options={pairs.map((item) => ({ value: item, label: item }))} onChange={onPairChange} />
    </>
  );
}
