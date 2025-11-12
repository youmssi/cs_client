/**
 * Centralized constants for routes, cache tags, endpoints, and metadata
 */

export const ROUTES = {
  HOME: '/',
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
