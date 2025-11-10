import { envClient } from './env.client';

export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('/')) {
    if (
      !envClient.NEXT_PUBLIC_CMS_API_URL &&
      typeof window !== 'undefined' &&
      window.location.host.endsWith('.strapidemo.com')
    ) {
      return `https://${window.location.host.replace('client-', 'api-')}${url}`;
    }

    return envClient.NEXT_PUBLIC_CMS_API_URL + url;
  }
  return url;
}
