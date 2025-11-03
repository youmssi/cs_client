import type { User } from '@/types';

export function getUserFullName(user: User | null): string {
  if (!user) return 'Anonymous';
  const firstName = user.firstname || '';
  const lastName = user.lastname || '';
  return `${firstName} ${lastName}`.trim() || 'Anonymous';
}

export function getUserInitials(user: User | null): string {
  if (!user) return 'A';
  const firstName = user.firstname || '';
  const lastName = user.lastname || '';
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'A';
}

export function getImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;
}
