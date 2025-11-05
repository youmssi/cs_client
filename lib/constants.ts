/**
 * Centralized constants for routes, cache tags, endpoints, and metadata
 */

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: '/products',
  BLOG: '/blog',
  ABOUT: '/about',
  CONTACT: '/contact',
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
 * Centralized cache tags for ISR revalidation
 * Used across API client and webhook revalidation
 */
export const CACHE_TAGS = {
  // Global content
  GLOBAL: 'global',
  
  // Page content
  BLOG_PAGE: 'blog-page',
  HOME_PAGE: 'home-page',
  
  // Product content
  PRODUCTS: 'products',
  PRODUCT: 'product',
  SAAS_PRODUCTS: 'saas-products',
  
  // Supporting content
  ARTICLES: 'articles',
  FAQS: 'faqs',
  TESTIMONIALS: 'testimonials',
  CATEGORIES: 'categories',
  LOGOS: 'logos',
  INTEGRATIONS: 'integrations',
  PRICING_PLANS: 'pricing-plans',
  FEATURE_CATEGORIES: 'feature-categories',
  CASE_STUDIES: 'case-studies',
} as const;

/**
 * Helper functions to generate cache tags
 */
export const getCacheTags = {
  global: () => [CACHE_TAGS.GLOBAL],
  
  blogPage: () => [CACHE_TAGS.BLOG_PAGE],
  
  homePage: () => [CACHE_TAGS.HOME_PAGE],
  
  products: () => [CACHE_TAGS.PRODUCTS, CACHE_TAGS.SAAS_PRODUCTS],
  
  product: (slug?: string) => [
    CACHE_TAGS.PRODUCT,
    ...(slug ? [`${CACHE_TAGS.PRODUCT}-${slug}` as const] : []),
  ],
  
  articles: () => [CACHE_TAGS.ARTICLES],
  
  faqs: () => [CACHE_TAGS.FAQS],
  
  testimonials: () => [CACHE_TAGS.TESTIMONIALS],
} as const;

/**
 * API Endpoints
 * Using /clean endpoints for optimized, type-safe responses
 */
/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 1,
  MAX_PAGE_SIZE: 50,
} as const;

export const API_ENDPOINTS = {
  GLOBAL: '/api/global/clean',
  PAGE: '/api/page/clean',
  PRODUCTS: '/api/saas-product/clean',
  PRODUCT: '/api/saas-product/clean',
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
