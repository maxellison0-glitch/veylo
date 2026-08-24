"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email") as string;
    if (!email) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="form-success" role="status">You&rsquo;re on the list. The next note will find you.</p>;
  }

  return (
    <form className={`newsletter-form ${compact ? "newsletter-compact" : ""}`} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={compact ? "footer-email" : "newsletter-email"}>Email address</label>
      <input id={compact ? "footer-email" : "newsletter-email"} name="email" type="email" required placeholder="Email address" disabled={status === "sending"} />
      <button type="submit" aria-label="Join the Veylo newsletter" disabled={status === "sending"}><ArrowRight size={20} strokeWidth={1.5} /></button>
      {status === "error" && <p className="form-error" role="alert">Something went wrong. Try again.</p>}
    </form>
  );
}
