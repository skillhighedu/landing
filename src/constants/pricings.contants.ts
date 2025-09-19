export const PricingTypes = {
  single: "SINGLE",
  global: "GLOBAL"

} as const;

export type PricingTypes = typeof PricingTypes[keyof typeof PricingTypes];

