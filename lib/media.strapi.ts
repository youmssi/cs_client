const PLACEHOLDER_IMAGE = "/placeholder.svg";

import type { Media } from "@/types";

// Accept our project's Media type, common Strapi shapes, and primitives
type MediaLike =
  | string
  | number
  | null
  | undefined
  | Media
  | {
      url?: string | null;
      provider_metadata?: {
        secure_url?: string;
        [key: string]: unknown;
      } | null;
      // Strapi v4 style nested attributes
      attributes?: {
        url?: string | null;
        formats?: Record<string, unknown> | null;
        provider_metadata?: { secure_url?: string } | null;
      } | null;
      // Optional formats on flat objects
      formats?: Record<string, unknown> | null;
      // Optional id presence used for logging
      id?: number;
    };

/**
 * Safely resolve a Strapi media URL (including Cloudinary) or fall back to a placeholder.
 * Accepts either a raw URL string, media ID, or a media object.
 * 
 * Handles multiple Strapi structures:
 * - Direct URL string
 * - Media ID (number) - returns placeholder (needs separate API call)
 * - Strapi 4: direct url field
 * - Strapi 5: formats.thumbnail.url, formats.small.url, etc.
 * - Cloudinary: provider_metadata.secure_url
 * - Nested data.attributes structure
 */
export function getStrapiMediaUrl(input?: MediaLike): string {
  if (!input) {
    return PLACEHOLDER_IMAGE;
  }

  // Handle media ID (number) - can't resolve without API call
  if (typeof input === "number") {
    console.warn(`[getStrapiMediaUrl] Received media ID ${input}. Images need to be populated in Strapi query.`);
    return PLACEHOLDER_IMAGE;
  }

  // Handle string URLs (including full Cloudinary URLs)
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return PLACEHOLDER_IMAGE;
    
    // If it's already a full URL (http/https), return as-is
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    
    // If it's a relative URL, prepend the Strapi URL
    if (trimmed.startsWith("/")) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:1337";
      return `${strapiUrl}${trimmed}`;
    }
    return trimmed;
  }

  // Handle Strapi media objects
  const media = input as Record<string, unknown>;

  // Debug: Log the media object structure
  if (process.env.NODE_ENV === "development") {
    // console.log("[getStrapiMediaUrl] Media object:", JSON.stringify(media, null, 2));
  }

  // Check if it's wrapped in a data object (Strapi response format)
  if (media.data && typeof media.data === "object") {
    // Recursively call with the unwrapped data
    return getStrapiMediaUrl(media.data);
  }

  // Check for attributes object (Strapi 4 format)
  if (media.attributes && typeof media.attributes === "object" && media.attributes !== null) {
    const attrs = media.attributes as Record<string, unknown>;
    
    // Try direct URL in attributes
    if (attrs.url && typeof attrs.url === "string") {
      const trimmed = attrs.url.trim();
      if (trimmed) {
        if (trimmed.startsWith("/")) {
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:1337";
          return `${strapiUrl}${trimmed}`;
        }
        return trimmed;
      }
    }

    // Try formats in attributes
    if (attrs.formats && typeof attrs.formats === "object" && attrs.formats !== null) {
      const formats = ["large", "medium", "small", "thumbnail"];
      const formatsObj = attrs.formats as Record<string, Record<string, unknown>>;
      for (const format of formats) {
        const formatUrl = formatsObj[format]?.url;
        if (formatUrl && typeof formatUrl === "string") {
          const trimmed = formatUrl.trim();
          if (trimmed) {
            if (trimmed.startsWith("/")) {
              const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:1337";
              return `${strapiUrl}${trimmed}`;
            }
            return trimmed;
          }
        }
      }
    }

    // Try Cloudinary in attributes
    if (
      attrs.provider_metadata &&
      typeof attrs.provider_metadata === "object" &&
      attrs.provider_metadata !== null
    ) {
      const providerMeta = attrs.provider_metadata as Record<string, unknown>;
      if (providerMeta.secure_url && typeof providerMeta.secure_url === "string") {
        const trimmed = providerMeta.secure_url.trim();
        if (trimmed) return trimmed;
      }
    }
  }

  // Try direct URL field (flat structure) - handles Cloudinary full URLs
  if (media.url && typeof media.url === "string") {
    const trimmed = media.url.trim();
    if (trimmed) {
      // If it's a full URL (Cloudinary), return as-is
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
      }
      // If it's a relative URL, prepend Strapi URL
      if (trimmed.startsWith("/")) {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:1337";
        return `${strapiUrl}${trimmed}`;
      }
      return trimmed;
    }
  }

  // Try Cloudinary secure_url (flat structure)
  if (
    media.provider_metadata &&
    typeof media.provider_metadata === "object" &&
    media.provider_metadata !== null
  ) {
    const providerMeta = media.provider_metadata as Record<string, unknown>;
    
    if (providerMeta.secure_url && typeof providerMeta.secure_url === "string") {
      const trimmed = providerMeta.secure_url.trim();
      if (trimmed) return trimmed;
    }

    // Try public_id + resource_type for Cloudinary (alternative structure)
    if (providerMeta.public_id && providerMeta.resource_type) {
      const cloudName = (providerMeta.cloud_name as string) || "daw6bzj8m";
      const publicId = providerMeta.public_id as string;
      const resourceType = (providerMeta.resource_type as string) || "image";
      return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${publicId}`;
    }
  }

  // Try formats (flat structure)
  if (media.formats && typeof media.formats === "object" && media.formats !== null) {
    const formats = ["large", "medium", "small", "thumbnail"];
    const formatsObj = media.formats as Record<string, Record<string, unknown>>;
    for (const format of formats) {
      const formatUrl = formatsObj[format]?.url;
      if (formatUrl && typeof formatUrl === "string") {
        const trimmed = formatUrl.trim();
        if (trimmed) {
          if (trimmed.startsWith("/")) {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:1337";
            return `${strapiUrl}${trimmed}`;
          }
          return trimmed;
        }
      }
    }
  }

  // If we have an ID but no URL, log a warning
  if (media.id) {
    console.warn(`[getStrapiMediaUrl] Media object has ID ${media.id} but no accessible URL. Check Strapi populate settings.`);
  }

  return PLACEHOLDER_IMAGE;
}

