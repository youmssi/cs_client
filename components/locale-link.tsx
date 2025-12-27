"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * LocaleLink - A wrapper around Next.js Link that automatically prefixes URLs with the current locale.
 * 
 * This ensures that when navigating within the app, users stay within their selected language.
 * 
 * Usage:
 *   <LocaleLink href="/about">About</LocaleLink>
 *   // On /fr, this links to /fr/about
 *   // On /en, this links to /en/about
 */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const params = useParams<{ locale: string }>();
  const currentLocale = params?.locale;

  // Convert href to string if it's an object
  const hrefString = typeof href === 'object' ? href.pathname || '/' : href;

  // Skip locale prefixing for:
  // - External URLs (http://, https://, //)
  // - Anchors (#)
  // - Already prefixed paths (starts with locale)
  // - API routes
  const isExternal = /^(https?:\/\/|\/\/|#)/.test(hrefString);
  const isApi = hrefString.startsWith('/api/');
  const alreadyPrefixed = currentLocale && hrefString.startsWith(`/${currentLocale}`);

  if (isExternal || isApi || alreadyPrefixed || !currentLocale) {
    return <Link href={href} {...props} />;
  }

  // Add locale prefix to internal paths
  const localizedHref = `/${currentLocale}${hrefString === '/' ? '' : hrefString}`;

  return <Link href={localizedHref} {...props} />;
}
