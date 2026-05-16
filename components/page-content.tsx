import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { ErrorView } from '@/components/state-views';
import type { Page } from '@/types';

interface PageContentProps {
  page: Page | null;
  locale?: string;
}

export function PageContent({ page, locale }: Readonly<PageContentProps>) {
  if (!page) {
    return <ErrorView message="Page not found" />;
  }

  return <DynamicZoneManager blocks={page.dynamic_zone} locale={locale} />;
}
