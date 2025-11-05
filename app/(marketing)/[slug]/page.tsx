import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { HydrateClient, prefetch, trpc, getCaller } from '@/trpc/server';
import { ErrorView, LoadingView } from '@/components/ui/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { DEFAULT_METADATA } from '@/lib/constants';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const caller = await getCaller();
    const page = await caller.comingSoon.getPageBySlug({ slug: params.slug });
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
  } catch {
    // Page doesn't exist - return 404 metadata
    return {
      title: DEFAULT_METADATA.TITLE,
      description: DEFAULT_METADATA.DESCRIPTION,
    };
  }
}

export default async function DynamicPage(props: Readonly<PageProps>) {
  const params = await props.params;
  
  prefetch(trpc.comingSoon.getPageBySlug.queryOptions({ slug: params.slug }));

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <main className="min-h-screen">
            <ErrorView message="Failed to load page. Please try again later." />
          </main>
        }
      >
        <Suspense
          fallback={
            <main className="min-h-screen">
              <LoadingView message="Loading page..." />
            </main>
          }
        >
          <PageContent slug={params.slug} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

async function PageContent({ slug }: Readonly<{ slug: string }>) {
  const caller = await getCaller();
  const page = await caller.comingSoon.getPageBySlug({ slug }).catch(() => {
    notFound();
  });

  if (!page) {
    notFound();
  }
  
  return (
    <main className="min-h-screen">
      <DynamicZoneManager blocks={page.blocks} />
    </main>
  );
}
