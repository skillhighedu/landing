export function calculateRegistrationAmount(
  planAmount: number,
  percentage: number | string
): number {
  const numeric =
    typeof percentage === 'string'
      ? parseFloat(percentage.replace('%', ''))
      : percentage;

  if (isNaN(numeric)) return 0;

  return (planAmount * numeric) / 100;
}
