import { Share2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.button
      onClick={handleShare}
      whileTap={{ scale: 0.95 }}
      className="
        absolute top-3 right-3 z-20
        rounded-md border border-neutral-700
        bg-neutral-900/80 p-2
        text-neutral-300
        hover:text-white hover:border-neutral-500
        transition-colors
      "
      aria-label="Share course"
    >
      <Share2 size={16} />
    </motion.button>
  );
}
