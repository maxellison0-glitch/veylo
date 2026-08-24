import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact and FAQs",
  description: "Contact Veylo about an order, delivery, returns or using your device. Answers to common questions about our at-home beauty tech.",
};

const faqs = [
  ["How long will my order take?", "We dispatch within 24–48 hours, Monday to Friday. Tracked UK delivery then takes 4–7 working days. We email tracking as soon as your order ships."],
  ["How often should I use the Veylo Wand?", "Five minutes a day on clean, dry skin, followed by your usual serum or moisturiser. The included ritual guide walks through each area of the face."],
  ["Can I return a device if it is not for me?", "Yes. Every order carries a 30-day money-back guarantee. Items need to be unused and in a hygienic condition with their original packaging. Email us to start a return."],
  ["Are Veylo devices suitable for sensitive skin?", "Our tools use gentle, established technologies and most people find them comfortable. Patch test on the inner forearm first, avoid broken skin, and stop if irritation appears. If you have a skin condition or are unsure, speak to your GP or pharmacist before use."],
  ["What if my order arrives damaged?", "Photograph the item and packaging within 48 hours and email us. We will arrange a replacement or a full refund, including any return postage."],
];

export default function ContactPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <main className="contact-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="contact-hero"><div className="site-container"><span className="eyebrow eyebrow-light">We&rsquo;re here</span><h1>Ask us <em>anything.</em></h1><p>Questions about an order, a delivery or how to use your device? Send us a note.</p></div></section>
      <section className="contact-main"><div className="site-container contact-grid"><div className="contact-details"><span className="eyebrow">Contact Veylo</span><h2>A small team,<br />with real replies.</h2><p>We answer messages Monday to Friday and usually come back within two working days.</p><div className="contact-methods"><a href="mailto:hello@veyloskin.com"><Mail size={20} /><span><small>Email</small>hello@veyloskin.com</span></a><div><MapPin size={20} /><span><small>Based in</small>United Kingdom</span></div></div></div><ContactForm /></div></section>
      <section className="faq-section" id="faq"><div className="site-container faq-layout"><div><span className="eyebrow">Useful answers</span><h2>Frequently<br /><em>asked.</em></h2><p id="delivery">Still unsure? We are happy to help with delivery, returns or choosing a device.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    </main>
  );
}
