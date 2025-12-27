'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocales } from '@/features/cs/hooks/use-coming-soon';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher( { className }: Readonly<LocaleSwitcherProps> ) {
  const params = useParams<{ locale: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const { data: locales, isLoading } = useLocales();

  const currentLocale = params?.locale;

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname || !locales) return;
    
    // Split pathname and filter out empty segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if first segment is a valid locale
    const firstSegmentIsLocale = segments.length > 0 && locales.includes(segments[0]);
    
    // Build the new path by replacing locale
    let restOfPath = '';
    if (firstSegmentIsLocale && segments.length > 1) {
      // Remove the locale, keep the rest (e.g., /en/about -> /about)
      restOfPath = '/' + segments.slice(1).join('/');
    } else if (!firstSegmentIsLocale && segments.length > 0) {
      // No locale in path, keep everything
      restOfPath = '/' + segments.join('/');
    }
    
    // Construct final path with new locale
    const newPath = `/${newLocale}${restOfPath}`;
    
    router.push(newPath);
  };

  if (isLoading || !locales) {
    return null;
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className={cn("w-[100px]", className)}>
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
