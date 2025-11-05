/**
 * Product-related type definitions
 */

import type { Media } from './components';

export interface SaaSProduct {
  id: number;
  name: string;
  slug: string;
  product_type?: 'saas' | 'open_source' | 'enterprise' | null;
  short_description?: string | null;
  full_description?: unknown[] | null;
  product_icon?: Media | null;
  product_logo?: Media | null;
  primary_color?: string | null;
  demo_video?: Media | null;
  live_demo_url?: string | null;
  documentation_url?: string | null;
  github_url?: string | null;
  is_open_source?: boolean | null;
  has_managed_hosting?: boolean | null;
  pricing_plans?: Array<{ id: number }> | null;
  feature_categories?: Array<{ id: number }> | null;
  testimonials?: Array<{ id: number }> | null;
  integrations?: Array<{ id: number }> | null;
  case_studies?: Array<{ id: number }> | null;
  complementary_products?: Array<{ id: number }> | null;
  integrated_products?: Array<{ id: number }> | null;
  enterprise_bundle?: Array<{ id: number }> | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPage {
  id: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaImage?: Media | null;
    keywords?: string | null;
    metaRobots?: string | null;
    structuredData?: unknown;
    metaViewport?: string | null;
    canonicalURL?: string | null;
  };
  slug: string;
  heading?: string | null;
  sub_heading?: string | null;
  product?: SaaSProduct | null;
  dynamic_zone?: unknown[] | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  description?: string | null;
  price_monthly?: number | null;
  price_yearly?: number | null;
  currency?: string | null;
  popular?: boolean | null;
  features?: Array<{
    text: string;
    available: boolean;
  }> | null;
  cta_text?: string | null;
  cta_url?: string | null;
  saas_product?: { id: number } | null;
}

export interface FeatureCategory {
  id: number;
  name: string;
  description?: string | null;
  icon?: Media | null;
  features?: Array<{
    name: string;
    description?: string | null;
    image?: Media | null;
  }> | null;
  saas_product?: { id: number } | null;
}

export interface ProductCaseStudy {
  id: number;
  title: string;
  client_name?: string | null;
  client_logo?: Media | null;
  industry?: string | null;
  challenge?: unknown[] | null;
  solution?: unknown[] | null;
  results?: Array<{
    headline: string;
    description: string;
  }> | null;
  testimonial?: { id: number } | null;
}

export interface Integration {
  id: number;
  name: string;
  logo?: Media | null;
  description?: string | null;
  category?: 'communication' | 'storage' | 'productivity' | null;
  saas_products?: Array<{ id: number }> | null;
}

