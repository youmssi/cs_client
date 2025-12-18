import type {
  Button,
  FAQ,
  Testimonial,
  HeaderSection,
  Logo,
  FeatureCard,
  BentoGridItem,
  PricingPlan,
  DashboardShowcaseFeature,
} from "./components";

export interface HeroBlock {
  __component: "dynamic-zone.hero";
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
  | CTABlock
  | FAQBlock
  | StoryBlock
  | TestimonialsBlock
  | SocialProofBlock
  | BentoGridBlock
  | PlatformFeaturesBlock
  | PricingBlock
  | DashboardShowcaseBlock;


export interface PricingBlock {
  __component: "dynamic-zone.pricing";
  id: number;
  /**
   * Preferred source of copy for the pricing section.
   * Mirrors the `shared.heading` (Section Header) component in Strapi.
   */
  header_section?: HeaderSection | null;
  frequency_toggle_label_monthly?: string | null;
  frequency_toggle_label_yearly?: string | null;
  /**
   * Fully configurable pricing plans managed from Strapi.
   */
  plans?: PricingPlan[] | null;
}

export interface SocialProofBlock {
  __component: 'dynamic-zone.social-proof';
  id: number;
  header_section?: HeaderSection | null;
  logos?: Logo[] | null;
}

export interface PlatformFeaturesBlock {
  __component: 'dynamic-zone.documentation';
  id: number;
  /**
   * Header section containing badge, heading, and sub_heading.
   * Uses the shared HeaderSection component for consistency.
   */
  header_section?: HeaderSection | null;
  /**
   * Feature cards showcasing platform capabilities.
   */
  cards?: FeatureCard[] | null;
}

export interface BentoGridBlock {
  __component: 'dynamic-zone.bento-grid';
  id: number;
  header_section?: HeaderSection | null;
  items?: BentoGridItem[] | null;
}

export interface DashboardShowcaseBlock {
  __component: "dynamic-zone.dashboard-showcase";
  id: number;
  /**
   * Up to three dashboard images that are swapped when the feature changes.
   */
  primary_image?: string | null;
  secondary_image?: string | null;
  tertiary_image?: string | null;
  /**
   * Feature descriptions that control the active dashboard image.
   */
  features?: DashboardShowcaseFeature[] | null;
}


