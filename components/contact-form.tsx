"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <div className="contact-success" role="status"><span><Check size={27} /></span><h2>Message sent.</h2><p>Thanks for getting in touch. We&rsquo;ll come back to you within two working days.</p><button className="text-link" onClick={() => setSent(false)}>Send another message</button></div>;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid"><label className="field"><span>First name</span><input required autoComplete="given-name" /></label><label className="field"><span>Last name</span><input required autoComplete="family-name" /></label><label className="field full-field"><span>Email</span><input required type="email" autoComplete="email" /></label><label className="field full-field"><span>What can we help with?</span><select required defaultValue=""><option value="" disabled>Choose a subject</option><option>My order</option><option>Using my device</option><option>Delivery & returns</option><option>Press</option><option>Something else</option></select></label><label className="field full-field"><span>Message</span><textarea required rows={6} placeholder="Tell us how we can help" /></label></div>
      <button className="button button-primary" type="submit">Send message <ArrowRight size={16} /></button>
    </form>
  );
}
