import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { HydrateClient, prefetch, trpc, getCaller } from '@/trpc/server';
import { ErrorView, LoadingView } from '@/components/ui/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { DEFAULT_METADATA } from '@/lib/constants';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: DEFAULT_METADATA.TITLE,
    description: DEFAULT_METADATA.DESCRIPTION,
    keywords: DEFAULT_METADATA.KEYWORDS,
  };
}

export default async function HomePage() {
  prefetch(trpc.comingSoon.getPage.queryOptions({}));

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
  const caller = await getCaller();
  const page = await caller.comingSoon.getPage({});
  
  return (
    <main className="min-h-screen">
      <DynamicZoneManager blocks={page.blocks} />
    </main>
  );
}
