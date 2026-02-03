import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toolItemAnimation } from "../animations";

interface Props {
  toolName: string;
  toolImage: string;
  index: number;
}

export default function ToolCard({ toolName, toolImage, index }: Props) {
  return (
    <motion.div
      {...toolItemAnimation}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <div
              className="
                flex items-center justify-center
                h-32 sm:h-36 md:h-40
                rounded-2xl
                border
                border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-neutral-900
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <img
                src={toolImage}
                alt={`${toolName} logo`}
                loading="lazy"
                onError={(e) =>
                  (e.currentTarget.src = "/fallback-logo.jpg")
                }
                className="
                  max-h-20 sm:max-h-24 md:max-h-28
                  w-auto object-contain
                  opacity-80
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="top"
            className="text-sm font-medium"
          >
            {toolName}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
