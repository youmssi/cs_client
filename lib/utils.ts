import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncate = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + '...' : text
}

export const formatNumber = (number: number, locale: string = 'en-US') : string => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number)
}


export function getUserFullName(user?: User | null): string {
  if (!user) return '';
  return `${user.firstname || ''} ${user.lastname || ''}`.trim();
}

export function getUserInitials(user?: User | null): string {
  if (!user) return '';
  const firstnameInitial = user.firstname ? user.firstname[0] : '';
  const lastnameInitial = user.lastname ? user.lastname[0] : '';
  return `${firstnameInitial}${lastnameInitial}`.toUpperCase();
}
