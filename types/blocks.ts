import type { Button, FAQ, Testimonial, HeaderSection, Logo, FeatureCard, BentoGridItem } from './components';

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
  faqs: FAQ[];
}

export interface StoryBlock {
  __component: 'blocks.story';
  id: number;
  content: string;
}

export interface TestimonialsBlock {
  __component: 'dynamic-zone.testimonials';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  items: Testimonial[];
}

export type DynamicBlock =
  | HeroBlock
  | BrillanceHeroBlock
  | CTABlock
  | FAQBlock
  | StoryBlock
  | TestimonialsBlock
  | SocialProofBlock
  | BentoGridBlock
  | DocumentationBlock
  | PricingBlock;

export interface BrillanceHeroBlock {
  __component: 'dynamic-zone.brillance-hero';
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

export interface SocialProofBlock {
  __component: 'dynamic-zone.social-proof';
  id: number;
  header_section?: HeaderSection | null;
  logos?: Logo[] | null;
}

export interface DocumentationBlock {
  __component: 'dynamic-zone.documentation';
  id: number;
  header_section?: HeaderSection | null;
  cards: FeatureCard[];
}

export interface BentoGridBlock {
  __component: 'dynamic-zone.bento-grid';
  id: number;
  header_section?: HeaderSection | null;
  items?: BentoGridItem[] | null;
}

