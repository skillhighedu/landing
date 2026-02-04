const INTRO_EXPIRY_MINUTES = 15;
const INTRO_KEY = "introTimestamp";

export function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return false; 

  const timestamp = localStorage.getItem(INTRO_KEY);
  if (!timestamp) return true;

  const diff = Date.now() - new Date(timestamp).getTime();
  return diff > INTRO_EXPIRY_MINUTES * 60 * 1000;
}

export function markIntroSeen() {
  if (typeof window === "undefined") return;

  localStorage.setItem(INTRO_KEY, new Date().toISOString());
}
