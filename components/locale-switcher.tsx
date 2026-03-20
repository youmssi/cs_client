'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LOCALES } from '@/lib/constants';

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: Readonly<LocaleSwitcherProps>) {
  const params = useParams<{ locale: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params?.locale;

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/').filter(Boolean);
    const firstIsLocale = segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0]);
    const restOfPath = firstIsLocale && segments.length > 1 ? '/' + segments.slice(1).join('/') : '';
    router.push(`/${newLocale}${restOfPath}`);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className={cn('w-[100px]', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
