import { headers } from 'next/headers';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ContainerView } from '@/components/state-views';
import { DEFAULT_LOCALE } from '@/lib/constants';

const COPY = {
  fr: {
    title: '404 — Page introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    cta: 'Retour à l\'accueil',
  },
  en: {
    title: '404 — Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: 'Go Home',
  },
} as const;

export default async function LocaleNotFound() {
  const headersList = await headers();
  const locale = (headersList.get('x-locale') ?? DEFAULT_LOCALE) as keyof typeof COPY;
  const copy = COPY[locale] ?? COPY[DEFAULT_LOCALE];

  return (
    <ContainerView className="min-h-screen flex items-center justify-center border">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageOpen className="size-6" />
          </EmptyMedia>
          <EmptyTitle>{copy.title}</EmptyTitle>
          <EmptyDescription>{copy.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={`/${locale}`}>{copy.cta}</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </ContainerView>
  );
}
