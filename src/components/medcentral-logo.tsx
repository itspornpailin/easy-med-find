import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  title?: string;
};

/**
 * MedCentral brand mark — rounded square with teal→navy gradient and white medical cross.
 * Crisp at any size, matches the brand reference.
 */
export function MedCentralLogo({ className, size = 36, title = "MedCentral" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="mc-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3B8" />
          <stop offset="55%" stopColor="#2BA8E0" />
          <stop offset="100%" stopColor="#0F2B5B" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#mc-logo-grad)" />
      <path
        d="M27 16 h10 a2 2 0 0 1 2 2 v9 h9 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-9 v9 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2 v-9 h-9 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 h9 v-9 a2 2 0 0 1 2 -2 z"
        fill="#ffffff"
      />
    </svg>
  );
}
