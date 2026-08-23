import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes from Veylo on skin, rituals and at-home beauty tech. Coming soon.",
  robots: { index: false, follow: true },
};

export default function JournalPage() {
  return (
    <main className="simple-empty-page">
      <span className="eyebrow">Notes</span>
      <h1>Notes coming soon.</h1>
      <p>Short, useful reading on skin and rituals is on its way. The range is already here.</p>
      <Link className="button button-primary" href="/shop">Shop the range</Link>
    </main>
  );
}
