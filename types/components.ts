export interface Image {
  url: string | null;
  alt: string | null;
}

export interface Media {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
}

export interface Link {
  text: string;
  URL: string;
  target: '_blank' | '_self' | '_parent' | '_top';
}

export interface Button extends Link {
  variant: 'simple' | 'outline' | 'primary' | 'muted';
}

export interface User {
  firstname: string | null;
  lastname: string | null;
  job: string | null;
  image: Image | null;
}

export interface Logo {
  company: string | null;
  image: Image | null;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage: Image | null;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: unknown | null;
  metaViewport: string | null;
  canonicalURL: string | null;
}

export interface Step {
  title: string | null;
  description: string | null;
}

export interface FAQ {
  question: string | null;
  answer: string | null;
}

export interface Testimonial {
  text: string | null;
  user: User | null;
}

export interface Product {
  name: string;
  slug: string;
}

export interface CaseStudy {
  title: string;
  client_name: string;
  client_logo: Image | null;
}

export interface Category {
  id: number;
  name: string;
}
