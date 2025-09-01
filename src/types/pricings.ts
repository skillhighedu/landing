// Represents a single feature in the formatted pricing
export interface FormattedFeature {
  name: string;
  description: string;
  isIncluded: boolean;
}

// Represents a pricing plan in the formatted output
export interface FormattedPricing {
  id: string;
  name: string;
  price: number;
  validity: number | null;
  slotBookingPercentage: number | null;
  features: FormattedFeature[];
}
