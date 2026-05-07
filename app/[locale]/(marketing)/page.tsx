import { cache } from 'react';
import type { Metadata } from 'next';
import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import { generateMetadataObject } from '@/lib/metadata';
import { DEFAULT_METADATA } from '@/lib/constants';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const dynamicParams = true;

const getHomePage = cache(async (locale: string) => {
  const caller = await getCaller();
  return caller.comingSoon.getPageBySlug({ slug: 'home', locale });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mrvin100.de';
  try {
    const page = await getHomePage(locale);
    return generateMetadataObject(page?.seo, {
      title: DEFAULT_METADATA.TITLE,
      description: DEFAULT_METADATA.DESCRIPTION,
    }, {
      locale,
      localizations: page?.localizations ?? [],
      slug: 'home',
      siteUrl,
    });
  } catch {
    return { title: DEFAULT_METADATA.TITLE, description: DEFAULT_METADATA.DESCRIPTION };
  }
}

export default async function HomePage({ params }: Readonly<PageProps>) {
  const { locale } = await params;
  let page = null;
  try {
    page = await getHomePage(locale);
  } catch (error) {
    console.warn(`[HomePage] Failed to load page for locale ${locale}:`, error instanceof Error ? error.message : error);
  }

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load home page. Please check that content is created in the CMS." />}>
        <main>
          <PageContent page={page} />
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}
