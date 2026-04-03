export type NormalizedProjectReviewState =
  | "REVIEWING"
  | "SUCCESSFUL"
  | "FAILED"
  | "UNKNOWN";

export const normalizeProjectReviewState = (
  reviewState: string | null | undefined,
): NormalizedProjectReviewState => {
  const normalized = reviewState?.trim().toUpperCase();

  if (normalized === "SUCCESSFUL") {
    return "SUCCESSFUL";
  }

  if (normalized === "FAILED") {
    return "FAILED";
  }

  if (normalized === "PENDING" || normalized === "REVIEWING") {
    return "REVIEWING";
  }

  return "UNKNOWN";
};
