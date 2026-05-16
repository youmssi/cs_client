import type { MetadataRoute } from 'next';
import { generatePageStaticParams } from '@/lib/static-params';
import { getCaller } from '@/trpc/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/constants';

// ISR: regenerate at most every hour. Also cleared immediately by
// revalidateTag('pages', 'max') when the Strapi webhook fires.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';

  // Home pages — one entry per locale + x-default
  const homeAlternates = {
    ...Object.fromEntries(LOCALES.map((loc) => [loc, `${siteUrl}/${loc}`])),
    'x-default': `${siteUrl}/${DEFAULT_LOCALE}`,
  };

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: { languages: homeAlternates },
  }));

  // Dynamic pages from Strapi — refreshed on each ISR cycle or webhook trigger
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const allPageParams = await generatePageStaticParams();

    // Group slugs by the locales that actually have them in Strapi
    const bySlug = new Map<string, Set<string>>();
    for (const { locale, slug } of allPageParams) {
      if (slug === 'home') continue;
      if (!bySlug.has(slug)) bySlug.set(slug, new Set());
      bySlug.get(slug)!.add(locale);
    }

    for (const [slug, localeSet] of bySlug.entries()) {
      const locales = [...localeSet];

      // x-default → default locale if translated, otherwise first available locale
      const xDefault = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];

      const langAlternates = {
        ...Object.fromEntries(locales.map((loc) => [loc, `${siteUrl}/${loc}/${slug}`])),
        'x-default': `${siteUrl}/${xDefault}/${slug}`,
      };

      for (const locale of locales) {
        dynamicEntries.push({
          url: `${siteUrl}/${locale}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
          alternates: { languages: langAlternates },
        });
      }
    }
  } catch (error) {
    // Strapi unreachable — serve home pages only, log for monitoring
    console.error('[sitemap] Failed to fetch dynamic pages from Strapi:', error);
  }

  // Product landing pages — /apps/[product] per locale
  const productEntries: MetadataRoute.Sitemap = [];
  try {
    const caller = await getCaller();
    const bySlug = new Map<string, Set<string>>();
    for (const locale of LOCALES) {
      try {
        const products = await caller.comingSoon.getProductPages({ locale });
        for (const product of products ?? []) {
          if (!product?.slug) continue;
          if (!bySlug.has(product.slug)) bySlug.set(product.slug, new Set());
          bySlug.get(product.slug)!.add(locale);
        }
      } catch {
        // ignore locales with no product pages
      }
    }

    for (const [slug, localeSet] of bySlug.entries()) {
      const locales = [...localeSet];
      const xDefault = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];
      const langAlternates = {
        ...Object.fromEntries(locales.map((loc) => [loc, `${siteUrl}/${loc}/apps/${slug}`])),
        'x-default': `${siteUrl}/${xDefault}/apps/${slug}`,
      };
      for (const locale of locales) {
        productEntries.push({
          url: `${siteUrl}/${locale}/apps/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
          alternates: { languages: langAlternates },
        });
      }
    }
  } catch (error) {
    console.error('[sitemap] Failed to fetch product pages from Strapi:', error);
  }

  return [...homeEntries, ...dynamicEntries, ...productEntries];
}
