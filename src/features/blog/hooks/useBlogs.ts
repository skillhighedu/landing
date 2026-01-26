import { fetchBlogs, fetchCategories, fetchSpecifiBlog } from "../services/blog-service";

import { useQuery } from "@tanstack/react-query";

export const blogKeys = {
    all: ["blogs"] as const,
    bySlug: (slug: string) => ["blogs", slug] as const,
    categories:["categories"] as const
};

export const useBlogs = () => {
  return useQuery({
    queryKey: blogKeys.all,
    queryFn: fetchBlogs
  });
};


export const useSpecifyBlog = (slug:string) => {
  return useQuery({
    queryKey: blogKeys.bySlug(slug),
    queryFn: () => fetchSpecifiBlog(slug!)
  });
};




export const useCategoryBlogs = () => {
  return useQuery({
    queryKey: blogKeys.categories,
    queryFn: fetchCategories
  });
};