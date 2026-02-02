import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { initiateRazorpayPayment } from '@/lib/razorpay';
import { useAuthStore } from '@/store/authStore';

export function usePricingPayment() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  async function pay({
    courseId,
    priceId,
    isFullPayment,
  }: {
    courseId: string;
    priceId: string;
    isFullPayment: boolean;
  }) {
    if (!isAuthenticated) {
      navigate('/signup', {
        replace: true,
        state: {
          from: location.pathname,
          scrollTo: 'pricing',
          openPayment: { courseId, priceId, isFullPayment },
        },
      });
      return;
    }

    try {
      await initiateRazorpayPayment({ courseId, priceId, isFullPayment });
      toast.success('Payment successful!');
    } catch {
      toast.error('Payment failed or cancelled.');
    }
  }

  return { pay };
}
