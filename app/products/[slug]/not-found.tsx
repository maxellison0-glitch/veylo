import Link from "next/link";

export default function ProductNotFound() {
  return <main className="simple-empty-page"><span className="eyebrow">404</span><h1>That product has moved on.</h1><p>Browse the full range — the ritual is still here.</p><Link className="button button-primary" href="/shop">Browse all products</Link></main>;
}
