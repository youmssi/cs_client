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
