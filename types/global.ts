import type { Button, Link, Media, SEO } from './components';

export interface Navbar {
  id: number;
  logo: Media;
  left_navbar_items: Button[];
  right_navbar_items: Button[];
}

export interface Footer {
  id: number;
  description: string | null;
  copyright: string | null;
  designed_developed_by: string | null;
  built_with: string | null;
  logo: Media;
  internal_links: Link[];
  policy_links: Link[];
  social_media_links: Link[];
}

export interface Global {
  seo: SEO | null;
  navbar: Navbar | null;
  footer: Footer | null;
  localizations: {
    id: number;
    locale: string;
  }[];
}
