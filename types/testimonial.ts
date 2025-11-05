import type { Media } from './components';

export interface Testimonial {
  id: number;
  customer_name: string;
  customer_title?: string | null;
  customer_avatar?: Media | null;
  company_logo?: Media | null;
  testimonial_text: string;
  rating?: number | null;
}
