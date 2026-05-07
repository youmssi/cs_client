import type { MetadataRoute } from 'next';
import { generatePageStaticParams } from '@/lib/static-params';
import { LOCALES } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';

  const homeAlternates = Object.fromEntries(
    LOCALES.map((loc) => [loc, `${siteUrl}/${loc}`])
  );

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: { languages: homeAlternates },
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const allPageParams = await generatePageStaticParams();

    const bySlug = new Map<string, string[]>();
    for (const { locale, slug } of allPageParams) {
      if (slug === 'home') continue;
      const existing = bySlug.get(slug) ?? [];
      existing.push(locale);
      bySlug.set(slug, existing);
    }

    for (const [slug, locales] of bySlug.entries()) {
      const langAlternates = Object.fromEntries(
        locales.map((loc) => [loc, `${siteUrl}/${loc}/${slug}`])
      );
      for (const locale of locales) {
        dynamicEntries.push({
          url: `${siteUrl}/${locale}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: { languages: langAlternates },
        });
      }
    }
  } catch {
    // Strapi offline at build time — sitemap degrades to home pages only
  }

  return [...homeEntries, ...dynamicEntries];
}
