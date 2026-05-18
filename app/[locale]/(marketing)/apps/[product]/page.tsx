import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ErrorView } from '@/components/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { HydrateClient, getCaller } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { generateMetadataObject } from '@/lib/metadata';
import { DEFAULT_METADATA, DEFAULT_PRODUCT_ACCENT, LOCALES } from '@/lib/constants';
import { getStrapiMediaUrl } from '@/lib/media.strapi';
import type { ProductPage } from '@/types';

interface ProductPageRouteProps {
  params: Promise<{ product: string; locale: string }>;
}

const getProductPage = cache(async (slug: string, locale: string) => {
  const caller = await getCaller();
  return caller.comingSoon.getProductPageBySlug({ slug, locale });
});

const CATEGORY_TO_SCHEMA: Record<string, string> = {
  clinical: 'HealthApplication',
  education: 'EducationalApplication',
  financial: 'FinanceApplication',
  operations: 'BusinessApplication',
  other: 'BusinessApplication',
};

export async function generateMetadata({ params }: ProductPageRouteProps): Promise<Metadata> {
  const { product, locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';
  try {
    const page = await getProductPage(product, locale);
    const defaultTitle = page?.name
      ? `${page.name} — ${page.tagline ?? DEFAULT_METADATA.SITE_NAME}`
      : DEFAULT_METADATA.TITLE;
    return generateMetadataObject(
      page?.seo,
      { title: defaultTitle, description: page?.tagline ?? DEFAULT_METADATA.DESCRIPTION },
      {
        locale,
        localizations: page?.localizations ?? [],
        slug: `apps/${product}`,
        siteUrl,
      },
    );
  } catch {
    return { title: DEFAULT_METADATA.TITLE, description: DEFAULT_METADATA.DESCRIPTION };
  }
}

export default async function ProductPageRoute({ params }: Readonly<ProductPageRouteProps>) {
  const { product, locale } = await params;
  let page: ProductPage | null = null;
  try {
    page = await getProductPage(product, locale);
  } catch (error) {
    console.warn(
      `[ProductPageRoute] Failed to load product '${product}' for locale '${locale}':`,
      error instanceof Error ? error.message : error,
    );
  }

  if (!page) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';
  const canonical = `${siteUrl}/${locale}/apps/${page.slug}`;
  const logoUrl = page.product_logo
    ? getStrapiMediaUrl(page.product_logo as unknown as Record<string, unknown>)
    : null;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': CATEGORY_TO_SCHEMA[page.category] ?? 'BusinessApplication',
    name: page.name,
    description: page.tagline ?? page.seo?.metaDescription ?? undefined,
    url: canonical,
    operatingSystem: 'Web',
    applicationCategory: CATEGORY_TO_SCHEMA[page.category] ?? 'BusinessApplication',
    image: logoUrl ?? undefined,
    softwareVersion: page.version ?? undefined,
    creator: {
      '@type': 'Organization',
      name: 'MRVIN100',
      url: siteUrl,
    },
    offers: page.demo_url
      ? {
          '@type': 'Offer',
          url: page.demo_url,
          priceCurrency: page.pricing_currency ?? 'EUR',
        }
      : undefined,
  };

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<ErrorView message={`Failed to render product page '${product}'.`} />}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <main
          style={
            { '--product-accent': page.accent_color ?? DEFAULT_PRODUCT_ACCENT } as React.CSSProperties
          }
        >
          <DynamicZoneManager
            blocks={page.dynamic_zone}
            locale={locale}
            productContext={{
              name: page.name,
              logo: page.product_logo
                ? { url: logoUrl ?? '', alternativeText: page.product_logo.alternativeText ?? null }
                : null,
              status: page.release_status,
              version: page.version,
              accentColor: page.accent_color,
              complianceTags: page.compliance_tags,
            }}
          />
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; product: string }> = [];
  for (const locale of LOCALES) {
    try {
      const caller = await getCaller();
      const products = await caller.comingSoon.getProductPages({ locale });
      for (const p of products ?? []) {
        if (p?.slug) params.push({ locale, product: p.slug });
      }
    } catch {
      // ignore locales with no product pages yet
    }
  }
  return params;
}

export const dynamicParams = true;
