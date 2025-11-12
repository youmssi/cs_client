import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, getAvailableLocales } from './lib/i18n-config';

function getLocale(request: NextRequest, locales: string[]): string {
  // Check if locale is in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      ?.split(';')[0]
      ?.split('-')[0]
      ?.toLowerCase();
    
    const matchedLocale = locales.find(
      (locale) => locale.toLowerCase() === preferredLocale
    );
    
    if (matchedLocale) return matchedLocale;
  }

  return i18n.defaultLocale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Resolve available locales via SSR-friendly util
  const locales = await getAvailableLocales();
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request, locales);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes
    // - _next (Next.js internals)
    // - static files
    '/((?!api|_next|static|.*\\..*).*)',
  ],
};
