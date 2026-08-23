import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, PenLine, RotateCcw } from "lucide-react";
import { ProductImage } from "@/components/product-art";

export const metadata: Metadata = {
  title: "Our story",
  description: "Veylo is a UK brand making at-home beauty tech simple: a small range of devices, chosen and tested against one bar — visible-glow rituals under ten minutes.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="site-container about-hero-grid">
          <div><span className="eyebrow">Our story</span><h1>Beauty tech,<br />made <em>simple.</em></h1><p>Veylo started with a simple observation: the best skin devices lived in salons at salon prices, and the affordable ones were buried in jargon. We wanted a middle path.</p></div>
          <div className="about-hero-art"><ProductImage slug="veylo-wand" name="The Veylo Wand" finish="#f0eae2" alt="The Veylo Wand in Pearl" className="about-art-fill" sizes="(max-width: 800px) 100vw, 55vw" /><span>The Veylo Wand / Pearl</span></div>
        </div>
      </section>
      <section className="manifesto-section">
        <div className="site-container manifesto-grid"><span className="manifesto-number">001</span><div><span className="eyebrow">The idea</span><h2>Design-led beauty tech, without salon prices. Founded in the <em>UK.</em></h2><div className="manifesto-copy"><p>We are not a factory and we do not pretend to be a laboratory. We are a small UK team that chooses a handful of devices, tests them on our own faces for weeks and only sells the ones we keep using.</p><p>Every product is held to a simple bar: a visible-glow ritual in under ten minutes a day. If a device needs a manual, an app or an hour of your evening, it does not make the range.</p></div></div></div>
      </section>
      <section className="principles-section">
        <div className="site-container"><div className="section-kicker-row"><span className="eyebrow eyebrow-light">What guides us</span><span>Three working principles</span></div><div className="principles-grid">
          <article><Clock size={28} strokeWidth={1.2} /><span>01 / Time</span><h3>Under ten minutes</h3><p>A ritual only works if it fits into a real evening. Everything we sell is designed to be finished before the kettle boils twice.</p></article>
          <article><PenLine size={28} strokeWidth={1.2} /><span>02 / Words</span><h3>Say what it does</h3><p>We write about how skin looks and feels, in plain English. No medical claims, no miracle language, no invented science.</p></article>
          <article><RotateCcw size={28} strokeWidth={1.2} /><span>03 / Trust</span><h3>Easy to change your mind</h3><p>Every order carries a 30-day money-back guarantee. If a device does not earn its place on your shelf, send it back.</p></article>
        </div></div>
      </section>
      <section className="about-process-section">
        <div className="site-container about-process-grid"><div className="about-process-art"><div className="print-path" aria-hidden="true"><span /><span /><span /><span /></div><small>One ritual,<br />repeated daily.</small></div><div><span className="eyebrow">How we choose</span><h2>Tested at home,<br />not in a <em>brochure.</em></h2><ol><li><span>01</span><div><h3>Shortlist</h3><p>We look for established technologies — red light, microcurrent, cold, massage — in well-made housings.</p></div></li><li><span>02</span><div><h3>Live with it</h3><p>Each candidate spends weeks in our own bathrooms. If the ritual gets skipped, the device gets dropped.</p></div></li><li><span>03</span><div><h3>Write it honestly</h3><p>What made the range gets a plain-English guide: what it is, how to use it and what to expect.</p></div></li></ol></div></div>
      </section>
      <section className="about-cta"><div className="site-container"><span className="eyebrow">Ready when you are</span><h2>Five minutes<br />a <em>day.</em></h2><Link className="button button-primary" href="/shop">Shop the range <ArrowRight size={16} /></Link></div></section>
    </main>
  );
}
