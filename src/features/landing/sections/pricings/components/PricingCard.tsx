import { motion } from 'framer-motion';
import { Verified } from 'lucide-react';
import CustomButton from '@/components/common/Button';

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`
        relative flex flex-col justify-between rounded-3xl p-8
        transition-all duration-300
        ${
          isHighlighted
            ? `
              bg-gradient-to-br from-primary/40 via-primary/30 to-primary/20
              ring-1 ring-primary/40
              shadow-2xl
              scale-[1.03]
            `
            : `
              bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950
              shadow-xl hover:shadow-2xl
            `
        }
      `}
    >
      {/* Recommended badge */}
      {isHighlighted && (
        <span className="absolute top-5 right-5 text-xs font-medium px-3 py-1 rounded-full
                         bg-primary/20 text-primary">
          Recommended
        </span>
      )}

      {/* Top */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">
          {option.name}
        </h3>

        <div className="flex items-end gap-2 mb-6">
          <span className="text-4xl font-bold text-white">
            ₹{option.price.toLocaleString()}
          </span>
          <span className="text-sm text-neutral-400">incl. GST</span>
        </div>

        {/* Features */}
        <ul className="space-y-4">
          {option.features.map((feature: any, i: number) => (
            <li key={i} className="flex gap-3">
              <Verified className="w-5 h-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-neutral-100">
                  {feature.name}
                </p>
                <p className="text-sm text-neutral-400 leading-snug">
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
          title={isHighlighted ? 'Get Started' : 'Choose Plan'}
          className={`
            w-full
            ${isHighlighted ? '' : 'bg-neutral-800 hover:bg-neutral-700'}
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
