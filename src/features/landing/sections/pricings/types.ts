

export interface PricingProps {
  courseSlug: string;
  autoOpenPayment?: {
    courseId: string;
    priceId: string;
    isFullPayment: boolean;
  };
}

export interface SelectedPlan {
  id: string;
  title: string;
  price: number;
  per: string;
}

export interface SelectedAmount {
  id: string;
  title: string;
  price: number;
}
