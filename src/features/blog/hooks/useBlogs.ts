import { fetchBlogs } from "@/features/blog/services/blog-service";

import { useQuery } from "@tanstack/react-query";

export const coursesKeys = {
    all: ["blogs"] as const,
    byId: (id: string) => ["blogs", id] as const
};

export const useBlogs = () => {
  return useQuery({
    queryKey: coursesKeys.all,
    queryFn: fetchBlogs
  });
};
