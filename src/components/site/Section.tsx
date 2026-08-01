import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type Tone = "cream" | "forest" | "muted" | "transparent";

const toneClass: Record<Tone, string> = {
  cream: "bg-background text-foreground",
  forest: "bg-forest-deep text-cream",
  muted: "bg-secondary text-foreground",
  transparent: "",
};

export function Section({
  as: Tag = "section",
  tone = "cream",
  size = "default",
  className,
  containerClassName,
  children,
  id,
}: {
  as?: ElementType;
  tone?: Tone;
  size?: "default" | "sm";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        toneClass[tone],
        size === "sm" ? "section-sm" : "section",
        className,
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className="eyebrow text-saffron flex items-center gap-3">
          <span className="hairline hairline-grow" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="display-2 mt-5 text-balance">{title}</h2>
      {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
    </div>
  );
}

export function SectionSeparator() {
  return (
    <div className="flex items-center justify-center gap-4 py-4 md:py-8 opacity-30 pointer-events-none select-none">
      <div className="w-12 md:w-24 h-px bg-linear-to-r from-transparent to-forest-deep" />
      <div className="h-1.5 w-1.5 rounded-full bg-saffron" />
      <div className="w-12 md:w-24 h-px bg-linear-to-l from-transparent to-forest-deep" />
    </div>
  );
}
