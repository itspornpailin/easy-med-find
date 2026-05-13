import { useTranslation } from "react-i18next";
import { setLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = (i18n.language || "th").startsWith("th") ? "th" : "en";
  const isEn = current === "en";

  const toggle = () => setLanguage(isEn ? "th" : "en");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label="Toggle language"
      onClick={toggle}
      className="relative flex h-8 w-20 cursor-pointer items-center rounded-full bg-muted p-1 shadow-inner transition-colors hover:bg-muted/80"
    >
      {/* Sliding thumb */}
      <span
        className={cn(
          "absolute left-1 top-1 h-6 w-9 rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out",
          isEn ? "translate-x-[40px]" : "translate-x-0",
        )}
      />
      {/* Labels */}
      <span className="relative z-10 flex w-full items-center justify-between px-2 text-[11px] font-bold">
        <span className={cn("transition-colors", !isEn ? "text-primary" : "text-muted-foreground")}>
          TH
        </span>
        <span className={cn("transition-colors", isEn ? "text-primary" : "text-muted-foreground")}>
          EN
        </span>
      </span>
    </button>
  );
}
