import type { SEO } from '@/types/components';
import { OG_LOCALE_MAP, LOCALES, DEFAULT_LOCALE } from '@/lib/constants';

interface MetadataOptions {
  locale?: string;
  localizations?: Array<{ locale: string }>;
  slug?: string;
  siteUrl?: string;
}

function buildPageUrl(siteUrl: string, locale: string, slug?: string): string {
  const path = !slug || slug === 'home' ? '' : `/${slug}`;
  return `${siteUrl}/${locale}${path}`;
}

export const generateMetadataObject = (
  seo?: SEO | null,
  defaults?: { title?: string; description?: string },
  options?: MetadataOptions,
) => {
  const { locale, localizations, slug, siteUrl = 'https://mrvin100.de' } = options ?? {};

  const title = seo?.metaTitle || defaults?.title || 'Default Title';
  const description = seo?.metaDescription || defaults?.description || 'Default Description';

  const imageUrl = seo?.metaImage?.url ?? null;
  const ogImages = imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [];

  const canonical = seo?.canonicalURL || (locale ? buildPageUrl(siteUrl, locale, slug) : undefined);

  const ogLocale = locale ? (OG_LOCALE_MAP[locale] ?? locale) : undefined;
  const alternateOgLocales = locale
    ? LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE_MAP[l] ?? l)
    : [];

  const allLocalizations = localizations ?? [];
  const languages: Record<string, string> = {};
  if (locale) {
    languages[locale] = buildPageUrl(siteUrl, locale, slug);
    for (const loc of allLocalizations) {
      if (loc.locale !== locale) {
        languages[loc.locale] = buildPageUrl(siteUrl, loc.locale, slug);
      }
    }
    // Always include both known locales even if CMS doesn't return localizations
    for (const l of LOCALES) {
      if (!(l in languages)) {
        languages[l] = buildPageUrl(siteUrl, l, slug);
      }
    }
    // x-default points to the default locale
    languages['x-default'] = buildPageUrl(siteUrl, DEFAULT_LOCALE, slug);
  }

  return {
    title,
    description,
    keywords: seo?.keywords
      ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : undefined,
    robots: seo?.metaRobots || 'index, follow',
    openGraph: {
      title,
      description,
      url: canonical,
      locale: ogLocale,
      alternateLocale: alternateOgLocales.length ? alternateOgLocales : undefined,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical,
      languages: Object.keys(languages).length ? languages : undefined,
    },
  };
};
