"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ConsentState = "undecided" | "accepted" | "rejected";

type CookieConsentContextValue = {
  consent: ConsentState;
  accept: () => void;
  reject: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: "undecided",
  accept: () => {},
  reject: () => {},
});

const STORAGE_KEY = "veylo-cookie-consent";

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("undecided");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "rejected") setConsent(saved);
    setHydrated(true);
  }, []);

  const accept = useCallback(() => {
    setConsent("accepted");
    window.localStorage.setItem(STORAGE_KEY, "accepted");
  }, []);

  const reject = useCallback(() => {
    setConsent("rejected");
    window.localStorage.setItem(STORAGE_KEY, "rejected");
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, accept, reject }}>
      {children}
      {hydrated && consent === "undecided" && <CookieBanner onAccept={accept} onReject={reject} />}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

function CookieBanner({ onAccept, onReject }: { onAccept: () => void; onReject: () => void }) {
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p>We use cookies for analytics and advertising to improve your experience. You can accept or reject non-essential cookies.</p>
        <div className="cookie-banner-actions">
          <button className="button button-primary" onClick={onAccept}>Accept</button>
          <button className="button button-secondary" onClick={onReject}>Reject</button>
        </div>
      </div>
    </div>
  );
}
