
import { forwardRef, } from 'react';
import { usePricingsStore } from '@/store/pricing.store';
import { useSelectedCourseStore } from '@/store/useSelectedCourse';
import type { PricingProps } from '../types';

import { usePricing } from '../hooks/usePricing';
import { usePricingPayment } from '../hooks/usePricingPayment';

import PricingView from './Pricing.view';
import PricingModal from './PricingModal';
import Container from '@/layouts/Container';

const Pricing = forwardRef<HTMLDivElement, PricingProps>(
  ({ courseSlug }, ref) => {
    const { pricings } = usePricingsStore();
    const { selectedCourse } = useSelectedCourseStore();


    const {
      selectedPlan,
      setSelectedPlan,
      registrationAmount,
    } = usePricing(courseSlug);



    const { pay } = usePricingPayment();

    return (
  <Container size="full">
        <section ref={ref} className="py-20">
        <PricingView
          pricings={pricings}
          onSelectPlan={setSelectedPlan}
        />

        <PricingModal
          open={!!selectedPlan}
          registrationAmount={registrationAmount!}
          fullAmount={selectedPlan?.price!}
          onClose={() => setSelectedPlan(null)}
          onPay={(full: boolean) =>
            pay({
              courseId: selectedCourse?.id!,
              priceId: selectedPlan?.id!,
              isFullPayment: full,
            })
          }
        />
      </section>
  </Container>
    );
  }
);

export default Pricing;
