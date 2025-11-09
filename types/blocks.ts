import type { Button, FAQ } from './components';

export interface HeroBlock {
  __component: 'dynamic-zone.hero';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  CTAs: Button[];
}

export interface CTABlock {
  __component: 'dynamic-zone.cta';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  CTAs: Button[];
}

export interface FAQBlock {
  __component: 'dynamic-zone.faq';
  id: number;
  heading: string | null;
  sub_heading: string | null;
  FAQs: FAQ[];
}

export interface StoryBlock {
  __component: 'blocks.story';
  id: number;
  content: string;
}

export type DynamicBlock =
  | HeroBlock
  | CTABlock
  | FAQBlock
  | StoryBlock;