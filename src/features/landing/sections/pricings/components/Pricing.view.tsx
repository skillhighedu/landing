import Header from '@/components/common/Header';
import PricingCard from './PricingCard';
import { PricingTypes } from '@/constants';

export default function PricingView({
  pricings,
  pricingType,
  onSelectPlan,
}: {
  pricings: any[];
  pricingType: PricingTypes;
  onSelectPlan: (plan: any) => void;
}) {
  const highlightIndex =
    pricings.length >= 2 ? 1 : 0; 
  return (
    <>
      <div className="text-center mb-16">
        <Header
          title={
            pricingType === PricingTypes.global
              ? 'Choose Your Path'
              : 'Expert Guidance'
          }
          subline={
            pricingType === PricingTypes.global
              ? "Flexible plans designed for your learning journey."
              : 'Personal mentoring and structured learning to accelerate your growth.'
          }
        />
      </div>

      <div
        className={`grid gap-10 ${
          pricings.length === 1
            ? 'grid-cols-1 place-items-center'
            : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {pricings.map((option, idx) => (
          <PricingCard
            key={option.id}
            option={option}
            index={idx}
            isHighlighted={idx === highlightIndex}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </>
  );
}
