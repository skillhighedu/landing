import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { BackendBlog, BlogPost } from "../types/types";

function normalizeMarkdownContent(content?: string | null) {
  if (!content) return "";

  return content
    .replace(/^`+|`+$/g, "")
    .replace(/\\([`[\]()*_>#|-])/g, "$1")
    .replace(/\r\n/g, "\n")
    .trim();
}

function normalizeTagValue(tag: unknown): string[] {
  if (typeof tag !== "string") return [];

  const cleaned = tag.replace(/\\"/g, '"').trim();

  if (!cleaned) return [];

  const quotedMatches = Array.from(cleaned.matchAll(/"([^"]+)"/g))
    .map((match) => match[1]?.trim())
    .filter(Boolean) as string[];

  if (quotedMatches.length > 0) {
    return quotedMatches.flatMap((value) => normalizeTagValue(value));
  }

  try {
    const parsed = JSON.parse(cleaned);
    return normalizeTags(parsed);
  } catch {
    return cleaned
      .split(",")
      .map((item) => item.replace(/^[\s\["]+|[\s\]"]+$/g, "").trim())
      .filter(Boolean);
  }
}

function normalizeTags(tags: unknown): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    const reconstructed = tags
      .filter((tag): tag is string => typeof tag === "string")
      .join(",")
      .trim();

    if (reconstructed.includes('"')) {
      return Array.from(new Set(normalizeTagValue(reconstructed)));
    }

    return Array.from(
      new Set(
        tags.flatMap((tag) => {
          if (typeof tag === "string") {
            const trimmed = tag.trim();

            if (trimmed.startsWith("[") || trimmed.includes('\\"')) {
              return normalizeTagValue(trimmed);
            }

            return trimmed ? [trimmed] : [];
          }

          return [];
        }),
      ),
    );
  }

  return Array.from(new Set(normalizeTagValue(tags)));
}

function normalizeBlog(blog: BackendBlog): BlogPost {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    content: normalizeMarkdownContent(blog.content),
    excerpt: (blog.excerpt ?? "").trim(),
    thumbnail: blog.coverImage ?? "",
    authorName: blog.authorName?.trim() || "SkillHigh Team",
    publishedAt: blog.publishedAt ?? blog.updatedAt ?? new Date().toISOString(),
    updatedAt: blog.updatedAt ?? blog.publishedAt ?? new Date().toISOString(),
    readingTime: Number(blog.readTime) > 0 ? Number(blog.readTime) : 1,
    category: blog.category ? { name: blog.category.trim() } : null,
    tags: normalizeTags(blog.tags),
    seoTitle: blog.seoTitle?.trim() || blog.title,
    seoDescription: blog.seoDescription?.trim() || (blog.excerpt ?? "").trim(),
    isVisible: blog.isPublished ?? false,
  };
}

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await apiClient.get<ApiResponse<BackendBlog[]>>("/blogs/blog");
    const blogs = response.data.additional ?? response.data.data ?? [];
    return blogs.map(normalizeBlog).filter((blog) => blog.isVisible);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchSpecifiBlog = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.get<ApiResponse<BackendBlog>>(`/blogs/blog/${slug}`);
    const blog = response.data.additional ?? response.data.data;
    return blog ? normalizeBlog(blog) : null;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<ApiResponse<string[]>>("/blogs/category");
    return response.data.additional ?? response.data.data ?? [];
  } catch (error) {
    throw handleApiError(error);
  }
};
