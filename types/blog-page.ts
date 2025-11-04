import type { DynamicBlock } from './blocks';
import type { SEO } from './components';

export interface BlogPage {
  seo: SEO;
  heading: string | null;
  sub_heading: string | null;
  blocks: DynamicBlock[];
}
