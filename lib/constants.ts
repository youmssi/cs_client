/**
 * Centralized constants for routes, cache tags, endpoints, and metadata
 */

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: '/products',
  BLOG: '/blog',
} as const;

/**
 * Default metadata values
 */

export const DEFAULT_METADATA = {
  TITLE: 'MRVIN100 - Software for Everyone, Everywhere',
  DESCRIPTION: 'Build globally usable software solutions accessible to communities worldwide.',
  KEYWORDS: [
    'saas solutions',
    'education technology',
    'healthcare software',
    'business management',
    'operational efficiency',
  ] as string[],
  SITE_NAME: 'MRVIN100',
};


/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 1,
  MAX_PAGE_SIZE: 50,
} as const;

/**
 * API Endpoints
 * Using /clean endpoints for optimized, type-safe responses
 */

export const API_ENDPOINTS = {
  GLOBAL: '/api/global/clean',
  PAGE: '/api/page/clean',
  PRODUCTS: '/api/saas-product/clean',
  PRODUCT_PAGE: '/api/product-page/clean',
  ARTICLES: '/api/articles/clean',
  FAQS: '/api/faqs/clean',
  TESTIMONIALS: '/api/testimonials/clean',
  CATEGORIES: '/api/categories/clean',
  LOGOS: '/api/logos/clean',
  INTEGRATIONS: '/api/integrations/clean',
  PRICING_PLANS: '/api/pricing-plans/clean',
  FEATURE_CATEGORIES: '/api/feature-categories/clean',
  CASE_STUDIES: '/api/case-studies/clean',
} as const;
