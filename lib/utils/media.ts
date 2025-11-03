/**
 * Media utility functions for Strapi media handling
 */

/**
 * Get full URL for Strapi media
 * Handles both relative and absolute URLs
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // Already absolute URL
  if (url.startsWith('http')) {
    return url;
  }
  
  // Build absolute URL from Strapi base URL
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${apiUrl}${url}`;
}
