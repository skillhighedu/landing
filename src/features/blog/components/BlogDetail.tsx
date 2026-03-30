import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, Clock3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { SEO } from "@/components/common/SEO";
import HeaderSection from "@/components/common/HeaderSection";
import BlogShare from "@/features/blog/components/BlogShare";
import Container from "@/layouts/Container";
import { fetchFormattedCourses } from "@/services/course-service";
import type { FormatedCourses } from "@/types/course";
import { markdownComponents } from "./Markdown";
import { useSpecifyBlog } from "../hooks/useBlogs";
import { BlogDetailSkeleton } from "../skeleton/BlogDetailSkeleton";

function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function buildKeywordGroups(post: {
  category: { name: string } | null;
  tags: string[];
  title: string;
}) {
  const phrases = [post.category?.name ?? "", ...post.tags]
    .map((value) => normalizeText(value))
    .filter(Boolean);

  const tokens = Array.from(
    new Set(
      phrases
        .flatMap((phrase) => phrase.split(" "))
        .filter((token) => token.length > 2),
    ),
  );

  const titleTokens = Array.from(
    new Set(
      normalizeText(post.title)
        .split(" ")
        .filter((token) => token.length > 3),
    ),
  );

  return { phrases, tokens, titleTokens };
}

function getRecommendedCourses(
  keywordGroups: { phrases: string[]; tokens: string[]; titleTokens: string[] },
  courses: FormatedCourses[],
) {
  return courses
    .map((course) => {
      const haystack = normalizeText(
        `${course.courseName} ${course.courseDescription} ${course.departmentName} ${course.slug}`,
      );

      const exactPhraseScore = keywordGroups.phrases.reduce((total, phrase) => {
        return haystack.includes(phrase) ? total + 6 : total;
      }, 0);

      const tokenScore = keywordGroups.tokens.reduce((total, token) => {
        return haystack.includes(token) ? total + 2 : total;
      }, 0);

      const titleScore = keywordGroups.titleTokens.reduce((total, token) => {
        return haystack.includes(token) ? total + 1 : total;
      }, 0);

      const score = exactPhraseScore + tokenScore + titleScore;

      return { course, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (Boolean(right.course.isTopSelling) !== Boolean(left.course.isTopSelling)) {
        return Number(Boolean(right.course.isTopSelling)) - Number(Boolean(left.course.isTopSelling));
      }
      return left.course.courseName.localeCompare(right.course.courseName);
    })
    .slice(0, 3)
    .map(({ course }) => course);
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useSpecifyBlog(slug!);
  const { data: courses = [] } = useQuery<FormatedCourses[]>({
    queryKey: ["formatted-courses", "blog-recommendations"],
    queryFn: fetchFormattedCourses,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const keywordGroups = useMemo(() => {
    if (!post) {
      return {
        phrases: [],
        tokens: [],
        titleTokens: [],
      };
    }

    return buildKeywordGroups(post);
  }, [post]);

  const recommendedCourses = useMemo(() => {
    if (!post) return [];
    return getRecommendedCourses(keywordGroups, courses);
  }, [courses, keywordGroups, post]);

  if (isLoading) return <BlogDetailSkeleton />;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-neutral-950">
        <p className="font-mono text-3xl text-neutral-900 dark:text-white">Article not found</p>
        <p className="mt-3 max-w-md font-sans text-sm text-neutral-600 dark:text-neutral-300">
          The article may have been moved or removed.
        </p>
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="mt-6 inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 font-mono text-sm text-neutral-800 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-white"
        >
          Back
        </button>
      </div>
    );
  }

  const absoluteUrl = `${window.location.origin}/blogs/${post.slug}`;

  return (
    <Container size="full">
      <SEO
        title={post.seoTitle || `${post.title} | SkillHigh Blog`}
        description={post.seoDescription || post.excerpt}
        image={post.thumbnail}
        url={absoluteUrl}
        meta={[{ property: "og:type", content: "article" }]}
      />

      <div className="mt-10 min-h-screen bg-white px-6 py-16 text-neutral-950 dark:bg-neutral-900 dark:text-white sm:px-10">
        <article className="mx-auto max-w-6xl">
          <div className="mb-8">
            <HeaderSection />
          </div>

          <header className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-2">
              {post.category?.name && (
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  {post.category.name}
                </span>
              )}

              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-mono text-4xl leading-tight sm:text-5xl">{post.title}</h1>

            {post.excerpt && (
              <p className="mt-5 font-sans text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                {post.excerpt}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 font-sans text-sm text-neutral-500 dark:text-neutral-400">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readingTime} min read
              </span>
              <span>&bull;</span>
              <span>{post.authorName}</span>
            </div>
          </header>

          {post.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
              <img src={post.thumbnail} alt={post.title} className="max-h-[520px] w-full object-cover" />
            </div>
          )}

          <div className="mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>

          {recommendedCourses.length > 0 && (
            <section className="mt-16 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950/60 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Course Recommendations</p>
                  <h2 className="mt-3 font-mono text-3xl leading-tight text-neutral-950 dark:text-white">
                    Continue this topic with guided learning.
                  </h2>
                  <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                    Based on this article&rsquo;s topic, these programs are the closest match to keep the momentum going.
                  </p>
                </div>

                <Link
                  to="/all-courses"
                  className="inline-flex items-center gap-2 font-mono text-sm text-primary transition hover:opacity-80"
                >
                  Explore all courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {recommendedCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.slug}`}
                    className="group overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                          {course.departmentName}
                        </span>
                        {course.isTopSelling && (
                          <span className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
                            Top Selling
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 font-mono text-2xl leading-tight text-neutral-950 transition-colors group-hover:text-primary dark:text-white">
                        {course.courseName}
                      </h3>

                      <p className="mt-3 line-clamp-3 font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                        {course.courseDescription}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-neutral-900 transition-colors group-hover:text-primary dark:text-white">
                        View course
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <BlogShare title={post.title} slug={post.slug} className="mt-10" />
        </article>
      </div>
    </Container>
  );
}
