export const AUTH_FORBIDDEN_EVENT = "skillhigh:auth-forbidden";

export type AuthForbiddenEventDetail = {
  to: string;
  delayMs: number;
};
