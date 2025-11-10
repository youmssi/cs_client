"use client";

import { usePageBySlug } from '@/features/cs/hooks/use-coming-soon';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { ErrorView, LoadingView } from '@/components/state-views';
import type { Locale } from '@/lib/i18n-config';

interface PageContentProps {
  slug: string;
  locale: Locale;
}

export function PageContent({ slug, locale }: Readonly<PageContentProps>) {
  const { data: page, isLoading, error } = usePageBySlug(slug, locale);

  if (isLoading) {
    return <LoadingView message="Loading page..." />;
  }

  if (error) {
    return <ErrorView message="Failed to load page" />;
  }

  if (!page) {
    return <ErrorView message="Page not found" />;
  }

  return <DynamicZoneManager blocks={page.dynamic_zone} />;
}
