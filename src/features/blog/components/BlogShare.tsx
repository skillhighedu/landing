import { useEffect, useState } from "react";
import { Linkedin, Link as LinkIcon, Share2, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogShareProps } from "../types/types";

const shareLinks = [
  {
    name: "Twitter / X",
    icon: Twitter,
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        title
      )}`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    buildUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
];

export default function BlogShare({ title, slug, className }: BlogShareProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const baseUrl = window?.location?.origin ?? "";
    setShareUrl(`${baseUrl}/blogs/${slug}`);
  }, [slug]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          url: shareUrl,
          title,
        });
      } catch (error) {
        console.error("Share cancelled or failed:", error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className={cn(
        `
        flex flex-wrap items-center gap-3 rounded-[1.75rem] border px-4 py-4 sm:px-6 sm:py-5
        bg-neutral-50 border-neutral-200 text-black
        dark:bg-neutral-900/80 dark:border-neutral-800 dark:text-gray-200
        `,
        className
      )}
    >
      <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-black/70 dark:text-gray-400">
        <Share2 className="h-4 w-4 text-primary" />
        Share this article
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-primary transition hover:bg-primary/10 sm:text-sm"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="
            inline-flex items-center gap-2 rounded-full border px-4 py-2
            font-mono text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors

            border-black/15 text-black/80 hover:border-primary/60 hover:text-black
            dark:border-neutral-700 dark:text-gray-300 dark:hover:border-primary/60 dark:hover:text-white
          "
        >
          <LinkIcon className="h-4 w-4" />
          {copied ? "Link copied!" : "Copy link"}
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {shareLinks.map(({ name, icon: Icon, buildUrl }) => (
          <a
            key={name}
            href={shareUrl ? buildUrl(shareUrl, title) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className="
              group inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors

              border-black/15 text-black/70 hover:border-primary/60 hover:text-black
              dark:border-neutral-700 dark:text-gray-300 dark:hover:border-primary/60 dark:hover:text-white
            "
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
