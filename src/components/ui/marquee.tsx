import { cn } from "@/lib/utils";

const ITEMS = [
  "Personal Shopper",
  "✦",
  "Asesoría de Imagen",
  "✦",
  "Colorimetría",
  "✦",
  "Coach Personal",
  "✦",
  "Estética Consciente",
  "✦",
  "Bienestar Integral",
  "✦",
  "Transformación",
  "✦",
  "Tu Templo es Tu Arte",
  "✦",
];

interface MarqueeTickerProps {
  className?: string;
  reverse?: boolean;
}

export function MarqueeTicker({
  className,
  reverse = false,
}: MarqueeTickerProps) {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className={cn(
        "group overflow-hidden border-y border-brand-200/50 bg-white py-4",
        className,
      )}
    >
      <div
        className="animate-marquee flex w-max items-center gap-10"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "select-none text-sm tracking-wider",
              item === "✦"
                ? "text-brand-300"
                : "font-serif italic text-neutral-400",
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
