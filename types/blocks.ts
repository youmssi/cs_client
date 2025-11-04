import type { Button, FAQ, Image, Logo, Step, Testimonial } from './components';

export interface HeroBlock {
  type: 'hero';
  heading: string | null;
  sub_heading: string | null;
  ctas: Button[];
}

export interface FeatureBlock {
  type: 'feature';
  heading: string | null;
  sub_heading: string | null;
  globe_card: {
    title: string | null;
    description: string | null;
    span: string | null;
  } | null;
  ray_card: {
    title: string | null;
    description: string | null;
    before_ray_items: {
      item_1?: string;
      item_2?: string;
      item_3?: string;
    } | null;
    after_ray_items: {
      item_1?: string;
      item_2?: string;
      item_3?: string;
    } | null;
    span: string | null;
  } | null;
  graph_card: {
    title: string | null;
    description: string | null;
    top_items: Array<{
      number: string;
      text: string;
    }>;
    highlighted_text: string | null;
    span: string | null;
  } | null;
  social_media_card: {
    title: string | null;
    description: string | null;
    logos: Logo[];
    span: string | null;
  } | null;
}

export interface TestimonialBlock {
  type: 'testimonial';
  heading: string | null;
  sub_heading: string | null;
  testimonials: Testimonial[];
}

export interface HowItWorkBlock {
  type: 'how-it-work';
  heading: string | null;
  sub_heading: string | null;
  steps: Step[];
}

export interface BrandBlock {
  type: 'brand';
  heading: string | null;
  sub_heading: string | null;
  logos: Logo[];
}

export interface LaunchBlock {
  type: 'launch';
  heading: string | null;
  sub_heading: string | null;
  launches: Array<{
    mission_number: string | null;
    title: string | null;
    description: string | null;
  }>;
}

export interface CTABlock {
  type: 'cta';
  heading: string | null;
  sub_heading: string | null;
  ctas: Button[];
}

export interface FormNextToSectionBlock {
  type: 'form-next-to-section';
  heading: string | null;
  sub_heading: string | null;
  form: {
    inputs: Array<{
      type: string;
      name: string;
      placeholder: string;
    }>;
  } | null;
  section: {
    heading: string | null;
    sub_heading: string | null;
    users: Array<{
      firstname: string | null;
      lastname: string | null;
      job: string | null;
      image: Image | null;
    }>;
  } | null;
  social_media_icon_links: Array<{
    image: Image | null;
    links: Array<{
      text: string;
      URL: string;
      target: '_blank' | '_self' | '_parent' | '_top';
    }>;
  }>;
}

export interface FAQBlock {
  type: 'faq';
  heading: string | null;
  sub_heading: string | null;
  faqs: FAQ[];
}

export type DynamicBlock =
  | HeroBlock
  | FeatureBlock
  | TestimonialBlock
  | HowItWorkBlock
  | BrandBlock
  | LaunchBlock
  | CTABlock
  | FormNextToSectionBlock
  | FAQBlock;
