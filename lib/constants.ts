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
