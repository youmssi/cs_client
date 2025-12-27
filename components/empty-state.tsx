import { AlertCircle, FileQuestion, Search, XCircle } from 'lucide-react';
import { LocaleLink } from '@/components/locale-link';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

type EmptyStateType = 'error' | 'no-data' | 'no-results' | 'not-found';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const iconMap = {
  error: XCircle,
  'no-data': FileQuestion,
  'no-results': Search,
  'not-found': AlertCircle,
};

const defaultTitles = {
  error: 'Something went wrong',
  'no-data': 'No data available',
  'no-results': 'No results found',
  'not-found': 'Page not found',
};

const defaultDescriptions = {
  error: 'An error occurred while loading the content. Please try again.',
  'no-data': 'There is no data to display at the moment.',
  'no-results': 'Try adjusting your search or filters.',
  'not-found': 'The page you are looking for does not exist.',
};

export function EmptyState({
  type = 'no-data',
  title,
  description,
  actionLabel,
  actionHref = '/',
}: EmptyStateProps) {
  const Icon = iconMap[type];
  const displayTitle = title || defaultTitles[type];
  const displayDescription = description || defaultDescriptions[type];

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>{displayTitle}</EmptyTitle>
        <EmptyDescription>{displayDescription}</EmptyDescription>
      </EmptyHeader>
      {actionLabel && (
        <EmptyContent>
          <Button asChild>
            <LocaleLink href={actionHref}>{actionLabel}</LocaleLink>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
