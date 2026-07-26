import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";

const fieldBase =
  "w-full bg-transparent border-0 border-b border-ink/20 px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-forest-deep transition-colors";

export function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow text-ink-soft block mb-1">
      {children}
    </label>
  );
}

export const BrandInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  ),
);
BrandInput.displayName = "BrandInput";

export const BrandTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea ref={ref} rows={rows} className={cn(fieldBase, "resize-none", className)} {...props} />
  ),
);
BrandTextarea.displayName = "BrandTextarea";

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-2 text-xs text-crimson">{children}</p>;
}