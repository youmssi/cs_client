import { API_ENDPOINTS } from '@/lib/constants';
import { envServer } from './env.server';

export const i18n = {
  defaultLocale: 'en',
};

let cachedLocales: string[] | null = null;
let lastFetchTime = 0;

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
    const res = await fetch(`${base}${API_ENDPOINTS.LOCALES}`);
    if (!res.ok) throw new Error('Failed to fetch locales');
    const data = await res.json();
    const locales: string[] = Array.isArray(data) ? data.map((l: { code: string }) => l.code) : [];
    cachedLocales = locales.length ? locales : [i18n.defaultLocale];
    lastFetchTime = Date.now();
    return cachedLocales;
  } catch {
    return cachedLocales ?? [i18n.defaultLocale];
  }
}