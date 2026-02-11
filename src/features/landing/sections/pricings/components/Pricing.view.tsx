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

  // Find the 10,000 plan (Mentor-Driven)
  const mentorPlan = pricings.find(p => p.price === 10000);

  // Remaining plans
  const others = pricings.filter(p => p.price !== 10000);

  // Order: left | mentor | right
  const orderedPricings =
    mentorPlan && others.length === 2
      ? [others[0], mentorPlan, others[1]]
      : pricings;

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
          orderedPricings.length === 1
            ? 'grid-cols-1 place-items-center'
            : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {orderedPricings.map((option) => (
          <PricingCard
            key={option.id}
            option={option}
            isHighlighted={option.price === 10000}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </>
  );
}
