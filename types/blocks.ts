import type { Button, FAQ } from './components';

/** Existing generic blocks */
export interface HeroBlock {
  __component: 'dynamic-zone.hero';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  CTAs: Button[];
}

export interface CTABlock {
  __component: 'dynamic-zone.cta';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  CTAs: Button[];
}

export interface FAQBlock {
  __component: 'dynamic-zone.faq';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  /** Strapi component field is `faqs` (lowercase). */
  faqs: FAQ[];
}

export interface StoryBlock {
  __component: 'blocks.story';
  id: number;
  content: string;
}

/** Brillance landing page blocks */
export interface BrillanceHeroBlock {
  __component: 'dynamic-zone.brillance-hero';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export interface SocialProofBlock {
  __component: 'dynamic-zone.social-proof';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export interface BentoGridBlock {
  __component: 'dynamic-zone.bento-grid';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export interface DocumentationBlock {
  __component: 'dynamic-zone.documentation';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export interface TestimonialsBlock {
  __component: 'dynamic-zone.testimonials';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export interface PricingBlock {
  __component: 'dynamic-zone.pricing';
  id: number;
  heading: string | null;
  sub_heading: string | null;
}

export type DynamicBlock =
  | HeroBlock
  | BrillanceHeroBlock
  | SocialProofBlock
  | BentoGridBlock
  | DocumentationBlock
  | TestimonialsBlock
  | PricingBlock
  | CTABlock
  | FAQBlock
  | StoryBlock;
