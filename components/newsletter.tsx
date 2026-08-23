"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="form-success" role="status">You&rsquo;re on the list. The next note will find you.</p>;
  }

  return (
    <form className={`newsletter-form ${compact ? "newsletter-compact" : ""}`} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={compact ? "footer-email" : "newsletter-email"}>Email address</label>
      <input id={compact ? "footer-email" : "newsletter-email"} type="email" required placeholder="Email address" />
      <button type="submit" aria-label="Join the Veylo newsletter"><ArrowRight size={20} strokeWidth={1.5} /></button>
    </form>
  );
}
