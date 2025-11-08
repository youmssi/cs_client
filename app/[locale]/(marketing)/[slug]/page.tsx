'use client';

import { ErrorView, LoadingView } from '@/components/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { usePageBySlug } from '@/features/cs/hooks/use-coming-soon';
import type { Locale } from '@/lib/i18n-config';

type PageProps = {
  params: { slug: string; locale: Locale };
};

export default function DynamicPage({ params }: PageProps) {
  const locale = params.locale || 'en';
  const { data: page, isLoading, error } = usePageBySlug(params.slug, locale);

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <LoadingView message="Loading page..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <ErrorView message="Failed to load page" />
      </main>
    );
  }

  if (!page) {
    return (
      <main className="min-h-screen">
        <ErrorView message="Page not found" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <DynamicZoneManager blocks={page.dynamic_zone} />
    </main>
  );
}
