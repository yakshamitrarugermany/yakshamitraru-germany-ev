import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

type Variant = "cream" | "forest" | "outline" | "glass";

const variantClass: Record<Variant, string> = {
  cream: "bg-card text-card-foreground border border-border",
  forest: "bg-forest text-cream border border-cream/10",
  outline: "bg-transparent border border-ink/15 text-foreground",
  glass: "glass text-foreground",
};

export const BrandCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { variant?: Variant; interactive?: boolean }
>(({ className, variant = "cream", interactive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl overflow-hidden",
      variantClass[variant],
      interactive && "hover-lift",
      className,
    )}
    {...props}
  />
));
BrandCard.displayName = "BrandCard";