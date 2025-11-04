import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { api, HydrateClient } from '@/lib/trpc/server';
import { ErrorView, LoadingView } from '@/components/ui/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { DEFAULT_METADATA } from '@/lib/constants';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.blog.getHomePage();
  const seo = page.seo;

  return {
    title: seo.metaTitle || DEFAULT_METADATA.TITLE,
    description: seo.metaDescription || DEFAULT_METADATA.DESCRIPTION,
    keywords: seo.keywords?.split(',').map((k) => k.trim()) || DEFAULT_METADATA.KEYWORDS,
    robots: seo.metaRobots || 'index, follow',
    openGraph: {
      title: seo.metaTitle || DEFAULT_METADATA.SITE_NAME,
      description: seo.metaDescription || DEFAULT_METADATA.DESCRIPTION,
      images: seo.metaImage?.url ? [{ url: seo.metaImage.url }] : [],
    },
    alternates: {
      canonical: seo.canonicalURL || undefined,
    },
  };
}

export default async function HomePage() {
  void api.blog.getHomePage.prefetch();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <main className="min-h-screen">
            <ErrorView message="Failed to load homepage. Please try again later." />
          </main>
        }
      >
        <Suspense
          fallback={
            <main className="min-h-screen">
              <LoadingView message="Loading homepage..." />
            </main>
          }
        >
          <PageContent />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

async function PageContent() {
  const page = await api.blog.getHomePage();
  
  return (
    <main className="min-h-screen">
      <DynamicZoneManager blocks={page.blocks} />
    </main>
  );
}
