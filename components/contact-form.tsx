"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="contact-success" role="status">
        <span><Check size={27} /></span>
        <h2>Message sent.</h2>
        <p>Thanks for getting in touch. We&rsquo;ll come back to you within two working days.</p>
        <button className="text-link" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="field"><span>First name</span><input name="firstName" required autoComplete="given-name" disabled={status === "sending"} /></label>
        <label className="field"><span>Last name</span><input name="lastName" required autoComplete="family-name" disabled={status === "sending"} /></label>
        <label className="field full-field"><span>Email</span><input name="email" required type="email" autoComplete="email" disabled={status === "sending"} /></label>
        <label className="field full-field">
          <span>What can we help with?</span>
          <select name="subject" required defaultValue="" disabled={status === "sending"}>
            <option value="" disabled>Choose a subject</option>
            <option>My order</option>
            <option>Using my device</option>
            <option>Delivery & returns</option>
            <option>Press</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="field full-field"><span>Message</span><textarea name="message" required rows={6} placeholder="Tell us how we can help" disabled={status === "sending"} /></label>
      </div>
      {status === "error" && <p className="form-error" role="alert">Something went wrong. Please try again or email us directly.</p>}
      <button className="button button-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : <>Send message <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}
