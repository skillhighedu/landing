import { useEffect, useState } from "react";
import {  Linkedin, Link as LinkIcon, Share2, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomButton from "../Button";

interface BlogShareProps {
  title: string;
  slug: string;
  className?: string;
}

const shareLinks = [
  {
    name: "Twitter / X",
    icon: Twitter,
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    buildUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        title,
      )}`,
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
        "rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center gap-3 sm:gap-4",
        className,
      )}
    >
      <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-400">
        <Share2 className="h-4 w-4 text-primary" />
        Share this article
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <CustomButton
          title="Share"
          icon={<Share2 className="h-4 w-4" />}
          isBack
          type="button"
          onClick={handleNativeShare}
          className="!bg-primary/15 !text-primary !border !border-primary/60 !px-3 !py-2 !text-xs sm:!text-sm !shadow-none hover:!bg-primary/25 transition-colors"
        />

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-300 hover:border-primary/60 hover:text-white transition-colors"
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
            className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-gray-300 hover:border-primary/60 hover:text-white transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

