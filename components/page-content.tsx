import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { ErrorView } from '@/components/state-views';
import type { Page } from '@/types';

interface PageContentProps {
  page: Page;
}

export function PageContent({ page }: Readonly<PageContentProps>) {
  if (!page) {
    return <ErrorView message="Page not found" />;
  }

  return <DynamicZoneManager blocks={page.dynamic_zone} />;
}
