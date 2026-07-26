/**
 * Site component barrel. Single entry point for the reusable site UI.
 * Only components actually rendered by a route are exported here.
 */

// Layout & chrome
export { PageContainer } from "./PageContainer";
export { Section, SectionHeader } from "./Section";
export { PageHero } from "./PageHero";
export { SiteHeader } from "./SiteHeader";
export { SiteFooter } from "./SiteFooter";

// Home sections
export { Hero } from "./Hero";
export { Mission } from "./Mission";
export { UpcomingPerformance } from "./UpcomingPerformance";
export { UpcomingEvents } from "./UpcomingEvents";
export { FeaturedArtists } from "./FeaturedArtists";
export { GalleryPreview } from "./GalleryPreview";
export { Testimonials } from "./Testimonials";
export { Newsletter } from "./Newsletter";
export { BookSection } from "./BookSection";

// Cards
export { BrandCard } from "./BrandCard";
export { ArtistCard } from "./ArtistCard";
export { EventCard } from "./EventCard";
export { GalleryCard } from "./GalleryCard";

// Composables
export { FAQAccordion, type FAQItem } from "./FAQAccordion";
export { FilterSelect } from "./FilterSelect";
export { BrandInput, BrandTextarea, FieldLabel, FieldError } from "./FormField";

// Atoms
export { Stat } from "./Stat";
export { Chip } from "./Chip";

// States
export { EmptyState } from "./EmptyState";

// Design tokens
export { tokens } from "@/lib/design-tokens";
