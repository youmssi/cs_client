import { unstable_noStore as noStore } from 'next/cache';
import { envClient } from './env.client';

export function getStrapiMediaUrl(url: string): string {
  noStore();
  if (url.startsWith('/')) {
    if (
      !envClient.NEXT_PUBLIC_CMS_API_URL &&
      document?.location.host.endsWith('.strapidemo.com')
    ) {
      return `https://${document.location.host.replace('client-', 'api-')}${url}`;
    }

    return envClient.NEXT_PUBLIC_CMS_API_URL + url;
  }
  return url;
}
