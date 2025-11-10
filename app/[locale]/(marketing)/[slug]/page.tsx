import { ErrorView, LoadingView } from '@/components/state-views';
import { prefetchPageBySlug } from '@/features/cs/server/prefetch';
import { PageContent } from '@/components/page-content';
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { Locale } from '@/lib/i18n-config';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function DynamicPage({ params }: Readonly<PageProps>) {
  const { slug, locale } = await params;
  const resolvedLocale = locale ?? 'en';
  prefetchPageBySlug(slug, resolvedLocale);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load page" />}>
        <Suspense fallback={<LoadingView message="Loading page..." />}>
          <main>
            <PageContent slug={slug} locale={resolvedLocale} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
