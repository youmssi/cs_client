import { getCaller } from '@/trpc/server';
import { getAvailableLocales } from '@/lib/i18n-config';

/**
 * Generate static params for all pages across all locales
 * Used by [locale]/[slug]/page.tsx for SSG
 */
export async function generatePageStaticParams() {
  const locales = await getAvailableLocales();
  const caller = await getCaller();
  const params: Array<{ locale: string; slug: string }> = [];
  
  for (const locale of locales) {
    try {
      const pages = await caller.comingSoon.getPages({ locale });
      for (const page of pages) {
        if (page?.slug) {
          params.push({ locale, slug: page.slug });
        }
      }
    } catch {
      // ignore locales with no pages
    }
  }
  
  return params;
}

/**
 * Generate static params for all available locales
 * Used by [locale]/layout.tsx for SSG
 */
export async function generateLocaleStaticParams() {
  const locales = await getAvailableLocales();
  return locales.map(locale => ({ locale }));
}
