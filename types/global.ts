import type { Button, Link, Logo, SEO, SocialLink } from './components';

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
  logo: Logo;
  internal_links: Link[];
  policy_links: Link[];
  social_media_links: SocialLink[];
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
