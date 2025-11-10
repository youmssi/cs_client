'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Locale } from '@/lib/i18n-config';
import { useLocales } from '@/features/cs/hooks/use-coming-soon';

export function LocaleSwitcher() {
  const params = useParams<{ locale: Locale }>();
  const pathname = usePathname();
  const router = useRouter();
  const { data: locales, isLoading } = useLocales();

  const currentLocale = params?.locale || 'en';

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname) return;
    
    // Replace the locale in the current path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  if (isLoading || !locales) {
    return null;
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
