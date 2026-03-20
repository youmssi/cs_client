/**
 * Centralized constants for routes, cache tags, endpoints, and metadata
 */

export const ROUTES = {
  HOME: '/',
} as const;

/**
 * Section anchor IDs — used as `id` attributes on sections and as `href` targets.
 * Always reference these instead of hardcoding strings.
 */
export const ANCHORS = {
  HERO: 'hero',
  HOW_IT_WORKS: 'how-it-works',
  PRICING: 'pricing',
  CUSTOM_PROJECT: 'custom-project',
  TESTIMONIALS: 'testimonials',
  FAQ: 'faq',
  CONTACT: 'contact',
} as const;

export type AnchorId = typeof ANCHORS[keyof typeof ANCHORS];

/**
 * Default metadata values
 */

export const DEFAULT_METADATA = {
  TITLE: 'MRVIN100 — Top Cameroonian Developers, European Quality',
  DESCRIPTION: 'Hire dedicated developers from Cameroon. 30-50% cheaper than offshore, same timezone, 72h replacement guarantee.',
  KEYWORDS: [
    'hire developers Cameroon',
    'offshore development alternative',
    'dedicated developers Africa',
    'nearshore development',
    'software outsourcing Cameroon',
  ] as string[],
  SITE_NAME: 'MRVIN100',
};

/**
 * API Endpoints
 * Using /clean endpoints for optimized, type-safe responses
 */

export const API_ENDPOINTS = {
  GLOBAL: '/api/global/clean',
  PAGE: '/api/page/clean',
  FAQS: '/api/faqs/clean',
  LOGOS: '/api/logos/clean',
  LOCALES: '/api/i18n/locales',
} as const;

/**
 * Supported locales — must match Strapi i18n configuration.
 * When adding a new locale in Strapi, add it here too.
 * First entry = default locale (must match isDefault:true in Strapi).
 */
export const LOCALES = ['fr', 'en'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE = LOCALES[0];
