import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, PenLine, RotateCcw } from "lucide-react";
import { ProductImage } from "@/components/product-art";

export const metadata: Metadata = {
  title: "Our story",
  description: "Veylo makes skin and body technology clearer: focused devices, realistic at-home rituals and a safety-first route from supplier to UK customer.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="site-container about-hero-grid">
          <div><span className="eyebrow">Beneath the surface</span><h1>Skin technology,<br />made <em>clear.</em></h1><p>Veylo started with a simple observation: professional skin and body technology can feel inaccessible, while affordable devices are often buried in jargon. We are building a clearer middle path for use at home.</p></div>
          <div className="about-hero-art"><ProductImage slug="veylo-wand" name="The Veylo Wand" finish="#f0eae2" alt="The Veylo Wand in Pearl" className="about-art-fill" sizes="(max-width: 800px) 100vw, 55vw" /><span>The Veylo Wand / Pearl</span></div>
        </div>
      </section>
      <section className="manifesto-section">
        <div className="site-container manifesto-grid"><span className="manifesto-number">001</span><div><span className="eyebrow">The idea</span><h2>Purposeful skin and body technology, without salon pricing. Built for the <em>UK.</em></h2><div className="manifesto-copy"><p>We are not a factory and we do not pretend to be a laboratory. We curate a focused range across face, body and scalp, bringing complementary technologies into one intentional catalogue.</p><p>Every product needs a clear purpose, a realistic routine and instructions that explain both use and limits. Customers should understand what they are buying before it reaches the bathroom shelf.</p></div></div></div>
      </section>
      <section className="principles-section">
        <div className="site-container"><div className="section-kicker-row"><span className="eyebrow eyebrow-light">What guides us</span><span>Three working principles</span></div><div className="principles-grid">
          <article><Clock size={28} strokeWidth={1.2} /><span>01 / Time</span><h3>Built for real routines</h3><p>A ritual only works if it fits into real life. Each product explains its session length and recommended rhythm before you buy.</p></article>
          <article><PenLine size={28} strokeWidth={1.2} /><span>02 / Words</span><h3>Say what it does</h3><p>We write about how skin looks and feels, in plain English. No medical claims, no miracle language, no invented science.</p></article>
          <article><RotateCcw size={28} strokeWidth={1.2} /><span>03 / Trust</span><h3>Easy to change your mind</h3><p>Every order carries a 30-day money-back guarantee. If a device does not earn its place on your shelf, send it back.</p></article>
        </div></div>
      </section>
      <section className="about-process-section">
        <div className="site-container about-process-grid"><div className="about-process-art"><div className="print-path" aria-hidden="true"><span /><span /><span /><span /></div><small>One purpose,<br />clearly explained.</small></div><div><span className="eyebrow">How we choose</span><h2>Checked beyond<br />the <em>listing.</em></h2><ol><li><span>01</span><div><h3>Shortlist</h3><p>We begin with the concern and an established mechanism, then compare suppliers rather than chasing a viral feature list.</p></div></li><li><span>02</span><div><h3>Verify</h3><p>The sample, instructions, warnings, conformity documents, charging or plug setup and UK shipping route must match the offer.</p></div></li><li><span>03</span><div><h3>Explain</h3><p>Approved products receive a plain-English guide: what the technology does, how to use it and where its limits begin.</p></div></li></ol></div></div>
      </section>
      <section className="about-cta"><div className="site-container"><span className="eyebrow">Ready when you are</span><h2>Go beneath<br />the <em>surface.</em></h2><Link className="button button-primary" href="/shop">Shop the range <ArrowRight size={16} /></Link></div></section>
    </main>
  );
}
