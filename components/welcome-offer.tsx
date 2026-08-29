"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { trackLead } from "@/lib/tracking";
import { parseWelcomeOfferState, shouldSuppressWelcomeOffer, WELCOME_OFFER_STORAGE_KEY } from "@/lib/welcome-offer";

type OfferStatus = "idle" | "sending" | "claimed" | "error";

export function WelcomeOffer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<OfferStatus>("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const triggered = useRef(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const excluded = pathname.startsWith("/checkout") || pathname === "/cart";

  const show = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(WELCOME_OFFER_STORAGE_KEY, JSON.stringify({ status: "dismissed", timestamp: Date.now() }));
    setOpen(false);
  }, []);

  useEffect(() => {
    if (excluded || shouldSuppressWelcomeOffer(parseWelcomeOfferState(window.localStorage.getItem(WELCOME_OFFER_STORAGE_KEY)))) return;

    const timeout = window.setTimeout(show, 8_000);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.4) show();
    };
    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.matchMedia("(min-width: 801px)").matches) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [excluded, show]);

  useEffect(() => {
    if (!open) return;
    emailRef.current?.focus();
    const previous = previousFocus.current;
    return () => previous?.focus();
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      dismiss();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!email) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "welcome-popup" }),
      });
      if (!response.ok) throw new Error("Unable to subscribe");

      window.localStorage.setItem(WELCOME_OFFER_STORAGE_KEY, JSON.stringify({ status: "claimed", timestamp: Date.now() }));
      setStatus("claimed");
      trackLead();
    } catch {
      setStatus("error");
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText("VEYLO10");
  }

  if (!open || excluded) return null;

  return (
    <div className="welcome-overlay" onMouseDown={(event) => event.target === event.currentTarget && dismiss()}>
      <div ref={panelRef} className="welcome-panel" role="dialog" aria-modal="true" aria-labelledby="welcome-title" onKeyDown={handleKeyDown}>
        {status === "claimed" ? (
          <div className="welcome-success" role="status">
            <span className="eyebrow">Welcome to Veylo</span>
            <h2 id="welcome-title">Your code:</h2>
            <strong>VEYLO10</strong>
            <button className="button button-secondary" type="button" onClick={copyCode}>Copy code</button>
            <p>Applied at checkout â€” paste it in the promo field. Also sent to your inbox.</p>
            <Link className="button button-primary" href="/shop" onClick={() => setOpen(false)}>Shop the range</Link>
          </div>
        ) : (
          <>
            <span className="eyebrow">Welcome to Veylo</span>
            <h2 id="welcome-title">10% off your first ritual.</h2>
            <p>Join the list and we&rsquo;ll take 10% off your first order â€” plus early access to new devices and honest guides on what actually works.</p>
            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="welcome-email">Email address</label>
              <input ref={emailRef} id="welcome-email" name="email" type="email" autoComplete="email" required placeholder="Email address" disabled={status === "sending"} />
              <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Claimingâ€¦" : "Claim 10% off"}</button>
            </form>
            {status === "error" && <p className="welcome-error" role="alert">Something went wrong. Please try again.</p>}
            <button className="welcome-dismiss" type="button" onClick={dismiss}>No thanks, full price is fine.</button>
          </>
        )}
      </div>
    </div>
  );
}
