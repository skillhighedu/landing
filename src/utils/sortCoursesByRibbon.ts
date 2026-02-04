/* ================================
   Ribbon Priority (Single Source)
================================ */

export const RIBBON_PRIORITY = {
  FIRE: 1,
  HOT: 2,
  WAVE: 3,
  RISING: 4,
  ACTIVE: 5,
  NEW: 6,
} as const;

/* ================================
   Types
================================ */

export type RibbonType = keyof typeof RIBBON_PRIORITY;


export function sortCoursesByRibbon<T extends { ribbon: RibbonType }>(
  courses: T[]
): T[] {
  return [...courses].sort(
    (a, b) => RIBBON_PRIORITY[a.ribbon] - RIBBON_PRIORITY[b.ribbon]
  );
}
