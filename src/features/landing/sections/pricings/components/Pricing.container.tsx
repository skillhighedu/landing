import { forwardRef, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePricingsStore } from '@/store/pricing.store';
import { useSelectedCourseStore } from '@/store/useSelectedCourse';
import { useAuthStore } from '@/store/authStore';
import type { PricingProps } from '../types';

import { usePricing } from '../hooks/usePricing';
import { usePricingPayment } from '../hooks/usePricingPayment';

import PricingView from './Pricing.view';
import PricingModal from './PricingModal';
import Container from '@/layouts/Container';
import { PricingTypes } from '@/constants';

const Pricing = forwardRef<HTMLDivElement, PricingProps>(
  ({ courseSlug }, ref) => {
    const { pricings } = usePricingsStore();
    const { selectedCourse } = useSelectedCourseStore();
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const resumedPaymentRef = useRef<string | null>(null);


    const {
      selectedPlan,
      setSelectedPlan,
      registrationAmount,
    } = usePricing(courseSlug);



    const { pay } = usePricingPayment();

    useEffect(() => {
      const pendingPayment = location.state?.openPayment;

      if (!isAuthenticated || !pendingPayment || !selectedCourse?.id) {
        return;
      }

      if (pendingPayment.courseId !== selectedCourse.id) {
        return;
      }

      const resumeKey = [
        pendingPayment.courseId,
        pendingPayment.priceId,
        pendingPayment.isFullPayment,
      ].join(':');

      if (resumedPaymentRef.current === resumeKey) {
        return;
      }

      resumedPaymentRef.current = resumeKey;
      navigate(location.pathname, { replace: true, state: {} });

      void pay({
        courseId: pendingPayment.courseId,
        priceId: pendingPayment.priceId,
        isFullPayment: pendingPayment.isFullPayment,
      });
    }, [isAuthenticated, location.pathname, location.state, navigate, pay, selectedCourse?.id]);

    return (
  <Container size="full">
        <section ref={ref} className="py-20">
        <PricingView
          pricings={pricings}
          pricingType={PricingTypes.global}
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
