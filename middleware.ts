import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Hardcoded locales — must match what's configured in Strapi
// French is default (isDefault: true in Strapi), English is secondary
const LOCALES = ['fr', 'en'] as const;
const DEFAULT_LOCALE = 'fr';

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;

  // Already has a locale prefix
  const pathnameLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameLocale) return pathnameLocale;

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0]?.split(';')[0]?.split('-')[0]?.toLowerCase();
    const matched = LOCALES.find((l) => l === preferred);
    if (matched) return matched;
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, static files, Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*).*)',],
};
