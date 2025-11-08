'use client';

import { ErrorView, LoadingView } from '@/components/state-views';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { usePageBySlug } from '@/features/cs/hooks/use-coming-soon';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config';

export default function HomePage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params?.locale || 'en';
  const { data: page, isLoading, error } = usePageBySlug('home', locale);

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <LoadingView message="Loading home page..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <ErrorView message="Failed to load home page" />
      </main>
    );
  }

  if (!page) {
    return (
      <main className="min-h-screen">
        <ErrorView message="Home page not found" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <DynamicZoneManager blocks={page.dynamic_zone} />
    </main>
  );
}
