const PLACEHOLDER_IMAGE = '/placeholder.svg';

export function getStrapiMediaUrl(url?: string | null): string {
  return url && url.trim() !== '' ? url : PLACEHOLDER_IMAGE;
}
