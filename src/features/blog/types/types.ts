export interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  tags: string[];
  authorName: string;
  category: {
    name: string;
  } | null;
  seoTitle: string;
  seoDescription: string;
  isVisible: boolean;
  readingTime: number;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogShareProps {
  title: string;
  slug: string;
  className?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: { name: string } | null;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  isVisible: boolean;
}

export interface BackendBlog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: string | null;
  authorName?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  category?: string | null;
  tags?: unknown;
  readTime?: number | string | null;
  isPublished?: boolean | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}
