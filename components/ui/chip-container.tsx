import Chip from "./chip";

interface ChipContainerProps {
  textArr: string[];
  compact?: boolean;
  maxItems?: number;
}

export default function ChipContainer({
  textArr,
  compact = false,
  maxItems,
}: ChipContainerProps) {
  const visibleItems = maxItems ? textArr.slice(0, maxItems) : textArr;
  const remainingItems = textArr.length - visibleItems.length;

  return (
    <div
      className={`flex flex-wrap ${compact ? "my-1 gap-1.5" : "my-3 gap-2"}`}
    >
      {visibleItems.map((it, ind) => (
        <Chip key={ind} content={it} compact={compact} />
      ))}
      {remainingItems > 0 && (
        <Chip content={`+${remainingItems}`} compact={compact} />
      )}
    </div>
  );
}
