import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { toolItemAnimation } from '../animations';

interface Props {
  toolName: string;
  toolImage: string;
  index: number;
}

export default function ToolCard({ toolName, toolImage, index }: Props) {
  return (
    <motion.div
      {...toolItemAnimation}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative"
    >
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <div
              className="
                flex items-center justify-center
                rounded-2xl
                bg-white/5 backdrop-blur
                h-36 sm:h-40 md:h-44
                transition-all duration-300
                hover:bg-white/10
                hover:-translate-y-1
              "
            >
              <img
                src={toolImage}
                alt={`${toolName} logo`}
                loading="lazy"
                onError={(e) =>
                  (e.currentTarget.src = '/fallback-logo.jpg')
                }
                className="
                  max-h-24 sm:max-h-28 md:max-h-32
                  w-auto object-contain
                  opacity-80
                  transition-all duration-300
                  group-hover:opacity-100
                "
              />
            </div>
          </TooltipTrigger>

          <TooltipContent side="top">
            <p className="text-sm font-medium">{toolName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
