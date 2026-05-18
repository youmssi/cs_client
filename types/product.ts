import type { SEO, Media, Button, Logo, HeaderSection } from './components';
import type { DynamicBlock } from './blocks';

export type ProductStatus = 'alpha' | 'beta' | 'ga' | 'coming-soon';

export type ProductCategory =
  | 'clinical'
  | 'education'
  | 'financial'
  | 'operations'
  | 'other';

export type PricingCurrency = 'EUR' | 'USD' | 'XAF' | 'XOF';

export interface ProductPage {
  id: number;
  name: string;
  slug: string;
  tagline: string | null;
  product_logo: Media | null;
  /**
   * Product release maturity (alpha / beta / ga / coming-soon).
   * Named `release_status` because Strapi v5 reserves `status` as a top-level
   * attribute for the Document Service draft/published state.
   */
  release_status: ProductStatus;
  version: string | null;
  accent_color: string | null;
  category: ProductCategory;
  target_institution: string | null;
  geography_focus: string | null;
  demo_url: string | null;
  demo_video_url: string | null;
  external_url: string | null;
  repository_url: string | null;
  pricing_currency: PricingCurrency;
  compliance_tags: string[] | null;
  featured_in_catalog: boolean;
  sort_order: number;
  seo: SEO | null;
  dynamic_zone: DynamicBlock[];
  localizations: Array<{
    id: number;
    locale: string;
  }>;
}

export interface ProductPageListItem {
  id: number;
  name: string;
  slug: string;
  tagline: string | null;
  product_logo: Media | null;
  release_status: ProductStatus;
  version: string | null;
  accent_color: string | null;
  category: ProductCategory;
  target_institution: string | null;
  geography_focus: string | null;
  demo_url: string | null;
  external_url: string | null;
  featured_in_catalog: boolean;
  sort_order: number;
  localizations: Array<{
    id: number;
    locale: string;
  }>;
}

export interface FeatureDeepDiveItem {
  id: number;
  title: string | null;
  description: string | null;
  bullets: string | null;
  image: Media | null;
  accent_quote: string | null;
}

export interface ScreenshotTab {
  id: number;
  tab_label: string;
  screenshot: Media | null;
  caption: string | null;
}

export interface TechStackGroup {
  id: number;
  label: string;
  logos: Logo[];
}

export interface StatItem {
  id: number;
  value: string;
  unit: string | null;
  label: string | null;
  icon_name: string | null;
}

export interface UseCase {
  id: number;
  persona_label: string;
  description: string | null;
  icon_name: string | null;
  bullets: string | null;
}

export interface ComparePair {
  id: number;
  before_image: Media | null;
  before_label: string | null;
  after_image: Media | null;
  after_label: string | null;
  title: string | null;
}

export interface ProductHeroBlock {
  __component: 'dynamic-zone.product-hero';
  id: number;
  eyebrow: string | null;
  heading: string | null;
  sub_heading: string | null;
  primary_cta: Button | null;
  secondary_cta: Button | null;
  preview_image: Media | null;
  preview_video_url: string | null;
  show_status_pill: boolean;
}

export interface StatsBarBlock {
  __component: 'dynamic-zone.stats-bar';
  id: number;
  eyebrow: string | null;
  items: StatItem[];
}

export interface FeatureDeepDiveBlock {
  __component: 'dynamic-zone.feature-deep-dive';
  id: number;
  header_section: HeaderSection | null;
  features: FeatureDeepDiveItem[];
}

export interface ScreenshotsGalleryBlock {
  __component: 'dynamic-zone.screenshots-gallery';
  id: number;
  header_section: HeaderSection | null;
  tabs: ScreenshotTab[];
}

export interface TechStackBlock {
  __component: 'dynamic-zone.tech-stack';
  id: number;
  header_section: HeaderSection | null;
  groups: TechStackGroup[];
}

export interface CompareSliderBlock {
  __component: 'dynamic-zone.compare-slider';
  id: number;
  header_section: HeaderSection | null;
  pairs: ComparePair[];
}

export interface UseCasesBlock {
  __component: 'dynamic-zone.use-cases';
  id: number;
  header_section: HeaderSection | null;
  cases: UseCase[];
}

export interface ProductCtaFinalBlock {
  __component: 'dynamic-zone.product-cta-final';
  id: number;
  eyebrow: string | null;
  heading: string | null;
  sub_heading: string | null;
  primary_cta: Button | null;
  secondary_cta: Button | null;
}

export interface ProductGridBlock {
  __component: 'dynamic-zone.product-grid';
  id: number;
  header_section: HeaderSection | null;
  cta_label: string | null;
  show_all_featured: boolean;
}
