# Yakshamitraru Germany e.V. — Design System

Reusable primitives. Use these across every page for visual consistency.
Import from the barrel: `import { … } from "@/components/site"`.

## Layout & chrome
- `container-page` — max-width 1400px, responsive gutters
- `<PageContainer>` — page shell with `<SiteHeader/>` + `<SiteFooter/>`
- `<Section tone="cream|forest|muted|transparent" size="default|sm">` — vertical rhythm + container
- `<SectionHeader eyebrow title lede align="left|center" />` — standard heading block
- `<PageHero>` — cinematic maroon hero for internal pages

## Typography utilities
- `display-1` — hero headline (clamp 2.75–6rem)
- `display-2` — section headline (clamp 2.25–4.25rem)
- `heading-lg` — card / subsection heading
- `lede` — intro paragraph
- `eyebrow` — uppercase kicker
- `hairline` — 2.5rem rule beside eyebrow

Headings: Cormorant Garamond. Body: Manrope. Numbers: Space Grotesk.

## Colors (semantic tokens)
`forest-deep` (Deep Emerald Green), `forest`, `saffron` (Yakshagana Gold),
`crimson` (Stage Red), `cream` (Warm Ivory), `ink` (Charcoal), `ink-soft`.
Never hardcode hex/named colors in components.

## Buttons
Variants: `forest` (primary), `saffron`, `crimson`, `outline-ink`,
`outline-cream`, plus shadcn `default|secondary|ghost|link|outline|destructive`.
Sizes: `sm`, `default`, `lg`, `xl`, `pill`, `icon`.

## Cards
- `<BrandCard variant="cream|forest|outline|glass" interactive>` — base surface
- `<ArtistCard>` — portrait + role + name
- `<EventCard>` — performance card (upcoming / past)
- `<GalleryCard aspect="portrait|landscape|square">` — media tile with hover caption

## Sections (home)
`<Hero>`, `<Mission>`, `<UpcomingPerformance>`, `<UpcomingEvents>`,
`<FeaturedArtists>`, `<GalleryPreview>`, `<Testimonials>`, `<Newsletter>`,
`<BookSection>`.

## Forms & filters
`<FieldLabel>`, `<BrandInput>`, `<BrandTextarea>`, `<FieldError>`,
`<FilterSelect>`, `<FAQAccordion>`, `<EmptyState>`, `<Chip>`, `<Stat>`.

## Effects
- `hover-lift` — translateY(-4px) + soft forest shadow
- `media-zoom` — 1.06 scale on child `img`/`video` on hover
- `glass` / `glass-dark` — frosted surfaces
- `reveal` — 700ms fade-up entrance
- tailwindcss-animate helpers: `animate-fade-in`, `animate-scale-in`,
  `hover-scale`, `story-link`
