import type { Button, CaseStudy, Link, Logo, Product, SEO } from './components';

export interface Navbar {
  logo: Logo | null;
  left_navbar_items: Link[];
  right_navbar_items: Button[];
  saas_products_menu: Product[];
}

export interface Footer {
  logo: Logo | null;
  description: string | null;
  copyright: string | null;
  designed_developed_by: string | null;
  built_with: string | null;
  internal_links: Link[];
  policy_links: Link[];
  social_media_links: Link[];
  featured_products: Product[];
  success_stories: CaseStudy[];
}

export interface Global {
  seo: SEO;
  navbar: Navbar;
  footer: Footer;
  localizations: string[];
}
