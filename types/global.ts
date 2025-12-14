import type { Button, Link, Logo, SEO } from './components';

export interface Navbar {
  id: number;
  logo: Logo | null;
  left_navbar_items: Link[] | null;
  right_navbar_items: Button[] | null;
}

export interface Footer {
  id: number;
  description: string | null;
  copyright: string | null;
  designed_developed_by: string | null;
  built_with: string | null;
  logo: Logo | null;
  internal_links: Link[] | null;
  policy_links: Link[] | null;
  social_media_links: Link[] | null;
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
