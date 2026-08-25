import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our technology",
  description: "A plain-English guide to the light, microcurrent, radiofrequency, IPL, ultrasonic and massage technologies used across the Veylo range.",
  alternates: { canonical: "/technology" },
};

const technologies = [
  {
    number: "01",
    name: "LED light",
    summary: "Different wavelengths are used for different cosmetic treatment goals. Wavelength, dose, distance and consistency all matter, so a colour alone is not a useful quality standard.",
    status: "LuminaPro · Veylo Wand · Relief Belt · SkinWave",
  },
  {
    number: "02",
    name: "Microcurrent & EMS",
    summary: "Low-level electrical current is delivered through contact points, usually with a conductive medium. Stable skin contact, gradual intensity and clear contraindications matter.",
    status: "GlowPulse · Veylo Wand · SkinWave",
  },
  {
    number: "03",
    name: "Radiofrequency",
    summary: "RF devices create controlled warmth. Temperature management, constant movement and following the session guide are central to safe, consistent use.",
    status: "ThermaLift RF Skin Wand · SkinWave",
  },
  {
    number: "04",
    name: "IPL",
    summary: "Intense pulsed light targets pigment in the hair follicle. Suitability varies by skin tone, hair colour, medication and other factors, so the final model needs precise eligibility and patch-test guidance.",
    status: "IPL Hair Removal Handset",
  },
  {
    number: "05",
    name: "Ultrasonic cleansing",
    summary: "A vibrating spatula is used across damp skin as a surface-cleansing step. The physical edge should glide rather than scrape, and the skin needs to remain wet.",
    status: "UltraClear Skin Scrubber",
  },
  {
    number: "06",
    name: "Microneedling",
    summary: "Microneedling can cross the skin barrier and carries infection, irritation and pigmentation risks. It has a materially higher approval bar than massage or cooling tools.",
    status: "DermaPen Pro · extra hygiene guidance applies",
  },
];

export default function TechnologyPage() {
  return (
    <main className="technology-page">
      <header className="technology-hero">
        <div className="site-container">
          <span className="eyebrow eyebrow-light">Beneath the surface</span>
          <h1>Know what the device is <em>actually doing.</em></h1>
          <p>Beauty technology should be explained in plain English. We separate each device&rsquo;s mechanism, intended cosmetic use and essential instructions so the range is easier to compare.</p>
        </div>
      </header>

      <section className="section technology-list-section">
        <div className="site-container technology-list">
          {technologies.map((technology) => (
            <article key={technology.number}>
              <span>{technology.number}</span>
              <div><h2>{technology.name}</h2><p>{technology.summary}</p></div>
              <strong>{technology.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="technology-standard">
        <div className="site-container technology-standard-grid">
          <div>
            <span className="eyebrow">The Veylo standard</span>
            <h2>Available only after the paperwork meets the product.</h2>
          </div>
          <div>
            <ul>
              <li><Check size={16} /> Supplier identity and trading history checked</li>
              <li><Check size={16} /> Physical sample tested against the listing</li>
              <li><Check size={16} /> Instructions, warnings and intended use reviewed</li>
              <li><Check size={16} /> Applicable UK safety and conformity documents checked</li>
              <li><Check size={16} /> UK plug, charger, packaging and delivery route confirmed</li>
            </ul>
            <p>UK product-safety guidance warns that goods bought from overseas marketplaces may not be manufactured or labelled to UK requirements. A marketplace listing or printed mark is therefore the beginning of our check, not the end.</p>
            <div className="technology-links">
              <a className="text-link" href="https://www.gov.uk/guidance/consumer-product-safety-advice-for-staying-safe" target="_blank" rel="noreferrer">UK product-safety guidance <ArrowRight size={14} /></a>
              <a className="text-link" href="https://www.fda.gov/consumers/consumer-updates/microneedling-devices-getting-point-benefits-risks-and-safety" target="_blank" rel="noreferrer">Microneedling safety guidance <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section technology-cta">
        <div className="site-container">
          <span className="eyebrow">Build your ritual</span>
          <h2>Start with the concern.<br />Then choose the technology.</h2>
          <Link className="button button-primary" href="/shop">Explore the range <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
