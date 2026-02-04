import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CustomButton from "@/components/common/Button";

interface Props {
  option: any;
  index: number;
  isHighlighted?: boolean;
  onSelect: (plan: {
    id: string;
    title: string;
    price: number;
    per: string;
  }) => void;
}

export default function PricingCard({
  option,
  index,
  isHighlighted,
  onSelect,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`
        relative flex h-full flex-col justify-between rounded-3xl
        p-6 sm:p-8
        transition-all duration-300
        bg-white dark:bg-neutral-900
        border
        ${
          isHighlighted
            ? "border-primary ring-1 ring-primary/30 shadow-2xl"
            : "border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl"
        }
      `}
    >
      {/* Recommended badge */}
      {isHighlighted && (
        <span
          className="
            absolute top-4 right-4
            rounded-full px-3 py-1 text-xs 
            bg-primary/10 text-primary
          "
        >
          Recommended
        </span>
      )}

      {/* Content */}
      <div>
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          {option.name}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            ₹{option.price.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            incl. GST
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {option.features.map((feature: any, i: number) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                  {feature.name}
                </p>
                <p className="text-sm text-neutral-600 font-sans dark:text-neutral-400 leading-snug">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="pt-8">
        <CustomButton
          title={isHighlighted ? "Get Started" : "Choose Plan"}
          className={`
            w-full
            ${
              isHighlighted
                ? ""
                : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            }
          `}
          onClick={() =>
            onSelect({
              id: option.id,
              title: option.name,
              price: option.price,
              per: option.slotBookingPercentage
                ? `${option.slotBookingPercentage}%`
                : `${option.slotBookingPercentage}`,
            })
          }
        />
      </div>
    </motion.div>
  );
}
