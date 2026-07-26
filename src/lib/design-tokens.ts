/**
 * Design Tokens — Single source of truth (JS/TS mirror).
 *
 * The canonical values live as CSS custom properties in `src/styles.css`.
 * This file mirrors them for TS consumers (charts, animations, JS-side calcs).
 * When you change a token here, also update `src/styles.css`.
 */

export const colors = {
  forestDeep: "hsl(var(--forest-deep))",
  forest: "hsl(var(--forest))",
  saffron: "hsl(var(--saffron))",
  crimson: "hsl(var(--crimson))",
  cream: "hsl(var(--cream))",
  ink: "hsl(var(--ink))",
  inkSoft: "hsl(var(--ink-soft))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  border: "hsl(var(--border))",
} as const;

export const typography = {
  serif: "'Cormorant Garamond', serif",
  sans: "'Manrope', system-ui, sans-serif",
  mono: "'Space Grotesk', ui-monospace, monospace",
  weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    display1: "clamp(3rem, 6vw, 5.25rem)",
    display2: "clamp(2.25rem, 4.5vw, 3.75rem)",
  },
} as const;

export const spacing = {
  section: "clamp(4rem, 8vw, 8rem)",
  sectionSm: "clamp(2.5rem, 5vw, 5rem)",
  container: "clamp(1.25rem, 4vw, 3rem)",
  gap: { xs: "0.5rem", sm: "0.75rem", md: "1rem", lg: "1.5rem", xl: "2rem", "2xl": "3rem" },
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  pill: "9999px",
  circle: "50%",
} as const;

export const shadows = {
  soft: "0 10px 30px -20px rgba(0,0,0,0.35)",
  card: "0 20px 60px -30px rgba(0,0,0,0.35)",
  float: "0 40px 100px -30px rgba(0,0,0,0.35)",
  nav: "0 10px 30px -20px rgba(0,0,0,0.6)",
} as const;

export const motion = {
  duration: { fast: 150, base: 300, slow: 500, cinematic: 1400 },
  ease: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 30,
  overlay: 40,
  nav: 50,
  modal: 60,
  toast: 70,
  lightbox: 80,
} as const;

export const iconSizes = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "2rem",
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  breakpoints,
  zIndex,
  iconSizes,
} as const;

export type DesignTokens = typeof tokens;