export interface Image {
  url: string | null;
  alt: string | null;
}

export interface Media {
  id: number;
  documentId?: string;
  name?: string | null;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, unknown> | null;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: Record<string, unknown> | null;
  folderPath?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
}

export interface Link {
  id: number;
  text: string | null;
  URL: string | null;
  target: '_blank' | '_self' | '_parent' | '_top' | null;
}

export interface Button extends Link {
  /**
   * Strapi currently uses the shadcn-ish set (default/outline/ghost/secondary/...),
   * while some client components still support legacy values (primary/muted/simple).
   */
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'secondary'
    | 'link'
    | 'primary'
    | 'muted'
    | 'simple';
}

export interface SocialLink {
  id: number;
  platform: 'x' | 'linkedin' | 'github';
  URL: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  label?: string | null;
}

export interface Logo {
  company: string | null;
  image: Media | null;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage: Media | null;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: unknown | null;
  metaViewport: string | null;
  canonicalURL: string | null;
}

export interface FAQ {
  question: string | null;
  answer: string | null;
}

export interface Testimonial {
  id: number;
  quote: string | null;
  name: string | null;
  company: string | null;
  image: Media | null;
}

export interface Badge {
  text: string | null;
  variant: 'grid' | 'dot' | 'bar';
}

export interface HeaderSection {
  badge: Badge | null;
  heading: string | null;
  sub_heading: string | null;
}

export interface FeatureCard {
  title: string;
  description: string;
  background_style: 'blue' | 'purple' | 'green';
}
