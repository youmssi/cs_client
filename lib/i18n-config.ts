import { API_ENDPOINTS } from '@/lib/constants';
import { envServer } from './env.server';

export const i18n = {
  defaultLocale: 'en', // Fallback only
};

let cachedLocales: string[] | null = null;
let cachedDefaultLocale: string | null = null;
let lastFetchTime = 0;

interface StrapiLocale {
  code: string;
  name: string;
  isDefault: boolean;
}

/**
 * Returns the default locale from Strapi (based on isDefault flag).
 * Falls back to 'en' if Strapi is unavailable.
 */
export async function getDefaultLocale(): Promise<string> {
  // Return cached value if still valid
  if (cachedDefaultLocale && Date.now() - lastFetchTime < 3600000) {
    return cachedDefaultLocale;
  }

  try {
    const base = envServer.CMS_URL;
    const res = await fetch(`${base}${API_ENDPOINTS.LOCALES}`, {
      headers: envServer.CMS_API_TOKEN ? { 'Authorization': `Bearer ${envServer.CMS_API_TOKEN}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch locales');
    const data: StrapiLocale[] = await res.json();
    
    // Find the locale marked as default in Strapi
    const defaultLocale = data.find((l) => l.isDefault);
    cachedDefaultLocale = defaultLocale?.code || data[0]?.code || i18n.defaultLocale;
    lastFetchTime = Date.now();
    
    return cachedDefaultLocale;
  } catch (error) {
    console.warn('Failed to fetch default locale from Strapi, using fallback:', error);
    return cachedDefaultLocale ?? i18n.defaultLocale;
  }
}

/**
 * Returns available locales from Strapi.
 * - Centralized endpoint via API_ENDPOINTS.
 * - In-memory caching to avoid repeated fetches.
 */
export async function getAvailableLocales(): Promise<string[]> {
  if (cachedLocales && Date.now() - lastFetchTime < 3600000) {
    return cachedLocales;
  }

  try {
    const base = envServer.CMS_URL;
    const res = await fetch(`${base}${API_ENDPOINTS.LOCALES}`, {
      headers: envServer.CMS_API_TOKEN ? { 'Authorization': `Bearer ${envServer.CMS_API_TOKEN}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch locales');
    const data: StrapiLocale[] = await res.json();
    
    const locales: string[] = Array.isArray(data) ? data.map((l) => l.code) : [];
    cachedLocales = locales.length ? locales : [i18n.defaultLocale];
    
    // Also cache the default locale
    const defaultLocale = data.find((l) => l.isDefault);
    cachedDefaultLocale = defaultLocale?.code || data[0]?.code || i18n.defaultLocale;
    
    lastFetchTime = Date.now();
    return cachedLocales;
  } catch (error) {
    console.warn('Failed to fetch locales from Strapi, using fallback:', error);
    return cachedLocales ?? [i18n.defaultLocale];
  }
}