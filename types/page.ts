import type { DynamicBlock } from './blocks';
import type { SEO } from './components';

export interface Page {
  seo: SEO;
  slug: string;
  blocks: DynamicBlock[];
}
