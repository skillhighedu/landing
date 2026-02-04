

export interface BlogCardProps 
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  tags: string[];

  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  isVisable: boolean;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}




export interface BlogShareProps {
  title: string;
  slug: string;
  className?: string;
}



export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  publishedAt: string;
  readingTime: number;
  category?: { name: string };
  tags?: string[];
}