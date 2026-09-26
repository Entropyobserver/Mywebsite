interface ChipProps {
  content: string;
  compact?: boolean;
}

export default function Chip({ content, compact = false }: ChipProps) {
  return (
    <div
      className={`center relative inline-block select-none whitespace-nowrap rounded-md align-baseline font-sans text-xs font-bold leading-none text-primary border border-border bg-background ${
        compact ? "px-2 py-1.5" : "px-3 py-2"
      }`}
    >
      {content}
    </div>
  );
}
