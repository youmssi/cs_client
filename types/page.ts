import type { SEO } from './components';
import type { DynamicBlock } from './blocks';

export interface Page {
  id: number;
  seo: SEO | null;
  slug: string;
  dynamic_zone: DynamicBlock[];
  localizations: Array<{
    id: number;
    locale: string;
  }>;
}
