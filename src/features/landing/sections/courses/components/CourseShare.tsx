import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  url: string;
  title: string;
};

export default function CourseShare({ url, title }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Course link copied");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          onClick={handleShare}
          whileTap={{ scale: 0.95 }}
          className="
            absolute top-3 right-3 z-20
            rounded-md border border-neutral-700
            bg-neutral-900/80 p-2
            text-neutral-300
            hover:text-white hover:border-neutral-500
            transition-colors cursor-pointer
          "
          aria-label="Share course"
        >
          <Share2 size={16} />
        </motion.button>
      </TooltipTrigger>

      <TooltipContent
        side="left"
        align="center"
        className="
          bg-neutral-900
          border border-neutral-700
          text-xs text-neutral-200
          px-2 py-1
        "
      >
        Share course
      </TooltipContent>
    </Tooltip>
  );
}
