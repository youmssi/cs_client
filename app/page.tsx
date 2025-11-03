import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { api, HydrateClient } from '@/lib/trpc/server';
import { ErrorView, LoadingView } from '@/components/ui/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await api.blog.getHomePage();
    const seo = page.seo;

    return {
      title: seo.metaTitle || 'MRVIN100 - Software for Everyone, Everywhere',
      description: seo.metaDescription || 'Build globally usable software solutions',
      keywords: seo.keywords?.split(',').map((k) => k.trim()),
      robots: seo.metaRobots || 'index, follow',
      openGraph: {
        title: seo.metaTitle || 'MRVIN100',
        description: seo.metaDescription || 'Build globally usable software solutions',
        images: seo.metaImage?.url
          ? [{ url: seo.metaImage.url }]
          : [],
      },
      alternates: {
        canonical: seo.canonicalURL || undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'MRVIN100 - Software for Everyone, Everywhere',
      description: 'Build globally usable software solutions',
    };
  }
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
