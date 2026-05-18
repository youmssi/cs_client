import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

/** Split newline-separated text into trimmed, non-empty lines. */
export function parseBullets(text?: string | null): string[] {
  if (!text) return []
  return text.split("\n").map((b) => b.trim()).filter(Boolean)
}

/** Human-readable label for a ProductPage `release_status` enum value. */
export const PRODUCT_STATUS_LABEL: Record<string, string> = {
  alpha: "Alpha",
  beta: "Beta",
  ga: "Production",
  "coming-soon": "Coming soon",
}
