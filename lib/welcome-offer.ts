export const WELCOME_OFFER_STORAGE_KEY = "veylo-welcome-offer";
export const WELCOME_OFFER_DISMISSAL_MS = 30 * 24 * 60 * 60 * 1000;

export type WelcomeOfferState = {
  status: "dismissed" | "claimed";
  timestamp: number;
};

export function parseWelcomeOfferState(value: string | null): WelcomeOfferState | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<WelcomeOfferState>;
    if ((parsed.status !== "dismissed" && parsed.status !== "claimed") || typeof parsed.timestamp !== "number") return null;
    return { status: parsed.status, timestamp: parsed.timestamp };
  } catch {
    return null;
  }
}

export function shouldSuppressWelcomeOffer(state: WelcomeOfferState | null, now = Date.now()) {
  if (!state) return false;
  if (state.status === "claimed") return true;
  return now - state.timestamp < WELCOME_OFFER_DISMISSAL_MS;
}
