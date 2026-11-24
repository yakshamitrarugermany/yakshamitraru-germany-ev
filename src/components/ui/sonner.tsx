"use client";

import type { CSSProperties } from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ toastOptions, style, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-forest-deep" />,
        info: <InfoIcon className="size-4 text-forest" />,
        warning: <TriangleAlertIcon className="size-4 text-saffron" />,
        error: <OctagonXIcon className="size-4 text-crimson" />,
        loading: (
          <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none text-ink-soft" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          ...style,
        } as CSSProperties
      }
      toastOptions={{
        closeButtonAriaLabel: "Close notification",
        ...toastOptions,
        classNames: {
          toast:
            "cn-toast font-sans shadow-md border border-border bg-popover text-popover-foreground motion-reduce:transition-none",
          title: "text-sm font-medium text-foreground",
          description: "text-xs text-ink-soft",
          success: "!border-forest-deep/25",
          error: "!border-crimson/35",
          closeButton:
            "!border-border !bg-card !text-ink-soft hover:!bg-muted hover:!text-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
