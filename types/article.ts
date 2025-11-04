import type { Category, Image } from './components';

export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: Image | null;
  categories: Category[];
  publishedAt: string | null;
  createdAt: string;
}
