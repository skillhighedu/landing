export const Roles = {
  ALL: "ALL",
  student:"student"

} as const;

export type Roles = typeof Roles[keyof typeof Roles];

